# backend/app.py
from flask import Flask, request, jsonify
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

CORS(app)
jwt = JWTManager(app)
db.init_app(app)

with app.app_context():
    db.create_all()

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
    user_id = get_jwt_identity()
    data = request.get_json()
    
    # Get AI prediction
    prediction = ai_model.predict_quality(
        moisture=float(data.get('moisture', 0)),
        protein=float(data.get('protein', 0)),
        fiber=float(data.get('fiber', 0)),
        ph=float(data.get('ph', 7.0)),
        energy=float(data.get('energy', 11.5))
    )
    
    sample_id = f"TEST-{datetime.now().strftime('%Y%m%d')}-{uuid.uuid4().hex[:6].upper()}"
    
    test = FeedTest(
        sample_id=sample_id,
        user_id=user_id,
        feed_type=data.get('feed_type', 'cattle'),
        moisture=float(data.get('moisture', 0)),
        protein=float(data.get('protein', 0)),
        fiber=float(data.get('fiber', 0)),
        energy=float(data.get('energy', 0)),
        ph=float(data.get('ph', 7.0)),
        aflatoxin=float(data.get('aflatoxin', 0)),
        quality_score=prediction['score'],
        quality_label=prediction['quality'],
        contamination=data.get('contamination', 'None'),
        advisory=prediction['analysis']['advisory'],
        recommendations=json.dumps(prediction['analysis']['recommendations'])
    )
    
    db.session.add(test)
    db.session.commit()
    
    return jsonify({
        'message': 'Test created successfully',
        'test': test.to_dict(),
        'prediction': prediction
    }), 201

@app.route('/api/tests', methods=['GET'])
@jwt_required()
def get_tests():
    user_id = get_jwt_identity()
    tests = FeedTest.query.filter_by(user_id=user_id).order_by(FeedTest.timestamp.desc()).all()
    return jsonify({'tests': [t.to_dict() for t in tests]}), 200

@app.route('/api/dashboard/stats', methods=['GET'])
@jwt_required()
def get_dashboard_stats():
    user_id = get_jwt_identity()
    
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
