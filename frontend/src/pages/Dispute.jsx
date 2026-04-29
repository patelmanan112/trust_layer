import React, { useState } from 'react';
import { 
  FiAlertTriangle, 
  FiFileText, 
  FiUploadCloud, 
  FiMessageSquare,
  FiCheckCircle,
  FiClock,
  FiPaperclip,
  FiX
} from 'react-icons/fi';

const Dispute = () => {
  const [showRaiseModal, setShowRaiseModal] = useState(false);

  // Mock Data
  const disputes = [
    {
      id: 'DSP-8821',
      transactionId: 'TXN-103',
      provider: 'BlockSec Partners',
      date: 'Oct 26, 2024',
      status: 'Under Review', // 🔵
      reason: 'Service quality is poor',
      description: 'The smart contract audit report was missing several critical modules agreed upon in the contract.',
      evidenceCount: 3,
      amount: '85,000'
    },
    {
      id: 'DSP-8790',
      transactionId: 'TXN-089',
      provider: 'Alpha Logistics',
      date: 'Oct 22, 2024',
      status: 'Open', // 🟡
      reason: 'Service was not delivered',
      description: 'Provider claimed delivery but nothing was received at the designated endpoint.',
      evidenceCount: 0,
      amount: '12,400'
    },
    {
      id: 'DSP-8102',
      transactionId: 'TXN-045',
      provider: 'Studio Creative',
      date: 'Sep 15, 2024',
      status: 'Resolved', // 🟢
      reason: 'Overcharging occurred',
      description: 'Billed for 10 extra hours not logged in the system.',
      evidenceCount: 2,
      amount: '15,000'
    }
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Open':
        return <span className="flex items-center gap-1.5 px-3 py-1 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-full text-xs font-bold uppercase tracking-wider"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> Open</span>;
      case 'Under Review':
        return <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-bold uppercase tracking-wider"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Under Review</span>;
      case 'Resolved':
        return <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-bold uppercase tracking-wider"><div className="w-2 h-2 rounded-full bg-green-500"></div> Resolved</span>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto pb-10 relative">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-[32px] font-bold text-gray-900 mb-2">Dispute Center</h1>
          <p className="text-[15px] text-gray-500 max-w-[600px]">
            Ensure fairness, transparency, and accountability. Resolve conflicts and protect your funds based on verifiable evidence.
          </p>
        </div>
        <button 
          onClick={() => setShowRaiseModal(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 shadow-md transition-colors"
        >
          <FiAlertTriangle size={18} /> Raise a Dispute
        </button>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Open Disputes</p>
            <h2 className="text-3xl font-bold text-gray-900">1</h2>
          </div>
          <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-500">
            <FiAlertTriangle size={24} />
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Under Review</p>
            <h2 className="text-3xl font-bold text-gray-900">1</h2>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
            <FiClock size={24} />
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Resolved</p>
            <h2 className="text-3xl font-bold text-gray-900">1</h2>
          </div>
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-500">
            <FiCheckCircle size={24} />
          </div>
        </div>
      </div>

      {/* DISPUTES LIST */}
      <div className="flex flex-col gap-6">
        {disputes.map((dispute) => (
          <div key={dispute.id} className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col lg:flex-row">
            
            {/* Left Side: Info */}
            <div className="flex-[2] p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{dispute.id}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs font-bold text-gray-500">TXN: {dispute.transactionId}</span>
                </div>
                {getStatusBadge(dispute.status)}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-1">{dispute.reason}</h3>
              <p className="text-sm text-gray-500 font-medium mb-4">Against: <span className="text-gray-900">{dispute.provider}</span> • Date: {dispute.date}</p>
              
              <div className="bg-gray-50 p-4 rounded-xl mb-6">
                <p className="text-sm text-gray-700 leading-relaxed">
                  "{dispute.description}"
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                  <FiPaperclip /> 
                  {dispute.evidenceCount > 0 ? `${dispute.evidenceCount} Files Attached` : 'No Evidence Uploaded'}
                </div>
                {dispute.status !== 'Resolved' && (
                  <button className="text-sm font-bold text-[#316C5B] hover:underline flex items-center gap-1">
                    <FiUploadCloud /> Add More Proof
                  </button>
                )}
              </div>
            </div>

            {/* Right Side: Actions & Amount */}
            <div className="flex-[1] p-6 lg:p-8 bg-gray-50 flex flex-col justify-center items-center text-center lg:items-start lg:text-left">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Disputed Amount</p>
              <p className="text-3xl font-bold text-gray-900 mb-6">₹{dispute.amount}</p>
              
              {dispute.status === 'Open' && (
                <button className="w-full py-3 bg-[#316C5B] text-white font-bold rounded-xl hover:bg-[#255245] transition-colors flex justify-center items-center gap-2 shadow-sm">
                  <FiUploadCloud /> Submit Proof
                </button>
              )}
              {dispute.status === 'Under Review' && (
                <button className="w-full py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-100 transition-colors flex justify-center items-center gap-2 shadow-sm">
                  <FiMessageSquare /> View Admin Updates
                </button>
              )}
              {dispute.status === 'Resolved' && (
                <button className="w-full py-3 bg-green-100 text-green-800 font-bold rounded-xl hover:bg-green-200 transition-colors flex justify-center items-center gap-2 shadow-sm">
                  <FiCheckCircle /> View Resolution Report
                </button>
              )}
            </div>
            
          </div>
        ))}
      </div>

      {/* RAISE DISPUTE MODAL (Mocked for UI demo) */}
      {showRaiseModal && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-[600px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Raise a New Dispute</h2>
                <p className="text-xs text-gray-500 mt-1">Funds will be locked until an admin reviews the evidence.</p>
              </div>
              <button onClick={() => setShowRaiseModal(false)} className="text-gray-400 hover:text-gray-700">
                <FiX size={24} />
              </button>
            </div>
            
            <div className="p-8">
              <div className="mb-5">
                <label className="block text-sm font-bold text-gray-700 mb-2">Select Transaction</label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#316C5B]">
                  <option>TXN-104 - Data Migration Service</option>
                  <option>TXN-105 - Legal Consulting</option>
                </select>
              </div>
              
              <div className="mb-5">
                <label className="block text-sm font-bold text-gray-700 mb-2">Reason for Dispute</label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#316C5B]">
                  <option>Service was not delivered</option>
                  <option>Service quality is poor</option>
                  <option>Overcharging has occurred</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">Detailed Description</label>
                <textarea 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#316C5B] min-h-[100px] resize-none"
                  placeholder="Clearly explain what went wrong..."
                ></textarea>
              </div>

              <div className="mb-8 p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 text-center flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 hover:border-[#316C5B] transition-colors">
                <FiUploadCloud size={32} className="text-[#316C5B] mb-2" />
                <p className="text-sm font-bold text-gray-700">Upload Supporting Proof</p>
                <p className="text-xs text-gray-500 mt-1">Screenshots, documents, or reports (Max 10MB)</p>
              </div>

              <div className="flex gap-4">
                <button onClick={() => setShowRaiseModal(false)} className="flex-1 py-3.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50">
                  Cancel
                </button>
                <button className="flex-1 py-3.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 shadow-md">
                  Submit Dispute
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dispute;
