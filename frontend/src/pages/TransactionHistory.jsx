import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import api from '../services/api';
import { 
  FiSearch, 
  FiFilter, 
  FiDownload, 
  FiCalendar, 
  FiUser, 
  FiBriefcase,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiCornerDownLeft
} from 'react-icons/fi';
import { BiRupee } from 'react-icons/bi';
import SEO from '../components/SEO';

const TransactionHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.get('/api/transactions');
      setTransactions(data?.transactions || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount || 0);
  };

  // Map statuses to badge colors and icons
  const statusConfig = {
    held: { label: 'Held in Escrow', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: <FiClock size={12} /> },
    delivered: { label: 'Delivered', color: 'bg-orange-50 text-orange-700 border-orange-200', icon: <FiCheckCircle size={12} /> },
    completed: { label: 'Completed', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: <FiCheckCircle size={12} /> },
    disputed: { label: 'Disputed', color: 'bg-red-50 text-red-700 border-red-200', icon: <FiAlertCircle size={12} /> },
    refunded: { label: 'Refunded', color: 'bg-gray-50 text-gray-700 border-gray-200', icon: <FiCornerDownLeft size={12} /> }
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter(txn => {
      const title = txn.serviceId?.title || 'Unknown Service';
      const provider = txn.providerId?.name || 'Unknown Provider';
      const client = txn.clientId?.name || 'Unknown Client';
      
      const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            client.toLowerCase().includes(searchTerm.toLowerCase());
                             
      const matchesFilter = filterStatus === 'All' || (txn.status && txn.status.toLowerCase() === filterStatus.toLowerCase());
      return matchesSearch && matchesFilter;
    });
  }, [transactions, searchTerm, filterStatus]);

  const settledVolume = useMemo(() => {
    return transactions.filter(t => t.status === 'completed').reduce((a, b) => a + (b.amount || 0), 0);
  }, [transactions]);

  const activeEscrowVolume = useMemo(() => {
    return transactions.filter(t => t.status === 'held' || t.status === 'delivered').reduce((a, b) => a + (b.amount || 0), 0);
  }, [transactions]);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-8 animate-in fade-in duration-500">
      <SEO title="Transaction Ledger" description="View all your historical escrow payments and service deliveries." />
      
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-3">Transaction History</h1>
        <p className="text-lg text-gray-500 max-w-[600px] font-medium">
          A comprehensive ledger of all your secure escrow transactions and service milestones.
        </p>
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        
        {/* Search */}
        <div className="relative w-full lg:w-[450px]">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by service, provider, or client..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-xl text-[15px] focus:outline-none focus:bg-white focus:border-[#316C5B] transition-all"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          {['All', 'Held', 'Delivered', 'Completed', 'Disputed', 'Refunded'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                filterStatus === status 
                  ? 'bg-[#316C5B] text-white border-[#316C5B] shadow-lg shadow-[#316C5B]/20' 
                  : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* LIST VIEW */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Transaction / Service</th>
                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Parties</th>
                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#316C5B]"></div>
                      <span className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Loading Ledger...</span>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr><td colSpan="5" className="px-8 py-20 text-center text-red-500 font-bold uppercase tracking-widest">Error: {error}</td></tr>
              ) : filteredTransactions.length > 0 ? (
                filteredTransactions.map((txn, idx) => {
                  const config = statusConfig[txn.status] || { label: txn.status || 'Unknown', color: 'bg-gray-50 text-gray-500 border-gray-100', icon: <FiClock /> };
                  return (
                    <tr key={txn._id} className={`group hover:bg-gray-50/50 transition-colors ${idx !== filteredTransactions.length - 1 ? 'border-b border-gray-50' : ''}`}>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-gray-900 group-hover:text-[#316C5B] transition-colors">{txn.serviceId?.title || 'Custom Contract'}</span>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-1">ID: {txn.transactionId || 'TXN-PENDING'}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-[10px] font-bold italic">C</div>
                            <span className="text-xs font-bold text-gray-700">{txn.clientId?.name || 'Unknown'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold italic">P</div>
                            <span className="text-xs font-bold text-gray-700">{txn.providerId?.name || 'Unknown'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 border rounded-xl text-[11px] font-black uppercase tracking-wider ${config.color}`}>
                          {config.icon}
                          {config.label}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center text-lg font-black text-gray-900">
                          <BiRupee className="text-gray-400 -mr-1" />
                          {formatCurrency(txn.amount)}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-[#316C5B] hover:border-[#316C5B] hover:shadow-lg transition-all" title="View Details">
                          <FiDownload size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="px-8 py-32 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-6 border-4 border-white shadow-inner">
                        <FiBriefcase size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">No transaction data found</h3>
                      <p className="text-gray-500 font-medium text-sm mb-8">Try adjusting your filters or search term to locate your records.</p>
                      <button 
                        onClick={() => { setSearchTerm(''); setFilterStatus('All'); }}
                        className="px-6 py-3 bg-[#316C5B] text-white font-bold rounded-xl hover:bg-[#255245] shadow-lg shadow-[#316C5B]/20 transition-all"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FOOTER STATS */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Items</p>
          <p className="text-2xl font-black text-gray-900">{transactions.length}</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Settled Volume</p>
          <p className="text-2xl font-black text-[#316C5B]">₹{formatCurrency(settledVolume)}</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Active Escrow</p>
          <p className="text-2xl font-black text-orange-600">₹{formatCurrency(activeEscrowVolume)}</p>
        </div>
      </div>

    </div>
  );
};

export default TransactionHistory;
