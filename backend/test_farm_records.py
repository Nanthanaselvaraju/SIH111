import pathlib
import sys
import unittest
import uuid

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))

from app import app
from auth import bcrypt
from flask_jwt_extended import create_access_token
from models import db, FarmRecord, FeedTest, User


class FarmRecordApiTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        app.config['TESTING'] = True
        cls.client = app.test_client()

    @classmethod
    def tearDownClass(cls):
        with app.app_context():
            db.session.remove()
            db.engine.dispose()

    def setUp(self):
        self.username = f'qa_{uuid.uuid4().hex[:12]}'
        self.email = f'{self.username}@example.invalid'
        self.password = f'qa-password-{uuid.uuid4().hex}'
        with app.app_context():
            self.user = User(
                username=self.username,
                email=self.email,
                password_hash=bcrypt.generate_password_hash(self.password).decode('utf-8')
            )
            db.session.add(self.user)
            db.session.commit()
            self.user_id = self.user.id
            self.token = create_access_token(identity=str(self.user_id))
        self.headers = {'Authorization': f'Bearer {self.token}'}

    def tearDown(self):
        with app.app_context():
            FarmRecord.query.filter_by(user_id=self.user_id).delete()
            FeedTest.query.filter_by(user_id=self.user_id).delete()
            user = db.session.get(User, self.user_id)
            if user:
                db.session.delete(user)
            db.session.commit()
            db.session.remove()

    def test_records_require_authentication(self):
        response = self.client.get('/api/farm-records')
        self.assertEqual(response.status_code, 401)

    def test_login_accepts_username_or_email(self):
        for identifier in (self.username, self.email.upper()):
            response = self.client.post('/api/auth/login', json={
                'username': identifier,
                'password': self.password
            })
            self.assertEqual(response.status_code, 200, identifier)
            self.assertTrue(response.json['access_token'])

        wrong_password = self.client.post('/api/auth/login', json={
            'username': self.email,
            'password': 'wrong-password'
        })
        self.assertEqual(wrong_password.status_code, 401)

    def test_required_fields_dates_and_unique_sample_ids(self):
        missing_yield = self.client.post('/api/farm-records', headers=self.headers, json={
            'record_type': 'milk_yield', 'payload': {'date': '2026-10-16'}
        })
        self.assertEqual(missing_yield.status_code, 400)

        bad_date = self.client.post('/api/farm-records', headers=self.headers, json={
            'record_type': 'silage_observation',
            'payload': {'sample_id': 'QA-DUP-01', 'date': 'not-a-date'}
        })
        self.assertEqual(bad_date.status_code, 400)

        created = self.client.post('/api/farm-records', headers=self.headers, json={
            'record_type': 'silage_observation',
            'payload': {'sample_id': 'QA-DUP-01', 'date': '2026-10-16', 'ph': 4.1}
        })
        self.assertEqual(created.status_code, 201)

        duplicate = self.client.post('/api/farm-records', headers=self.headers, json={
            'record_type': 'contamination_review',
            'payload': {'sample_id': 'QA-DUP-01', 'evidence': 'QA duplicate check'}
        })
        self.assertEqual(duplicate.status_code, 409)

    def test_milk_entry_can_be_updated_and_is_user_scoped(self):
        created = self.client.post('/api/farm-records', headers=self.headers, json={
            'record_type': 'milk_yield',
            'payload': {'date': '2026-10-15', 'animal_id': 'QA-COW', 'litres': 12}
        })
        self.assertEqual(created.status_code, 201)
        record_id = created.json['record']['record_id']

        updated = self.client.put(f'/api/farm-records/{record_id}', headers=self.headers, json={
            'payload': {'date': '2026-10-15', 'animal_id': 'QA-COW', 'litres': 13.5}
        })
        self.assertEqual(updated.status_code, 200)
        self.assertEqual(updated.json['record']['payload']['litres'], 13.5)

        with app.app_context():
            other_user_token = create_access_token(identity='999999999')
        hidden = self.client.get(f'/api/farm-records/{record_id}', headers={
            'Authorization': f'Bearer {other_user_token}'
        })
        self.assertEqual(hidden.status_code, 404)

    def test_record_qr_returns_png(self):
        created = self.client.post('/api/farm-records', headers=self.headers, json={
            'record_type': 'silage_observation',
            'payload': {'sample_id': 'QA-QR-01', 'date': '2026-10-16', 'mould': True}
        })
        record_id = created.json['record']['record_id']
        qr_response = self.client.get(
            f'/api/farm-records/{record_id}/qr',
            headers={**self.headers, 'Origin': 'http://127.0.0.1:5501'}
        )
        self.assertEqual(qr_response.status_code, 200)
        self.assertEqual(qr_response.mimetype, 'image/png')

    def test_feed_test_persists_sample_provenance(self):
        sample_id = f'QA-FEED-{uuid.uuid4().hex[:8]}'
        response = self.client.post('/api/test', headers=self.headers, json={
            'sample_id': sample_id,
            'sample_name': 'QA feed sample',
            'sample_date': '2026-10-16',
            'measurement_source': 'laboratory_report',
            'feed_type': 'cattle',
            'moisture': 13.4,
            'protein': 8.5,
            'fiber': 7.1,
            'energy': 10.61,
            'ph': 4.8
        })
        self.assertEqual(response.status_code, 201, response.get_json())
        self.assertEqual(response.json['sample_metadata']['payload']['sample_id'], sample_id)
        self.assertEqual(response.json['sample_metadata']['payload']['value_source'], 'laboratory_report')

    def test_saved_feed_report_qr_returns_png(self):
        with app.app_context():
            test = FeedTest(
                sample_id=f'QA-REPORT-{uuid.uuid4().hex[:8]}', user_id=self.user_id,
                feed_type='cattle', moisture=12, protein=16, fiber=14, energy=11,
                ph=6, quality_score=72, quality_label='Moderate',
                contamination='Not assessed', recommendations='[]'
            )
            db.session.add(test)
            db.session.commit()
            test_id = test.id
        response = self.client.get(
            f'/api/tests/{test_id}/qr',
            headers={**self.headers, 'Origin': 'http://127.0.0.1:5501'}
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.mimetype, 'image/png')

    def test_unsaved_measurement_qr_returns_png_without_auth(self):
        response = self.client.post('/api/qr/measurements', json={
            'sample_id': 'QR-DEMO-01',
            'sample_name': 'QR test',
            'measurement_source': 'laboratory_report',
            'feed_type': 'cattle',
            'moisture': 12,
            'protein': 16,
            'fiber': 14,
            'energy': 11,
            'ph': 6
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.mimetype, 'image/png')

        invalid = self.client.post('/api/qr/measurements', json={
            'feed_type': 'cattle', 'moisture': 12, 'protein': 16,
            'fiber': 14, 'energy': 500, 'ph': 6
        })
        self.assertEqual(invalid.status_code, 400)


if __name__ == '__main__':
    unittest.main()
