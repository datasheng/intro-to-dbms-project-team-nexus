from flask import Blueprint, request, jsonify
from updated_models.user import User
from app_init import db

user_bp = Blueprint('user_bp', __name__)

# Get all users
@user_bp.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

# Get user by ID
@user_bp.route('/users/<int:id>', methods=['GET'])
def get_user_by_id(id):
    user = User.query.get_or_404(id)
    return jsonify(user.to_dict())

# Create a new user
@user_bp.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = User(
        email=data['email'],
        password=data['password'],  # Password will be hashed by the model
        user_type=data['user_type']
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_dict()), 201

# Update user
@user_bp.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    user = User.query.get_or_404(id)
    data = request.get_json()
    user.email = data.get('email', user.email)
    if 'password' in data:
        user.password = data['password']  # Password will be hashed by the model
    user.user_type = data.get('user_type', user.user_type)
    db.session.commit()
    return jsonify(user.to_dict())

# Delete user
@user_bp.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'}), 204

# Login route to authenticate user
@user_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and user.verify_password(data['password']):
        return jsonify({'message': 'Login successful', 'user': user.to_dict()}), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401

