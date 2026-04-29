import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  FiGrid, 
  FiShield, 
  FiFileText, 
  FiAlertCircle, 
  FiSettings,
  FiHelpCircle,
  FiCheckCircle
} from 'react-icons/fi';
import { BiBuildingHouse } from 'react-icons/bi';

const MainLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiGrid /> },
    { name: 'Active Escrows', path: '/escrows', icon: <FiShield /> },
    { name: 'Transaction History', path: '/transactions', icon: <FiFileText /> },
    { name: 'Dispute Center', path: '/disputes', icon: <FiAlertCircle /> },
    { name: 'Settings', path: '/settings', icon: <FiSettings /> },
  ];

  return (
    <div className="min-h-screen flex bg-[#f9fafb] font-sans text-gray-900">
      {/* SIDEBAR */}
      <aside className="w-[280px] bg-[#f9fafb] border-r border-gray-200 flex flex-col shrink-0">
        <div className="p-8 pb-6">
          <Link to="/" className="text-2xl font-bold text-[#1a4d3e] flex items-center gap-2">
            TrustLayer
          </Link>
        </div>

        <nav className="flex-1 px-4 flex flex-col gap-1 mt-4">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-[#ecfdf5] text-[#059669]' 
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <div className="text-lg">{link.icon}</div>
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-gray-200 flex flex-col gap-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#e0eee8] rounded-full flex items-center justify-center text-[#1a4d3e]">
              <BiBuildingHouse size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Institutional Grade</p>
              <p className="text-xs text-gray-500 font-medium">Verified Account</p>
            </div>
          </div>
          
          <Link to="#" className="flex items-center gap-3 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            <FiShield className="text-lg" /> Security Audit
          </Link>
          <Link to="#" className="flex items-center gap-3 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            <FiHelpCircle className="text-lg" /> Support
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 bg-white flex flex-col h-screen overflow-y-auto relative">
        <div className="flex-1 p-8 xl:p-12">
          <Outlet />
        </div>
        
        {/* Floating Chat Icon */}
        <div className="absolute bottom-8 right-8">
          <button className="w-14 h-14 bg-[#316C5B] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#234e42] transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
