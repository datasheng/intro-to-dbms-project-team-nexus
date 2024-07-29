# init_db.py
from app_init import create_app, db
from updated_models.user import User
from updated_models.job_offerer import JobOfferer  # Ensure this is imported first
from updated_models.job_seekers import JobSeeker  # Ensure this is imported first
from updated_models.interviews import Interview
from updated_models.resume import Resume
from updated_models.job_posting import JobPosting
from updated_models.application import Application
from updated_models.messages import Message

app = create_app()

with app.app_context():
    db.create_all()
    print("Database and tables created.")
