import React, { useState } from 'react';
import { FaRegBell } from "react-icons/fa";
import { FiLayout, FiBell, FiBriefcase, FiShield } from 'react-icons/fi';
import { FaWallet } from 'react-icons/fa';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='flex justify-between items-center px-6 md:px-10 lg:px-16 bg-white border-b border-gray-100 sticky top-0 z-50 h-20'>
      {/* Left side: Logo and Desktop Links */}
      <div className="flex items-center gap-12 lg:gap-16">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <h1 className='font-bold text-[#064E3B] text-2xl'>TrustLayer</h1>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          <Link to="#" className='text-[#064E3B] font-medium border-b-2 border-[#064E3B] pb-1 no-underline'>Marketplace</Link>
          <Link to="#" className='text-gray-500 hover:text-[#064E3B] transition-colors no-underline'>Resources</Link>
          <Link to="#" className='text-gray-500 hover:text-[#064E3B] transition-colors no-underline'>Help</Link>
        </div>
      </div>

      {/* Right side: Icons, Desktop Button, and Mobile Toggle */}
      <div className="flex items-center gap-4 md:gap-8 text-gray-500">
        <div className="hidden md:flex items-center gap-6">
          <FiBell size={22} className="cursor-pointer hover:text-[#064E3B]" />
          <FaWallet size={22} className="cursor-pointer hover:text-[#064E3B]" />
        </div>
        
        <div className="hidden lg:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="no-underline">
                <button className="bg-[#3F675A] text-white px-8 py-2.5 rounded-lg font-semibold transition-all hover:bg-[#315248] shadow-md">
                  Go to Dashboard
                </button>
              </Link>
              <button 
                onClick={() => { dispatch(logout()); navigate('/'); }}
                className="text-gray-500 font-bold hover:text-red-600 transition-colors uppercase tracking-widest text-[10px]"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-gray-600 font-bold hover:text-[#3F675A] transition-colors uppercase tracking-widest text-[10px] no-underline">
                Sign In
              </Link>
              <Link to="/role-selection" className="no-underline">
                <button className="bg-[#3F675A] text-white px-8 py-2.5 rounded-lg font-semibold transition-all hover:bg-[#315248] shadow-md flex items-center justify-center whitespace-nowrap">
                  Get Started
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-[#064E3B] p-2 hover:bg-gray-50 rounded-lg transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-white z-40 flex flex-col p-6 shadow-xl overflow-y-auto">
          <div className="flex flex-col gap-6">
            <Link to="#" className='text-[#064E3B] font-semibold text-lg no-underline' onClick={() => setIsMenuOpen(false)}>Marketplace</Link>
            <Link to="#" className='text-gray-600 hover:text-[#064E3B] font-medium text-lg no-underline' onClick={() => setIsMenuOpen(false)}>Resources</Link>
            <Link to="#" className='text-gray-600 hover:text-[#064E3B] font-medium text-lg no-underline' onClick={() => setIsMenuOpen(false)}>Help</Link>
            
            <hr className="border-gray-100" />
            
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 text-gray-600">
                <FiBell size={22} />
                <span className="font-medium">Notifications</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <FaWallet size={22} />
                <span className="font-medium">Wallet</span>
              </div>
            </div>

            <Link to="/role-selection" className="no-underline mt-4" onClick={() => setIsMenuOpen(false)}>
              <button 
                className="w-full bg-[#3F675A] text-white py-3.5 rounded-xl font-semibold shadow-lg active:scale-95 transition-transform"
              >
                Create Escrow
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

