import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../ThemeContext';
import Sidebar from '../components/Sidebar';
import '../styles/Query.css';
import { FaMicrophone } from 'react-icons/fa';

const Query = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('Response will appear here...');
  const [isListening, setIsListening] = useState(false);

  // Web Speech API initialization
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  useEffect(() => {
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };
  }, [recognition]);

  const handleMicClick = () => {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsListening(!isListening);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    
    // Append additional context to the user's input
    const fullQuery = `${query}. You are an AI assistant with comprehensive knowledge of the Indian Constitution, including all applicable acts and sections. Your task is to assist law enforcement officers in filing an FIR by identifying and listing all relevant acts and sections that apply to the case presented. For each act or section, provide a brief explanation of its significance and how it applies to the case. Ensure that all applicable legal provisions are mentioned to help the officer file a thorough and accurate FIR.`;
    
    try {
      const response = await fetch('http://localhost:5000/api/gemini/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: fullQuery }),  // Send full query to Gemini
      });
  
      const data = await response.json();
      setResponse(data.response || 'No response received');
    } catch (error) {
      console.error('Error fetching the response:', error);
      setResponse('Error occurred while fetching the response');
    }
  
    setQuery('');  // Clear the input field after submission
  };
  

  return (
    <div className={`query-page-container ${theme}`}>
      <Sidebar />
      <main className="query-page-main-content">
        <div className="theme-toggle" onClick={toggleTheme}>
          <span className="material-icons">
            {theme === 'light' ? 'dark_mode' : 'light_mode'}
          </span>
        </div>

        <h2 className="query-page-title">Ask a Query</h2>

        {/* Response Field */}
        <div className={`query-response-box ${theme}`}>
          {response}
        </div>

        {/* Input Section */}
        <div className="query-input-container">
          <div className={`query-input-box ${theme}`}>
            <input
              type="text"
              placeholder="Ask your query..."
              value={query}
              onChange={handleInputChange}
              className={`query-text-input ${theme}`}
            />
            <FaMicrophone
              className={`query-mic-icon ${isListening ? 'listening' : ''} ${theme}`}
              onClick={handleMicClick}
            />
          </div>
          <button onClick={handleQuerySubmit} className={`query-submit-btn ${theme}`}>
            Enter
          </button>
        </div>
      </main>
    </div>
  );
};

export default Query;
