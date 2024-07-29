from app_init import db

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('job_seeker.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('job_seeker.id'), nullable=False)
    sender_type = db.Column(db.Enum('job_seeker', 'job_offerer'), nullable=False)
    receiver_type = db.Column(db.Enum('job_seeker', 'job_offerer'), nullable=False)
    message_content = db.Column(db.Text, nullable=False)
    sent_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    deleted_at = db.Column(db.DateTime, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'receiver_id': self.receiver_id,
            'sender_type': self.sender_type,
            'receiver_type': self.receiver_type,
            'message_content': self.message_content,
            'sent_at': self.sent_at,
            'updated_at': self.updated_at,
            'deleted_at': self.deleted_at
        }
