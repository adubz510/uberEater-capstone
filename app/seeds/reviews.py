from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_reviews():
    # Restaurant 1: Joël Robuchon (Luxurious French cuisine)
    review_1 = Review(
        restaurant_id=1,
        user_id=2,
        rating=5,
        comment='A truly exquisite dining experience! The tasting menu was a work of art.',
        created_at=datetime.now()
    )

    review_2 = Review(
        restaurant_id=1,
        user_id=3,
        rating=4,
        comment='Delicious French cuisine in a classy setting. The service was impeccable.',
        created_at=datetime.now()
    )

    review_3 = Review(
        restaurant_id=1,
        user_id=4,
        rating=5,
        comment='The perfect place for a special occasion. Every dish was perfectly executed.',
        created_at=datetime.now()
    )

    # Restaurant 2: Lotus of Siam (Classic Thai dishes)
    review_4 = Review(
        restaurant_id=2,
        user_id=3,
        rating=5,
        comment='Hands down the best Thai food I’ve had outside of Thailand! Highly recommend the pad thai.',
        created_at=datetime.now()
    )

    review_5 = Review(
        restaurant_id=2,
        user_id=4,
        rating=4,
        comment='Great atmosphere and the curries are fantastic. Definitely a family-friendly spot.',
        created_at=datetime.now()
    )

    review_6 = Review(
        restaurant_id=2,
        user_id=5,
        rating=5,
        comment='The best Thai food in Vegas. Fresh ingredients and a vibrant atmosphere.',
        created_at=datetime.now()
    )

    # Restaurant 3: The Buffet at Wynn (Lavish buffet)
    review_7 = Review(
        restaurant_id=3,
        user_id=1,
        rating=4,
        comment='A luxurious buffet with a variety of international dishes. Worth the price if you’re really hungry.',
        created_at=datetime.now()
    )

    review_8 = Review(
        restaurant_id=3,
        user_id=4,
        rating=3,
        comment='A bit overwhelming with so many options, but the quality of food is great.',
        created_at=datetime.now()
    )

    review_9 = Review(
        restaurant_id=3,
        user_id=5,
        rating=5,
        comment='Great selection of fresh seafood and desserts. A must-try if you love buffets!',
        created_at=datetime.now()
    )

    # Restaurant 4: Carson Kitchen (New American fare)
    review_10 = Review(
        restaurant_id=4,
        user_id=1,
        rating=5,
        comment='Innovative and delicious American fare with a twist. The fried chicken was amazing.',
        created_at=datetime.now()
    )

    review_11 = Review(
        restaurant_id=4,
        user_id=3,
        rating=4,
        comment='Trendy and modern. Loved the cocktails and the fresh takes on comfort food.',
        created_at=datetime.now()
    )

    review_12 = Review(
        restaurant_id=4,
        user_id=5,
        rating=4,
        comment='Great spot for a casual dinner. The flavors are bold and unique!',
        created_at=datetime.now()
    )

    # Restaurant 5: Momofuku (Asian-inspired cuisine)
    review_13 = Review(
        restaurant_id=5,
        user_id=1,
        rating=5,
        comment='A fantastic fusion of flavors! The ramen and pork buns are out of this world.',
        created_at=datetime.now()
    )

    review_14 = Review(
        restaurant_id=5,
        user_id=2,
        rating=4,
        comment='Creative and bold Asian-inspired dishes. A must-try for foodies looking for something different.',
        created_at=datetime.now()
    )

    review_15 = Review(
        restaurant_id=5,
        user_id=4,
        rating=4,
        comment='Great fusion of flavors with an upscale ambiance. I would definitely return.',
        created_at=datetime.now()
    )

    # Restaurant 6: In-N-Out Burger (Fast Food)
    review_16 = Review(
        restaurant_id=6,
        user_id=1,
        rating=3,
        comment='Good fast food, but it’s nothing extraordinary. Burgers are solid though.',
        created_at=datetime.now()
    )

    review_17 = Review(
        restaurant_id=6,
        user_id=2,
        rating=4,
        comment='A reliable spot for fast food! The fries are crispy and the burgers are tasty.',
        created_at=datetime.now()
    )

    review_18 = Review(
        restaurant_id=6,
        user_id=3,
        rating=5,
        comment='In-N-Out never disappoints! Great quality for fast food, and I love the secret menu.',
        created_at=datetime.now()
    )

    # Restaurant 7: Eataly (Italian marketplace)
    review_19 = Review(
        restaurant_id=7,
        user_id=1,
        rating=5,
        comment='A paradise for Italian food lovers! Loved the variety of fresh pasta and pizzas.',
        created_at=datetime.now()
    )

    review_20 = Review(
        restaurant_id=7,
        user_id=2,
        rating=4,
        comment='Great atmosphere and the food counters are a fun experience. Highly recommend the gelato.',
        created_at=datetime.now()
    )

    review_21 = Review(
        restaurant_id=7,
        user_id=3,
        rating=4,
        comment='A wonderful marketplace with a wide variety of Italian food. The pizza and pastries were amazing.',
        created_at=datetime.now()
    )

    db.session.add_all([
        review_1, review_2, review_3,
        review_4, review_5, review_6,
        review_7, review_8, review_9,
        review_10, review_11, review_12,
        review_13, review_14, review_15,
        review_16, review_17, review_18,
        review_19, review_20, review_21
    ])
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
    db.session.commit()