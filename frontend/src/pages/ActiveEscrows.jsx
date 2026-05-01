import React, { useState, useEffect } from 'react';
import { apiFetch, getToken } from '../lib/api';
import { 
  FiShield, 
  FiClock, 
  FiCheckCircle, 
  FiAlertTriangle,
  FiInfo,
  FiSearch,
  FiFilter,
  FiArrowRight
} from 'react-icons/fi';
import { BiLockAlt } from 'react-icons/bi';

const ActiveEscrows = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [escrows, setEscrows] = useState([]);
  const [summary, setSummary] = useState({ totalHeld: 0, ongoing: 0, actionRequired: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    
    let cancelled = false;
    Promise.all([
      apiFetch('/api/escrows', { token }),
      apiFetch('/api/escrows/summary', { token })
    ])
    .then(([escrowsData, summaryData]) => {
      if (!cancelled) {
        setEscrows(escrowsData?.escrows || []);
        setSummary(summaryData || { totalHeld: 0, ongoing: 0, actionRequired: 0 });
        setLoading(false);
      }
    })
    .catch(err => {
      if (!cancelled) {
        setError(err.message);
        setLoading(false);
      }
    });
      
    return () => { cancelled = true; };
  }, []);

  const formatCurrency = (amount, currency = 'INR') => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
  };

  const filteredEscrows = activeTab === 'all' ? escrows : escrows.filter(e => e.type === activeTab);

  return (
    <div className="w-full max-w-[1100px] mx-auto pb-10">
      
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-[32px] font-bold text-gray-900 mb-2">Active Escrows</h1>
        <p className="text-[15px] text-gray-500 max-w-[600px]">
          Payments held securely until the service is verified and completed. 
          <span className="inline-flex items-center gap-1 text-[#316C5B] font-medium ml-2 cursor-help group relative">
            <FiInfo size={16} /> How it works
            {/* Tooltip */}
            <div className="absolute top-full left-0 mt-2 w-[300px] bg-gray-900 text-white text-xs p-4 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 shadow-xl">
              <p className="font-bold mb-1 text-sm">The "Locker" Analogy</p>
              <p className="text-gray-300 leading-relaxed">
                Money is kept in a secure system "locker" until both sides agree the work is done. It is not sent to the provider immediately. Once you verify the service, it moves to Completed and funds are Released.
              </p>
            </div>
          </span>
        </p>
      </div>

      {/* METRICS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-[#ecfdf5] rounded-full flex items-center justify-center text-[#059669]">
            <BiLockAlt size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Total Held in Vault</p>
            <h2 className="text-2xl font-bold text-gray-900">{formatCurrency(summary.totalHeld)}</h2>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
            <FiClock size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Ongoing Services</p>
            <h2 className="text-2xl font-bold text-gray-900">{summary.ongoing}</h2>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-500">
            <FiCheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Action Required</p>
            <h2 className="text-2xl font-bold text-gray-900">{summary.actionRequired}</h2>
          </div>
        </div>
      </div>

      {/* TABS & SEARCH */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-colors ${activeTab === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            All Active
          </button>
          <button 
            onClick={() => setActiveTab('verify')}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${activeTab === 'verify' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Needs Verification
            <span className="bg-orange-100 text-orange-600 px-1.5 rounded-full text-xs">1</span>
          </button>
          <button 
            onClick={() => setActiveTab('ongoing')}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-colors ${activeTab === 'ongoing' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Ongoing
          </button>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search escrows..." 
              className="w-full sm:w-[250px] pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#316C5B] transition-colors"
            />
          </div>
          <button className="p-2.5 bg-white border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors">
            <FiFilter />
          </button>
        </div>
      </div>

      {/* ESCROWS LIST */}
      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading escrows...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">Error: {error}</div>
        ) : filteredEscrows.length === 0 ? (
          <div className="text-center py-10 text-gray-500 border border-dashed border-gray-300 rounded-2xl">No escrows found.</div>
        ) : filteredEscrows.map((escrow) => (
          <div key={escrow._id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{escrow.escrowId}</span>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                  escrow.type === 'verify' ? 'bg-orange-100 text-orange-700' : 'bg-blue-50 text-blue-600'
                }`}>
                  {escrow.status.replace(/_/g, ' ')}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{escrow.title}</h3>
              <p className="text-sm text-gray-500 mb-3">Provider: <span className="font-semibold text-gray-700">{escrow.provider}</span> • Created {new Date(escrow.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${escrow.type === 'verify' ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
                <span className="text-gray-600 font-medium">{escrow.statusDesc || 'No status description.'}</span>
              </div>
            </div>

            <div className="flex flex-col md:items-end w-full md:w-auto gap-4 md:gap-6 border-t border-gray-100 pt-4 md:pt-0 md:border-t-0 md:border-l md:pl-6">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 md:text-right">Held Amount</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(escrow.amount, escrow.currency)}</p>
              </div>
              
              {escrow.type === 'verify' ? (
                <div className="flex gap-2 w-full md:w-auto">
                  <button className="flex-1 md:flex-none px-5 py-2.5 bg-[#316C5B] text-white text-sm font-semibold rounded-lg hover:bg-[#255245] transition-colors shadow-sm">
                    Verify & Release
                  </button>
                  <button className="flex-1 md:flex-none px-4 py-2.5 bg-white border border-gray-200 text-red-600 text-sm font-semibold rounded-lg hover:bg-red-50 hover:border-red-200 transition-colors">
                    Dispute
                  </button>
                </div>
              ) : (
                <button className="w-full md:w-auto px-6 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  View Details <FiArrowRight />
                </button>
              )}
            </div>
            
          </div>
        ))}
      </div>

    </div>
  );
};

export default ActiveEscrows;
