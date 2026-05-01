import React, { useEffect, useState } from 'react';
import { 
  FiCheckCircle, 
  FiAlertCircle, 
  FiArrowRight,
  FiShield,
  FiClock,
  FiDollarSign,
  FiBox,
  FiPlus,
  FiZap,
  FiUser,
  FiChevronRight,
  FiBell
} from 'react-icons/fi';
import { BiTrendingUp } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { apiFetch, getToken, setToken } from '../lib/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch Profile, Transactions and Disputes in parallel
        const [profileData, txData, disputeData] = await Promise.all([
          apiFetch('/api/users/profile', { token }),
          apiFetch('/api/transactions', { token }),
          apiFetch('/api/disputes', { token })
        ]);

        setProfile(profileData?.user || null);
        setTransactions(txData?.transactions || []);
        setDisputes(disputeData?.disputes || []);
      } catch (err) {
        console.error('Fetch error:', err);
        if (err.statusCode === 401) {
          setToken(null);
          navigate('/login', { replace: true });
        } else {
          setError('Failed to load dashboard data. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#316C5B]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 font-semibold">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-[#316C5B] text-white rounded-lg">Retry</button>
      </div>
    );
  }

  const role = profile?.role || 'client';
  const name = profile?.name || 'User';
  const trustScore = profile?.trustScore || 100;

  // Calculate Metrics
  const activeEscrows = transactions.filter(t => t.status === 'held' || t.status === 'delivered');
  const activeDisputes = disputes.filter(d => d.status === 'open' || d.status === 'under_review');
  const completedTxns = transactions.filter(t => t.status === 'completed');
  
  const totalVolume = transactions.reduce((acc, t) => acc + t.amount, 0);
  const totalEarnings = role === 'provider' 
    ? transactions.filter(t => t.status === 'completed').reduce((acc, t) => acc + t.amount, 0)
    : 0;
  const escrowBalance = role === 'client'
    ? transactions.filter(t => t.status === 'held' || t.status === 'delivered').reduce((acc, t) => acc + t.amount, 0)
    : 0;

  const completionRate = transactions.length > 0 
    ? Math.round((completedTxns.length / transactions.length) * 100) 
    : 100;

  // Identify Active Items needing attention
  const pendingActions = role === 'client'
    ? activeEscrows.filter(t => t.status === 'delivered') // Needs verification
    : role === 'provider'
    ? activeEscrows.filter(t => t.status === 'held') // Provider needs to complete
    : activeDisputes; // Admin needs to resolve disputes

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 lg:px-8 py-8 animate-in fade-in duration-500">
      
      {/* 1. PROFILE SNAPSHOT & QUICK ACTIONS */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#ecfdf5] rounded-full flex items-center justify-center text-[#316C5B]">
            <FiUser size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Hello, {name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 bg-[#316C5B] text-white text-[10px] font-bold rounded uppercase tracking-wider">{role}</span>
              <span className="text-xs text-gray-400 font-medium italic">Institutional ID: #{profile?.id?.slice(-6).toUpperCase()}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {role === 'provider' && (
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#316C5B] text-white font-bold text-sm hover:bg-[#255245] transition-all shadow-lg shadow-[#316C5B]/20">
              <FiPlus /> Create Service
            </button>
          )}
          {role === 'client' && (
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#316C5B] text-white font-bold text-sm hover:bg-[#255245] transition-all shadow-lg shadow-[#316C5B]/20">
              <FiDollarSign /> Make Payment
            </button>
          )}
          {role === 'admin' && (
            <button onClick={() => navigate('/disputes')} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition-all shadow-lg shadow-red-600/20">
              <FiAlertCircle /> Resolve Disputes
            </button>
          )}
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-all">
            <FiShield /> Verify Identity
          </button>
        </div>
      </div>

      {/* 2. OVERVIEW CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
            {role === 'client' ? 'Escrow Balance' : role === 'admin' ? 'Platform Volume' : 'Total Earnings'}
          </p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold text-gray-900">₹{(role === 'client' ? escrowBalance : role === 'admin' ? totalVolume : totalEarnings).toLocaleString()}</h3>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <FiDollarSign size={20} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Active {role === 'provider' ? 'Services' : 'Escrows'}</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold text-gray-900">{activeEscrows.length}</h3>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <FiBox size={20} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Active Disputes</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold text-red-600">{activeDisputes.length}</h3>
            <div className="p-2 bg-red-50 text-red-600 rounded-lg">
              <FiAlertCircle size={20} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Completed</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold text-gray-900">{completedTxns.length}</h3>
            <div className="p-2 bg-gray-50 text-gray-600 rounded-lg">
              <FiCheckCircle size={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-8">
          
          {/* 3. ACTIVE ITEMS SECTION */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <FiZap className="text-orange-500" /> Active Real-Time Work
              </h3>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{pendingActions.length} Actions Required</span>
            </div>
            
            <div className="p-6">
              {pendingActions.length === 0 ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                    <FiCheckCircle size={32} />
                  </div>
                  <p className="text-gray-500 font-medium text-sm">Everything is up to date! No pending actions.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pendingActions.slice(0, 4).map((item) => (
                    <div key={item.id} className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 hover:border-[#316C5B]/30 transition-all group">
                      <div className="flex justify-between items-start mb-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          role === 'admin' ? 'bg-red-100 text-red-700' :
                          item.status === 'delivered' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {role === 'admin' ? `Dispute ${item.status}` :
                           item.status === 'delivered' ? 'Ready for verification' : 'Waiting for provider'}
                        </span>
                        <p className="text-xs font-bold text-gray-900">₹{item.amount.toLocaleString()}</p>
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 mb-4 line-clamp-1">
                        {role === 'admin' ? item.reason : (item.serviceId?.title || 'Transaction #' + item.transactionId)}
                      </h4>
                      
                      <div className="flex gap-2">
                        {role === 'client' && item.status === 'delivered' && (
                          <button onClick={() => navigate('/escrows')} className="flex-1 py-2 bg-[#316C5B] text-white rounded-lg text-xs font-bold hover:bg-[#255245] transition-colors">
                            Verify Now
                          </button>
                        )}
                        {role === 'provider' && item.status === 'held' && (
                          <button onClick={() => navigate('/escrows')} className="flex-1 py-2 bg-[#316C5B] text-white rounded-lg text-xs font-bold hover:bg-[#255245] transition-colors">
                            Upload Proof
                          </button>
                        )}
                        {role === 'admin' && (
                          <button onClick={() => navigate('/disputes')} className="flex-1 py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition-colors">
                            Resolve
                          </button>
                        )}
                        <button onClick={() => navigate(role === 'admin' ? '/disputes' : '/transactions')} className="flex-1 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors">
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 4. TRANSACTION SUMMARY */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
              <h3 className="font-bold text-gray-900">Recent Transactions</h3>
              <button onClick={() => navigate('/transactions')} className="text-xs font-bold text-[#316C5B] hover:underline flex items-center gap-1">
                View All <FiChevronRight />
              </button>
            </div>
            <div className="p-0">
              {transactions.length === 0 ? (
                <p className="p-8 text-center text-sm text-gray-500 font-medium">No transactions found.</p>
              ) : (
                <div className="flex flex-col">
                  {transactions.slice(0, 5).map((txn, idx) => (
                    <div key={txn.id} className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${idx !== 4 ? 'border-b border-gray-50' : ''}`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          txn.status === 'completed' ? 'bg-emerald-50 text-emerald-600' :
                          txn.status === 'disputed' ? 'bg-red-50 text-red-600' :
                          'bg-blue-50 text-blue-600'
                        }`}>
                          {txn.status === 'completed' ? <FiCheckCircle /> : txn.status === 'disputed' ? <FiAlertCircle /> : <FiClock />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{txn.serviceId?.title || 'Contract'}</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase">{txn.status}</p>
                        </div>
                      </div>
                      <p className="text-sm font-bold text-gray-900">₹{txn.amount.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-8">
          
          {/* 5. TRUST / PERFORMANCE */}
          <div className="bg-[#1a4d3e] p-8 rounded-2xl shadow-xl shadow-[#1a4d3e]/20 text-white relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest mb-6">Trust Intelligence</p>
              
              <div className="mb-8">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-4xl font-black">{trustScore}</span>
                  <span className="text-xs font-bold text-emerald-300">TRUST SCORE</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full transition-all duration-1000" style={{ width: `${trustScore}%` }}></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold text-emerald-300 uppercase mb-1">Completion</p>
                  <p className="text-xl font-bold">{completionRate}%</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-emerald-300 uppercase mb-1">Disputes</p>
                  <p className="text-xl font-bold">{Math.round((activeDisputes.length / (transactions.length || 1)) * 100)}%</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl"></div>
          </div>

          {/* 6. DISPUTE SUMMARY */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
              <h3 className="font-bold text-gray-900">Dispute Center</h3>
              <button onClick={() => navigate('/disputes')} className="text-xs font-bold text-[#316C5B] hover:underline">Manage</button>
            </div>
            <div className="p-6">
              {activeDisputes.length === 0 ? (
                <div className="text-center py-4">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiCheckCircle size={20} />
                  </div>
                  <p className="text-xs text-gray-500 font-bold">No active disputes!</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {activeDisputes.slice(0, 3).map(dispute => (
                    <div key={dispute.id} className="p-3 border border-gray-100 rounded-xl bg-gray-50/50">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[9px] font-bold px-1.5 py-0.5 bg-red-100 text-red-700 rounded uppercase tracking-wider">{dispute.status}</span>
                        <span className="text-[9px] font-bold text-gray-400">ID: {dispute.disputeId}</span>
                      </div>
                      <p className="text-xs font-bold text-gray-900 line-clamp-1">{dispute.reason}</p>
                      <button onClick={() => navigate('/disputes')} className="mt-2 text-[10px] font-bold text-[#316C5B] flex items-center gap-1 hover:underline">
                        Respond Now <FiArrowRight size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 7. NOTIFICATIONS PANEL */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <FiBell className="text-blue-500" /> Notifications
              </h3>
            </div>
            <div className="p-4">
              <div className="flex flex-col gap-4">
                {transactions.length > 0 ? (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 shrink-0 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      <FiZap size={14} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">New Transaction Activity</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">Your recent contract for "{transactions[0]?.serviceId?.title || 'Service'}" was updated.</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-center py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">No new notifications</p>
                )}
                <div className="flex gap-3">
                  <div className="w-8 h-8 shrink-0 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <FiShield size={14} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">Security Guard Active</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">Your assets are protected by TrustLayer Institutional Shield.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* FOOTER SECTION */}
      <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-[11px] font-bold uppercase tracking-widest">
        <div>© 2024 TrustLayer Institutional. All rights reserved.</div>
        <div className="flex gap-6">
          <button className="hover:text-gray-900 transition-colors">Privacy</button>
          <button className="hover:text-gray-900 transition-colors">Terms</button>
          <button className="hover:text-gray-900 transition-colors">AML Policy</button>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
