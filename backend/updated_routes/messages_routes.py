from flask import Blueprint, request, jsonify
from updated_models.messages import Message
from app_init import db

message_bp = Blueprint('message_bp', __name__)

@message_bp.route('/messages', methods=['GET'])
def get_messages():
    messages = Message.query.all()
    return jsonify([message.to_dict() for message in messages])

@message_bp.route('/messages/<int:id>', methods=['GET'])
def get_message_by_id(id):
    message = Message.query.get_or_404(id)
    return jsonify(message.to_dict())

@message_bp.route('/messages', methods=['POST'])
def create_message():
    data = request.get_json()
    new_message = Message(
        sender_id=data['sender_id'],
        receiver_id=data['receiver_id'],
        sender_type=data['sender_type'],
        receiver_type=data['receiver_type'],
        message_content=data['message_content']
    )
    db.session.add(new_message)
    db.session.commit()
    return jsonify(new_message.to_dict()), 201

@message_bp.route('/messages/<int:id>', methods=['PUT'])
def update_message(id):
    message = Message.query.get_or_404(id)
    data = request.get_json()
    message.sender_id = data.get('sender_id', message.sender_id)
    message.receiver_id = data.get('receiver_id', message.receiver_id)
    message.sender_type = data.get('sender_type', message.sender_type)
    message.receiver_type = data.get('receiver_type', message.receiver_type)
    message.message_content = data.get('message_content', message.message_content)
    db.session.commit()
    return jsonify(message.to_dict())

@message_bp.route('/messages/<int:id>', methods=['DELETE'])
def delete_message(id):
    message = Message.query.get_or_404(id)
    db.session.delete(message)
    db.session.commit()
    return jsonify({'message': 'Message deleted successfully'}), 204

# Helper method to convert Message object to dictionary
def to_dict(self):
    return {
        'id': self.id,
        'sender_id': self.sender_id,
        'receiver_id': self.receiver_id,
        'sender_type': self.sender_type,
        'receiver_type': self.receiver_type,
        'message_content': self.message_content,
        'sent_at': self.sent_at.isoformat(),
        'updated_at': self.updated_at.isoformat(),
        'deleted_at': self.deleted_at.isoformat() if self.deleted_at else None
    }

# Add to_dict method to Message model
Message.to_dict = to_dict

