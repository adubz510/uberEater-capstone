from .db import db, environment, SCHEMA, add_prefix_for_prod

class MenuItem(db.Model):
    __tablename__ = 'menu_items'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("restaurants.id")), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String, nullable=True)

    restaurant = db.relationship("Restaurant", back_populates="menu_items")
    cart_items = db.relationship('CartItem', back_populates='menu_item', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'restaurantId': self.restaurant_id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'imageUrl': self.image_url
        }