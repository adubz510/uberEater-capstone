import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { thunkFetchRestaurantById } from '../../redux/restaurant';
import { thunkFetchReviews } from '../../redux/review';
import { thunkFetchMenuItems } from '../../redux/menuItem';
import { thunkFetchUserCarts } from '../../redux/cart';

import CreateReviewModal from './CreateReviewModal';
import UpdateReviewModal from './UpdateReviewModal';
import DeleteReviewModal from './DeleteReviewModal';
import CreateMenuItemModal from './CreateMenuItemModal';
import UpdateMenuItemModal from './UpdateMenuItemModal';
import DeleteMenuItemModal from './DeleteMenuItemModal';
import QuickAddCartItemModal from './QuickAddCartItemModal';
import './RestaurantDetailsPage.css';

const RestaurantDetailsPage = () => {
  const dispatch = useDispatch();
  const { restaurantId } = useParams();

  const restaurant = useSelector(state => state.restaurants.restaurantById);
  const reviews = useSelector(state => Object.values(state.reviews.restaurantReviews));
  const menuItemsObj = useSelector(state => state.menuItems.restaurantMenuItems);
  const menuItems = Object.values(menuItemsObj);
  const carts = useSelector(state => state.cart.carts);
  const sessionUser = useSelector(state => state.session.user);

  const { setModalContent, setOnModalClose } = useModal();


  useEffect(() => {
    dispatch(thunkFetchRestaurantById(restaurantId));
    dispatch(thunkFetchReviews(restaurantId));
    dispatch(thunkFetchMenuItems(restaurantId));
  }, [dispatch, restaurantId]);

  useEffect(() => {
    dispatch(thunkFetchUserCarts());
  }, [dispatch]);

  if (!restaurant) return <div>Loading...</div>;

  const {
    name, description, category, priceRange,
    address, city, state, zipCode,
    images,
  } = restaurant;

  const isOwner = sessionUser?.id === restaurant.ownerId;
  const userReview = reviews.find(review => review.userId === sessionUser?.id);
  const canPostReview = sessionUser && !isOwner && !userReview;

  const imageUrl = images?.[0]?.url || '/fallback-image.jpg';


const activeCart = Object.values(carts).find(cart => cart.restaurantId === Number(restaurantId));
const hasItemsInOtherRestaurantCart = Object.values(carts).some(cart =>
  cart.restaurantId !== Number(restaurantId) && cart.cartItems.length > 0
);
const cartItemIds = activeCart?.cartItems || [];
const cartIsEmpty = cartItemIds.length === 0;
const canAddToCart = !hasItemsInOtherRestaurantCart && (!activeCart || cartIsEmpty);

  // Handle Create Review
  const handleCreateReview = () => {
    setOnModalClose(() => () => dispatch(thunkFetchReviews(restaurantId)));
    setModalContent(<CreateReviewModal restaurantId={restaurant.id} />);
  };

  // Handle Update Review
  const handleUpdateReview = (review) => {
    setOnModalClose(() => () => dispatch(thunkFetchReviews(restaurantId)));
    setModalContent(<UpdateReviewModal review={review} />);
  };

  // Handle Delete Review
  const handleDeleteReview = (reviewId) => {
    setOnModalClose(() => () => dispatch(thunkFetchReviews(restaurantId)));
    setModalContent(<DeleteReviewModal reviewId={reviewId} />);
  };

  // Handle Create Menu Item
  const handleCreateMenuItem = () => {
    setOnModalClose(() => () => dispatch(thunkFetchMenuItems(restaurantId)));
    setModalContent(<CreateMenuItemModal restaurantId={restaurant.id} />);
  };

  // Handle Update Menu Item
  const handleUpdateMenuItem = (item) => {
    setOnModalClose(() => () => dispatch(thunkFetchMenuItems(restaurantId)));
    setModalContent(<UpdateMenuItemModal menuItem={item} />);
  };

  // Handle Delete Menu Item
  const handleDeleteMenuItem = (itemId) => {
    setOnModalClose(() => () => dispatch(thunkFetchMenuItems(restaurantId)));
    setModalContent(<DeleteMenuItemModal itemId={itemId} />);
  };

  // Handle Add Item to Cart 
  const handleAddToCart = (menuItem) => {
    setModalContent(
      <QuickAddCartItemModal
        cart={activeCart}
        menuItem={menuItem}
      />
    );
  };

  return (
    <div className="restaurant-details">
      <h1>{name}</h1>
      <img src={imageUrl} alt={name} className="restaurant-image" />
      <p>{description}</p>

      <div className="restaurant-meta">
        <p><strong>Category:</strong> {category}</p>
        <p><strong>Price Range:</strong> {priceRange}</p>
        <p><strong>Address:</strong> {address}, {city}, {state} {zipCode}</p>
      </div>

      <div className="menu-section">
        <h2>Menu</h2>
        {isOwner && (
          <button className="create-menu-item-button" onClick={handleCreateMenuItem}>
            Add Menu Item
          </button>
        )}


        {menuItems.length ? (
          <ul className="menu-items-list">
            {menuItems.map(item => (
              <li key={item.id} className="menu-item">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="menu-item-image"
                  />
                )}
                <div className="menu-item-details">
                  <strong>{item.name}</strong> - ${item.price?.toFixed(2)}
                  <p>{item.description}</p>
                </div>

                <div className="menu-item-actions">
                {isOwner && (
                  <div className="menu-item-buttons">
                    <button onClick={() => handleUpdateMenuItem(item)} className="update-button">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteMenuItem(item.id)} className="delete-button">
                      Delete
                    </button>                
                  </div>
                )}

                {canAddToCart && (
                <div className="menu-item-buttons">
                <button
                className="add-to-cart-button"
                onClick={() => handleAddToCart(item)} 
                >
                  Add to Cart
                </button>
                </div>
                )}
                </div>
              </li>

            ))}
          </ul>
        ) : (
          <p>No menu items available.</p>
        )}
      </div>

      <div className="reviews-section">
        <h2>Reviews</h2>

        {canPostReview && (
          <button className="create-review-button" onClick={handleCreateReview}>
            Create Review
          </button>
        )}

        {reviews.length ? (
          <ul className="review-list">
            {reviews.map(review => (
              <li key={review.id} className="review-item">
                <div className="review-header">
                  <strong>{review.user?.username || 'Anonymous'}</strong>
                  <span className="review-date">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p><strong>Rating:</strong> {review.rating}/5</p>
                <p className="review-comment">{review.comment}</p>

                {sessionUser?.id === review.userId && (
                  <div className="review-actions">
                    <button onClick={() => handleUpdateReview(review)} className="update-button">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteReview(review.id)} className="delete-button">
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetailsPage;