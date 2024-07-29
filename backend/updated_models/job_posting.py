from app_init import db

class JobPosting(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employer_id = db.Column(db.Integer, db.ForeignKey('job_offerer.id'), nullable=False)
    job_title = db.Column(db.String(100), nullable=False)
    company_name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    requirements = db.Column(db.Text, nullable=True)
    location = db.Column(db.String(100), nullable=True)
    salary = db.Column(db.String(50), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    deleted_at = db.Column(db.DateTime, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'employer_id': self.employer_id,
            'job_title': self.job_title,
            'company_name': self.company_name,
            'description': self.description,
            'requirements': self.requirements,
            'location': self.location,
            'salary': self.salary,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'deleted_at': self.deleted_at
        }
