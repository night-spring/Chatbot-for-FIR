import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../ThemeContext'; // Import Theme Context
import Sidebar from '../components/Sidebar'; // Import Sidebar component
import MenuBar from '../components/MenuBar'; // Import MenuBar component
import '../styles/BareActs.css'; // External CSS for styling
import axios from 'axios'; // Import axios for making API requests

const BareActs = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Access theme and toggleTheme
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [laws, setLaws] = useState([]); // State to hold all laws
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Detect screen size

  useEffect(() => {
    const fetchLaws = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/laws/'); // Fetch all laws
        setLaws(response.data); // Set the fetched laws data
      } catch (err) {
        console.error('Error fetching laws:', err);
        setError('Failed to fetch laws data.'); // Set error message
      }
    };

    fetchLaws(); // Fetch laws data when the component mounts
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Update isMobile state on resize
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup listener on unmount
    };
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    setError(null); // Reset error state

    try {
      const response = await axios.get('/api/laws/search', {
        params: { keyword: searchQuery }, // Send search query
      });
      setSearchResult(response.data); // Store search results
    } catch (err) {
      setError('An error occurred while fetching results.'); // Set error message
      console.error(err);
    } finally {
      setLoading(false); // Set loading to false after the request is completed
    }
  };

  return (
    <div className={`bareacts-container ${theme}`}>
      {/* Conditional rendering based on screen size */}
      {isMobile ? <MenuBar /> : <Sidebar />}

      <main className="main-content">
        {/* Light/Dark Mode Toggle */}
        <div className="theme-toggle" onClick={toggleTheme}>
          <span className="material-icons">
            {theme === 'light' ? 'dark_mode' : 'light_mode'}
          </span>
        </div>
        <h2 className="bareacts-title">Bare Acts</h2>
        <form onSubmit={handleSearch} className="bareacts-search-form">
          <input
            type="text"
            placeholder="Search for a Bare Act"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            className={`bareacts-search-input ${theme}`}
          />
          <button type="submit" className={`bareacts-search-btn primary-btn ${theme}`}>
            Search
          </button>
        </form>
        
        <div className={`bareacts-results ${theme}`}>
          {loading && <p>Loading results...</p>}
          {error && <p className="error-message">{error}</p>}
          {searchResult && searchResult.length > 0 ? (
            searchResult.map((law) => (
              <div key={law.section}>
                <h3>{law.actType} - {law.section}</h3>
                <p><strong>{law.title}</strong></p>
                <p>{law.description}</p>
              </div>
            ))
          ) : (
            !loading && <p>No results to display</p>
          )}
        </div>

        {/* Display all laws here */}
        <div className={`all-laws ${theme}`}>
          <h3>All Laws</h3>
          {laws.length > 0 ? (
            laws.map((law) => (
              <div key={law.section}>
                <h4>{law.actType} - {law.section}</h4>
                <p><strong>{law.title}</strong></p>
                <p>{law.description}</p>
              </div>
            ))
          ) : (
            <p>No laws available</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default BareActs;
