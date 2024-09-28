// Settings.js
import React, { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeContext'; // Import Theme Context
import Sidebar from '../components/Sidebar'; // Import Sidebar component
import MenuBar from '../components/MenuBar'; // Import MenuBar component
import '../styles/Settings.css'; // External CSS for styling

const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('English');

  const handleNotificationsChange = () => {
    setNotifications(!notifications);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className={`settings-container ${theme}`}>
      {/* Conditionally render Sidebar or MenuBar based on screen size */}
      <Sidebar />
      <MenuBar /> {/* Add MenuBar component for mobile */}
      <main className="main-content">
        <div className="theme-toggle" onClick={toggleTheme}>
          <span className="material-icons">
            {theme === 'light' ? 'dark_mode' : 'light_mode'}
          </span>
        </div>
        <h2 className="settings-title">Settings</h2>
        <p className="settings-description">Customize your application settings here.</p>

        <div className="setting-item">
          <label className="setting-label">
            <input
              type="checkbox"
              checked={notifications}
              onChange={handleNotificationsChange}
              className="setting-checkbox"
            />
            Enable Notifications
          </label>
        </div>

        <div className="setting-item">
          <label htmlFor="language" className="setting-label">Language</label>
          <select
            id="language"
            value={language}
            onChange={handleLanguageChange}
            className="setting-select"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            {/* Add more languages as needed */}
          </select>
        </div>

        <div className="setting-item">
          <label htmlFor="case-templates" className="setting-label">Default Case Templates</label>
          <select id="case-templates" className="setting-select">
            <option value="template1">Template 1</option>
            <option value="template2">Template 2</option>
            {/* Add more templates as needed */}
          </select>
        </div>
      </main>
    </div>
  );
};

export default Settings;
