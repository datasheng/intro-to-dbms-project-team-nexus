from app_init import db

class Resume(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    job_seeker_id = db.Column(db.Integer, db.ForeignKey('job_seeker.id'), nullable=False)
    resume_content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    deleted_at = db.Column(db.DateTime, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'job_seeker_id': self.job_seeker_id,
            'resume_content': self.resume_content,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'deleted_at': self.deleted_at
        }
