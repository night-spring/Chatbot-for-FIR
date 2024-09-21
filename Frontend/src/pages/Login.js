import React, { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeContext'; // Import Theme Context
import Sidebar from '../components/Sidebar'; // Import Sidebar component
import '../styles/Login.css'; // External CSS for styling

const Login = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false); // State for toggling between login and signup

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Logging in with', { email, password });
  };

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className={`login-container ${theme}`}>
      <Sidebar />
      <main className="main-content">
        <div className="theme-toggle" onClick={toggleTheme}>
          <span className="material-icons">
            {theme === 'light' ? 'dark_mode' : 'light_mode'}
          </span>
        </div>
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
      </main>
    </div>
  );
};

export default Login;
