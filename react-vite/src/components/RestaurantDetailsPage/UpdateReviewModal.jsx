import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkUpdateReview } from '../../redux/review';
import './CreateReviewModal.css'; // You can keep using the same CSS

const UpdateReviewModal = ({ review }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    const updatedReview = {
      rating,
      comment
    };

    const res = await dispatch(thunkUpdateReview(review.id, updatedReview));

    if (res.errors) {
      setErrors(res.errors);
    } else {
      closeModal();
    }

    setLoading(false);
  };

  return (
    <div className="review-modal">
      <h2>Edit Your Review</h2>

      {errors.length > 0 && (
        <ul className="error-list">
          {errors.map((err, idx) => (
            <li key={idx}>{err}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            <option value="">Select rating</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>

        <label>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Review'}
        </button>
      </form>
    </div>
  );
};

export default UpdateReviewModal;