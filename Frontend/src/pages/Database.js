import React, { useContext, useEffect, useState } from 'react'; 
import { ThemeContext } from '../ThemeContext'; 
import Sidebar from '../components/Sidebar'; 
import MenuBar from '../components/MenuBar'; // Import MenuBar component for mobile
import Footer from '../components/Footer';

const Database = () => {
  const { theme } = useContext(ThemeContext);

  // State to store cases
  const [cases, setCases] = useState([]);

  // State to track screen width for responsiveness
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Effect to fetch data
  useEffect(() => {
    fetch('https://chatbot-for-fir-backend.vercel.app/api/server/cases')
      .then((response) => response.json())
      .then((data) => setCases(data))
      .catch((error) => console.error('Error fetching cases:', error));
  }, []);

  // Effect to update mobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 0);
    };

    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine the background color based on the case status
  const getStatusColor = (status) => {
    switch (status) {
      case 'assigned':
        return 'bg-green-500'; // Green for Open
      case 'closed':
        return 'bg-red-500'; // Red for Closed
      case 'under-investigation':
        return 'bg-yellow-500'; // Yellow for Pending
      default:
        return 'bg-gray-500'; // Default case if status is undefined
    }
  };

  return (
    <div  className="bareacts-container min-h-screen flex flex-col">
      {/* Render Sidebar or MenuBar based on screen size */}
      {isMobile ? <MenuBar /> : <Sidebar />}
      
      <main className="main-content flex-grow p-8">
        <h2 className="database-title text-center text-4xl font-semibold text-blue-900 text-center mb-8 mt-8">Case Database</h2>
        
        <div className="case-cards space-y-8"> {/* Using space-y-8 to create vertical spacing */}
          {cases.map((caseItem) => (
            <div key={caseItem.srNo} className="case-card bg-white p-6 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="case-header flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-700">Sr No: {caseItem.srNo}</h3>
                <span
                  className={`status-badge inline-block py-1 px-4 rounded-full text-white text-sm ${getStatusColor(caseItem.status)}`}
                >
                  {caseItem.status}
                </span>
              </div>
              
              <p className="text-gray-600">{caseItem.description}</p>
            </div>
          ))}
        </div>
      </main>
     <Footer />
    </div>
  );
};

export default Database;
