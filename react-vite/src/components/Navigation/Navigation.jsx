import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import ProfileButton from "./ProfileButton";
import { useState } from "react";
import { SiUbereats } from "react-icons/si";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

function Navigation() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const { setModalContent } = useModal();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const openLoginModal = () => setModalContent(<LoginFormModal />);
  const openSignupModal = () => setModalContent(<SignupFormModal />);


  return (
    <nav className="nav-wrapper">
      <div className="nav-left">
        <NavLink to="/" className="nav-link">Home</NavLink>

        <div className="browse-btn">
        {!user && (
          <div className="auth-buttons">
            <button className="login-btn" onClick={openLoginModal}>Log In</button>
            <button className="signup-btn" onClick={openSignupModal}>Sign Up</button>
          </div>
        )}

        <button
          className="browse-restaurant-btn"
          onClick={() => navigate("/restaurants")}
        >
          <SiUbereats className="browse-icon"/>
          Browse Restaurants
        </button>
        </div>
        
        <div className="profile-button-wrapper">
          <ProfileButton />
        </div>
      </div>

      <form onSubmit={handleSearchSubmit} className="search-bar">
        <div className="input-group">
          <span className="icon">🔍</span>
          <input
            type="text"
            className="address-input"
            placeholder="Search restaurants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn" type="submit">Search</button>
        </div>
      </form>
    </nav>
  );
}

export default Navigation;