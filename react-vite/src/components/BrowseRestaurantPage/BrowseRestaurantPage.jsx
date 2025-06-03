import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchRestaurants } from '../../redux/restaurant';
import { Link } from 'react-router-dom';
import "./BrowseRestaurantPage.css";

const RestaurantList = () => {
  const dispatch = useDispatch();

  // 🔧 Pull from allRestaurants in the Redux state
  const restaurants = useSelector(state =>
    Object.values(state.restaurants.allRestaurants || {})
  );

  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    dispatch(thunkFetchRestaurants());
  }, [dispatch]);

  const allCategories = ["All", ...new Set(restaurants.map(r => r.category).filter(Boolean))];

  const filteredRestaurants =
    selectedCategory === "All"
      ? restaurants
      : restaurants.filter(r => r.category === selectedCategory);

  if (!restaurants || restaurants.length === 0) {
    return <div>Loading restaurants...</div>;
  }

  return (
    <div className="restaurant-list-container">
      <h1>All Restaurants</h1>

      {/* Category Filter Bar */}
      <div className="category-bar">
        {allCategories.map(category => (
          <button
            key={category}
            className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="restaurant-grid">
        {filteredRestaurants.map(restaurant => (
          <Link
            key={restaurant.id}
            to={`/restaurants/${restaurant.id}`}
            className="restaurant-card"
          >
            <img
              src={
                restaurant.images?.length > 0
                  ? restaurant.images[0].url
                  : "/default-restaurant.jpg"
              }
              alt={restaurant.name}
              className="restaurant-image"
            />
            <div className="restaurant-info">
              <h2>{restaurant.name}</h2>
              <p className="category">{restaurant.category}</p>
              <p className="address">{restaurant.address}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
    
  );
};



export default RestaurantList;