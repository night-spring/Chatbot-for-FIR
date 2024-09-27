import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink for active styling
import { ThemeContext } from '../ThemeContext'; // Import Theme Context
import { motion } from 'framer-motion'; // Import Framer Motion
import './component-styles/Sidebar.css'; // External CSS for styling

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status

  // Check localStorage for login state when Sidebar mounts
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setIsLoggedIn(true);
    }
  }, []);

  const sidebarVariants = {
    hidden: { x: -250 },
    visible: { x: 0 },
  };

  return (
    <motion.aside
      className={`sidebar ${theme}`}
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      transition={{ type: 'tween', stiffness: 300 }}
    >
      <div className="sidebar-header">
        <h1>LawAI</h1>
        <span className="material-icons">gavel</span>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li><NavLink to="/home/query" activeClassName="active">AI Lawyer</NavLink></li>
          <li><NavLink to="/bareacts" activeClassName="active">Bare Acts</NavLink></li>
          <li><NavLink to="/home/database" activeClassName="active">Database</NavLink></li>
          <li>
            {isLoggedIn ? (
             <NavLink to="/home/login" activeClassName="active">Logged In</NavLink>
            ) : (
              <NavLink to="/home/login" activeClassName="active">Login</NavLink>
            )}
          </li>
          <li><NavLink to="/home/settings" activeClassName="active">Settings</NavLink></li>
        </ul>
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
