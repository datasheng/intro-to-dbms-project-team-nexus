from app_init import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)  # Store hashed password
    user_type = db.Column(db.Enum('job_seeker', 'job_offerer'), nullable=False)
    job_seeker = db.relationship('JobSeeker', back_populates='user', uselist=False)
    job_offerer = db.relationship('JobOfferer', back_populates='user', uselist=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    deleted_at = db.Column(db.DateTime, nullable=True)

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'user_type': self.user_type,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'deleted_at': self.deleted_at
        }

# Helper method to convert User object to dictionary
def to_dict(self):
    return {
        'id': self.id,
        'email': self.email,
        'user_type': self.user_type,
        'created_at': self.created_at.isoformat(),
        'updated_at': self.updated_at.isoformat(),
        'deleted_at': self.deleted_at.isoformat() if self.deleted_at else None
    }

# Add to_dict method to User model
User.to_dict = to_dict


