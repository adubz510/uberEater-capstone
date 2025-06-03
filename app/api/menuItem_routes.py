from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, MenuItem, Restaurant

menu_item_routes = Blueprint('menu_items', __name__)

# GET: Get all menu items for a restaurant
@menu_item_routes.route('/restaurant/<int:restaurant_id>', methods=['GET'])
def get_menu_items_for_restaurant(restaurant_id):
    restaurant = Restaurant.query.get(restaurant_id)
    if not restaurant:
        return jsonify({'error': 'Restaurant not found'}), 404

    menu_items = MenuItem.query.filter_by(restaurant_id=restaurant.id).all()
    return jsonify([menu_item.to_dict() for menu_item in menu_items])

# POST: Add a menu item to a restaurant
@menu_item_routes.route('/restaurant/<int:restaurant_id>', methods=['POST'])
@login_required
def create_menu_item(restaurant_id):
    restaurant = Restaurant.query.get(restaurant_id)
    if not restaurant:
        return jsonify({'error': 'Restaurant not found'}), 404

    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    price = data.get('price')
    image_url = data.get('image_url')

    errors = []

    if not name or len(name.strip()) < 3:
        errors.append('Name must be at least 3 characters long.')

    if not description or len(description.strip()) < 5:
        errors.append('Description must be at least 5 characters long.')

    if not isinstance(price, (int, float)) or price <= 0:
        errors.append('Price must be a positive number.')

    if errors:
        return jsonify({'errors': errors}), 400

    new_menu_item = MenuItem(
        restaurant_id=restaurant.id,
        name=name.strip(),
        description=description.strip(),
        price=price,
        image_url=image_url
    )

    db.session.add(new_menu_item)
    db.session.commit()

    return jsonify(new_menu_item.to_dict()), 201

# PATCH: Update a menu item
@menu_item_routes.route('/<int:menu_item_id>', methods=['PATCH'])
@login_required
def update_menu_item(menu_item_id):
    menu_item = MenuItem.query.get(menu_item_id)

    if not menu_item:
        return jsonify({'error': 'Menu item not found'}), 404

    restaurant = Restaurant.query.get(menu_item.restaurant_id)
    if not restaurant:
        return jsonify({'error': 'Restaurant not found'}), 404

    data = request.get_json()
    name = data.get('name', menu_item.name)
    description = data.get('description', menu_item.description)
    price = data.get('price', menu_item.price)
    image_url = data.get('image_url', menu_item.image_url)

    menu_item.name = name.strip()
    menu_item.description = description.strip()
    menu_item.price = price
    menu_item.image_url = image_url

    db.session.commit()

    return jsonify(menu_item.to_dict())

# DELETE: Delete a menu item
@menu_item_routes.route('/<int:menu_item_id>', methods=['DELETE'])
@login_required
def delete_menu_item(menu_item_id):
    menu_item = MenuItem.query.get(menu_item_id)

    if not menu_item:
        return jsonify({'error': 'Menu item not found'}), 404
    
    db.session.delete(menu_item)
    db.session.commit()

    return jsonify({'message': 'Menu item deleted successfully'}), 200