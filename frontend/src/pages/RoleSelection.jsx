import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiBriefcase, 
  FiCode, 
  FiActivity, 
  FiArrowRight, 
  FiUser, 
  FiHome,
  FiShoppingBag,
  FiSearch,
  FiTarget,
  FiArrowLeft
} from 'react-icons/fi';
import { FaBuilding, FaHospital } from 'react-icons/fa';
import Navbar from '../components/Navbar/Navbar';

const RoleSelection = () => {
  const [step, setStep] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const industries = [
    {
      id: 'tech',
      title: 'Tech & Development',
      description: 'Software, web apps, and digital infrastructure.',
      icon: <FiCode size={32} />,
    },
    {
      id: 'hotel',
      title: 'Hotel & Hospitality',
      description: 'Service management, staffing, and vendor escrow.',
      icon: <FiHome size={32} />,
    },
    {
      id: 'hospital',
      title: 'Hospital & Healthcare',
      description: 'Medical supplies, health IT, and consulting.',
      icon: <FiActivity size={32} />,
    }
  ];

  const subRoles = [
    {
      id: 'client',
      title: 'I am a Client',
      description: 'I want to hire professionals and secure my payments.',
      icon: <FiSearch size={32} />,
      type: 'client'
    },
    {
      id: 'freelancer',
      title: 'I am a Freelancer',
      description: 'I want to offer my services and ensure I get paid.',
      icon: <FiTarget size={32} />,
      type: 'provider'
    }
  ];

  const handleIndustrySelect = (id) => {
    setSelectedIndustry(id);
    setStep(2);
  };

  const handleContinue = () => {
    if (selectedRole) {
      navigate(`/login?type=${selectedRole}&industry=${selectedIndustry}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-80px)] flex flex-col bg-[#f9fbfb] font-sans text-gray-900 items-center justify-center py-16 px-6">
        
        {step === 1 ? (
          <div className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center mb-16">
              <h1 className="font-['Outfit'] text-[48px] font-black text-[#1a4d3e] mb-4 tracking-tight leading-tight">Select Your Industry</h1>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
                Choose the sector you operate in to customize your escrow workflows.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {industries.map((ind) => (
                <div 
                  key={ind.id}
                  onClick={() => handleIndustrySelect(ind.id)}
                  className="bg-white p-10 rounded-[40px] cursor-pointer border-2 border-transparent shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(61,99,86,0.12)] hover:border-[#3d6356] hover:-translate-y-2 transition-all duration-500 group flex items-center gap-8"
                >
                  <div className="w-20 h-20 bg-green-50 rounded-[24px] flex items-center justify-center text-[#3d6356] group-hover:bg-[#3d6356] group-hover:text-white transition-all duration-500 shrink-0">
                    {ind.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[#1a4d3e] mb-2 tracking-tight">{ind.title}</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">{ind.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full max-w-4xl animate-in fade-in slide-in-from-right-4 duration-500">
            <button 
              onClick={() => setStep(1)}
              className="flex items-center gap-2 text-gray-400 font-black uppercase tracking-widest text-xs mb-8 hover:text-[#3d6356] transition-colors"
            >
              <FiArrowLeft /> Back to Industries
            </button>
            
            <div className="text-center mb-16">
              <h1 className="font-['Outfit'] text-[48px] font-black text-[#1a4d3e] mb-4 tracking-tight leading-tight">What's Your Role?</h1>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
                Are you looking to hire or are you offering your expertise?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {subRoles.map((role) => (
                <div 
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`bg-white p-12 rounded-[48px] cursor-pointer border-4 transition-all duration-500 relative flex flex-col items-center text-center ${
                    selectedRole === role.id 
                      ? 'border-[#3d6356] shadow-[0_25px_60px_rgba(61,99,86,0.15)] transform -translate-y-2' 
                      : 'border-transparent shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]'
                  }`}
                >
                  <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-8 transition-all duration-500 ${
                    selectedRole === role.id ? 'bg-[#3d6356] text-white rotate-12 scale-110' : 'bg-green-50 text-[#3d6356]'
                  }`}>
                    {role.icon}
                  </div>
                  <h3 className="text-3xl font-black text-[#1a4d3e] mb-4 tracking-tight">{role.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">{role.description}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <button 
                onClick={handleContinue}
                disabled={!selectedRole}
                className={`group flex items-center justify-center gap-3 px-16 py-6 rounded-3xl font-black text-2xl transition-all duration-500 ${
                  selectedRole 
                    ? 'bg-[#3d6356] text-white hover:bg-[#2b4a40] shadow-[0_20px_40px_rgba(61,99,86,0.25)]' 
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                }`}
              >
                Enter Dashboard <FiArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default RoleSelection;
