import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { 
  FiShield, 
  FiCheckCircle, 
  FiClock, 
  FiArrowRight, 
  FiLock, 
  FiLayers, 
  FiMessageSquare, 
  FiTrendingUp, 
  FiFileText,
  FiSend,
  FiGlobe,
  FiMail,
  FiTruck,
  FiEdit,
  FiDollarSign,
  FiSearch
} from 'react-icons/fi';
import { FaGlobe, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="w-full ">
      <Navbar/>
      
      {/* HERO SECTION */}
      <section className="max-w-[1200px] mx-auto px-5 flex flex-col lg:flex-row items-center justify-between gap-10 py-15 lg:py-25">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 bg-[#D1FAE5] text-[#065F46] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
            <FiShield size={14} /> INSTITUTIONAL GRADE ESCROW
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight text-[#111827] mb-6">
            Secure large-scale transactions with <span className="text-[#316C5B]">absolute trust.</span>
          </h1>
          <p className="text-base text-gray-500 max-w-[450px] mb-10 leading-relaxed">
            TrustVault provides high-fidelity escrow services for businesses, ensuring funds are only released when every condition of the agreement is met.
          </p>
          <div className="flex gap-4">
            <Link to="/role-selection">
              <button className="bg-[#3F675A] text-white px-7 py-3.5 rounded-lg font-semibold transition-all hover:bg-[#315248] cursor-pointer">Get Started</button>
            </Link>
            <button className="bg-transparent text-[#3F675A] px-7 py-3.5 rounded-lg font-semibold border-1.5 border-[#3F675A] transition-all hover:bg-[#3F675A]/5">View Documentation</button>
          </div>
        </div>
        <div className="flex-1">
          <div className="w-full rounded-2xl shadow-2xl overflow-hidden">
            <img src="https://plus.unsplash.com/premium_photo-1670213989516-449ccda46fdb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Financial Chart" className="w-full block" />
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="text-center bg-[#F9FAFB] py-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-4xl font-bold mb-4">Transaction risks are evolving.</h2>
          <p className="text-gray-500 max-w-[600px] mx-auto mb-15">
            Traditional methods are too slow, too expensive, or lack the security required for modern digital assets.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 text-left">
            <div className="bg-white rounded-xl p-10 border border-[#F3F4F6] flex flex-col">
              <div className="text-red-600 mb-5"><FiLayers size={24} /></div>
              <h3 className="text-2xl font-bold mb-3">Legal Vulnerability</h3>
              <p className="text-gray-500 mb-8">Handshake agreements and standard bank transfers offer zero protection against bad actors or incomplete deliverables.</p>
              <div className="w-full rounded-lg overflow-hidden mt-auto">
                <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=600" alt="Legal Document" className="w-full" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-10 border border-[#F3F4F6] flex flex-col items-center justify-center text-center">
              <div className="text-red-600 mb-5"><FiClock size={48} /></div>
              <h3 className="text-2xl font-bold mb-3">3-5 Day Lag</h3>
              <p className="text-gray-500">Cross-border verification stalls business growth and creates capital inefficiency.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="max-w-[1200px] mx-auto px-5 py-20 flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#F3F4F6] border-t-4 border-[#064E3B]">
            <div className="text-emerald-600 mb-4"><FiShield size={24} /></div>
            <h4 className="text-lg font-bold mb-2">Vaulted Funds</h4>
            <p className="text-sm text-gray-500">Assets are held in a multi-sig vault, immutable until verified.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#F3F4F6]">
            <div className="text-emerald-600 mb-4"><FiCheckCircle size={24} /></div>
            <h4 className="text-lg font-bold mb-2">Smart Logic</h4>
            <p className="text-sm text-gray-500">Automated release based on API triggers or manual inspection.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#F3F4F6]">
            <div className="text-emerald-600 mb-4"><FiTrendingUp size={24} /></div>
            <h4 className="text-lg font-bold mb-2">Arbitration</h4>
            <p className="text-sm text-gray-500">Expert dispute resolution to handle complex edge cases.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#F3F4F6]">
            <div className="text-emerald-600 mb-4"><FiFileText size={24} /></div>
            <h4 className="text-lg font-bold mb-2">Audit Trail</h4>
            <p className="text-sm text-gray-500">Every action is cryptographically signed and logged.</p>
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-6">Our solution: Trust, engineered for scale.</h2>
          <p className="text-gray-500 mb-8">
            We combine the speed of automated smart contracts with the reliability of institutional legal frameworks. Your transactions are safe, transparent, and legally binding.
          </p>
          <ul className="list-none">
            <li className="flex items-center gap-3 mb-4 font-medium"><FiCheckCircle className="text-emerald-600" /> Zero-knowledge proof verification</li>
            <li className="flex items-center gap-3 mb-4 font-medium"><FiCheckCircle className="text-emerald-600" /> SOC-2 Type II Certified infrastructure</li>
            <li className="flex items-center gap-3 mb-4 font-medium"><FiCheckCircle className="text-emerald-600" /> 24/7 Concierge Support for high-value trades</li>
          </ul>
        </div>
      </section>

      {/* LIFECYCLE SECTION */}
      <section className="text-center bg-[#F3F9F7] py-25">
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-4xl font-bold">The Lifecycle of a Secure Trade</h2>
          <div className="flex flex-col lg:flex-row justify-between items-start relative my-15 gap-10">
            {/* Connector Line (Desktop) */}
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-[1px] bg-[#D1FAE5] z-0"></div>
            
            <div className="flex-1 relative z-10 w-full">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md text-[#3F675A]">
                <FiEdit size={32} />
              </div>
              <h4 className="text-lg font-bold mb-3">1. Create Escrow</h4>
              <p className="text-sm text-gray-500 max-w-[200px] mx-auto">Both parties agree on terms and define inspection periods.</p>
            </div>
            <div className="flex-1 relative z-10 w-full">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md text-[#3F675A]">
                <FiDollarSign size={32} />
              </div>
              <h4 className="text-lg font-bold mb-3">2. Fund Vault</h4>
              <p className="text-sm text-gray-500 max-w-[200px] mx-auto">Buyer deposits funds into the secure TrustVault account.</p>
            </div>
            <div className="flex-1 relative z-10 w-full">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md text-[#3F675A]">
                <FiTruck size={32} />
              </div>
              <h4 className="text-lg font-bold mb-3">3. Verify Delivery</h4>
              <p className="text-sm text-gray-500 max-w-[200px] mx-auto">Seller provides assets. Buyer inspects and approves quality.</p>
            </div>
            <div className="flex-1 relative z-10 w-full">
              <div className="w-20 h-20 bg-[#3F675A] text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <FiCheckCircle size={32} />
              </div>
              <h4 className="text-lg font-bold mb-3">4. Release</h4>
              <p className="text-sm text-gray-500 max-w-[200px] mx-auto">Funds are instantly released to the seller. Success recorded.</p>
            </div>
          </div>
          <Link to="/role-selection">
            <button className="bg-[#3F675A] text-white px-8 py-4 rounded-lg font-semibold inline-flex items-center gap-2.5 cursor-pointer">
              Launch Your First Transaction <FiArrowRight />
            </button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#E5E7EB] py-20 pb-10 text-[#4B5563]">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex flex-col lg:flex-row justify-between mb-20 gap-10">
            <div className="max-w-[250px]">
              <div className="text-2xl font-bold text-[#064E3B] mb-4">TrustVault</div>
              <p className="text-base mb-6">The gold standard for high-fidelity escrow and digital asset protection.</p>
              <div className="flex gap-4">
                <div className="w-8 h-8 border border-[#CBD5E1] rounded-full flex items-center justify-center text-[#64748B]"><FiGlobe /></div>
                <div className="w-8 h-8 border border-[#CBD5E1] rounded-full flex items-center justify-center text-[#64748B]"><FiGlobe /></div>
              </div>
            </div>
            <div className="flex gap-10 md:gap-25 flex-wrap">
              <div>
                <h5 className="text-[#111827] text-base font-bold mb-6">Platform</h5>
                <ul className="list-none p-0">
                  <li className="mb-3"><a href="#" className="no-underline text-gray-500">Marketplace</a></li>
                  <li className="mb-3"><a href="#" className="no-underline text-gray-500">API Reference</a></li>
                  <li className="mb-3"><a href="#" className="no-underline text-gray-500">Fee Schedule</a></li>
                  <li className="mb-3"><a href="#" className="no-underline text-gray-500">Security Audit</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-[#111827] text-base font-bold mb-6">Company</h5>
                <ul className="list-none p-0">
                  <li className="mb-3"><a href="#" className="no-underline text-gray-500">About Us</a></li>
                  <li className="mb-3"><a href="#" className="no-underline text-gray-500">Compliance</a></li>
                  <li className="mb-3"><a href="#" className="no-underline text-gray-500">Institutional Partners</a></li>
                  <li className="mb-3"><a href="#" className="no-underline text-gray-500">Contact Support</a></li>
                </ul>
              </div>
            </div>
            <div className="max-w-[300px]">
              <h5 className="text-[#111827] text-base font-bold mb-6">Newsletter</h5>
              <p className="mb-4">Stay updated on institutional trade security.</p>
              <div className="flex bg-white rounded-lg overflow-hidden mt-4">
                <input type="text" placeholder="Email address" className="flex-1 border-none p-3.5 outline-none" />
                <button className="bg-[#3F675A] text-white border-none px-4 cursor-pointer"><FiSend /></button>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between pt-8 border-t border-[#D1D5DB] text-sm text-gray-400 gap-4">
            <span>© 2024 TrustVault Escrow. All rights reserved.</span>
            <div className="flex gap-6">
              <a href="#" className="no-underline text-inherit">Privacy Policy</a>
              <a href="#" className="no-underline text-inherit">Terms of Service</a>
              <a href="#" className="no-underline text-inherit">AML Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
