from app.models import db, Cart, CartItem, environment, SCHEMA
from sqlalchemy.sql import text

def seed_carts_and_cart_items():
    cart1 = Cart(user_id=1, restaurant_id=1)  
    cart2 = Cart(user_id=2, restaurant_id=2)  
    cart3 = Cart(user_id=3, restaurant_id=6) 

    db.session.add_all([cart1, cart2, cart3])
    db.session.flush() 

    # === Cart 1 (restaurant_id=1) ===
    cart1_item1 = CartItem(cart_id=cart1.id, menu_item_id=1, quantity=1)  # Foie Gras
    cart1_item2 = CartItem(cart_id=cart1.id, menu_item_id=3, quantity=2)  # Lobster Ravioli

    # === Cart 2 (restaurant_id=2) ===
    cart2_item1 = CartItem(cart_id=cart2.id, menu_item_id=5, quantity=1)  # Pad Thai
    cart2_item2 = CartItem(cart_id=cart2.id, menu_item_id=6, quantity=1)  # Green Curry

    # === Cart 3 (restaurant_id=6) ===
    cart3_item1 = CartItem(cart_id=cart3.id, menu_item_id=26, quantity=2)  # Double-Double
    cart3_item2 = CartItem(cart_id=cart3.id, menu_item_id=28, quantity=1)  # Vanilla Milkshake

    db.session.add_all([
        cart1_item1, cart1_item2,
        cart2_item1, cart2_item2,
        cart3_item1, cart3_item2
    ])
    db.session.commit()

def undo_carts_and_cart_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cart_items RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cart_items"))
        db.session.execute(text("DELETE FROM carts"))

    db.session.commit()
