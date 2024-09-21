// Database.js
import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext'; // Import Theme Context
import Sidebar from '../components/Sidebar'; // Import Sidebar component
import '../styles/Database.css'; // External CSS for styling

const Database = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const cases = [
    { srNo: 1, description: "Case A", status: "closed" }, // red
    { srNo: 2, description: "Case B", status: "assigned" }, // green
    { srNo: 3, description: "Case C", status: "under-investigation" } // yellow
  ];

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
          {cases.map((caseItem) => (
            <div key={caseItem.srNo} className="case-box">
              <h3>Sr No:  {caseItem.srNo}</h3>
              <p>{caseItem.description}</p>
              Status:<span className={ `status ${caseItem.status}`}>
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
