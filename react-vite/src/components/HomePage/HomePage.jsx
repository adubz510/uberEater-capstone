import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };


  return (
    <div className="homepage">
      <header className="homepage-header">
      </header>

      <main className="homepage-main">
        <h1 className="homepage-title">Find Restaurants</h1>

        <div className="search-bar">
          <div className="input-group">
          <FaSearch className="icon" />
          <input
            type="text"
            placeholder="Search restaurants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            className="search-input"
          />
          </div>
        <button className="search-btn" onClick={handleSearch}>Search</button>
        </div>

      </main>
    </div>
  );
};

export default HomePage;