import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkFetchUserCarts, thunkRemoveFromCart, thunkUpdateCartItem } from '../../redux/cart';
import AddCartItemModal from './AddCartItemModal';
import './ShoppingCart.css'

function CartItem({ item, onRemove, onUpdate }) {
    const name = item.menuItem?.name || 'Item Name';
    const price = item.menuItem?.price || 0;

    const [isEditing, setIsEditing] = useState(false);
    const [newQuantity, setNewQuantity] = useState(item.quantity);

    useEffect(() => {
        setNewQuantity(item.quantity);
      }, [item.quantity]);

    const handleSave = () => {
        if (newQuantity > 0 && newQuantity !== item.quantity) {
          onUpdate(item.id, newQuantity);
        }
        setIsEditing(false);
      };
    
      const handleCancel = () => {
        setNewQuantity(item.quantity);
        setIsEditing(false);
      };
    
  
      return (
        <div className="cart-item">
          <span>{name}</span>
          <span>
            Qty:
            {isEditing ? (
              <>
                <input
                  type="number"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(Number(e.target.value))}
                  min="1"
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </>
            ) : (
              <>
                {' '}{item.quantity}
                <button onClick={() => setIsEditing(true)}>Edit</button>
              </>
            )}
          </span>
          <span>Price: ${price.toFixed(2)}</span>
          <span>Subtotal: ${(price * item.quantity).toFixed(2)}</span>
          <button onClick={() => onRemove(item.id)}>
            Remove
          </button>
        </div>
      );
    }
    
    function Cart({ cart, cartItems, onRemoveItem, onUpdateItem }) {
      const { setModalContent } = useModal();

      const total = cartItems.reduce((sum, item) => {
        const price = item.menuItem?.price || 0;
        const quantity = item.quantity || 1;
        return sum + price * quantity;
      }, 0);

      const openAddItemModal = () => {
        setModalContent(<AddCartItemModal cart={cart} />);
      };

      if (cartItems.length === 0) {
        // Optional: you can show "Cart is empty" without restaurant info here,
        // or just return null to skip rendering empty cart.
        return <div className="cart-empty">Cart is empty</div>;
      }
    
      return (
        <div className="cart">
          <div className="cart-header">
            <h2>{cart.restaurant?.name || `Restaurant #${cart.restaurantId}`}</h2>
            <button className='menu-item-addCart' onClick={openAddItemModal}>Add Items to Cart</button>
          </div>

          {cartItems.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={onRemoveItem}
              onUpdate={onUpdateItem}
            />
          ))}
          <div className="cart-total">Total: ${total.toFixed(2)}</div>

        </div>
      );
    }
    
    export default function ShoppingCart() {
        const dispatch = useDispatch();
        const carts = useSelector(state => state.cart.carts);
        const cartItemsById = useSelector(state => state.cart.cartItems);
      
        useEffect(() => {
          dispatch(thunkFetchUserCarts());
        }, [dispatch]);
      
        const handleRemove = (cartItemId) => {
          dispatch(thunkRemoveFromCart(cartItemId));
        };
      
        const handleUpdate = (cartItemId, quantity) => {
          dispatch(thunkUpdateCartItem(cartItemId, quantity));
        };
      
        // Filter only carts that have items
        const nonEmptyCarts = Object.values(carts).filter(cart => cart.cartItems.length > 0);
      
        if (nonEmptyCarts.length === 0) {
          return <div>Your cart is empty.</div>;
        }
      
        return (
          <div className="shopping-cart-page">
            <h1>Your Shopping Cart</h1>
            {nonEmptyCarts.map(cart => {
              const items = cart.cartItems
                .map(id => cartItemsById[id])
                .filter(Boolean);
      
              return (
                <Cart
                  key={cart.id}
                  cart={cart}
                  cartItems={items}
                  onRemoveItem={handleRemove}
                  onUpdateItem={handleUpdate}
                />
              );
            })}
          </div>
        );
      }