import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import RestaurantList from '../components/BrowseRestaurantPage/BrowseRestaurantPage';
import Layout from './Layout';
import HomePage from '../components/HomePage/HomePage';
import SearchResultsPage from '../components/BrowseRestaurantPage/SearchResultsPage';
import AccountPage from '../components/AccountPage/AccountPage';
import RestaurantDetailsPage from '../components/RestaurantDetailsPage/RestaurantDetailsPage';
import ShoppingCart from '../components/ShoppingCart/ShoppingCart';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "restaurants",
        element: <RestaurantList />,
      },
      {
        path: "restaurants/:restaurantId",
        element: <RestaurantDetailsPage />,
      },
      {
        path: "search",
        element: <SearchResultsPage />,
      },
      {
        path: "account",
        element: <AccountPage />,
      },
      {
        path: "cart",
        element: <ShoppingCart />
      },
    ],
  },
]);