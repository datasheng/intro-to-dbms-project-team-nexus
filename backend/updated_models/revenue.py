# models/revenue.py
from app_init import db
from sqlalchemy.dialects.postgresql import ENUM

class Revenue(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    role = db.Column(ENUM('Job_Offerer', 'Job_Seeker', name='user_role'), nullable=False)
    subscribed = db.Column(db.Boolean, nullable=False)
    subscription_plan = db.Column(ENUM('monthly', 'yearly', name='subscription_plan'), nullable=False)
    start_date = db.Column(db.TIMESTAMP, nullable=False)
    end_date = db.Column(db.TIMESTAMP, nullable=True)
    created_at = db.Column(db.TIMESTAMP, nullable=False)
    updated_at = db.Column(db.TIMESTAMP, nullable=False)
    deleted_at = db.Column(db.TIMESTAMP, nullable=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'role': self.role,
            'subscribed': self.subscribed,
            'subscription_plan': self.subscription_plan,
            'start_date': self.start_date,
            'end_date': self.end_date,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'deleted_at': self.deleted_at
        }
