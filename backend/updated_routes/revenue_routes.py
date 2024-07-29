# routes/revenue_routes.py
from flask import Blueprint, request, jsonify
from updated_models.revenue import Revenue
from app_init import db

revenue_bp = Blueprint('revenue_bp', __name__)

# Get all revenue records
@revenue_bp.route('/revenues', methods=['GET'])
def get_revenues():
    revenues = Revenue.query.all()
    return jsonify([revenue.to_dict() for revenue in revenues])

# Get revenue by ID
@revenue_bp.route('/revenues/<int:id>', methods=['GET'])
def get_revenue_by_id(id):
    revenue = Revenue.query.get_or_404(id)
    return jsonify(revenue.to_dict())

# Create a new revenue record
@revenue_bp.route('/revenues', methods=['POST'])
def create_revenue():
    data = request.get_json()
    new_revenue = Revenue(
        user_id=data['user_id'],
        role=data['role'],
        subscribed=data['subscribed'],
        subscription_plan=data['subscription_plan'],
        start_date=data['start_date'],
        end_date=data.get('end_date'),
        created_at=data['created_at'],
        updated_at=data['updated_at'],
        deleted_at=data.get('deleted_at')
    )
    db.session.add(new_revenue)
    db.session.commit()
    return jsonify(new_revenue.to_dict()), 201

# Update revenue by ID
@revenue_bp.route('/revenues/<int:id>', methods=['PUT'])
def update_revenue(id):
    revenue = Revenue.query.get_or_404(id)
    data = request.get_json()
    revenue.user_id = data.get('user_id', revenue.user_id)
    revenue.role = data.get('role', revenue.role)
    revenue.subscribed = data.get('subscribed', revenue.subscribed)
    revenue.subscription_plan = data.get('subscription_plan', revenue.subscription_plan)
    revenue.start_date = data.get('start_date', revenue.start_date)
    revenue.end_date = data.get('end_date', revenue.end_date)
    revenue.created_at = data.get('created_at', revenue.created_at)
    revenue.updated_at = data.get('updated_at', revenue.updated_at)
    revenue.deleted_at = data.get('deleted_at', revenue.deleted_at)
    db.session.commit()
    return jsonify(revenue.to_dict())

# Delete revenue by ID
@revenue_bp.route('/revenues/<int:id>', methods=['DELETE'])
def delete_revenue(id):
    revenue = Revenue.query.get_or_404(id)
    db.session.delete(revenue)
    db.session.commit()
    return jsonify({'message': 'Revenue record deleted successfully'}), 204
