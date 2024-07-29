from app_init import db

class Interview(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    job_seeker_id = db.Column(db.Integer, db.ForeignKey('job_seeker.id'), nullable=False)  # Correct table name
    job_offerer_id = db.Column(db.Integer, db.ForeignKey('job_offerer.id'), nullable=False)  # Correct table name
    interview_date = db.Column(db.DateTime, nullable=False)
    interview_status = db.Column(db.String(50), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    deleted_at = db.Column(db.DateTime, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'job_seeker_id': self.job_seeker_id,
            'job_offerer_id': self.job_offerer_id,  # Correct attribute name
            'interview_date': self.interview_date,
            'interview_status': self.interview_status,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'deleted_at': self.deleted_at
        }
