import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import restaurantsReducer from "./restaurant";
import reviewsReducer from "./review";
import menuItemsReducer from "./menuItem";
import cartReducer from "./cart";

const rootReducer = combineReducers({
  session: sessionReducer,
  restaurants: restaurantsReducer,
  reviews: reviewsReducer,
  menuItems: menuItemsReducer,
  cart: cartReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
