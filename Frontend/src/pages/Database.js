import React, { useContext, useEffect, useState } from 'react'; 
import { ThemeContext } from '../ThemeContext'; 
import Sidebar from '../components/Sidebar'; 
import MenuBar from '../components/MenuBar'; // Import MenuBar component for mobile
import '../styles/Database.css'; 

const Database = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  // State to store cases
  const [cases, setCases] = useState([]);
  
  // State to track screen width for responsiveness
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Effect to fetch data
  useEffect(() => {
    fetch('http://localhost:5000/api/server/cases')
      .then((response) => response.json())
      .then((data) => setCases(data))
      .catch((error) => console.error('Error fetching cases:', error));
  }, []);

  // Effect to update mobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`database-container ${theme}`}>
      {/* Render Sidebar or MenuBar based on screen size */}
      {isMobile ? <MenuBar /> : <Sidebar />}
      
      <main className="main-content">
        <div className="theme-toggle" onClick={toggleTheme}>
          <span className="material-icons">
            {theme === 'light' ? 'dark_mode' : 'light_mode'}
          </span>
        </div>
        <h2 className="database-title">CASE DATABASE</h2>
        <div className="case-boxes">
          {cases.map((caseItem) => (
            <div key={caseItem.srNo} className="case-box">
              <h3>Sr No: {caseItem.srNo}</h3>
              <p>{caseItem.description}</p>
              Status:
              <span className={`status ${caseItem.status}`}>
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
