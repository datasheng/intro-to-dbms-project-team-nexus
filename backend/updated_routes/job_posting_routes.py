from flask import Blueprint, request, jsonify
from updated_models.job_posting import JobPosting
from app_init import db
from datetime import datetime
from dateutil.parser import isoparse

job_posting_bp = Blueprint('job_posting_bp', __name__)

@job_posting_bp.route('/job_postings', methods=['GET'])
def get_job_postings():
    job_postings = JobPosting.query.all()
    return jsonify([job_posting.to_dict() for job_posting in job_postings])

@job_posting_bp.route('/job_postings/<int:id>', methods=['GET'])
def get_job_posting_by_id(id):
    job_posting = JobPosting.query.get_or_404(id)
    return jsonify(job_posting.to_dict())

@job_posting_bp.route('/job_postings', methods=['POST'])
def create_job_posting():
    data = request.get_json()
    new_job_posting = JobPosting(
        employer_id=data['employer_id'],
        job_title=data['job_title'],
        company_name=data['company_name'],
        description=data.get('description'),
        requirements=data.get('requirements'),
        location=data.get('location'),
        salary=data.get('salary'),
        created_at=isoparse(data['created_at']) if data.get('created_at') else None,
        updated_at=isoparse(data['updated_at']) if data.get('updated_at') else None,
        deleted_at=isoparse(data['deleted_at']) if data.get('deleted_at') else None
    )
    db.session.add(new_job_posting)
    db.session.commit()
    return jsonify(new_job_posting.to_dict()), 201

@job_posting_bp.route('/job_postings/<int:id>', methods=['PUT'])
def update_job_posting(id):
    job_posting = JobPosting.query.get_or_404(id)
    data = request.get_json()
    job_posting.employer_id = data.get('employer_id', job_posting.employer_id)
    job_posting.job_title = data.get('job_title', job_posting.job_title)
    job_posting.company_name = data.get('company_name', job_posting.company_name)
    job_posting.description = data.get('description', job_posting.description)
    job_posting.requirements = data.get('requirements', job_posting.requirements)
    job_posting.location = data.get('location', job_posting.location)
    job_posting.salary = data.get('salary', job_posting.salary)
    job_posting.created_at = isoparse(data['created_at']) if data.get('created_at') else job_posting.created_at
    job_posting.updated_at = isoparse(data['updated_at']) if data.get('updated_at') else job_posting.updated_at
    job_posting.deleted_at = isoparse(data['deleted_at']) if data.get('deleted_at') else job_posting.deleted_at
    db.session.commit()
    return jsonify(job_posting.to_dict())

@job_posting_bp.route('/job_postings/<int:id>', methods=['DELETE'])
def delete_job_posting(id):
    job_posting = JobPosting.query.get_or_404(id)
    db.session.delete(job_posting)
    db.session.commit()
    return jsonify({'message': 'Job posting deleted successfully'}), 204



# from flask import Blueprint, request, jsonify
# from updated_models.job_posting import JobPosting
# from app_init import db
# from datetime import datetime

# job_posting_bp = Blueprint('job_posting_bp', __name__)

# @job_posting_bp.route('/job_postings', methods=['GET'])
# def get_job_postings():
#     job_postings = JobPosting.query.all()
#     return jsonify([job_posting.to_dict() for job_posting in job_postings])

# @job_posting_bp.route('/job_postings/<int:id>', methods=['GET'])
# def get_job_posting_by_id(id):
#     job_posting = JobPosting.query.get_or_404(id)
#     return jsonify(job_posting.to_dict())

# @job_posting_bp.route('/job_postings', methods=['POST'])
# def create_job_posting():
#     data = request.get_json()
#     new_job_posting = JobPosting(
#         employer_id=data['employer_id'],
#         job_title=data['job_title'],
#         company_name=data['company_name'],
#         description=data.get('description'),
#         requirements=data.get('requirements'),
#         location=data.get('location'),
#         salary=data.get('salary'),
#         created_at=datetime.fromisoformat(data['created_at']) if data.get('created_at') else None,
#         updated_at=datetime.fromisoformat(data['updated_at']) if data.get('updated_at') else None,
#         deleted_at=datetime.fromisoformat(data['deleted_at']) if data.get('deleted_at') else None
#     )
#     db.session.add(new_job_posting)
#     db.session.commit()
#     return jsonify(new_job_posting.to_dict()), 201

# @job_posting_bp.route('/job_postings/<int:id>', methods=['PUT'])
# def update_job_posting(id):
#     job_posting = JobPosting.query.get_or_404(id)
#     data = request.get_json()
#     job_posting.employer_id = data.get('employer_id', job_posting.employer_id)
#     job_posting.job_title = data.get('job_title', job_posting.job_title)
#     job_posting.company_name = data.get('company_name', job_posting.company_name)
#     job_posting.description = data.get('description', job_posting.description)
#     job_posting.requirements = data.get('requirements', job_posting.requirements)
#     job_posting.location = data.get('location', job_posting.location)
#     job_posting.salary = data.get('salary', job_posting.salary)
#     job_posting.created_at = datetime.fromisoformat(data['created_at']) if data.get('created_at') else job_posting.created_at
#     job_posting.updated_at = datetime.fromisoformat(data['updated_at']) if data.get('updated_at') else job_posting.updated_at
#     job_posting.deleted_at = datetime.fromisoformat(data['deleted_at']) if data.get('deleted_at') else job_posting.deleted_at
#     db.session.commit()
#     return jsonify(job_posting.to_dict())

# @job_posting_bp.route('/job_postings/<int:id>', methods=['DELETE'])
# def delete_job_posting(id):
#     job_posting = JobPosting.query.get_or_404(id)
#     db.session.delete(job_posting)
#     db.session.commit()
#     return jsonify({'message': 'Job posting deleted successfully'}), 204

# # Helper method to convert JobPosting object to dictionary
# def to_dict(self):
#     return {
#         'id': self.id,
#         'employer_id': self.employer_id,
#         'job_title': self.job_title,
#         'company_name': self.company_name,
#         'description': self.description,
#         'requirements': self.requirements,
#         'location': self.location,
#         'salary': self.salary,
#         'created_at': self.created_at.isoformat() if self.created_at else None,
#         'updated_at': self.updated_at.isoformat() if self.updated_at else None,
#         'deleted_at': self.deleted_at.isoformat() if self.deleted_at else None
#     }

# # Add to_dict method to JobPosting model
# JobPosting.to_dict = to_dict

