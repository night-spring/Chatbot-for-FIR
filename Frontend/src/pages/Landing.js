import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext'; // Import Theme Context
import KeyFeatures from '../components/KeyFeatures'; // Import KeyFeatures component
import '../styles/Landing.css'; // External CSS for styling

const Landing = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`landing ${theme}`}>
      <header className="header">
        <div className="container">
          <div className="logo">Law AI</div>

          {/* Dark/Light Mode Toggle Icon */}
          <div className="theme-toggle" onClick={toggleTheme}>
            <span className="material-icons">
              {theme === 'light' ? 'dark_mode' : 'light_mode'}
            </span>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <h1 className="fade-in">Empowering Law Enforcement with AI</h1>
          <p className="fade-in">Instant access to accurate legal information for writing flawless FIRs.</p>
          <a href="/home" className="btn primary-btn scale-on-hover">Get Started</a>
        </div>
      </section>

      {/* Key Features Section - using the KeyFeatures component */}
      <section id="features" className="features">
        <div className="container">
          <KeyFeatures theme={theme} /> {/* Pass the theme prop to KeyFeatures */}
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>© 2024 LawAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
