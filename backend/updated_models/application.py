from app_init import db

class Application(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    job_offerer_id = db.Column(db.Integer, db.ForeignKey('job_posting.id'), nullable=False)
    job_seeker_id = db.Column(db.Integer, db.ForeignKey('job_seeker.id'), nullable=False)  # Correct table name
    applied_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    status = db.Column(db.Enum('Applied', 'Interview Scheduled', 'Accepted', 'Rejected', 'Cancelled'), nullable=True)
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    deleted_at = db.Column(db.DateTime, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'job_offerer_id': self.job_offerer_id,
            'job_seeker_id': self.job_seeker_id,
            'applied_at': self.applied_at,
            'status': self.status,
            'updated_at': self.updated_at,
            'deleted_at': self.deleted_at
        }
