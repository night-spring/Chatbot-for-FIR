import React, { useState, useEffect, useMemo } from 'react';
import { FaMicrophone, FaInfoCircle } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const Query = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('Response will appear here...');
  const [isListening, setIsListening] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);  // State for modal visibility

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
        body: JSON.stringify({ query: fullQuery }),
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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="query-page-container">
      {/* Sidebar */}
      <Sidebar />

      <main className="query-page-main-content bg-white py-16 px-8 min-h-[70vh] overflow-x-hidden mt-0">




      <h2 className="query-page-title text-4xl font-semibold text-blue-900 text-center mb-8 mt-8">
        Ask a Query
      </h2>

        {/* Info Button */}
        <div className="text-center mb-4">
          <button
            onClick={toggleModal}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            <FaInfoCircle className="inline mr-2" />
            How It Works
          </button>
        </div>

       {/* Query Response Box */}
       {/* Query Response Box */}
       <div className="query-response-box bg-light-gray p-8 rounded-lg shadow-md mb-10 w-full max-w-5xl mx-auto border border-gray-300">
  <pre
    dangerouslySetInnerHTML={{ __html: response }}
    className="text-gray-800 font-medium leading-relaxed break-words whitespace-pre-wrap"
  ></pre>
</div>



        {/* Query Input Section */}
        <div className="query-input-container max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-300">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0">
            {/* Input Box */}
            <div className="query-input-box flex-grow mr-4">
              <input
                type="text"
                placeholder="Ask your query..."
                value={query}
                onChange={handleInputChange}
                className="query-text-input w-full p-4 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Microphone Icon */}
            <div className="query-mic-icon-container flex items-center justify-center">
              <FaMicrophone
                className={`query-mic-icon text-3xl cursor-pointer transition-all duration-200 transform ${isListening ? 'text-blue-600 scale-110' : 'text-gray-600'}`}
                onClick={handleMicClick}
              />
            </div>

            {/* Submit Button */}
            <div className="query-submit-btn-container mt-4 md:mt-0">
              <button
                onClick={handleQuerySubmit}
                className="query-submit-btn bg-blue-600 text-white py-3 px-6 rounded-md shadow-md hover:bg-orange-700 transition duration-200"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Info Modal */}
      {isModalOpen && (
        <div className="modal-overlay fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="modal-content bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">How the Chatbot Works</h3>
            <p className="text-gray-700 mb-4">
              The chatbot is designed to assist law enforcement officers by providing relevant information from the Indian Constitution and legal acts.
            </p>
            <p className="text-gray-700 mb-4">
              You can either type your query or use the microphone to dictate your question. The chatbot will process the information and generate a response based on the applicable sections and acts of law.
            </p>
            <p className="text-gray-700 mb-6">
              Once you submit your query, the chatbot will analyze it and provide a detailed response, listing the acts, sections, and their relevance to your query.
            </p>
            <div className="text-right">
              <button
                onClick={toggleModal}
                className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Query;
