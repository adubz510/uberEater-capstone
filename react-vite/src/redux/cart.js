// Action Types
const LOAD_CARTS = 'cart/LOAD_CARTS';
const ADD_TO_CART = 'cart/ADD_TO_CART';
const UPDATE_CART_ITEM = 'cart/UPDATE_CART_ITEM';
const REMOVE_FROM_CART = 'cart/REMOVE_FROM_CART';

// Action Creators
const loadCarts = (carts) => ({
  type: LOAD_CARTS,
  payload: carts
});

const addToCart = (cart) => ({
  type: ADD_TO_CART,
  payload: cart
});

const updateCartItem = (item) => ({
  type: UPDATE_CART_ITEM,
  payload: item
});

const removeFromCart = (cartItemId) => ({
  type: REMOVE_FROM_CART,
  payload: cartItemId
});

// Thunks

// Fetch all carts for the current user
export const thunkFetchUserCarts = () => async (dispatch) => {
  try {
    const res = await fetch('/api/cart/');
    if (res.ok) {
      const data = await res.json();
      dispatch(loadCarts(data));
    } else {
      const errorText = await res.text();
      console.error('Fetch carts failed:', res.status, errorText);
    }
  } catch (err) {
    console.error('Unexpected fetch error:', err);
  }
};

// Add a product (menu item) to the cart
export const thunkAddToCart = (menuItemId, quantity, restaurantId) => async (dispatch) => {
  try {
    const res = await fetch('/api/cart/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ menuItemId, quantity, restaurantId })
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(addToCart(data));
      return data;
    } else {
      const errorData = await res.json();
      return errorData;
    }
  } catch (err) {
    console.error('Unexpected add to cart error:', err);
  }
};

export const thunkUpdateCartItem = (cartItemId, quantity) => async (dispatch) => {
  try {
    const res = await fetch(`/api/cart/items/${cartItemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity })
    });

    if (!res.ok) throw new Error('Failed to update cart item');

    if (res.ok) {
      const updatedItem = await res.json();
      dispatch(updateCartItem(updatedItem));
      return updatedItem;
    } else {
      const errorData = await res.json();
      return errorData;
    }
  } catch (err) {
    console.error('Unexpected update cart item error:', err);
  }
};

// Remove a product (cart item) from the cart
export const thunkRemoveFromCart = (cartItemId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/cart/items/${cartItemId}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      dispatch(removeFromCart(cartItemId));
      return true;
    } else {
      const errorData = await res.json();
      return errorData;
    }
  } catch (err) {
    console.error('Unexpected remove from cart error:', err);
  }
};

// Initial state
const initialState = {
  carts: {},        // carts keyed by cart id
  cartItems: {},    // cartItems keyed by cartItem id
};

// Reducer
function cartReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CARTS: {
      const carts = {};
      const cartItems = {};
      action.payload.forEach(cart => {
        carts[cart.id] = { ...cart, cartItems: cart.cartItems.map(item => item.id) };
        cart.cartItems.forEach(item => {
          cartItems[item.id] = item;
        });
      });
      return {
        ...state,
        carts,
        cartItems
      };
    }

    case ADD_TO_CART: {
      // The backend returns the whole updated cart, so update that cart and its cart items
      const updatedCart = action.payload;
      const cartItems = { ...state.cartItems };
      updatedCart.cartItems.forEach(item => {
        cartItems[item.id] = item;
      });

      return {
        ...state,
        carts: {
          ...state.carts,
          [updatedCart.id]: {
            ...updatedCart,
            cartItems: updatedCart.cartItems.map(item => item.id)
          }
        },
        cartItems
      };
    }

    case UPDATE_CART_ITEM: {
      const updatedItem = action.payload;
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          [updatedItem.id]: updatedItem,
        },
      };
    }

    case REMOVE_FROM_CART: {
      const cartItems = { ...state.cartItems };
      const cartItemId = action.payload;
    
      // Find which cart the cart item belongs to
      let cartIdToUpdate = null;
      Object.values(state.carts).forEach(cart => {
        if (cart.cartItems.includes(cartItemId)) {
          cartIdToUpdate = cart.id;
        }
      });
    
      // Remove the cart item
      delete cartItems[cartItemId];
    
      const carts = { ...state.carts };
    
      if (cartIdToUpdate && carts[cartIdToUpdate]) {
        const updatedItemIds = carts[cartIdToUpdate].cartItems.filter(id => id !== cartItemId);
    
        if (updatedItemIds.length === 0) {
          // Cart is now empty — remove the cart entirely
          delete carts[cartIdToUpdate];
        } else {
          // Update the cart with the remaining items
          carts[cartIdToUpdate] = {
            ...carts[cartIdToUpdate],
            cartItems: updatedItemIds
          };
        }
      }
    
      return {
        ...state,
        cartItems,
        carts
      };
    }

    default:
      return state;
  }
}

export default cartReducer