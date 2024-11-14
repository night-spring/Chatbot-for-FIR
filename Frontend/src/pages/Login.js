import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar'; // Import Sidebar component
import MenuBar from '../components/MenuBar'; // Import MenuBar component
import '../styles/Login.css'; // External CSS for styling

const Login = () => {
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
    <div className="login-container light-mode">
      <Sidebar isLoggedIn={isLoggedIn} userId={userId} className="sidebar" /> {/* Pass userId to Sidebar */}
      <main className="main-content">

        {isLoggedIn ? (
          <>
            <h2 className="login-title">You are logged in</h2>

            {/* Display user details in a visually appealing format */}
            <div className="user-details">
              <p><strong>Name:</strong> {name}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Badge Number:</strong> {badgeNumber}</p>
            </div>

            <button className="logout-btn primary-btn" onClick={handleLogout}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <h2 className="login-title bareacts-title text-4xl font-semibold text-blue-900 text-center mb-8 ">{isSignup ? 'Sign Up' : 'Login'}</h2>
            <form onSubmit={handleLogin} className="login-form">
              {isSignup && (
                <>
                  <div className="login-form-item">
                    <label htmlFor="name" className="login-form-label">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="login-form-input"
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
                      className="login-form-input"
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
                  className="login-form-input"
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
                  className="login-form-input"
                  required
                />
              </div>
              <button type="submit" className="login-btn primary-btn">
                {isSignup ? 'Sign Up' : 'Login'}
              </button>
            </form>
            <p className="login-toggle-text">
              {isSignup ? 'Already a user? ' : 'Not a user? '}
              <span className="login-toggle-lin k" onClick={toggleForm}>
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
