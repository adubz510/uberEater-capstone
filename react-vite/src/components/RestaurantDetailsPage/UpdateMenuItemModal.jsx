import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkUpdateMenuItem } from '../../redux/menuItem';
import './UpdateMenuItemModal.css'

const UpdateMenuItemModal = ({ menuItem }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();  // Close modal function from useModal

  const [name, setName] = useState(menuItem.name);
  const [description, setDescription] = useState(menuItem.description || '');
  const [price, setPrice] = useState(menuItem.price);
  const [imageUrl, setImageUrl] = useState(menuItem.imageUrl || '');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  // Automatically set the values of the form fields when the modal is opened
  useEffect(() => {
    setName(menuItem.name);
    setDescription(menuItem.description || '');
    setPrice(menuItem.price);
    setImageUrl(menuItem.imageUrl || '');
  }, [menuItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    const updatedMenuItem = { id: menuItem.id, name, description, price, imageUrl };

    // Pass both restaurantId and menuItem.id to the thunk
    const res = await dispatch(thunkUpdateMenuItem(menuItem.id, updatedMenuItem));

    if (res.errors) {
      setErrors(res.errors);
    } else {
      closeModal();  // Close modal on success
    }

    setLoading(false);
  };

  return (
    <div className="update-menu-item-modal">
      <h2>Update Menu Item</h2>

      {errors.length > 0 && (
        <ul className="error-list">
          {errors.map((err, idx) => <li key={idx}>{err}</li>)}
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter menu item name"
          />
        </label>

        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />
        </label>

        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="Enter price"
          />
        </label>

        <label>
          Image URL (Optional):
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Updating Item...' : 'Update Menu Item'}
        </button>
      </form>
    </div>
  );
};

export default UpdateMenuItemModal;