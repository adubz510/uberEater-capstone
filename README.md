# UBEREATS

## Live Site
https://python-eatery-project.onrender.com

## Backend Repository
[_This repository includes both frontend and backend code._](https://github.com/adubz510/uberEater-capstone.git)

## 🗃 Database Schema

- User: id, username, email, hashed_password
- Restaurant: id, owner_id, name, description, category, price_range, address, city, state, zip_code, lat, lng
- Image: id, restaurant_id, user_id, url
- MenuItem: id, restaurant_id, name, description, price, image_url
- Review: id, restaurant_id, user_id, rating, comment, created_at, updated_at

![Database Schema Diagram](https://res.cloudinary.com/drasm4tug/image/upload/v1747503624/Screenshot_2025-05-16_at_2.50.49_PM_t9oxpf.png)



## Summary

This is a full-stack clone of UberEats, a food delivery and restaurant ordering platform. The project allows users to browse restaurants, view detailed menus, add items to a shopping cart, and place orders. Core features include user authentication, restaurant and menu item CRUD functionality, real-time cart management, and a responsive search system. Users can also leave reviews for restaurants, view past orders, and quickly reorder from previous purchases. 

## 🖼 Screenshots

| Feature | Screenshot |
|--------|------------|
| Signup Page | ![Signup Page](https://res.cloudinary.com/drasm4tug/image/upload/v1747591274/Screenshot_2025-05-16_at_2.52.57_PM_jd8cl2.png) |
| Login Page | ![Login Page](https://res.cloudinary.com/drasm4tug/image/upload/v1747591283/Screenshot_2025-05-16_at_2.57.20_PM_pgaxb6.png) |
| Logged Out Homepage | ![Logged Out Homepage](https://res.cloudinary.com/drasm4tug/image/upload/v1747591299/Screenshot_2025-05-16_at_2.51.29_PM_e0ooyp.png) |
| Logged In Homepage | ![Logged In Homepage](https://res.cloudinary.com/drasm4tug/image/upload/v1747591292/Screenshot_2025-05-16_at_2.58.18_PM_xzhkcf.png) |
| Browse Restaurant Page | ![Browse Restaurant Page](https://res.cloudinary.com/drasm4tug/image/upload/v1747591303/Screenshot_2025-05-16_at_2.58.29_PM_xypwox.png) |
| Search Restaurant Page | ![Search Restaurant Page](https://res.cloudinary.com/drasm4tug/image/upload/v1747591312/Screenshot_2025-05-16_at_2.58.37_PM_o9vwaq.png) |
| User Account Page | ![User Account Page](https://res.cloudinary.com/drasm4tug/image/upload/v1747591321/Screenshot_2025-05-16_at_2.58.45_PM_ujog2j.png) |
| Restaurant Details Page | ![Restaurant Details Page](https://res.cloudinary.com/drasm4tug/image/upload/v1747591351/Screenshot_2025-05-16_at_2.59.10_PM_xux2j8.png) |
| Restaurant Details Page cont'd | ![Restaurant Details Page cont'd](https://res.cloudinary.com/drasm4tug/image/upload/v1747591355/Screenshot_2025-05-16_at_2.59.16_PM_jyfv8e.png) |

---



## 🔧 Features
### User Authentication
- Signup, login, and logout functionality
- Demo user login for quick access
- Protected routes based on user session

### 🍽️ Restaurants
- Full CRUD (Create, Read, Update, Delete) for restaurant listings
- Each restaurant includes name, description, category, address, and price range

### 📋 Menus
- Restaurants have associated menu items
- Full CRUD for menu items (e.g., dish name, description, price, image)
- Menu items displayed on individual restaurant pages

### ⭐ Reviews
- Logged-in users can leave, edit, and delete reviews for restaurants
- Reviews include star rating and written feedback
- Average star ratings displayed per restaurant


### 🔍 Search
- Search bar with keyword matching for restaurant names and categories
- Results displayed in a clean, responsive layout

### 📱 Modals
- ustom modals for login, signup, and adding/editing content
- Seamless user experience without full-page reloads

### 🌐 Responsive Design
- Styled with a modern, clean layout using CSS and component-based design


## 📂 API Routes

### Auth
- `GET /api/auth/` — restore session
- `POST /api/auth/login` — login
- `POST /api/auth/signup` — signup
- `POST /api/auth/logout` — logout

### 👤 User Routes
- `GET /api/users/` — get all users (login required)
- `GET /api/users/<id>` — get a specific user by ID (login required)

### 🍽️ Restaurant Routes
- `GET /api/restaurants/` — get all restaurants
- `GET /api/restaurants/<restaurant_id> `— get a single restaurant by ID
- `GET /api/restaurants/my-restaurants` — get all restaurants owned by the current user (login required)
- `POST /api/restaurants/` — create a new restaurant (login required)
- `PUT /api/restaurants/<restaurant_id>` — update an existing restaurant (login required & must be owner)
- `DELETE /api/restaurants/<restaurant_id>` — delete a restaurant (login required & must be owner)

### 🍽️ Menu Item Routes
- `GET /api/menu_items/restaurant/<restaurant_id>` — get all menu items for a specific restaurant
- `POST /api/menu_items/restaurant/<restaurant_id>` — create a new menu item for a specific restaurant
- `PATCH /api/menu_items/<menu_item_id>` — update a specific menu item
- `DELETE /api/menu_items/<menu_item_id>` — delete a specific menu item

### 📝 Review Routes
- `GET /api/reviews/restaurant/<restaurant_id>` — get all reviews for a restaurant
- `POST /api/reviews/restaurant/<restaurant_id> `— create a new review for a restaurant (login required)
- `PATCH /api/reviews/<review_id>` — update a review (login required & must be the review author)
- `DELETE /api/reviews/<review_id>` — delete a review (login required & must be the review author)

### 🗃 Database Schema
- User: id, username, email, hashed_password
- Restaurant: id, owner_id, name, description, category, price_range, address, city, state, zip_code, lat, lng
- Image: id, url, restaurant_id, user_id
- MenuItem: id, restaurant_id, name, description, price, image_url
- Review: id, restaurant_id, user_id, rating, comment, created_at, updated_at





## 🛠 Installation & Setup

1. Clone the repository:
```bash
git clone <repo-url>
cd capstone-yelpproj
```

2. Backend setup:
```bash
pipenv install
pipenv shell
flask db upgrade
flask seed all
flask run
```

3. Frontend setup:
```bash
cd react-vite
npm install
npm run build
```

