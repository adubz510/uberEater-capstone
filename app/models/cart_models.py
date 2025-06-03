from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("restaurants.id")), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    user = db.relationship("User", back_populates="carts")
    restaurant = db.relationship("Restaurant", back_populates="carts")
    cart_items = db.relationship("CartItem", back_populates="cart", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'restaurantId': self.restaurant_id,
            'createdAt': self.created_at,
            'restaurant': self.restaurant.to_dict(),
            'cartItems': [item.to_dict() for item in self.cart_items]
        }

class CartItem(db.Model):
    __tablename__ = 'cart_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("carts.id")), nullable=False)
    menu_item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("menu_items.id")), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    cart = db.relationship("Cart", back_populates="cart_items")
    menu_item = db.relationship("MenuItem", back_populates="cart_items")

    def to_dict(self):
        return {
            'id': self.id,
            'menuItemId': self.menu_item_id,
            'cartId': self.cart_id,
            'quantity': self.quantity,
            'createdAt': self.created_at,
            'menuItem': self.menu_item.to_dict()
        }