// Database.js
import React, { useContext, useEffect, useState } from 'react'; // Import useState
import { ThemeContext } from '../ThemeContext'; // Import Theme Context
import Sidebar from '../components/Sidebar'; // Import Sidebar component
import '../styles/Database.css'; // External CSS for styling

const Database = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  // Step 1: Initialize state to store cases
  const [cases, setCases] = useState([]); // Initialize with an empty array

  useEffect(() => {
    fetch('http://localhost:5000/api/server/cases')
      .then((response) => response.json())
      .then((data) => setCases(data)) // Step 2: Update state with fetched data
      .catch((error) => console.error('Error fetching cases:', error));
  }, []);

  return (
    <div className={`database-container ${theme}`}>
      <Sidebar />
      <main className="main-content">
        <div className="theme-toggle" onClick={toggleTheme}>
          <span className="material-icons">
            {theme === 'light' ? 'dark_mode' : 'light_mode'}
          </span>
        </div>
        <h2 className="database-title">CASE DATABASE</h2>
        <div className="case-boxes">
          {cases.map((caseItem) => ( // Step 3: Map through cases to display
            <div key={caseItem.srNo} className="case-box">
              <h3>Sr No:  {caseItem.srNo}</h3>
              <p>{caseItem.description}</p>
              Status:<span className={`status ${caseItem.status}`}>
                {caseItem.status}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Database;
