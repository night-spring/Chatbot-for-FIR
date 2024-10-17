import React, { useContext, useState, useEffect, useMemo } from 'react';
import { ThemeContext } from '../ThemeContext';
import Sidebar from '../components/Sidebar';
import MenuBar from '../components/MenuBar';
import '../styles/Query.css';
import { FaMicrophone } from 'react-icons/fa';

const Query = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('Response will appear here...');
  const [isListening, setIsListening] = useState(false);

  // Web Speech API initialization
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  // Wrap the initialization in useMemo to prevent re-creation on every render
  const recognition = useMemo(() => {
    const recog = new SpeechRecognition();
    recog.continuous = false;
    recog.interimResults = false;
    recog.lang = 'en-US';
    return recog;
  }, [SpeechRecognition]);

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

    const fullQuery = `${query}. You are an AI assistant with comprehensive knowledge of the Indian Constitution, including all applicable acts and sections. Your task is to assist law enforcement officers in filing an FIR by identifying and listing all relevant acts and sections that apply to the case presented. For each act or section, provide a brief explanation of its significance and how it applies to the case. Ensure that all applicable legal provisions are mentioned to help the officer file a thorough and accurate FIR. Please provide general information without including disclaimers or limitations about legal advices.`;

    try {
      const response = await fetch('https://chatbot-for-fir-backend.vercel.app/api/gemini/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: fullQuery }), // Send full query to Gemini
      });

      const data = await response.json();
      setResponse(parseMarkdownToHTML(data.response || 'No response received'));
    } catch (error) {
      console.error('Error fetching the response:', error);
      setResponse('Error occurred while fetching the response');
    }

    setQuery(''); // Clear the input field after submission
  };

  const parseMarkdownToHTML = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  return (
    <div className={`query-page-container ${theme}`}>
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="menu-bar-container">
        <MenuBar />
      </div>

      <main className="query-page-main-content">
        <div className="theme-toggle" onClick={toggleTheme}>
          <span className="material-icons">
            {theme === 'light' ? 'dark_mode' : 'light_mode'}
          </span>
        </div>

        <h2 className="query-page-title">Ask a Query</h2>

        <div className={`query-response-box ${theme}`}>
          <pre dangerouslySetInnerHTML={{ __html: response }} />
        </div>

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
            <button onClick={handleQuerySubmit} className={`query-submit-btn ${theme}`}>
              Enter
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Query;
