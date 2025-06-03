import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkDeleteReview } from '../../redux/review';
import './DeleteReviewModal.css'; 

const DeleteReviewModal = ({ reviewId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async () => {
    const success = await dispatch(thunkDeleteReview(reviewId));

    if (success) closeModal();
    else alert('Failed to delete review. Please try again.');
  };

  return (
    <div className="delete-review-modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this review?</p>

      <div className="button-group">
        <button className="delete-button" onClick={handleDelete}>
          Yes, Delete
        </button>
        <button className="cancel-button" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteReviewModal;
