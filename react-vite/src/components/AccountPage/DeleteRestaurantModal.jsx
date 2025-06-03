import { useDispatch } from "react-redux";
import { thunkDeleteRestaurant, thunkFetchUserRestaurants } from "../../redux/restaurant";
import { useModal } from "../../context/Modal";
import "./DeleteRestaurantModal.css";

function DeleteRestaurantModal({ restaurant }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async () => {
    await dispatch(thunkDeleteRestaurant(restaurant.id));
    await dispatch(thunkFetchUserRestaurants()); // Refresh list after deletion
    closeModal();
  };

  const handleOverlayClick = (e) => {
    // Close the modal if the overlay (background) is clicked, not the modal itself
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container">
        <h2>Are you sure you want to delete this restaurant?</h2>
        <p>{restaurant.name}</p>
        <div className="button-group">
        <button className="delete-button" onClick={handleDelete}>Delete</button>
        <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteRestaurantModal;