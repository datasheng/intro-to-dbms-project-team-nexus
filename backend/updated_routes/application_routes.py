from flask import Blueprint, request, jsonify
from updated_models.application import Application
from app_init import db
from datetime import datetime

application_bp = Blueprint('application_bp', __name__)

@application_bp.route('/applications', methods=['GET'])
def get_applications():
    applications = Application.query.all()
    return jsonify([application.to_dict() for application in applications])

@application_bp.route('/applications/<int:id>', methods=['GET'])
def get_application_by_id(id):
    application = Application.query.get_or_404(id)
    return jsonify(application.to_dict())

@application_bp.route('/applications', methods=['POST'])
def create_application():
    data = request.get_json()
    new_application = Application(
        job_offerer_id=data['job_offerer_id'],
        job_seeker_id=data['job_seeker_id'],
        applied_at=datetime.fromisoformat(data['applied_at']),
        status=data.get('status')
    )
    db.session.add(new_application)
    db.session.commit()
    return jsonify(new_application.to_dict()), 201

@application_bp.route('/applications/<int:id>', methods=['PUT'])
def update_application(id):
    application = Application.query.get_or_404(id)
    data = request.get_json()
    application.job_offerer_id = data.get('job_offerer_id', application.job_offerer_id)
    application.job_seeker_id = data.get('job_seeker_id', application.job_seeker_id)
    application.applied_at = datetime.fromisoformat(data['applied_at']) if data.get('applied_at') else application.applied_at
    application.status = data.get('status', application.status)
    db.session.commit()
    return jsonify(application.to_dict())

@application_bp.route('/applications/<int:id>', methods=['DELETE'])
def delete_application(id):
    application = Application.query.get_or_404(id)
    db.session.delete(application)
    db.session.commit()
    return jsonify({'message': 'Application deleted successfully'}), 204

# Helper method to convert Application object to dictionary
def to_dict(self):
    return {
        'id': self.id,
        'job_offerer_id': self.job_offerer_id,
        'job_seeker_id': self.job_seeker_id,
        'applied_at': self.applied_at.isoformat(),
        'status': self.status,
        'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        'deleted_at': self.deleted_at.isoformat() if self.deleted_at else None
    }

# Add to_dict method to Application model
Application.to_dict = to_dict

