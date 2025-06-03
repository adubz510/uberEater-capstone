from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text

def seed_images():
    img1 = Image(
        url='https://images.unsplash.com/photo-1600891964599-f61ba0e24092',  # French fine dining
        restaurant_id=1,
        user_id=1
    )

    img2 = Image(
        url='https://images.unsplash.com/photo-1627308595229-7830a5c91f9f',  # Thai food
        restaurant_id=2,
        user_id=1
    )

    img3 = Image(
        url='https://media.istockphoto.com/id/637765812/photo/cuisine-culinary-buffet-dinner-catering-dining-food-celebration.jpg?s=612x612&w=0&k=20&c=7l_HRkrBJ6ewkfYx1rQtNbDDWcf4V8dyo1GbiHmWGYs=',
        restaurant_id=3,
        user_id=2
    )

    img4 = Image(
        url='https://images.unsplash.com/photo-1525610553991-2bede1a236e2',  # American cuisine
        restaurant_id=4,
        user_id=2
    )

    img5 = Image(
        url='https://images.unsplash.com/photo-1553621042-f6e147245754',  # Asian fusion
        restaurant_id=5,
        user_id=3
    )

    img6 = Image(
        url='https://images.unsplash.com/photo-1586190848861-99aa4a171e90',  # Fast food
        restaurant_id=6,
        user_id=4
    )

    img7 = Image(
        url='https://images.unsplash.com/photo-1550547660-d9450f859349',  # Italian market
        restaurant_id=7,
        user_id=5
    )

    db.session.add_all([img1, img2, img3, img4, img5, img6, img7])
    db.session.commit()


def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()