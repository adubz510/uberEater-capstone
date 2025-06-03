from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Review, Restaurant

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/restaurant/<int:restaurant_id>', methods=['GET'])
def get_reviews_for_restaurant(restaurant_id):
    reviews = Review.query.filter_by(restaurant_id=restaurant_id).all()
    return jsonify([review.to_dict() for review in reviews])

@review_routes.route('/restaurant/<int:restaurant_id>', methods=['POST'])
@login_required
def create_review(restaurant_id):
    data = request.get_json()
    rating = data.get('rating')
    comment = data.get('comment')
    errors = []

    if not rating or not isinstance(rating, int) or rating < 1 or rating > 5:
        errors.append('Rating must be an integer between 1 and 5.')

    if not comment or len(comment.strip()) < 5:
        errors.append('Comment must be at least 5 characters long.')

    if errors:
        return jsonify({'errors': errors}), 400

    # Check if user already has a review for this restaurant
    existing_review = Review.query.filter_by(user_id=current_user.id, restaurant_id=restaurant_id).first()
    if existing_review:
        return jsonify({'message': 'You have already reviewed this restaurant.'}), 400

    new_review = Review(
        restaurant_id=restaurant_id,
        user_id=current_user.id,
        rating=rating,
        comment=comment.strip()
    )

    db.session.add(new_review)
    db.session.commit()

    return new_review.to_dict(), 201

@review_routes.route('/<int:review_id>', methods=['PATCH'])
@login_required
def update_review(review_id):
    review = Review.query.get(review_id)

    if not review:
        return jsonify({'message': 'Review not found'}), 404

    if review.user_id != current_user.id:
        return jsonify({'message': 'Unauthorized'}), 403

    data = request.get_json()
    rating = data.get('rating')
    comment = data.get('comment')
    errors = []

    if rating is not None:
        try:
            rating = int(rating)
            if rating < 1 or rating > 5:
                errors.append('Rating must be between 1 and 5.')
            else:
                review.rating = rating
        except ValueError:
            errors.append('Rating must be a number.')

    if comment is not None:
        if len(comment.strip()) < 5:
            errors.append('Comment must be at least 5 characters long.')
        else:
            review.comment = comment.strip()

    if errors:
        return jsonify({'errors': errors}), 400

    db.session.commit()
    return review.to_dict()

@review_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    review = Review.query.get(review_id)

    if not review:
        return jsonify({'message': 'Review not found'}), 404

    if review.user_id != current_user.id:
        return jsonify({'message': 'Unauthorized'}), 403

    db.session.delete(review)
    db.session.commit()
    return jsonify({'message': 'Review deleted successfully'})