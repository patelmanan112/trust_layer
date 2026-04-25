import React from 'react';
import { FaRegBell } from "react-icons/fa";
import { FiLayout, FiBell, FiBriefcase, FiShield } from 'react-icons/fi';
import { FaWallet } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className='flex justify-between items-center px-16  bg-white border-b border-gray-100 sticky top-0 z-50'>
      <div className="flex items-center gap-16">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <h1 className='font-bold text-[#064E3B] text-2xl'>TrustLayer</h1>
        </Link>

        <div className="flex items-center gap-8">
          <Link to="#" className='text-[#064E3B] font-medium border-b-2 border-[#064E3B] pb-1 no-underline'>Marketplace</Link>
          <Link to="#" className='text-gray-500 hover:text-[#064E3B] transition-colors no-underline'>Resources</Link>
          <Link to="#" className='text-gray-500 hover:text-[#064E3B] transition-colors no-underline'>Help</Link>
        </div>
      </div>

      <div className="flex items-center gap-8 text-gray-500">
        <div className="flex items-center gap-6">
          <FiBell size={22} className="cursor-pointer hover:text-[#064E3B]" />
          <FaWallet size={22} className="cursor-pointer hover:text-[#064E3B]" />
        </div>
        
        <Link to="/login" className="no-underline">
          <button 
            className="bg-[#3F675A] text-white px-8 py-2.5 rounded-lg font-semibold transition-all hover:bg-[#315248] shadow-md flex items-center justify-center whitespace-nowrap mt-2"
          >
            Create Escrow
          </button>
        </Link>
      </div>
    </nav>
  );
}
