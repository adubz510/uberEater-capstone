import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkDeleteMenuItem } from '../../redux/menuItem';
import './DeleteMenuItemModal.css';

const DeleteMenuItemModal = ({ itemId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();  // Close modal function from useModal

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    const res = await dispatch(thunkDeleteMenuItem(itemId));

    if (res.errors) {
      setError(res.errors);
    } else {
      closeModal();  // Close modal on successful deletion
    }

    setLoading(false);
  };

  return (
    <div className="delete-menu-item-modal">
      <h2>Delete Menu Item</h2>
      <p>Are you sure you want to delete this menu item? This action cannot be undone.</p>

      {error && <div className="error-message">{error}</div>}

      <div className="button-group">
        <button onClick={closeModal} className="cancel-button">Cancel</button>
        <button onClick={handleDelete} disabled={loading} className="delete-button">
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default DeleteMenuItemModal;