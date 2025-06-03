from .db import db, environment, SCHEMA, add_prefix_for_prod

class Restaurant(db.Model):
    __tablename__ = 'restaurants'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(50), nullable=False)  
    price_range = db.Column(db.String(10))  
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    zip_code = db.Column(db.String(10), nullable=False)
    lat = db.Column(db.Float)
    lng = db.Column(db.Float)

    owner = db.relationship("User", back_populates="restaurants")
    reviews = db.relationship("Review", back_populates="restaurant", cascade="all, delete-orphan")
    images = db.relationship("Image", back_populates="restaurant", cascade="all, delete-orphan")
    menu_items = db.relationship("MenuItem", back_populates="restaurant", cascade="all, delete-orphan")
    carts = db.relationship("Cart", back_populates="restaurant", cascade="all, delete-orphan")

    def to_dict(self):
        return {
        'id': self.id,
        'ownerId': self.owner_id,
        'name': self.name,
        'description': self.description,
        'category': self.category,
        'priceRange': self.price_range,
        'address': self.address,
        'city': self.city,
        'state': self.state,
        'zipCode': self.zip_code,
        'lat': self.lat,
        'lng': self.lng,
        'images': [image.to_dict() for image in self.images],
        'menuItems': [item.to_dict() for item in self.menu_items],
        'reviews': [review.to_dict() for review in self.reviews]
    }