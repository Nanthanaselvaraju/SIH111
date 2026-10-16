# backend/models.py
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    full_name = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    role = db.Column(db.String(20), default='farmer')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    tests = db.relationship('FeedTest', backref='user', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'full_name': self.full_name,
            'phone': self.phone,
            'role': self.role,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class FeedTest(db.Model):
    __tablename__ = 'feed_tests'
    
    id = db.Column(db.Integer, primary_key=True)
    sample_id = db.Column(db.String(50), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    feed_type = db.Column(db.String(50))
    moisture = db.Column(db.Float)
    protein = db.Column(db.Float)
    fiber = db.Column(db.Float)
    energy = db.Column(db.Float)
    ph = db.Column(db.Float)
    aflatoxin = db.Column(db.Float)
    quality_score = db.Column(db.Integer)
    quality_label = db.Column(db.String(20))
    contamination = db.Column(db.String(50))
    advisory = db.Column(db.Text)
    recommendations = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'sample_id': self.sample_id,
            'user_id': self.user_id,
            'feed_type': self.feed_type,
            'moisture': self.moisture,
            'protein': self.protein,
            'fiber': self.fiber,
            'energy': self.energy,
            'ph': self.ph,
            'aflatoxin': self.aflatoxin,
            'quality_score': self.quality_score,
            'quality_label': self.quality_label,
            'contamination': self.contamination,
            'advisory': self.advisory,
            'recommendations': self._recommendations(),
            'timestamp': self.timestamp.isoformat() if self.timestamp else None
        }

    def _recommendations(self):
        if not self.recommendations:
            return []
        try:
            decoded = json.loads(self.recommendations)
            return decoded if isinstance(decoded, list) else []
        except (TypeError, json.JSONDecodeError):
            return []
