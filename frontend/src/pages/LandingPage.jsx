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
  FiSearch,
  FiAlertCircle,
  FiSettings
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
            A successful payment should guarantee a <span className="text-[#316C5B]">successful service.</span>
          </h1>
          <p className="text-base text-gray-500 max-w-[500px] mb-10 leading-relaxed">
            A trust-based escrow platform that ensures payments are only released after verified service delivery, improving transparency, accountability, and user confidence.
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
          <h2 className="text-4xl font-bold mb-6">The Challenge in Digital Payments</h2>
          <p className="text-gray-600 max-w-[800px] mx-auto mb-15 text-lg leading-relaxed">
            In today’s digital world, making payments online is easy—but ensuring that the service you paid for is actually delivered is still a major challenge. Across industries like healthcare, hospitality, and freelancing, users often face issues such as overcharging, poor service quality, or incomplete work, even after making full payments.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-[#F3F4F6]">
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-lg flex items-center justify-center mb-6"><FiLock size={24} /></div>
              <h3 className="text-xl font-bold mb-3">Poor Service Quality</h3>
              <p className="text-gray-500">Receiving substandard work or incomplete deliverables after the payment is already gone.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-[#F3F4F6]">
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-lg flex items-center justify-center mb-6"><FiAlertCircle size={24} /></div>
              <h3 className="text-xl font-bold mb-3">Overcharging & Fraud</h3>
              <p className="text-gray-500">Service providers abandoning the project or demanding unexpected extra fees.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-[#F3F4F6]">
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-lg flex items-center justify-center mb-6"><FiClock size={24} /></div>
              <h3 className="text-xl font-bold mb-3">Zero Accountability</h3>
              <p className="text-gray-500">Without a neutral middleman, resolving disputes becomes a slow, painful process.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="max-w-[1200px] mx-auto px-5 py-20 flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-6">Our Solution: True Accountability</h2>
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            Our platform solves this problem by introducing a trust-based escrow system that connects payments with real service outcomes.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Instead of transferring money directly to the service provider, payments are securely held in escrow. The provider must first complete the service and submit proof of delivery. The user then verifies whether the service meets expectations. Only after successful verification is the payment released.
          </p>
          <p className="text-gray-600 mb-8 leading-relaxed">
            If any issue arises, both parties can raise a dispute, and the system ensures a fair resolution using proof-based validation and a trust scoring mechanism.
          </p>
          <div className="bg-[#D1FAE5] text-[#065F46] p-6 rounded-xl border border-emerald-200">
            <p className="font-semibold italic">"This approach transforms traditional transactions into a complete, accountable workflow, where both users and service providers are protected."</p>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
           <div className="col-span-full mb-2 flex items-center"><FiSettings className="text-emerald-600 mr-3" size={28} /><h3 className="text-2xl font-bold">What We Offer</h3></div>
           
           <div className="bg-white rounded-xl p-6 shadow-sm border border-[#F3F4F6] flex items-start gap-4">
             <div className="text-emerald-600 mt-1"><FiLock size={20} /></div>
             <p className="font-semibold text-gray-900">Secure escrow-based payments</p>
           </div>
           <div className="bg-white rounded-xl p-6 shadow-sm border border-[#F3F4F6] flex items-start gap-4">
             <div className="text-emerald-600 mt-1"><FiCheckCircle size={20} /></div>
             <p className="font-semibold text-gray-900">Service verification before release</p>
           </div>
           <div className="bg-white rounded-xl p-6 shadow-sm border border-[#F3F4F6] flex items-start gap-4">
             <div className="text-emerald-600 mt-1"><FiFileText size={20} /></div>
             <p className="font-semibold text-gray-900">Proof submission for completed work</p>
           </div>
           <div className="bg-white rounded-xl p-6 shadow-sm border border-[#F3F4F6] flex items-start gap-4">
             <div className="text-emerald-600 mt-1"><FiShield size={20} /></div>
             <p className="font-semibold text-gray-900">Fair dispute resolution system</p>
           </div>
           <div className="bg-white rounded-xl p-6 shadow-sm border border-[#F3F4F6] flex items-start gap-4">
             <div className="text-emerald-600 mt-1"><FiTrendingUp size={20} /></div>
             <p className="font-semibold text-gray-900">Trust score system for reliability</p>
           </div>
           <div className="bg-white rounded-xl p-6 shadow-sm border border-[#F3F4F6] flex items-start gap-4">
             <div className="text-emerald-600 mt-1"><FiLayers size={20} /></div>
             <p className="font-semibold text-gray-900">Role-based dashboards</p>
           </div>
        </div>
      </section>

      {/* WHY IT MATTERS & VISION SECTION */}
      <section className="bg-[#111827] text-white py-24 text-center">
        <div className="max-w-[900px] mx-auto px-5">
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-emerald-400 flex items-center justify-center gap-3"><FiGlobe /> Why It Matters</h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-10">
              By ensuring that payments are tied to verified outcomes, our platform builds a system where trust is not assumed—it is enforced.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                <h4 className="text-lg font-bold mb-2 text-white">Confidence</h4>
                <p className="text-sm text-gray-400">Users gain confidence and control over their payments.</p>
              </div>
              <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                <h4 className="text-lg font-bold mb-2 text-white">Quality</h4>
                <p className="text-sm text-gray-400">Providers are encouraged to deliver quality services.</p>
              </div>
              <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                <h4 className="text-lg font-bold mb-2 text-white">Security</h4>
                <p className="text-sm text-gray-400">Fraud and disputes are significantly reduced.</p>
              </div>
            </div>
          </div>
          
          <div className="pt-16 border-t border-white/10">
            <h2 className="text-3xl font-bold mb-6 text-emerald-400 flex items-center justify-center gap-3"><FiTrendingUp /> Our Vision</h2>
            <p className="text-2xl font-light text-white leading-relaxed italic">
              "We aim to create a future where digital transactions are not just fast, but also trustworthy, transparent, and outcome-driven across all service-based industries."
            </p>
          </div>
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
