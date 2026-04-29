import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBriefcase, FiCode, FiActivity, FiArrowRight } from 'react-icons/fi';
import { FaBuilding } from 'react-icons/fa';
import Navbar from '../components/Navbar/Navbar';

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const roles = [
    {
      id: 'hotel',
      title: 'Hotel',
      description: 'I want to hire talent for my hotel business.',
      icon: <FaBuilding className="text-[#3d6356]" size={32} />,
      type: 'client'
    },
    {
      id: 'developer',
      title: 'Developer',
      description: 'I want to offer my services and find projects.',
      icon: <FiCode className="text-[#3d6356]" size={32} />,
      type: 'freelancer'
    },
    {
      id: 'hospital',
      title: 'Hospital',
      description: 'I want to hire professionals for healthcare IT.',
      icon: <FiActivity className="text-[#3d6356]" size={32} />,
      type: 'client'
    }
  ];

  const handleContinue = () => {
    if (selectedRole) {
      const selectedType = roles.find(r => r.id === selectedRole)?.type;
      navigate(`/login?type=${selectedType}&role=${selectedRole}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-80px)] flex flex-col bg-[#f9fbfb] font-sans text-gray-900 items-center justify-center py-12 px-6">
        
        <div className="text-center mb-12">
          <h1 className="font-['Outfit'] text-[40px] font-bold text-[#1a4d3e] mb-4">Choose Your Path</h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Select how you want to use TrustLayer to get the most personalized experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mb-12">
          {roles.map((role) => (
            <div 
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`bg-white p-8 rounded-2xl cursor-pointer border-2 transition-all duration-300 relative ${
                selectedRole === role.id 
                  ? 'border-[#3d6356] shadow-[0_10px_30px_rgba(61,99,86,0.15)] transform -translate-y-1' 
                  : 'border-transparent shadow-[0_4px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:-translate-y-1'
              }`}
            >
              {selectedRole === role.id && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-[#3d6356] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
              
              <div className="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                {role.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-[#1a4d3e] mb-3">{role.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {role.description}
              </p>
            </div>
          ))}
        </div>

        <button 
          onClick={handleContinue}
          disabled={!selectedRole}
          className={`flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-bold text-lg transition-all ${
            selectedRole 
              ? 'bg-[#3d6356] text-white hover:bg-[#2b4a40] shadow-lg hover:shadow-xl' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue <FiArrowRight size={20} />
        </button>

      </div>
    </>
  );
};

export default RoleSelection;
