import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkAddToCart, thunkFetchUserCarts } from '../../redux/cart';
import './QuickAddCartItemModal.css';

export default function QuickAddCartItemModal({ menuItem }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (quantity < 1) {
      setError('Please enter a valid quantity.');
      return;
    }

    const res = await dispatch(thunkAddToCart(menuItem.id, quantity, menuItem.restaurantId));
    if (res?.errors) {
      setError(res.errors[0]);
    } else {
      await dispatch(thunkFetchUserCarts());
      setSuccess(true);

      setTimeout(() => {
        closeModal();
      }, 700);
    }
  };

  return (
    <div className="quick-add-cart-item-modal">
      <h2>Add {menuItem.name} to Cart</h2>
      <p className="item-price">${menuItem.price.toFixed(2)}</p>

      {error && <div className="error-messages">{error}</div>}
      {success && <p className="success">✅ Item added to cart!</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
            disabled={success}
          />
        </div>

        <div className="modal-actions">
          <button type="submit" disabled={success}>Add</button>
          <button
            type="button"
            className="cancel-button"
            onClick={closeModal}
            disabled={success}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
