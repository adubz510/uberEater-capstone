from app.models import db, CartItem, environment, SCHEMA
from sqlalchemy.sql import text


def seed_cart_items():
    # Demo User → Restaurant 1
    item1 = CartItem(cart_id=1, menu_item_id=1, quantity=2)
    item2 = CartItem(cart_id=1, menu_item_id=3, quantity=1)

    # Marnie → Restaurant 2
    item3 = CartItem(cart_id=2, menu_item_id=6, quantity=2)
    item4 = CartItem(cart_id=2, menu_item_id=8, quantity=1)

    # Bobbie → Restaurant 3
    item5 = CartItem(cart_id=3, menu_item_id=11, quantity=3)
    item6 = CartItem(cart_id=3, menu_item_id=12, quantity=1)

    # Tommy → Restaurant 4
    item7 = CartItem(cart_id=4, menu_item_id=15, quantity=1)
    item8 = CartItem(cart_id=4, menu_item_id=17, quantity=2)

    # Sammy → Restaurant 5
    item9 = CartItem(cart_id=5, menu_item_id=18, quantity=2)
    item10 = CartItem(cart_id=5, menu_item_id=20, quantity=1)

    db.session.add_all([
        item1, item2,
        item3, item4,
        item5, item6,
        item7, item8,
        item9, item10
    ])
    db.session.commit()


def undo_cart_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cart_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cart_items"))

    db.session.commit()