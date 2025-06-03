from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Cart, CartItem

cart_routes = Blueprint('cart', __name__)

@cart_routes.route('/', methods=['GET'])
@login_required
def get_user_carts():
    # Get all carts for current user (one cart per restaurant)
    user_carts = Cart.query.filter_by(user_id=current_user.id).all()
    return jsonify([cart.to_dict() for cart in user_carts])

@cart_routes.route('/items', methods=['POST'])
@login_required
def add_to_cart():
    data = request.json
    menu_item_id = data.get('menuItemId')
    quantity = data.get('quantity', 1)
    restaurant_id = data.get('restaurantId')

    if not menu_item_id or not restaurant_id:
        return jsonify({"error": "Missing menuItemId or restaurantId"}), 400

    # Find or create a cart for the user and restaurant
    cart = Cart.query.filter_by(user_id=current_user.id, restaurant_id=restaurant_id).first()
    if not cart:
        cart = Cart(user_id=current_user.id, restaurant_id=restaurant_id)
        db.session.add(cart)
        db.session.flush()  # flush to get cart.id

    # Check if the item already exists in the cart
    cart_item = CartItem.query.filter_by(cart_id=cart.id, menu_item_id=menu_item_id).first()
    if cart_item:
        cart_item.quantity += quantity
    else:
        cart_item = CartItem(cart_id=cart.id, menu_item_id=menu_item_id, quantity=quantity)
        db.session.add(cart_item)

    db.session.commit()

    return jsonify(cart.to_dict())

@cart_routes.route('/items/<int:cart_item_id>', methods=['PUT'])
@login_required
def update_cart_item(cart_item_id):
    data = request.json
    new_quantity = data.get('quantity')

    if new_quantity is None or not isinstance(new_quantity, int) or new_quantity < 1:
        return jsonify({"error": "Quantity must be a positive integer"}), 400

    cart_item = CartItem.query.get(cart_item_id)
    if not cart_item or cart_item.cart.user_id != current_user.id:
        return jsonify({"error": "Cart item not found or unauthorized"}), 404

    cart_item.quantity = new_quantity
    db.session.commit()

    return jsonify(cart_item.to_dict())


@cart_routes.route('/items/<int:cart_item_id>', methods=['DELETE'])
@login_required
def remove_from_cart(cart_item_id):
    cart_item = CartItem.query.get(cart_item_id)
    if not cart_item or cart_item.cart.user_id != current_user.id:
        return jsonify({"error": "Cart item not found or unauthorized"}), 404

    db.session.delete(cart_item)
    db.session.commit()
    return jsonify({"message": "Item removed successfully"})