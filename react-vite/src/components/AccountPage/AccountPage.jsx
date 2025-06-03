import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useNavigate } from 'react-router-dom';
import CreateRestaurantModal from './CreateRestaurantModal';
import UpdateRestaurantModal from './UpdateRestaurantModal';
import DeleteRestaurantModal from './DeleteRestaurantModal';
import { thunkFetchUserRestaurants } from '../../redux/restaurant';
import "./AccountPage.css";


const AccountPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const userRestaurants = useSelector(state => Object.values(state.restaurants.userRestaurants || {}));
  const navigate = useNavigate();
  const { setModalContent, setOnModalClose } = useModal();

  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    if (user) dispatch(thunkFetchUserRestaurants());
  }, [dispatch, user]);

  const handleCreateRestaurant = () => {
    setOnModalClose(() => () => dispatch(thunkFetchUserRestaurants()));
    setModalContent(<CreateRestaurantModal />);
  };

  const handleUpdateRestaurant = (restaurant) => {
    setOnModalClose(() => () => dispatch(thunkFetchUserRestaurants()));
    setModalContent(<UpdateRestaurantModal restaurant={restaurant} />);
  };

  const handleDeleteRestaurant = (restaurant) => {
    setOnModalClose(() => () => dispatch(thunkFetchUserRestaurants()));
    setModalContent(<DeleteRestaurantModal restaurant={restaurant} />);
  };

  return (
    <div className="account-page">
      <h1>Your Restaurants</h1>
      <button onClick={handleCreateRestaurant}>Create Restaurant</button>

      <div className="restaurant-list">
        {userRestaurants.length === 0 ? (
          <p>You have not created any restaurants yet.</p>
        ) : (
          userRestaurants.map((restaurant) => {
            // Get the first image URL or use a placeholder
            const imageUrl = restaurant.images && restaurant.images.length > 0
              ? restaurant.images[0].url
              : 'https://cdn.pixabay.com/photo/2015/08/19/02/27/restaurant-895426_1280.png';

              return (
                <div key={restaurant.id} className="restaurant-card" onClick={() => navigate(`/restaurants/${restaurant.id}`)} style={{ cursor: 'pointer'}}>
                  <img
                    src={imageUrl}
                    alt={restaurant.name}
                    className="restaurant-image"
                  />
                  <div className="restaurant-info">
                    <h2 className="restaurant-name">{restaurant.name}</h2>
                    <p className="restaurant-category"><em>{restaurant.category}</em></p>
                    <p className="restaurant-address">{restaurant.address}</p>
                  </div>
                  <div className="restaurant-buttons">
                    <button onClick={(e) => { e.stopPropagation(); handleUpdateRestaurant(restaurant)}}>Update</button>
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteRestaurant(restaurant)}}>Delete</button>
                  </div>
                </div>
              );
          })
        )}
      </div>

      {showCreateModal && (
        <CreateRestaurantModal setShowModal={setShowCreateModal} />
      )}
    </div>
  );
};

export default AccountPage;