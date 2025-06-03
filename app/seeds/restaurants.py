from app.models import db, Restaurant, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_restaurants():
    restaurant_1 = Restaurant(
        owner_id=1,
        name='Joël Robuchon',
        description='Luxurious French cuisine offering tasting menus in a sophisticated setting.',
        category='French',
        price_range='$$$$',
        address='3799 S Las Vegas Blvd',
        city='Las Vegas',
        state='NV',
        zip_code='89109',
        lat=36.1057,
        lng=-115.1750
    )

    restaurant_2 = Restaurant(
        owner_id=1,
        name='Lotus of Siam',
        description='Serving up classic Thai dishes in a relaxed, family-friendly space.',
        category='Thai',
        price_range='$$$',
        address='953 E Sahara Ave #16',
        city='Las Vegas',
        state='NV',
        zip_code='89104',
        lat=36.1472,
        lng=-115.1483
    )

    restaurant_3 = Restaurant(
        owner_id=2,
        name='The Buffet at Wynn',
        description='Lavish buffet offering a wide selection of international dishes.',
        category='Buffet',
        price_range='$$$',
        address='3131 S Las Vegas Blvd',
        city='Las Vegas',
        state='NV',
        zip_code='89109',
        lat=36.1184,
        lng=-115.1658
    )

    restaurant_4 = Restaurant(
        owner_id=2,
        name='Carson Kitchen',
        description='Inventive New American fare in a trendy setting.',
        category='American',
        price_range='$$',
        address='124 S 6th St',
        city='Las Vegas',
        state='NV',
        zip_code='89101',
        lat=36.1654,
        lng=-115.1473
    )

    restaurant_5 = Restaurant(
        owner_id=3,
        name='Momofuku',
        description='Creative Asian-inspired cuisine in an upscale, modern environment.',
        category='Asian Fusion',
        price_range='$$$',
        address='3708 S Las Vegas Blvd',
        city='Las Vegas',
        state='NV',
        zip_code='89109',
        lat=36.0990,
        lng=-115.1748
    )

    restaurant_6 = Restaurant(
        owner_id=4,
        name='In-N-Out Burger',
        description='Popular fast-food chain serving burgers, fries, and shakes.',
        category='Fast Food',
        price_range='$',
        address='3545 S Las Vegas Blvd',
        city='Las Vegas',
        state='NV',
        zip_code='89109',
        lat=36.1010,
        lng=-115.1715
    )

    restaurant_7 = Restaurant(
        owner_id=5,
        name='Eataly',
        description='An Italian marketplace featuring a variety of restaurants, cafes, and food counters.',
        category='Italian',
        price_range='$$',
        address='3770 S Las Vegas Blvd',
        city='Las Vegas',
        state='NV',
        zip_code='89109',
        lat=36.1053,
        lng=-115.1706
    )

    db.session.add(restaurant_1)
    db.session.add(restaurant_2)
    db.session.add(restaurant_3)
    db.session.add(restaurant_4)
    db.session.add(restaurant_5)
    db.session.add(restaurant_6)
    db.session.add(restaurant_7)
    db.session.commit()


def undo_restaurants():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.restaurants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM restaurants"))

    db.session.commit()