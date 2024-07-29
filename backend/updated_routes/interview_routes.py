from flask import Blueprint, request, jsonify
from updated_models.interviews import Interview
from app_init import db
from datetime import datetime

interview_bp = Blueprint('interview_bp', __name__)

@interview_bp.route('/interviews', methods=['GET'])
def get_interviews():
    interviews = Interview.query.all()
    return jsonify([interview.to_dict() for interview in interviews])

@interview_bp.route('/interviews/<int:id>', methods=['GET'])
def get_interview_by_id(id):
    interview = Interview.query.get_or_404(id)
    return jsonify(interview.to_dict())

@interview_bp.route('/interviews', methods=['POST'])
def create_interview():
    data = request.get_json()
    new_interview = Interview(
        job_seeker_id=data['job_seeker_id'],
        job_offerer_id=data['job_offerer_id'],
        interview_date=datetime.fromisoformat(data['interview_date']),
        interview_status=data.get('interview_status')
    )
    db.session.add(new_interview)
    db.session.commit()
    return jsonify(new_interview.to_dict()), 201

@interview_bp.route('/interviews/<int:id>', methods=['PUT'])
def update_interview(id):
    interview = Interview.query.get_or_404(id)
    data = request.get_json()
    interview.job_seeker_id = data.get('job_seeker_id', interview.job_seeker_id)
    interview.job_offerer_id = data.get('job_offerer_id', interview.job_offerer_id)
    interview.interview_date = datetime.fromisoformat(data['interview_date']) if data.get('interview_date') else interview.interview_date
    interview.interview_status = data.get('interview_status', interview.interview_status)
    db.session.commit()
    return jsonify(interview.to_dict())

@interview_bp.route('/interviews/<int:id>', methods=['DELETE'])
def delete_interview(id):
    interview = Interview.query.get_or_404(id)
    db.session.delete(interview)
    db.session.commit()
    return jsonify({'message': 'Interview deleted successfully'}), 204

# Helper method to convert Interview object to dictionary
def to_dict(self):
    return {
        'id': self.id,
        'job_seeker_id': self.job_seeker_id,
        'job_offerer_id': self.job_offerer_id,
        'interview_date': self.interview_date.isoformat(),
        'interview_status': self.interview_status,
        'created_at': self.created_at.isoformat(),
        'updated_at': self.updated_at.isoformat(),
        'deleted_at': self.deleted_at.isoformat() if self.deleted_at else None
    }

# Add to_dict method to Interview model
Interview.to_dict = to_dict

