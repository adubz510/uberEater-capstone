import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PiHamburgerFill } from "react-icons/pi";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useNavigate } from "react-router-dom"; 
import "./ProfileButton.css";

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For redirecting after logout
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user); // Get user from Redux state
  const ulRef = useRef();

  // Toggle the profile dropdown menu
  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevent click event from bubbling up and closing the menu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    // Close the menu when clicking outside of it
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  // Close the menu
  const closeMenu = () => setShowMenu(false);

  // Handle user logout
  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout()); // Dispatch the logout action
    closeMenu(); // Close the dropdown menu
    navigate("/"); // Redirect to the homepage after logging out
  };

  return (
    <div className="profile-button-container">
      <button onClick={toggleMenu}>
        <PiHamburgerFill />
      </button>
      {showMenu && (
        <ul className="profile-dropdown" ref={ulRef}>
          {user ? (
            <>
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li>
                <button onClick={() => navigate(`/account`)} style={{ cursor: 'pointer'}} className="account-button">
                  Account
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/cart')} style={{ cursor: 'pointer' }} className="cart-button">
                  Cart
                </button>
              </li>
              <li className="logout-li">
                <button onClick={logout} style={{ cursor: 'pointer'}} className="Logout-button">Log Out</button>
              </li>
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;