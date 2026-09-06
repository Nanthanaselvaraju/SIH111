# backend/app.py
import os

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
import json
from config import config
from models import db, User, FeedTest
from auth import register_user, login_user, get_current_user
from ai_model import ai_model
import uuid
from datetime import datetime

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
def home_page():
    return serve_page('index.html')

@app.route('/test')
def test_page():
    return serve_page('test.html')

@app.route('/dashboard')
def dashboard_page():
    return serve_page('dashboard.html')

@app.route('/reports')
def reports_page():
    return serve_page('reports.html')

@app.route('/about')
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

@app.route('/api/test', methods=['POST'])
@jwt_required()
def create_test():
    try:
        raw_user_id = get_jwt_identity()
        user_id = int(raw_user_id) if raw_user_id is not None else None
        if user_id is None:
            return jsonify({'error': 'JWT identity missing. User is not authenticated.'}), 401

        data = request.get_json(silent=True)
        if data is None:
            return jsonify({'error': 'Request body must be valid JSON.'}), 400

        moisture = float(data.get('moisture', 0))
        protein = float(data.get('protein', 0))
        fiber = float(data.get('fiber', 0))
        ph = float(data.get('ph', 7.0))
        energy = float(data.get('energy', 11.5))

        prediction = ai_model.predict_quality(
            moisture=moisture,
            protein=protein,
            fiber=fiber,
            ph=ph,
            energy=energy
        )

        if not isinstance(prediction, dict) or 'quality' not in prediction or 'analysis' not in prediction:
            raise ValueError(f"Unexpected AI prediction payload: {prediction!r}")

        sample_id = f"TEST-{datetime.now().strftime('%Y%m%d')}-{uuid.uuid4().hex[:6].upper()}"

        test = FeedTest(
            sample_id=sample_id,
            user_id=user_id,
            feed_type=data.get('feed_type', 'cattle'),
            moisture=moisture,
            protein=protein,
            fiber=fiber,
            energy=energy,
            ph=ph,
            aflatoxin=float(data.get('aflatoxin', 0)),
            quality_score=prediction['score'],
            quality_label=prediction['quality'],
            contamination=data.get('contamination', 'None'),
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
    except Exception as exc:
        db.session.rollback()
        app.logger.exception('POST /api/test failed while saving FeedTest')
        return jsonify({
            'error': 'Test analysis succeeded but the backend save failed.',
            'details': str(exc)
        }), 500

@app.route('/api/tests', methods=['GET'])
@jwt_required()
def get_tests():
    raw_user_id = get_jwt_identity()
    user_id = int(raw_user_id) if raw_user_id is not None else None
    if user_id is None:
        return jsonify({'error': 'Missing user identity in token'}), 401

    tests = FeedTest.query.filter_by(user_id=user_id).order_by(FeedTest.timestamp.desc()).all()
    return jsonify({'tests': [t.to_dict() for t in tests]}), 200

@app.route('/api/dashboard/stats', methods=['GET'])
@jwt_required()
def get_dashboard_stats():
    raw_user_id = get_jwt_identity()
    user_id = int(raw_user_id) if raw_user_id is not None else None
    if user_id is None:
        return jsonify({'error': 'Missing user identity in token'}), 401
    
    total_tests = FeedTest.query.filter_by(user_id=user_id).count()
    
    quality_counts = {}
    for q in ['Good', 'Moderate', 'Poor', 'Unsafe']:
        quality_counts[q] = FeedTest.query.filter_by(user_id=user_id, quality_label=q).count()
    
    from sqlalchemy import func
    avg_protein = db.session.query(func.avg(FeedTest.protein)).filter_by(user_id=user_id).scalar() or 0
    avg_moisture = db.session.query(func.avg(FeedTest.moisture)).filter_by(user_id=user_id).scalar() or 0
    avg_score = db.session.query(func.avg(FeedTest.quality_score)).filter_by(user_id=user_id).scalar() or 0
    
    recent_tests = FeedTest.query.filter_by(user_id=user_id).order_by(FeedTest.timestamp.desc()).limit(10).all()
    
    return jsonify({
        'total_tests': total_tests,
        'quality_distribution': quality_counts,
        'averages': {
            'protein': round(avg_protein, 1),
            'moisture': round(avg_moisture, 1),
            'score': round(avg_score, 1)
        },
        'recent_tests': [t.to_dict() for t in recent_tests]
    }), 200

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'message': 'SmartFeed API is running!'
    }), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
