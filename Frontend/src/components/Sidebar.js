import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import './component-styles/Sidebar.css'; // Updated CSS for the menubar styling

const Sidebar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [badgeNumber, setBadgeNumber] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedBadgeNumber = localStorage.getItem('badgeNumber');
    if (storedName && storedBadgeNumber) {
      setName(storedName);
      setBadgeNumber(storedBadgeNumber);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <motion.nav>
      
      <div className="sidebar-content bg-gradient-to-r from-blue-900 to-blue-600 text-white py-8">

        
        {/* Logo and Title */}
        <div className="sidebar-logo">
          <h1 className="text-lg font-bold text-white">LawAI</h1>
          <span className="material-icons text-white">gavel</span>
        </div>

        {/* Navigation Links */}
        <div className="sidebar-links flex space-x-4">
          <NavLink to="/home/query" activeClassName="active" className="sidebar-link">AI Lawyer</NavLink>
          <NavLink to="/bareacts" activeClassName="active" className="sidebar-link">Bare Acts</NavLink>
          <NavLink to="/home/database" activeClassName="active" className="sidebar-link">Database</NavLink>
          <NavLink to="/home/settings" activeClassName="active" className="sidebar-link">Settings</NavLink>
          <NavLink to="/home/login" activeClassName="active" className="sidebar-link">
            {isLoggedIn ? 'Logged In' : 'Login'}
          </NavLink>
        </div>

        {/* User Info (if logged in) */}
        {isLoggedIn && (
          <div className="sidebar-user-info flex items-center space-x-3">
            <img
              src="https://www.pngall.com/wp-content/uploads/12/Avatar-PNG-Images.png"
              alt="User Profile"
              className="user-avatar rounded-full w-10 h-10 object-cover"
            />
            <div className="user-details text-left">
              <p className="user-name text-sm font-semibold text-white">{name}</p>
              <p className="user-badge text-xs text-gray-200">Badge No: {badgeNumber}</p>
            </div>
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Sidebar;
