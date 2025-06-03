import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkFetchMenuItems } from '../../redux/menuItem';
import { thunkAddToCart, thunkFetchUserCarts } from '../../redux/cart';
import './AddCartItemModal.css';

function AddCartItemModal({ cart }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();  // Get closeModal from context here

  const menuItems = useSelector(state =>
    state.menuItems?.restaurantMenuItems
      ? Object.values(state.menuItems.restaurantMenuItems)
      : []
  );

  const [selectedItemId, setSelectedItemId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    if (cart?.restaurantId) {
      dispatch(thunkFetchMenuItems(cart.restaurantId));
    }
  }, [dispatch, cart?.restaurantId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedItemId === '' || quantity < 1) {
      setError('Please select an item and enter a valid quantity.');
      return;
    }

    const res = await dispatch(thunkAddToCart(Number(selectedItemId), quantity, cart.restaurantId));
    if (res?.errors) {
      setError(res.errors[0]);
    } else {
      dispatch(thunkFetchUserCarts()); // refresh cart view
      closeModal(); // close the modal from context
    }
  };

  return (
    <div className="add-cart-item-modal">
      <h2>Add Item to Cart</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Menu Item:
          <select
            value={selectedItemId}
            onChange={(e) => setSelectedItemId(Number(e.target.value))}
            required
          >
            <option value="" disabled>Select a menu item</option>
            {menuItems.map(item => (
              <option key={item.id} value={item.id}>
                {item.name} - ${item.price.toFixed(2)}
              </option>
            ))}
          </select>
        </label>
        <label>
          Quantity:
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
        </label>
        <div className="modal-buttons">
          <button type="submit">Add to Cart</button>
          <button type="button" className='modal-cancel-button' onClick={closeModal}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AddCartItemModal