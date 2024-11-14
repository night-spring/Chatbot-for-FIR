import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar'; // Import Sidebar component
import MenuBar from '../components/MenuBar'; // Import MenuBar component
import '../styles/BareActs.css'; // External CSS for styling
import axios from 'axios'; // Import axios for making API requests
import Footer from '../components/Footer'; // Import Footer component

const BareActs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [laws, setLaws] = useState([]); // State to hold all laws
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Detect screen size

  useEffect(() => {
    const fetchLaws = async () => {
      try {
        const response = await axios.get('https://chatbot-for-fir-backend.vercel.app/api/laws/acts'); // Fetch all laws
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
      const response = await axios.get('https://chatbot-for-fir-backend.vercel.app/api/laws/search', {
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
    <div className="bareacts-container min-h-screen flex flex-col">
      {/* Conditional rendering based on screen size */}
      {isMobile ? <MenuBar /> : <Sidebar />}

      <main className="main-content flex-grow">
        <h2 className="bareacts-title text-4xl font-semibold text-blue-900 text-center mb-8 mt-8">Bare Acts Database</h2>
        <form onSubmit={handleSearch} className="bareacts-search-form flex flex-col items-center gap-4 sm:flex-row sm:gap-6 mb-10">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search for a Bare Act"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            className="bareacts-search-input w-full sm:w-96 p-3 text-lg rounded-lg border-2 bg-white text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
                    
          {/* Search Button */}
          <button
            type="submit"
            className="bareacts-search-btn p-4 rounded-lg bg-blue-600 text-white font-medium shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
          >
            Search
          </button>
        </form>

        <div className="bareacts-results">
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
        <div className="all-laws">
          <h3>Bare Acts</h3>
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

      {/* Footer component */}
      <Footer />
    </div>
  );
};

export default BareActs;
