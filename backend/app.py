# backend/app.py
import os

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
import json
import math
from config import config
from models import db, User, FeedTest
from auth import register_user, login_user, get_current_user
from ai_model import ai_model
from sensor_results import get_latest_sensor_reading
import uuid
from datetime import datetime

MODEL_INPUT_BOUNDS = {
    'moisture': (0, 75),
    'protein': (0, 30),
    'fiber': (0, 30),
    'ph': (3.5, 8.0),
    'energy': (8, 15),
}
VALID_FEED_TYPES = {'cattle', 'silage', 'fodder', 'concentrate', 'mineral'}


def validate_analysis_input(data):
    """Validate values against the input domain used to generate model training data."""
    if not isinstance(data, dict):
        raise ValueError('Request body must be a JSON object.')
    feed_type = str(data.get('feed_type', 'cattle')).strip().lower()
    if feed_type not in VALID_FEED_TYPES:
        raise ValueError('Choose a supported feed type.')

    cleaned = {'feed_type': feed_type}
    for field, (minimum, maximum) in MODEL_INPUT_BOUNDS.items():
        raw_value = data.get(field)
        try:
            value = float(raw_value)
        except (TypeError, ValueError):
            raise ValueError(f'{field.replace("_", " ").title()} is required and must be a number.')
        if not math.isfinite(value):
            raise ValueError(f'{field.replace("_", " ").title()} must be a finite number.')
        if not minimum <= value <= maximum:
            raise ValueError(f'{field.replace("_", " ").title()} must be between {minimum} and {maximum}. These are demo model input bounds, not safety limits.')
        cleaned[field] = value
    return cleaned


def build_prediction(values):
    return ai_model.predict_quality(
        moisture=values['moisture'], protein=values['protein'], fiber=values['fiber'],
        ph=values['ph'], energy=values['energy']
    )


def filtered_tests_for_user(user_id):
    query = FeedTest.query.filter_by(user_id=user_id)
    feed_type = request.args.get('feed_type', '').strip().lower()
    if feed_type:
        query = query.filter(FeedTest.feed_type == feed_type)
    search = request.args.get('q', '').strip()
    if search:
        query = query.filter(FeedTest.sample_id.ilike(f'%{search}%'))
    for key, operator in (('date_from', 'from'), ('date_to', 'to')):
        value = request.args.get(key)
        if value:
            try:
                day = datetime.strptime(value, '%Y-%m-%d')
            except ValueError:
                raise ValueError(f'{key} must use YYYY-MM-DD format.')
            if operator == 'from':
                query = query.filter(FeedTest.timestamp >= day)
            else:
                next_day = datetime.fromordinal(day.toordinal() + 1)
                query = query.filter(FeedTest.timestamp < next_day)
    return query

app = Flask(__name__)
app.config.from_object(config['development'])

FRONTEND_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

CORS(app)
jwt = JWTManager(app)
db.init_app(app)

with app.app_context():
    db.create_all()

# ============================================
# FRONTEND ROUTES
# ============================================

def serve_page(filename):
    return send_from_directory(FRONTEND_DIR, filename)

@app.route('/')
@app.route('/index.html')
def home_page():
    return serve_page('index.html')

@app.route('/test')
@app.route('/test.html')
def test_page():
    return serve_page('test.html')

@app.route('/dashboard')
@app.route('/dashboard.html')
def dashboard_page():
    return serve_page('dashboard.html')

@app.route('/reports')
@app.route('/reports.html')
def reports_page():
    return serve_page('reports.html')

@app.route('/about')
@app.route('/about.html')
def about_page():
    return serve_page('about.html')

@app.route('/css/<path:filename>')
def css_asset(filename):
    return send_from_directory(os.path.join(FRONTEND_DIR, 'css'), filename)

@app.route('/js/<path:filename>')
def js_asset(filename):
    return send_from_directory(os.path.join(FRONTEND_DIR, 'js'), filename)

# ============================================
# AUTHENTICATION ROUTES
# ============================================

@app.route('/api/auth/register', methods=['POST'])
def register():
    return register_user()

@app.route('/api/auth/login', methods=['POST'])
def login():
    return login_user()

@app.route('/api/auth/me', methods=['GET'])
@jwt_required()
def get_me():
    return get_current_user()

# ============================================
# FEED TEST ROUTES
# ============================================

@app.route('/api/analyze', methods=['POST'])
def analyze_test():
    data = request.get_json(silent=True)
    try:
        values = validate_analysis_input(data)
        prediction = build_prediction(values)
        return jsonify({
            'prediction': prediction,
            'model_source': prediction.get('model_source', 'Existing Python model'),
            'limitations': 'The current model was trained using generated demonstration data and has not been evaluated on a labelled real-world dataset.'
        }), 200
    except ValueError as exc:
        return jsonify({'error': str(exc)}), 400
    except Exception:
        app.logger.exception('POST /api/analyze failed')
        return jsonify({'error': 'Analysis is temporarily unavailable. Please try again.'}), 500

@app.route('/api/test', methods=['POST'])
@jwt_required()
def create_test():
    data = request.get_json(silent=True)
    try:
        raw_user_id = get_jwt_identity()
        user_id = int(raw_user_id) if raw_user_id is not None else None
        if user_id is None:
            return jsonify({'error': 'JWT identity missing. User is not authenticated.'}), 401
        values = validate_analysis_input(data)
        prediction = build_prediction(values)

        if not isinstance(prediction, dict) or 'quality' not in prediction or 'analysis' not in prediction:
            raise ValueError(f"Unexpected AI prediction payload: {prediction!r}")

        sample_id = str(data.get('sample_id') or '').strip()
        if not sample_id or sample_id.upper() == 'AUTO':
            sample_id = f"TEST-{datetime.now().strftime('%Y%m%d')}-{uuid.uuid4().hex[:6].upper()}"
        if len(sample_id) > 50:
            return jsonify({'error': 'Sample ID must be 50 characters or fewer.'}), 400
        if FeedTest.query.filter_by(sample_id=sample_id).first():
            return jsonify({'error': 'That sample ID has already been used. Enter a unique ID or leave it as AUTO.'}), 409

        test = FeedTest(
            sample_id=sample_id,
            user_id=user_id,
            feed_type=values['feed_type'],
            moisture=values['moisture'],
            protein=values['protein'],
            fiber=values['fiber'],
            energy=values['energy'],
            ph=values['ph'],
            aflatoxin=None,
            quality_score=prediction['score'],
            quality_label=prediction['quality'],
            contamination='Not assessed',
            advisory=prediction['analysis']['advisory'],
            recommendations=json.dumps(prediction['analysis'].get('recommendations', []))
        )

        db.session.add(test)
        db.session.commit()

        return jsonify({
            'message': 'Test created successfully',
            'test': test.to_dict(),
            'prediction': prediction
        }), 201
    except ValueError as exc:
        db.session.rollback()
        return jsonify({'error': str(exc)}), 400
    except Exception as exc:
        db.session.rollback()
        app.logger.exception('POST /api/test failed while saving FeedTest')
        return jsonify({
            'error': 'The test could not be saved. Please try again.',
            'details': str(exc)
        }), 500

@app.route('/api/tests', methods=['GET'])
@jwt_required()
def get_tests():
    raw_user_id = get_jwt_identity()
    user_id = int(raw_user_id) if raw_user_id is not None else None
    if user_id is None:
        return jsonify({'error': 'Missing user identity in token'}), 401

    try:
        tests = filtered_tests_for_user(user_id).order_by(FeedTest.timestamp.desc()).all()
        return jsonify({'tests': [t.to_dict() for t in tests]}), 200
    except ValueError as exc:
        return jsonify({'error': str(exc)}), 400

@app.route('/api/tests/<int:test_id>', methods=['GET'])
@jwt_required()
def get_test_detail(test_id):
    raw_user_id = get_jwt_identity()
    user_id = int(raw_user_id) if raw_user_id is not None else None
    test = FeedTest.query.filter_by(id=test_id, user_id=user_id).first()
    if not test:
        return jsonify({'error': 'Test report not found.'}), 404
    return jsonify({'test': test.to_dict()}), 200

@app.route('/api/dashboard/stats', methods=['GET'])
@jwt_required()
def get_dashboard_stats():
    raw_user_id = get_jwt_identity()
    user_id = int(raw_user_id) if raw_user_id is not None else None
    if user_id is None:
        return jsonify({'error': 'Missing user identity in token'}), 401
    
    try:
        query = filtered_tests_for_user(user_id)
        tests = query.order_by(FeedTest.timestamp.desc()).all()
        total_tests = len(tests)
        quality_counts = {label: sum(1 for test in tests if test.quality_label == label)
                          for label in ['Good', 'Moderate', 'Poor', 'Unsafe']}
        scores = [test.quality_score for test in tests if test.quality_score is not None]
        proteins = [test.protein for test in tests if test.protein is not None]
        moistures = [test.moisture for test in tests if test.moisture is not None]
        return jsonify({
        'total_tests': total_tests,
        'attention_count': quality_counts['Poor'] + quality_counts['Unsafe'],
        'quality_distribution': quality_counts,
        'averages': {
            'protein': round(sum(proteins) / len(proteins), 1) if proteins else None,
            'moisture': round(sum(moistures) / len(moistures), 1) if moistures else None,
            'score': round(sum(scores) / len(scores), 1) if scores else None
        },
        'recent_tests': [test.to_dict() for test in tests[:10]]
        }), 200
    except ValueError as exc:
        return jsonify({'error': str(exc)}), 400

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'message': 'DiaryLens API is running.'
    }), 200

@app.route('/api/silage/simulated-reading', methods=['GET'])
def get_simulated_silage_reading():
    return jsonify(get_latest_sensor_reading()), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
