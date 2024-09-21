// KeyFeatures.js
import React from 'react';
import './component-styles/KeyFeatures.css'; // Custom CSS for key features

const KeyFeatures = ({ theme }) => {
    return (
      <div className={`key-features ${theme}`}>
        <h2 className={`section-title ${theme}`}>Key Features</h2>
        <div className="features-container">
          <div className={`feature-card scale-on-hover ${theme}`}>
            <h3 className="feature-title">AI-Powered</h3>
            <p className={`feature-description ${theme}`}>
              Automatically suggests relevant sections and acts based on the input complaint.
            </p>
          </div>
          <div className={`feature-card scale-on-hover ${theme}`}>
            <h3 className="feature-title">Reliable</h3>
            <p className={`feature-description ${theme}`}>
              Provides reliable legal information to reduce mistakes in FIRs.
            </p>
          </div>
          <div className={`feature-card scale-on-hover ${theme}`}>
            <h3 className="feature-title">Easy to Use</h3>
            <p className={`feature-description ${theme}`}>
              Simple and intuitive interface that any officer can easily use.
            </p>
          </div>
        </div>
      </div>
    );
  };
  

export default KeyFeatures;
