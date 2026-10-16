# backend/ai_model.py
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import joblib
import os

class FeedQualityAI:
    def __init__(self):
        self.classifier = None
        self.regressor = None
        self.scaler = None
        self.is_trained = False
        self.model_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ai_models')
        
    def generate_training_data(self, n_samples=5000):
        np.random.seed(42)
        
        moisture = np.random.normal(15, 8, n_samples)
        protein = np.random.normal(18, 5, n_samples)
        fiber = np.random.normal(16, 4, n_samples)
        ph = np.random.normal(6.0, 1.2, n_samples)
        energy = np.random.normal(11.5, 1.5, n_samples)
        
        moisture = np.clip(moisture, 0, 75)
        protein = np.clip(protein, 0, 30)
        fiber = np.clip(fiber, 0, 30)
        ph = np.clip(ph, 3.5, 8.0)
        energy = np.clip(energy, 8, 15)
        
        quality_scores = []
        quality_labels = []
        
        for i in range(n_samples):
            score = 0
            if 10 <= moisture[i] <= 15: score += 25
            elif 15 < moisture[i] <= 20: score += 15
            else: score += 5
            
            if 18 <= protein[i] <= 22: score += 25
            elif 15 <= protein[i] < 18: score += 15
            else: score += 5
            
            if 15 <= fiber[i] <= 18: score += 15
            elif 12 <= fiber[i] < 15 or 18 < fiber[i] <= 22: score += 10
            else: score += 5
            
            if 5.5 <= ph[i] <= 7.5: score += 20
            elif 4.5 <= ph[i] < 5.5: score += 12
            else: score += 5
            
            if 11 <= energy[i] <= 13: score += 15
            elif 10 <= energy[i] < 11: score += 10
            else: score += 5
            
            quality_scores.append(min(100, score))
            
            if score >= 80: quality_labels.append('Good')
            elif score >= 60: quality_labels.append('Moderate')
            elif score >= 40: quality_labels.append('Poor')
            else: quality_labels.append('Unsafe')
        
        return pd.DataFrame({
            'moisture': moisture,
            'protein': protein,
            'fiber': fiber,
            'ph': ph,
            'energy': energy,
            'quality_score': quality_scores,
            'quality_label': quality_labels
        })
    
    def train_model(self):
        print("Training AI model...")
        
        data = self.generate_training_data(10000)
        X = data[['moisture', 'protein', 'fiber', 'ph', 'energy']].values
        y_class = data['quality_label'].values
        y_reg = data['quality_score'].values
        
        X_train, X_test, y_train_class, y_test_class = train_test_split(
            X, y_class, test_size=0.2, random_state=42
        )
        _, _, y_train_reg, y_test_reg = train_test_split(
            X, y_reg, test_size=0.2, random_state=42
        )
        
        self.scaler = StandardScaler()
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        self.classifier = RandomForestClassifier(
            n_estimators=200, max_depth=15, random_state=42
        )
        self.classifier.fit(X_train_scaled, y_train_class)
        
        self.regressor = RandomForestRegressor(
            n_estimators=200, max_depth=15, random_state=42
        )
        self.regressor.fit(X_train_scaled, y_train_reg)
        
        self.is_trained = True
        
        os.makedirs(self.model_dir, exist_ok=True)
        joblib.dump(self.classifier, os.path.join(self.model_dir, 'feed_quality_model.pkl'))
        joblib.dump(self.regressor, os.path.join(self.model_dir, 'feed_quality_regressor.pkl'))
        joblib.dump(self.scaler, os.path.join(self.model_dir, 'scaler.pkl'))
        
        print("AI model trained and saved.")
        return True
    
    def load_model(self):
        try:
            self.classifier = joblib.load(os.path.join(self.model_dir, 'feed_quality_model.pkl'))
            self.regressor = joblib.load(os.path.join(self.model_dir, 'feed_quality_regressor.pkl'))
            self.scaler = joblib.load(os.path.join(self.model_dir, 'scaler.pkl'))
            self.is_trained = True
            return True
        except (OSError, ValueError, EOFError, ImportError):
            return False
    
    def predict_quality(self, moisture, protein, fiber, ph, energy):
        if not self.is_trained:
            if not self.load_model():
                return self.fallback_prediction(moisture, protein, fiber, ph, energy)
        
        features = np.array([[moisture, protein, fiber, ph, energy]])
        features_scaled = self.scaler.transform(features)
        
        quality_label = self.classifier.predict(features_scaled)[0]
        quality_score = self.regressor.predict(features_scaled)[0]
        quality_score = max(0, min(100, quality_score))
        
        return {
            'quality': quality_label,
            'score': round(quality_score),
            'model_source': 'Saved Random Forest model (trained on generated demonstration data; not evaluated on labelled field data)',
            'analysis': self.generate_analysis(moisture, protein, fiber, ph, energy, quality_label, quality_score)
        }
    
    def fallback_prediction(self, moisture, protein, fiber, ph, energy):
        score = 0
        if 10 <= moisture <= 15: score += 25
        elif 15 < moisture <= 20: score += 15
        else: score += 5
        
        if 18 <= protein <= 22: score += 25
        elif 15 <= protein < 18: score += 15
        else: score += 5
        
        if 15 <= fiber <= 18: score += 15
        elif 12 <= fiber < 15 or 18 < fiber <= 22: score += 10
        else: score += 5
        
        if 5.5 <= ph <= 7.5: score += 20
        elif 4.5 <= ph < 5.5: score += 12
        else: score += 5
        
        if 11 <= energy <= 13: score += 15
        elif 10 <= energy < 11: score += 10
        else: score += 5
        
        score = min(100, score)
        
        if score >= 80: quality = 'Good'
        elif score >= 60: quality = 'Moderate'
        elif score >= 40: quality = 'Poor'
        else: quality = 'Unsafe'
        
        return {
            'quality': quality,
            'score': round(score),
            'model_source': 'Rule-based fallback (model artifacts unavailable)',
            'analysis': self.generate_analysis(moisture, protein, fiber, ph, energy, quality, score)
        }
    
    def generate_analysis(self, moisture, protein, fiber, ph, energy, quality, score):
        # These ranges mirror the synthetic labels used to train this demo model.
        checks = [
            ('Moisture', moisture, 10, 15),
            ('Protein', protein, 18, 22),
            ('Fiber', fiber, 15, 18),
            ('pH', ph, 5.5, 7.5),
            ('Energy', energy, 11, 13),
        ]
        issues = []
        recommendations = []
        for name, value, lower, upper in checks:
            if lower <= value <= upper:
                issues.append(f'{name} is within the preferred range used in generated training examples.')
            else:
                issues.append(f'{name} is outside the preferred range used in generated training examples.')
                recommendations.append(
                    f'Confirm the {name.lower()} value and review it with a qualified animal nutrition professional.'
                )

        advisory = (
            f'The demonstration model assigned category {quality} with score {round(score)}/100. '
            'This output is based on generated training labels and is not a validated feed-quality or safety determination.'
        )
        return {
            'issues': issues,
            'recommendations': recommendations,
            'advisory': advisory
        }

# Initialize and train model
ai_model = FeedQualityAI()
if not os.path.exists(os.path.join(ai_model.model_dir, 'feed_quality_model.pkl')):
    print("No saved AI model found; training a new model...")
    ai_model.train_model()
else:
    ai_model.load_model()
