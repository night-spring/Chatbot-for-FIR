import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../ThemeContext'; // Import Theme Context
import Sidebar from '../components/Sidebar'; // Import Sidebar component
import MenuBar from '../components/MenuBar'; // Import MenuBar component
import '../styles/Login.css'; // External CSS for styling

const Login = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // State for name input
  const [badgeNumber, setBadgeNumber] = useState(''); // State for badge number input
  const [isSignup, setIsSignup] = useState(false); // State for toggling between login and signup
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
  const [userId, setUserId] = useState(''); // State for storing user ID

  // Check localStorage for login state when component mounts
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedName = localStorage.getItem('name');
    const storedBadgeNumber = localStorage.getItem('badgeNumber');
    const storedEmail = localStorage.getItem('email');
    if (storedUserId && storedName && storedBadgeNumber && storedEmail) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
      setName(storedName);
      setBadgeNumber(storedBadgeNumber);
      setEmail(storedEmail);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login logic here (use email as user ID)
    setUserId(email);
    setIsLoggedIn(true);
    localStorage.setItem('userId', email); // Store userId in localStorage
    localStorage.setItem('name', name); // Store name in localStorage
    localStorage.setItem('badgeNumber', badgeNumber); // Store badge number in localStorage
    localStorage.setItem('email', email); // Store email in localStorage
    console.log('Logging in with', { email, password, name, badgeNumber });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId('');
    setName('');
    setBadgeNumber('');
    setEmail('');
    localStorage.removeItem('userId'); // Clear login state from localStorage
    localStorage.removeItem('name');
    localStorage.removeItem('badgeNumber');
    localStorage.removeItem('email');
  };

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className={`login-container ${theme}`}>
      <Sidebar isLoggedIn={isLoggedIn} userId={userId} className="sidebar" /> {/* Pass userId to Sidebar */}
      <MenuBar isLoggedIn={isLoggedIn} userId={userId} className="menu-bar" /> {/* Pass userId to MenuBar */}
      <main className="main-content">
        <div className="theme-toggle" onClick={toggleTheme}>
          <span className="material-icons">
            {theme === 'light' ? 'dark_mode' : 'light_mode'}
          </span>
        </div>

        {isLoggedIn ? (
          <>
            <h2 className="login-title">You are logged in</h2>

            {/* Display user details in a visually appealing format */}
            <div className="user-details">
              <p><strong>Name:</strong> {name}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Badge Number:</strong> {badgeNumber}</p>
            </div>

            <button className={`logout-btn primary-btn ${theme}`} onClick={handleLogout}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <h2 className="login-title">{isSignup ? 'Sign Up' : 'Login'}</h2>
            <form onSubmit={handleLogin} className={`login-form ${theme}`}>
              {isSignup && (
                <>
                  <div className="login-form-item">
                    <label htmlFor="name" className="login-form-label">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`login-form-input ${theme}`}
                      required
                    />
                  </div>
                  <div className="login-form-item">
                    <label htmlFor="badgeNumber" className="login-form-label">Badge Number</label>
                    <input
                      type="text"
                      id="badgeNumber"
                      value={badgeNumber}
                      onChange={(e) => setBadgeNumber(e.target.value)}
                      className={`login-form-input ${theme}`}
                      required
                    />
                  </div>
                </>
              )}
              <div className="login-form-item">
                <label htmlFor="email" className="login-form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`login-form-input ${theme}`}
                  required
                />
              </div>
              <div className="login-form-item">
                <label htmlFor="password" className="login-form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`login-form-input ${theme}`}
                  required
                />
              </div>
              <button type="submit" className={`login-btn primary-btn ${theme}`}>
                {isSignup ? 'Sign Up' : 'Login'}
              </button>
            </form>
            <p className="login-toggle-text">
              {isSignup ? 'Already a user? ' : 'Not a user? '}
              <span className="login-toggle-link" onClick={toggleForm}>
                {isSignup ? 'Login' : 'Sign Up'}
              </span>
            </p>
          </>
        )}
      </main>
    </div>
  );
};

export default Login;
