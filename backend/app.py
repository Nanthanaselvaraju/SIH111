# backend/app.py
import os
from io import BytesIO

import qrcode
from flask import Flask, request, jsonify, send_from_directory, send_file
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from sqlalchemy import inspect, text
import json
import math
from config import config
from models import db, User, FeedTest, FarmRecord
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
    farm_record_columns = {column['name'] for column in inspect(db.engine).get_columns('farm_records')}
    if 'sample_id' not in farm_record_columns:
        db.session.execute(text('ALTER TABLE farm_records ADD COLUMN sample_id VARCHAR(50)'))
        db.session.commit()
        used_sample_ids = set()
        for record in FarmRecord.query.order_by(FarmRecord.id).all():
            try:
                sample_id = str(json.loads(record.payload).get('sample_id') or '').strip()
            except (TypeError, json.JSONDecodeError):
                sample_id = ''
            if sample_id and sample_id not in used_sample_ids:
                record.sample_id = sample_id
                used_sample_ids.add(sample_id)
        db.session.commit()
    db.session.execute(text('CREATE UNIQUE INDEX IF NOT EXISTS uq_farm_records_sample_id ON farm_records (sample_id)'))
    db.session.commit()

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

@app.route('/farm-tools')
@app.route('/farm-tools.html')
def farm_tools_page():
    return serve_page('farm-tools.html')

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
        if FeedTest.query.filter_by(sample_id=sample_id).first() or FarmRecord.query.filter_by(sample_id=sample_id).first():
            return jsonify({'error': 'That sample ID has already been used. Enter a unique ID or leave it as AUTO.'}), 409
        sample_name = str(data.get('sample_name') or '').strip()
        sample_date = str(data.get('sample_date') or '').strip()
        measurement_source = str(data.get('measurement_source') or 'not_specified').strip()
        allowed_sources = {'laboratory_report', 'manufacturer_label', 'farmer_measured', 'reference_value', 'simulated_demo', 'not_specified'}
        if len(sample_name) > 100 or measurement_source not in allowed_sources:
            return jsonify({'error': 'Sample name or measurement source is invalid.'}), 400
        if sample_date:
            try:
                datetime.strptime(sample_date, '%Y-%m-%d')
            except ValueError:
                return jsonify({'error': 'Sample date must use YYYY-MM-DD format.'}), 400

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
        metadata_record = FarmRecord(
            record_id=str(uuid.uuid4()), sample_id=sample_id, user_id=user_id, record_type='feed_sample_metadata',
            payload=json.dumps({
                'sample_id': sample_id,
                'sample_name': sample_name,
                'sample_date': sample_date,
                'value_source': measurement_source,
                'source_applies_to': ['moisture', 'protein', 'fiber', 'energy', 'ph'],
                'limitations': 'Shared user-declared source; not independently verified.'
            }, ensure_ascii=False)
        )
        db.session.add(metadata_record)
        db.session.commit()

        return jsonify({
            'message': 'Test created successfully',
            'test': test.to_dict(),
            'sample_metadata': metadata_record.to_dict(),
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


def qr_image_response(target, filename):
    image = qrcode.make(target)
    output = BytesIO()
    image.save(output, format='PNG')
    output.seek(0)
    return send_file(output, mimetype='image/png', download_name=filename, max_age=0)


def frontend_origin():
    origin = request.headers.get('Origin', '').rstrip('/')
    allowed_origins = app.config.get('CORS_ORIGINS', [])
    return origin if origin in allowed_origins else request.host_url.rstrip('/')


@app.route('/api/tests/<int:test_id>/qr', methods=['GET'])
@jwt_required()
def get_test_qr(test_id):
    raw_user_id = get_jwt_identity()
    user_id = int(raw_user_id) if raw_user_id is not None else None
    test = FeedTest.query.filter_by(id=test_id, user_id=user_id).first()
    if not test:
        return jsonify({'error': 'Test report not found.'}), 404
    target = f"{frontend_origin()}/reports.html?test_id={test.id}"
    return qr_image_response(target, f'{test.sample_id}.png')


@app.route('/api/qr/measurements', methods=['POST'])
def create_measurement_qr():
    data = request.get_json(silent=True) or {}
    try:
        values = validate_analysis_input(data)
    except ValueError as exc:
        return jsonify({'error': str(exc)}), 400

    sample_id = str(data.get('sample_id') or '').strip()
    if not sample_id or sample_id.upper() == 'AUTO':
        sample_id = f"QR-{datetime.now().strftime('%Y%m%d')}-{uuid.uuid4().hex[:6].upper()}"
    sample_name = str(data.get('sample_name') or '').strip()
    sample_date = str(data.get('sample_date') or '').strip()
    measurement_source = str(data.get('measurement_source') or 'not_specified').strip()
    allowed_sources = {'laboratory_report', 'manufacturer_label', 'farmer_measured', 'reference_value', 'simulated_demo', 'not_specified'}
    if len(sample_id) > 50 or len(sample_name) > 100 or measurement_source not in allowed_sources:
        return jsonify({'error': 'Sample metadata is invalid.'}), 400
    if sample_date:
        try:
            datetime.strptime(sample_date, '%Y-%m-%d')
        except ValueError:
            return jsonify({'error': 'Sample date must use YYYY-MM-DD format.'}), 400

    payload = {
        'sample_id': sample_id,
        'sample_name': sample_name,
        'sample_date': sample_date,
        'measurement_source': measurement_source,
        'feed_type': values['feed_type'],
        'moisture': values['moisture'],
        'protein': values['protein'],
        'fiber': values['fiber'],
        'energy': values['energy'],
        'ph': values['ph']
    }
    return qr_image_response(json.dumps(payload, ensure_ascii=False), f'{sample_id}.png')


@app.route('/api/farm-records', methods=['GET', 'POST'])
@jwt_required()
def farm_records():
    raw_user_id = get_jwt_identity()
    user_id = int(raw_user_id) if raw_user_id is not None else None
    if user_id is None:
        return jsonify({'error': 'Missing user identity in token'}), 401

    if request.method == 'GET':
        query = FarmRecord.query.filter_by(user_id=user_id)
        record_type = request.args.get('type', '').strip()
        if record_type:
            query = query.filter_by(record_type=record_type)
        records = query.order_by(FarmRecord.created_at.desc()).limit(250).all()
        return jsonify({'records': [record.to_dict() for record in records]}), 200

    data = request.get_json(silent=True) or {}
    record_type = str(data.get('record_type') or '').strip()
    payload = data.get('payload')
    supported_types = {'silage_observation', 'contamination_review', 'milk_yield', 'cost_entry'}
    if record_type not in supported_types or not isinstance(payload, dict):
        return jsonify({'error': 'Choose a supported record type and provide a JSON object.'}), 400
    if record_type == 'silage_observation' and not str(payload.get('sample_id') or '').strip():
        payload['sample_id'] = f"SIL-{datetime.now().strftime('%Y%m%d')}-{uuid.uuid4().hex[:6].upper()}"
    if record_type in {'silage_observation', 'contamination_review'}:
        sample_id = str(payload.get('sample_id') or '').strip()
        if not sample_id or len(sample_id) > 50:
            return jsonify({'error': 'Enter a sample ID of 50 characters or fewer.'}), 400
        if FeedTest.query.filter_by(sample_id=sample_id).first() or FarmRecord.query.filter_by(sample_id=sample_id).first():
            return jsonify({'error': 'That sample ID already exists. Enter a unique ID.'}), 409
        for existing in FarmRecord.query.filter_by(user_id=user_id).all():
            try:
                if json.loads(existing.payload).get('sample_id') == sample_id:
                    return jsonify({'error': 'That sample ID already exists. Enter a unique ID.'}), 409
            except (TypeError, json.JSONDecodeError):
                continue
    required_numeric = {
        'milk_yield': ('litres',),
        'cost_entry': ('feed_cost', 'other_cost', 'milk_litres', 'milk_price')
    }
    required_fields = {
        'silage_observation': ('date',),
        'contamination_review': ('evidence',),
        'milk_yield': ('date',),
        'cost_entry': ('date',)
    }
    if any(payload.get(key) in (None, '') for key in required_fields[record_type] + required_numeric.get(record_type, ())):
        return jsonify({'error': 'Complete all required fields before saving.'}), 400
    if record_type in {'silage_observation', 'milk_yield', 'cost_entry'}:
        try:
            datetime.strptime(str(payload.get('date')), '%Y-%m-%d')
        except ValueError:
            return jsonify({'error': 'Date must use YYYY-MM-DD format.'}), 400
    if len(json.dumps(payload, ensure_ascii=True)) > 20000:
        return jsonify({'error': 'Record data is too large.'}), 413

    numeric_limits = {
        'temperature_c': (-40, 100), 'moisture_pct': (0, 100), 'ph': (0, 14),
        'storage_days': (0, 10000), 'litres': (0, 500), 'feed_cost': (0, 10000000),
        'other_cost': (0, 10000000), 'milk_litres': (0, 10000),
        'milk_price': (0, 100000)
    }
    try:
        for key, bounds in numeric_limits.items():
            if key not in payload or payload[key] in (None, ''):
                continue
            value = float(payload[key])
            if not math.isfinite(value) or not bounds[0] <= value <= bounds[1]:
                raise ValueError(f'{key} is outside the accepted input range.')
            payload[key] = value
        if record_type == 'milk_yield' and payload.get('litres') is None:
            raise ValueError('Daily milk yield is required.')
        if record_type == 'cost_entry' and any(payload.get(key) is None for key in ('feed_cost', 'other_cost', 'milk_litres', 'milk_price')):
            raise ValueError('Enter feed cost, other costs, milk litres and sale price.')
    except (TypeError, ValueError) as exc:
        return jsonify({'error': str(exc)}), 400

    record = FarmRecord(
        record_id=str(uuid.uuid4()), sample_id=str(payload.get('sample_id') or '').strip() or None,
        user_id=user_id, record_type=record_type,
        payload=json.dumps(payload, ensure_ascii=False)
    )
    db.session.add(record)
    db.session.commit()
    return jsonify({'message': 'Record saved.', 'record': record.to_dict()}), 201


@app.route('/api/farm-records/<record_id>', methods=['GET', 'PUT'])
@jwt_required()
def update_farm_record(record_id):
    raw_user_id = get_jwt_identity()
    user_id = int(raw_user_id) if raw_user_id is not None else None
    record = FarmRecord.query.filter_by(record_id=record_id, user_id=user_id).first()
    if not record:
        return jsonify({'error': 'Farm record not found.'}), 404
    if request.method == 'GET':
        return jsonify({'record': record.to_dict()}), 200
    if record.record_type != 'milk_yield':
        return jsonify({'error': 'Only milk-yield records can be edited.'}), 400
    data = request.get_json(silent=True) or {}
    payload = data.get('payload')
    if not isinstance(payload, dict) or any(payload.get(key) in (None, '') for key in ('date', 'litres')):
        return jsonify({'error': 'Date and daily milk yield are required.'}), 400
    try:
        datetime.strptime(str(payload['date']), '%Y-%m-%d')
        litres = float(payload['litres'])
        if not math.isfinite(litres) or not 0 <= litres <= 500:
            raise ValueError('Milk yield must be between 0 and 500 litres.')
    except (TypeError, ValueError) as exc:
        return jsonify({'error': str(exc) or 'Enter a valid date and milk yield.'}), 400
    payload['litres'] = litres
    if len(json.dumps(payload, ensure_ascii=True)) > 20000:
        return jsonify({'error': 'Record data is too large.'}), 413
    record.payload = json.dumps(payload, ensure_ascii=False)
    db.session.commit()
    return jsonify({'message': 'Milk entry updated.', 'record': record.to_dict()}), 200


@app.route('/api/farm-records/<record_id>/qr', methods=['GET'])
@jwt_required()
def get_farm_record_qr(record_id):
    raw_user_id = get_jwt_identity()
    user_id = int(raw_user_id) if raw_user_id is not None else None
    record = FarmRecord.query.filter_by(record_id=record_id, user_id=user_id).first()
    if not record:
        return jsonify({'error': 'Farm record not found.'}), 404
    target = f"{frontend_origin()}/farm-tools.html?record_id={record.record_id}"
    return qr_image_response(target, f'{record.record_type}-{record.record_id[:8]}.png')

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
