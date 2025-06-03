from app.models import db, MenuItem, environment, SCHEMA
from sqlalchemy.sql import text

def seed_menu_items():
    # Joël Robuchon Menu Items (French cuisine)
    foie_gras = MenuItem(
        restaurant_id=1,
        name='Foie Gras',
        description='Delicately seared foie gras with fig jam and toast.',
        price=24.99,
        image_url='https://media.istockphoto.com/id/1135913646/photo/times-fat.jpg?s=612x612&w=0&k=20&c=06O_OCZkjuGAjy68Cv2J51SlUED8RaV1ghvPyv3yNq4='
    )
    tasting_menu = MenuItem(
        restaurant_id=1,
        name='Tasting Menu',
        description='A multi-course tasting experience showcasing French culinary artistry.',
        price=99.99,
        image_url=None
    )
    lobster_ravioli = MenuItem(
        restaurant_id=1,
        name='Lobster Ravioli',
        description='Handmade ravioli filled with lobster, served in a rich cream sauce.',
        price=32.99,
        image_url='https://media.istockphoto.com/id/183376269/photo/dinner-of-tasty-lobster-ravioli.jpg?s=612x612&w=0&k=20&c=2Ve4m487oZj1wNZre5L9Okz_oG55P2Tz_rgoh5ZFJ6Y='
    )
    truffle_frites = MenuItem(
        restaurant_id=1,
        name='Truffle Frites',
        description='Crispy fries tossed in truffle oil and parmesan.',
        price=8.50,
        image_url=None
    )

    # Lotus of Siam Menu Items (Thai cuisine)
    pad_thai = MenuItem(
        restaurant_id=2,
        name='Pad Thai',
        description='Classic stir-fried rice noodles with shrimp, peanuts, and tamarind sauce.',
        price=13.50,
        image_url=None
    )
    green_curry = MenuItem(
        restaurant_id=2,
        name='Green Curry',
        description='Spicy coconut-based curry with chicken and vegetables.',
        price=14.75,
        image_url='https://media.istockphoto.com/id/1267610826/photo/famous-internationally-renowned-thai-green-coconut-curry-gaeng-keow-wan-gai-with-chicken-in-a.jpg?s=612x612&w=0&k=20&c=jXhnFi2TPqQKpvuLAPinL5HeuwnINKyS0hIqom46aV4='
    )
    thai_spring_rolls = MenuItem(
        restaurant_id=2,
        name='Thai Spring Rolls',
        description='Crispy spring rolls filled with vegetables and served with sweet chili sauce.',
        price=6.99,
        image_url='https://media.istockphoto.com/id/1025470788/photo/vegan-rice-paper-spring-rolls.jpg?s=612x612&w=0&k=20&c=z17nA_EkrE2fNHXRZetMgfcaJF_4SDRUzbDnL7hnosg='
    )
    mango_sticky_rice = MenuItem(
        restaurant_id=2,
        name='Mango Sticky Rice',
        description='Sweet sticky rice paired with ripe mango and coconut milk.',
        price=7.25,
        image_url=None
    )

    # The Buffet at Wynn Menu Items (Buffet)
    seafood_platter = MenuItem(
        restaurant_id=3,
        name='Seafood Platter',
        description='A selection of shrimp, oysters, and crab legs.',
        price=29.99,
        image_url=None
    )
    prime_rib = MenuItem(
        restaurant_id=3,
        name='Prime Rib',
        description='Slow-roasted prime rib with au jus and horseradish.',
        price=22.50,
        image_url='https://media.istockphoto.com/id/451257829/photo/prime-rib-roast.jpg?s=612x612&w=0&k=20&c=1kxDTqLM85yIhVjK0ozqv-wrMyD9fNiGaA3PHDzigkQ='
    )
    sushi_rolls = MenuItem(
        restaurant_id=3,
        name='Sushi Rolls',
        description='A variety of sushi rolls including tuna, salmon, and crab.',
        price=18.99,
        image_url='https://media.istockphoto.com/id/1286622470/photo/healthy-fresh-sushi-roll-set-with-ginger-close-up-japanese-food.jpg?s=612x612&w=0&k=20&c=rsnH03qtKzT1_qTwkFFAPBXyaG8VkUhbFJ5WCQaxBJE='
    )
    mashed_potatoes = MenuItem(
        restaurant_id=3,
        name='Mashed Potatoes',
        description='Creamy mashed potatoes with garlic and chives.',
        price=5.99,
        image_url=None
    )

    # Carson Kitchen Menu Items (New American)
    fried_chicken = MenuItem(
        restaurant_id=4,
        name='Fried Chicken',
        description='Crispy fried chicken served with honey and hot sauce.',
        price=15.99,
        image_url='https://media.istockphoto.com/id/1826839810/photo/fried-chicken-street-food.jpg?s=612x612&w=0&k=20&c=U-gIBZA6rS0HT5o1pAlTeAk2DL4refdAsED-VL4ATls='
    )
    roasted_vegetables = MenuItem(
        restaurant_id=4,
        name='Roasted Vegetables',
        description='Seasonal vegetables roasted with herbs and olive oil.',
        price=8.50,
        image_url='https://media.istockphoto.com/id/599113320/photo/grilled-vegetables.jpg?s=612x612&w=0&k=20&c=cBC42m6GBr5RmQ-018zPUtadlx73WTJHPWL5ur_KIjA='
    )
    short_ribs = MenuItem(
        restaurant_id=4,
        name='Short Ribs',
        description='Slow-braised short ribs with a rich red wine sauce.',
        price=22.50,
        image_url=None
    )
    sweet_potato_fries = MenuItem(
        restaurant_id=4,
        name='Sweet Potato Fries',
        description='Crispy sweet potato fries served with garlic aioli.',
        price=6.99,
        image_url=None
    )

    # Momofuku Menu Items (Asian Fusion)
    pork_belly_bao = MenuItem(
        restaurant_id=5,
        name='Pork Belly Bao',
        description='Soft steamed buns with tender pork belly, hoisin sauce, and cucumber.',
        price=9.75,
        image_url='https://media.istockphoto.com/id/1305964473/photo/pork-belly-bun-sandwich.jpg?s=612x612&w=0&k=20&c=1gTbMQWVKuZUwHXfnz0Q68ZDFVmovQzm9ZillULXzAs='
    )
    ramen = MenuItem(
        restaurant_id=5,
        name='Ramen',
        description='Rich and flavorful ramen broth with noodles, egg, and pork belly.',
        price=12.50,
        image_url='https://media.istockphoto.com/id/1406672650/photo/japanese-tonkotsu-ramen.jpg?s=612x612&w=0&k=20&c=XfwavYs_chHo-S-M7IWoK7IxEXzYxd3dFyihnvC_zkI='
    )
    spicy_tofu = MenuItem(
        restaurant_id=5,
        name='Spicy Tofu',
        description='Crispy tofu served in a spicy sauce with cilantro.',
        price=10.99,
        image_url=None
    )
    kimchi = MenuItem(
        restaurant_id=5,
        name='Kimchi',
        description='Fermented vegetables, mainly cabbage and radishes, with chili paste.',
        price=4.50,
        image_url=None
    )

    # In-N-Out Burger Menu Items (Fast Food)
    double_double = MenuItem(
        restaurant_id=6,
        name='Double-Double Burger',
        description='Two beef patties with American cheese, lettuce, tomato, and In-N-Out sauce.',
        price=7.50,
        image_url='https://media.istockphoto.com/id/139975625/photo/close-up-of-a-double-bacon-cheeseburger.jpg?s=612x612&w=0&k=20&c=gobNDqaenVIpRAvxguJ00mqHGPz3XrW673HI6HjGHg4='
    )
    animal_fries = MenuItem(
        restaurant_id=6,
        name='Animal Fries',
        description='Fries topped with melted cheese, grilled onions, and secret sauce.',
        price=4.95,
        image_url=None
    )
    milkshake_vanilla = MenuItem(
        restaurant_id=6,
        name='Vanilla Milkshake',
        description='Rich and creamy vanilla milkshake made with real ice cream.',
        price=5.00,
        image_url='https://media.istockphoto.com/id/1663262604/photo/vanilla-milkshake-with-cream-served-in-glass-isolated-on-table-top-view-healthy-morning-drink.jpg?s=612x612&w=0&k=20&c=jjAhxNZMRZE7XBePb3mEBggc-VPplHrK5QUblc_OKB8='
    )
    cheeseburger = MenuItem(
        restaurant_id=6,
        name='Cheeseburger',
        description='Single beef patty with cheese, lettuce, tomato, and special sauce.',
        price=5.25,
        image_url=None
    )

    # Eataly Menu Items (Italian Marketplace)
    margherita_pizza = MenuItem(
        restaurant_id=7,
        name='Margherita Pizza',
        description='Classic pizza with tomato, mozzarella, and fresh basil.',
        price=12.99,
        image_url='https://media.istockphoto.com/id/1438618008/photo/top-view-of-a-pizza-margherita-on-a-table.jpg?s=612x612&w=0&k=20&c=W1s4eLCjH8svi22gTQBrll31GcUPmrru8z7ZCVD0bKo='
    )
    tagliatelle_bolognese = MenuItem(
        restaurant_id=7,
        name='Tagliatelle Bolognese',
        description='Homemade pasta with rich meat sauce.',
        price=15.50,
        image_url=None
    )
    tiramisu = MenuItem(
        restaurant_id=7,
        name='Tiramisu',
        description='Classic Italian dessert with layers of coffee-soaked sponge and mascarpone.',
        price=7.99,
        image_url='https://media.istockphoto.com/id/1248489319/photo/tiramisu-cake-with-mint.jpg?s=612x612&w=0&k=20&c=bE6ntOpTO7S8T_Rr39cnNkV_252VUB8-vymkN9WsQRQ='
    )
    bruschetta = MenuItem(
        restaurant_id=7,
        name='Bruschetta',
        description='Toasted bread topped with tomatoes, basil, and olive oil.',
        price=6.50,
        image_url=None
    )

    # Add all items to the session
    db.session.add_all([
        foie_gras, tasting_menu, lobster_ravioli, truffle_frites,
        pad_thai, green_curry, thai_spring_rolls, mango_sticky_rice,
        seafood_platter, prime_rib, sushi_rolls, mashed_potatoes,
        fried_chicken, roasted_vegetables, short_ribs, sweet_potato_fries,
        pork_belly_bao, ramen, spicy_tofu, kimchi,
        double_double, animal_fries, milkshake_vanilla, cheeseburger,
        margherita_pizza, tagliatelle_bolognese, tiramisu, bruschetta
    ])
    db.session.commit()

def undo_menu_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.menu_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM menu_items"))

    db.session.commit()