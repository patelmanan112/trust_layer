import React, { useState } from 'react';
import { 
  FiUser, 
  FiShield, 
  FiBell, 
  FiCreditCard, 
  FiCheckCircle, 
  FiLock,
  FiUploadCloud,
  FiSave,
  FiSettings
} from 'react-icons/fi';

const Setting = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile Settings', icon: <FiUser size={18} /> },
    { id: 'security', name: 'Security', icon: <FiShield size={18} /> },
    { id: 'notifications', name: 'Notifications', icon: <FiBell size={18} /> },
    { id: 'billing', name: 'Payment & Billing', icon: <FiCreditCard size={18} /> },
    { id: 'trust', name: 'Trust & Verification', icon: <FiCheckCircle size={18} /> },
    { id: 'privacy', name: 'Privacy & Data', icon: <FiLock size={18} /> },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <div className="animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Settings</h2>
            
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 border-4 border-white shadow-sm overflow-hidden relative group">
                <FiUser size={40} />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <FiUploadCloud className="text-white" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Sarah Jenkins</h3>
                <p className="text-sm text-gray-500 mb-3">Enterprise Client Account</p>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">Upload New</button>
                  <button className="px-4 py-2 text-sm font-semibold text-red-600 hover:underline">Remove</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name / Organization</label>
                <input type="text" defaultValue="Sarah Jenkins" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#316C5B]" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Role</label>
                <input type="text" disabled defaultValue="Client" className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-500 cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <input type="email" defaultValue="sarah.j@enterprise.com" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#316C5B]" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                <input type="tel" defaultValue="+1 (555) 000-0000" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#316C5B]" />
              </div>
            </div>

            <div className="flex justify-end">
              <button className="flex items-center gap-2 px-6 py-3 bg-[#316C5B] text-white font-bold rounded-xl hover:bg-[#255245] shadow-sm transition-colors">
                <FiSave /> Save Changes
              </button>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Security Settings</h2>
            
            <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Change Password</h3>
              <div className="flex flex-col gap-4 max-w-md">
                <input type="password" placeholder="Current Password" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#316C5B]" />
                <input type="password" placeholder="New Password" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#316C5B]" />
                <input type="password" placeholder="Confirm New Password" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#316C5B]" />
                <button className="w-fit mt-2 px-6 py-2.5 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors">
                  Update Password
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">Two-Factor Authentication (2FA)</h3>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account.</p>
                </div>
                <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50">
                  Enable
                </button>
              </div>
            </div>
          </div>
        );

      case 'trust':
        return (
          <div className="animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Trust & Verification</h2>
            
            <div className="bg-gradient-to-br from-[#316C5B] to-[#1a4d3e] rounded-2xl p-8 text-white mb-8 relative overflow-hidden shadow-md">
              <div className="absolute right-0 top-0 opacity-10">
                <FiCheckCircle size={150} className="-mr-10 -mt-10" />
              </div>
              <div className="relative z-10 flex justify-between items-center">
                <div>
                  <p className="text-green-100 font-semibold mb-1 uppercase tracking-wider text-xs">Current Trust Score</p>
                  <h2 className="text-5xl font-bold">98<span className="text-2xl text-green-200">/100</span></h2>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
                  <p className="text-sm font-bold">Status: Verified</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Identity Verification</h3>
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <FiCheckCircle size={20} />
                </div>
                <div>
                  <p className="font-bold text-green-900">Identity Verified</p>
                  <p className="text-xs text-green-700 mt-0.5">Your government ID was approved on Jan 12, 2024.</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="animate-in fade-in duration-300 flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4">
              <FiSettings size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">{tabs.find(t => t.id === activeTab)?.name}</h2>
            <p className="text-sm text-gray-500 max-w-sm">This section is currently under development. Preferences related to this category will appear here soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto pb-10">
      
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-[32px] font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-[15px] text-gray-500 max-w-[600px]">
          Manage your account, preferences, security, and platform behavior.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        
        {/* HORIZONTAL TABS */}
        <div className="w-full overflow-x-auto pb-2 -mb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex items-center gap-3 min-w-max">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-[#316C5B] text-white shadow-md' 
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm min-h-[500px]">
          {renderContent()}
        </div>

      </div>

    </div>
  );
};

export default Setting;
