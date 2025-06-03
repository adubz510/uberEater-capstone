// Action Types
const SET_MENU_ITEMS = 'menuItems/SET_MENU_ITEMS';
const CREATE_MENU_ITEM = 'menuItems/CREATE_MENU_ITEM';
const UPDATE_MENU_ITEM = 'menuItems/UPDATE_MENU_ITEM';
const DELETE_MENU_ITEM = 'menuItems/DELETE_MENU_ITEM';

// Action Creators
const setMenuItems = (menuItems) => ({
  type: SET_MENU_ITEMS,
  menuItems,
});

const createMenuItem = (menuItem) => ({
  type: CREATE_MENU_ITEM,
  menuItem,
});

const updateMenuItem = (menuItem) => ({
  type: UPDATE_MENU_ITEM,
  menuItem,
});

const deleteMenuItem = (menuItemId) => ({
  type: DELETE_MENU_ITEM,
  menuItemId,
});

// Thunks

// Fetch all menu items for a specific restaurant
export const thunkFetchMenuItems = (restaurantId) => async (dispatch) => {
  const res = await fetch(`/api/menu-items/restaurant/${restaurantId}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(setMenuItems(data));
  } else {
    console.error('Error fetching menu items');
  }
};

// Create a new menu item for a specific restaurant
export const thunkCreateMenuItem = (menuItemData) => async (dispatch) => {
  const { restaurantId, name, description, price, imageUrl } = menuItemData;

  try {
    const res = await fetch(`/api/menu-items/restaurant/${restaurantId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        price,
        image_url: imageUrl,
      }),
    });

    if (res.ok) {
      const newMenuItem = await res.json();
      dispatch(createMenuItem(newMenuItem));
      return newMenuItem; // success case — will be truthy in modal
    } else {
      const errorData = await res.json();
      return errorData; // error case — will be checked in modal
    }
  } catch (err) {
    return { errors: ["Something went wrong. Please try again later."] };
  }
};

// Update an existing menu item
export const thunkUpdateMenuItem = (menuItemId, menuItemData) => async (dispatch) => {
  const { name, description, price, imageUrl } = menuItemData;

  const res = await fetch(`/api/menu-items/${menuItemId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      description,
      price,
      image_url: imageUrl,
    }),
  });

  if (res.ok) {
    const updatedMenuItem = await res.json();
    dispatch(updateMenuItem(updatedMenuItem));
    return updatedMenuItem
  } else {
    console.error('Error updating menu item');
  }
};

// Delete a menu item
export const thunkDeleteMenuItem = (menuItemId) => async (dispatch) => {
  const res = await fetch(`/api/menu-items/${menuItemId}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    dispatch(deleteMenuItem(menuItemId));
    return true;
  } else {
    console.error('Error deleting menu item');
    return false;
  }
};

// Initial State
const initialState = {
  restaurantMenuItems: {}, // menu items normalized by ID
};

// Reducer
function menuItemsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MENU_ITEMS: {
      const menuItemsObj = action.menuItems.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {});
      return {
        ...state,
        restaurantMenuItems: menuItemsObj,
      };
    }

    case CREATE_MENU_ITEM:
    case UPDATE_MENU_ITEM:
      return {
        ...state,
        restaurantMenuItems: {
          ...state.restaurantMenuItems,
          [action.menuItem.id]: action.menuItem,
        },
      };

    case DELETE_MENU_ITEM: {
      const newMenuItems = { ...state.restaurantMenuItems };
      delete newMenuItems[action.menuItemId];
      return {
        ...state,
        restaurantMenuItems: newMenuItems,
      };
    }

    default:
      return state;
  }
}

export default menuItemsReducer