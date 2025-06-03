// Action Types
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

// Action Creators
const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  payload: reviews
});

const addReview = (review) => ({
  type: ADD_REVIEW,
  payload: review
});

const updateReview = (review) => ({
  type: UPDATE_REVIEW,
  payload: review
});

const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  payload: reviewId
});

// Thunks
export const thunkFetchReviews = (restaurantId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/reviews/restaurant/${restaurantId}`);
    if (res.ok) {
      const data = await res.json();
      dispatch(loadReviews(data));
    } else {
      const errorText = await res.text();
      console.error('Failed to fetch reviews:', res.status, errorText);
    }
  } catch (err) {
    console.error('Unexpected error fetching reviews:', err);
  }
};

export const thunkCreateReview = (restaurantId, reviewData) => async (dispatch) => {
  const res = await fetch(`/api/reviews/restaurant/${restaurantId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData)
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(addReview(data));
    return data;
  } else {
    const errorData = await res.json();
    return errorData;
  }
};

export const thunkUpdateReview = (reviewId, reviewData) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData)
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(updateReview(data));
    return data;
  } else {
    const errorData = await res.json();
    return errorData;
  }
};

export const thunkDeleteReview = (reviewId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    dispatch(deleteReview(reviewId));
    return true;
  } else {
    return false;
  }
};

// Reducer
const initialState = {
  restaurantReviews: {} 
};

function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REVIEWS: {
      const reviews = {};
      action.payload.forEach((review) => {
        reviews[review.id] = review;
      });
      return { ...state, restaurantReviews: reviews };
    }
    case ADD_REVIEW:
    case UPDATE_REVIEW: {
      return {
        ...state,
        restaurantReviews: {
          ...state.restaurantReviews,
          [action.payload.id]: action.payload
        }
      };
    }
    case DELETE_REVIEW: {
      const updatedReviews = { ...state.restaurantReviews };
      delete updatedReviews[action.payload];
      return { ...state, restaurantReviews: updatedReviews };
    }
    default:
      return state;
  }
}

export default reviewsReducer;
