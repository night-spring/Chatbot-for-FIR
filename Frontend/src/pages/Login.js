import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../ThemeContext'; // Import Theme Context
import Sidebar from '../components/Sidebar'; // Import Sidebar component
import '../styles/Login.css'; // External CSS for styling

const Login = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false); // State for toggling between login and signup
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
  const [userId, setUserId] = useState(''); // State for storing user ID

  // Check localStorage for login state when component mounts
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login logic here (use email as user ID)
    setUserId(email);
    setIsLoggedIn(true);
    localStorage.setItem('userId', email); // Store userId in localStorage
    console.log('Logging in with', { email, password });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId('');
    localStorage.removeItem('userId'); // Clear login state from localStorage
  };

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className={`login-container ${theme}`}>
      <Sidebar isLoggedIn={isLoggedIn} /> {/* Pass login state to Sidebar */}
      <main className="main-content">
        <div className="theme-toggle" onClick={toggleTheme}>
          <span className="material-icons">
            {theme === 'light' ? 'dark_mode' : 'light_mode'}
          </span>
        </div>

        {isLoggedIn ? (
          <>
            <h2 className="login-title">You are logged in, your ID is {userId}</h2>
            <button className={`logout-btn primary-btn ${theme}`} onClick={handleLogout}>
              Log Out
            </button>    
          </>
        ) : (
          <>
            <h2 className="login-title">{isSignup ? 'Sign Up' : 'Login'}</h2>
            <form onSubmit={handleLogin} className={`login-form ${theme}`}>
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
