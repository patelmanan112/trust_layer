import React, { useState, useEffect } from 'react';
import { apiFetch, getToken } from '../lib/api';
import { 
  FiSearch, 
  FiFilter, 
  FiDownload, 
  FiCalendar, 
  FiUser, 
  FiBriefcase 
} from 'react-icons/fi';
import { BiRupee } from 'react-icons/bi';

const TransactionHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    
    let cancelled = false;
    apiFetch('/api/transactions', { token })
      .then(data => {
        if (!cancelled) {
          setTransactions(data?.transactions || []);
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
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);
  };

  // Map statuses to badge colors
  const statusStyles = {
    Held: 'bg-[#ecfdf5] text-[#059669] border-[#a7f3d0]', // Green tone
    Released: 'bg-blue-50 text-blue-600 border-blue-200', // Blue tone
    Disputed: 'bg-red-50 text-red-600 border-red-200',    // Red tone
    Refunded: 'bg-gray-100 text-gray-600 border-gray-300' // Gray tone
  };

  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = txn.service.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          txn.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || txn.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full max-w-[1200px] mx-auto pb-10">
      
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-[32px] font-bold text-gray-900 mb-2">Transaction History</h1>
        <p className="text-[15px] text-gray-500 max-w-[600px]">
          Track all your escrow deposits, releases, and refunds in one place.
        </p>
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        
        {/* Search */}
        <div className="relative w-full md:w-[350px]">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by service or provider..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#316C5B] transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {['All', 'Held', 'Released', 'Disputed', 'Refunded'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                filterStatus === status 
                  ? 'bg-[#316C5B] text-white shadow-md' 
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* CARD GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-10 text-gray-500">Loading transactions...</div>
        ) : error ? (
          <div className="col-span-full text-center py-10 text-red-500">Error: {error}</div>
        ) : filteredTransactions.length > 0 ? (
          filteredTransactions.map((txn) => (
            <div key={txn._id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col group">
              
              {/* Card Header (Service & Badge) */}
              <div className="flex justify-between items-start mb-4 gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <FiBriefcase size={14} />
                    <span className="text-[11px] font-bold uppercase tracking-wider">{txn.transactionId}</span>
                  </div>
                  <h3 className="text-[17px] font-bold text-gray-900 leading-snug">{txn.service}</h3>
                </div>
                <span className={`px-2.5 py-1 border rounded text-[10px] font-bold uppercase tracking-widest ${statusStyles[txn.status]}`}>
                  {txn.status}
                </span>
              </div>

              {/* Provider & Date Details */}
              <div className="flex flex-col gap-2 mb-6 text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <FiUser size={15} className="text-gray-400" />
                  <span className="font-medium text-gray-700">{txn.provider}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <FiCalendar size={15} className="text-gray-400" />
                  <span>{new Date(txn.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>

              {/* Card Footer (Amount & Action) */}
              <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-end">
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Amount</p>
                  <div className="flex items-center text-xl font-bold text-gray-900">
                    <BiRupee size={22} className="text-gray-500 -mr-1" />
                    {formatCurrency(txn.amount, txn.currency)}
                  </div>
                </div>
                
                <button className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-50 text-gray-500 border border-gray-200 hover:bg-[#316C5B] hover:text-white hover:border-[#316C5B] transition-colors" title="Download Invoice">
                  <FiDownload size={16} />
                </button>
              </div>

            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center bg-white border border-gray-200 rounded-2xl border-dashed">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4">
              <FiSearch size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No transactions found</h3>
            <p className="text-gray-500 text-sm">Try adjusting your filters or search term.</p>
            <button 
              onClick={() => { setSearchTerm(''); setFilterStatus('All'); }}
              className="mt-4 text-[#316C5B] font-semibold text-sm hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default TransactionHistory;
