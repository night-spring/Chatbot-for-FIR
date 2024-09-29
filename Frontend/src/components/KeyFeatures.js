// KeyFeatures.js
import React from 'react';
import './component-styles/KeyFeatures.css'; // Custom CSS for key features

const KeyFeatures = ({ theme }) => {
    return (
      <div className={`key-features ${theme}`}>
        <h2 className={`section-title ${theme}`}>Key Features</h2>
        <div className="features-container">
          <div className={`feature-card scale-on-hover ${theme}`}>
            <h3 className="feature-title">NLP & Legal Database</h3>
            <p className={`feature-description ${theme}`}>
            Interprets incident details and connects to legal databases for relevant laws.​
            </p>
          </div>
          <div className={`feature-card scale-on-hover ${theme}`}>
            <h3 className="feature-title">Unified Platform</h3>
            <p className={`feature-description ${theme}`}>
            Centralized repository of updated ​laws with easy search by act, section, or keyword.​
            </p>
          </div>
          <div className={`feature-card scale-on-hover ${theme}`}>
            <h3 className="feature-title">Available on all platforms</h3>
            <p className={`feature-description ${theme}`}>
            Web, Android, iOS, Windows, Mac for seamless access across devices.
            </p>
          </div>
        </div>
      </div>
    );
  };
  

export default KeyFeatures;
