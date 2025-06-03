// Action Types
const LOAD_RESTAURANTS = 'restaurants/LOAD_RESTAURANTS';
const ADD_RESTAURANT = 'restaurants/ADD_RESTAURANT';
const UPDATE_RESTAURANT = 'restaurants/UPDATE_RESTAURANT';
const DELETE_RESTAURANT = 'restaurants/DELETE_RESTAURANT';
const LOAD_USER_RESTAURANTS = 'restaurants/LOAD_USER_RESTAURANTS';
const LOAD_RESTAURANT_BY_ID = 'restaurants/LOAD_RESTAURANT_BY_ID';


// Action Creators
const loadRestaurants = (restaurants) => ({
  type: LOAD_RESTAURANTS,
  payload: restaurants
});

const addRestaurant = (restaurant) => ({
  type: ADD_RESTAURANT,
  payload: restaurant
});

const updateRestaurant = (restaurant) => ({
  type: UPDATE_RESTAURANT,
  payload: restaurant
});

const deleteRestaurant = (restaurantId) => ({
  type: DELETE_RESTAURANT,
  payload: restaurantId
});

const loadUserRestaurants = (restaurants) => ({
    type: LOAD_USER_RESTAURANTS,
    restaurants,
  });

  const loadRestaurantById = (restaurant) => ({
    type: LOAD_RESTAURANT_BY_ID,
    payload: restaurant
  });

// Thunks
export const thunkFetchRestaurants = () => async (dispatch) => {
    try {
      const res = await fetch('/api/restaurants/');
  
      if (res.ok) {
        const data = await res.json();
        dispatch(loadRestaurants(data));
      } else {
        const errorText = await res.text();
        console.error('Fetch failed:', res.status, errorText);
      }
    } catch (err) {
      console.error('Unexpected fetch error:', err);
    }
  };

  export const thunkFetchUserRestaurants = () => async (dispatch) => {
    try {
      const res = await fetch('/api/restaurants/my-restaurants');
  
      if (res.ok) {
        const data = await res.json();
        dispatch(loadUserRestaurants(data)); 
      } else {
        const errorText = await res.text();
        console.error('Fetch failed:', res.status, errorText);
      }
    } catch (err) {
      console.error('Unexpected fetch error:', err);
    }
  };

  export const thunkFetchRestaurantById = (restaurantId) => async (dispatch) => {
    try {
      const res = await fetch(`/api/restaurants/${restaurantId}`);
  
      if (res.ok) {
        const data = await res.json();
        dispatch(loadRestaurantById(data));
      } else {
        const errorText = await res.text();
        console.error('Fetch failed:', res.status, errorText);
      }
    } catch (err) {
      console.error('Unexpected fetch error:', err);
    }
  };

export const thunkCreateRestaurant = (restaurantData) => async (dispatch) => {
  const res = await fetch('/api/restaurants/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(restaurantData)
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(addRestaurant(data));
    return data;
  } else {
    const errorData = await res.json();
    return errorData;
  }
};

export const thunkUpdateRestaurant = (restaurantId, restaurantData) => async (dispatch) => {
  const res = await fetch(`/api/restaurants/${restaurantId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(restaurantData)
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(updateRestaurant(data));
    return data;
  } else {
    const errorData = await res.json();
    return errorData;
  }
};

export const thunkDeleteRestaurant = (restaurantId) => async (dispatch) => {
  const res = await fetch(`/api/restaurants/${restaurantId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    dispatch(deleteRestaurant(restaurantId));
    return true;
  } else {
    return false;
  }
};

// Initial state
const initialState = {
    allRestaurants: {},
    userRestaurants: {}
  };
  
  // Reducer
  function restaurantsReducer(state = initialState, action) {
    switch (action.type) {
      case LOAD_RESTAURANTS: {
        const all = {};
        action.payload.forEach(restaurant => {
          all[restaurant.id] = restaurant;
        });
        return {
          ...state,
          allRestaurants: all
        };
      }

      case LOAD_RESTAURANT_BY_ID: {
        return {
          ...state,
          restaurantById: action.payload
        };
      }

      case LOAD_USER_RESTAURANTS: {
        const user = {};
        if (action.restaurants && Array.isArray(action.restaurants)) {
            action.restaurants.forEach((restaurant) => {
              user[restaurant.id] = restaurant;
            });
          }
          return {
            ...state,
            userRestaurants: user
          };
        }

      case ADD_RESTAURANT:
      case UPDATE_RESTAURANT: {
        return {
          ...state,
          allRestaurants: {
            ...state.allRestaurants,
            [action.payload.id]: action.payload
          },
          userRestaurants: {
            ...state.userRestaurants,
            [action.payload.id]: action.payload
          }
        };
      }

      case DELETE_RESTAURANT: {
        const all = { ...state.allRestaurants };
        const user = { ...state.userRestaurants };
        delete all[action.payload];
        delete user[action.payload];
        return {
          ...state,
          allRestaurants: all,
          userRestaurants: user
        };
      }
      default:
        return state;
    }
  }
  
  export default restaurantsReducer;