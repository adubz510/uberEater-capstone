from app.models import db, Cart, environment, SCHEMA
from sqlalchemy.sql import text


def seed_carts():
    """
    Seeds one cart per user, each associated with a different restaurant.
    Assumes users with IDs 1–5 and restaurants with IDs 1–5 exist.
    """
    carts = [
        Cart(user_id=1, restaurant_id=1),  # Demo
        Cart(user_id=2, restaurant_id=2),  # Marnie
        Cart(user_id=3, restaurant_id=3),  # Bobbie
        Cart(user_id=4, restaurant_id=4),  # Tommy
        Cart(user_id=5, restaurant_id=5),  # Sammy
    ]

    db.session.add_all(carts)
    db.session.commit()


def undo_carts():
    """
    Deletes all carts from the database.
    Uses TRUNCATE in production to reset identity and cascade deletes.
    """
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM carts"))

    db.session.commit()
