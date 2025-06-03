import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { thunkFetchRestaurants } from '../../redux/restaurant';
import './BrowseRestaurantPage.css'; 
const SearchResultsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkFetchRestaurants());
  }, [dispatch]);

  const restaurants = useSelector((state) =>
    Object.values(state.restaurants.allRestaurants || {})
  );

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('query')?.toLowerCase();


  const wordMatches = (text) => {
    if (!text) return false;
    return text
      .toLowerCase()
      .split(/\s+/) // split into words
      .some(word => word === searchTerm);
  };
  
  const filteredRestaurants =
    restaurants.filter((restaurant) => {
      const nameMatch = wordMatches(restaurant.name);
      const categoryMatch = wordMatches(restaurant.category);
      const menuMatch = restaurant.menuItems?.some(item => wordMatches(item.name));
      return nameMatch || categoryMatch || menuMatch;
    });

 

  if (filteredRestaurants.length === 0) {
    return <div className="restaurant-list-noresult">{`No results found for "${searchTerm}"`}</div>;
  }

  return (
    <div className="restaurant-list-container">
      <h1>{`Search Results for "${searchTerm}"`}</h1>
      <div className="restaurant-grid">
        {filteredRestaurants.map((restaurant) => (
          <Link
            key={restaurant.id}
            to={`/restaurants/${restaurant.id}`}
            className="restaurant-card"
          >
            <img
              src={
                restaurant.images?.length > 0
                  ? restaurant.images[0].url
                  : '/default-restaurant.jpg'
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

export default SearchResultsPage;