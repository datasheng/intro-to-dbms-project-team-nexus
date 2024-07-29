from flask import Blueprint, request, jsonify
from updated_models.job_offerer import JobOfferer
from app_init import db

job_offerer_bp = Blueprint('job_offerer_bp', __name__)

@job_offerer_bp.route('/job_offerers', methods=['GET'])
def get_job_offerers():
    job_offerers = JobOfferer.query.all()
    return jsonify([job_offerer.to_dict() for job_offerer in job_offerers])

@job_offerer_bp.route('/job_offerers/<int:id>', methods=['GET'])
def get_job_offerer_by_id(id):
    job_offerer = JobOfferer.query.get_or_404(id)
    return jsonify(job_offerer.to_dict())

@job_offerer_bp.route('/job_offerers', methods=['POST'])
def create_job_offerer():
    data = request.get_json()
    new_job_offerer = JobOfferer(
        user_id=data['user_id'],
        company_name=data['company_name']
    )
    db.session.add(new_job_offerer)
    db.session.commit()
    return jsonify(new_job_offerer.to_dict()), 201

@job_offerer_bp.route('/job_offerers/<int:id>', methods=['PUT'])
def update_job_offerer(id):
    job_offerer = JobOfferer.query.get_or_404(id)
    data = request.get_json()
    job_offerer.user_id = data.get('user_id', job_offerer.user_id)
    job_offerer.company_name = data.get('company_name', job_offerer.company_name)
    db.session.commit()
    return jsonify(job_offerer.to_dict())

@job_offerer_bp.route('/job_offerers/<int:id>', methods=['DELETE'])
def delete_job_offerer(id):
    job_offerer = JobOfferer.query.get_or_404(id)
    db.session.delete(job_offerer)
    db.session.commit()
    return jsonify({'message': 'Job Offerer deleted successfully'}), 204

# Helper method to convert JobOfferer object to dictionary
def to_dict(self):
    return {
        'id': self.id,
        'user_id': self.user_id,
        'company_name': self.company_name,
        'created_at': self.created_at,
        'updated_at': self.updated_at,
        'deleted_at': self.deleted_at
    }

# Add to_dict method to JobOfferer model
JobOfferer.to_dict = to_dict

