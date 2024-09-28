import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../ThemeContext'; // Import Theme Context
import Sidebar from '../components/Sidebar'; // Import Sidebar component
import MenuBar from '../components/MenuBar'; // Import MenuBar component
import '../styles/BareActs.css'; // External CSS for styling

const BareActs = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Access theme and toggleTheme
  const [searchQuery, setSearchQuery] = useState('');
  const [result, setResult] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Detect screen size

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search logic goes here (e.g., fetch data from database based on searchQuery)
    console.log('Searching for:', searchQuery);
    // Simulate search result
    setResult(`Displaying results for: "${searchQuery}"`);
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
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`bareacts-search-input ${theme}`}
          />
          <button type="submit" className={`bareacts-search-btn primary-btn ${theme}`}>
            Search
          </button>
        </form>
        <div className={`bareacts-results ${theme}`}>
          {result ? <p>{result}</p> : <p>No results to display</p>}
        </div>
      </main>
    </div>
  );
};

export default BareActs;
