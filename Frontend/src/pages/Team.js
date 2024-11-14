import React from 'react';

const teamMembers = [
  {
    name: 'Ayush Agarwal',
    role: 'Team Leader',
    description: 'Ayush is the team leader, responsible for guiding the team and ensuring smooth project development. His leadership and communication skills drive the project forward.',
    image: 'https://via.placeholder.com/300',
  },
  {
    name: 'Debojit Roy',
    role: 'Backend Developer',
    description: 'Debojit handles the backend, focusing on server-side logic, database management, and API integrations to ensure smooth operations.',
    image: 'https://via.placeholder.com/300',
  },
  {
    name: 'Tanisha Gupta',
    role: 'UI/UX Designer',
    description: 'Tanisha is responsible for creating intuitive and visually appealing user interfaces, ensuring a seamless and engaging experience for users.',
    image: 'https://via.placeholder.com/300',
  },
  {
    name: 'Anushka Adak',
    role: 'Frontend Developer',
    description: 'Anushka brings the UI designs to life with her frontend development skills, ensuring responsive layouts and smooth interactions.',
    image: 'https://via.placeholder.com/300',
  },
  {
    name: 'Anubhab Das',
    role: 'AI Specialist',
    description: 'Anubhab specializes in AI technologies, working on integrating machine learning models to improve the chatbot and ticketing system.',
    image: 'https://via.placeholder.com/300',
  },
  {
    name: 'Biman Roy (Mentor)',
    role: 'Mentor',
    description: 'Biman provides guidance and support, ensuring the team\'s direction aligns with best practices and the project\'s goals.',
    image: 'https://via.placeholder.com/300',
  },
];

const Team = () => {
  return (
    <div className="bg-gray-50 font-sans">
      {/* Team Header Section */}
      <header className="text-center py-16 bg-blue-600 text-white">
        <h1 className="text-4xl font-semibold">CODE-A-COLA</h1>
        <p className="text-xl mt-4">Brewing solutions for a smarter tomorrow!</p>
      </header>

      {/* Team Members Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-blue-600">{member.name}</h3>
                  <p className="text-lg text-gray-700 mt-2">{member.role}</p>
                  <p className="text-gray-600 mt-4">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center py-6">
        <p>&copy; 2024 CODE-A-COLA. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Team;
