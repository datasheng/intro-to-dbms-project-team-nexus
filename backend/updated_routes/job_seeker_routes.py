from flask import Blueprint, request, jsonify
from updated_models.job_seekers import JobSeeker
from app_init import db

job_seeker_bp = Blueprint('job_seeker_bp', __name__)

@job_seeker_bp.route('/job_seekers', methods=['GET'])
def get_job_seekers():
    job_seekers = JobSeeker.query.all()
    return jsonify([job_seeker.to_dict() for job_seeker in job_seekers])

@job_seeker_bp.route('/job_seekers/<int:id>', methods=['GET'])
def get_job_seeker_by_id(id):
    job_seeker = JobSeeker.query.get_or_404(id)
    return jsonify(job_seeker.to_dict())

@job_seeker_bp.route('/job_seekers', methods=['POST'])
def create_job_seeker():
    data = request.get_json()
    new_job_seeker = JobSeeker(
        user_id=data['user_id'],
        first_name=data['first_name'],
        last_name=data['last_name'],
        created_at=data.get('created_at'),
        updated_at=data.get('updated_at'),
        deleted_at=data.get('deleted_at')
    )
    db.session.add(new_job_seeker)
    db.session.commit()
    return jsonify(new_job_seeker.to_dict()), 201

@job_seeker_bp.route('/job_seekers/<int:id>', methods=['PUT'])
def update_job_seeker(id):
    job_seeker = JobSeeker.query.get_or_404(id)
    data = request.get_json()
    job_seeker.user_id = data.get('user_id', job_seeker.user_id)
    job_seeker.first_name = data.get('first_name', job_seeker.first_name)
    job_seeker.last_name = data.get('last_name', job_seeker.last_name)
    job_seeker.created_at = data.get('created_at', job_seeker.created_at)
    job_seeker.updated_at = data.get('updated_at', job_seeker.updated_at)
    job_seeker.deleted_at = data.get('deleted_at', job_seeker.deleted_at)
    db.session.commit()
    return jsonify(job_seeker.to_dict())

@job_seeker_bp.route('/job_seekers/<int:id>', methods=['DELETE'])
def delete_job_seeker(id):
    job_seeker = JobSeeker.query.get_or_404(id)
    db.session.delete(job_seeker)
    db.session.commit()
    return jsonify({'message': 'Job Seeker deleted successfully'}), 204

# Helper method to convert JobSeeker object to dictionary
def to_dict(self):
    return {
        'id': self.id,
        'user_id': self.user_id,
        'first_name': self.first_name,
        'last_name': self.last_name,
        'created_at': self.created_at.isoformat() if self.created_at else None,
        'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        'deleted_at': self.deleted_at.isoformat() if self.deleted_at else None
    }

# Add to_dict method to JobSeeker model
JobSeeker.to_dict = to_dict

