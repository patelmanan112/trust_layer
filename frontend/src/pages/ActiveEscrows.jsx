import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../store/slices/authSlice';
import api from '../services/api';
import { 
  FiShield, 
  FiClock, 
  FiCheckCircle, 
  FiAlertTriangle,
  FiInfo,
  FiSearch,
  FiFilter,
  FiArrowRight,
  FiBox,
  FiBriefcase,
  FiFileText,
  FiZap,
  FiX,
  FiUploadCloud
} from 'react-icons/fi';
import { BiLockAlt, BiRupee } from 'react-icons/bi';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';

const ActiveEscrows = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('all');
  const [transactions, setTransactions] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingId, setProcessingId] = useState(null);
  
  // Proof Upload Modal State
  const [showProofModal, setShowProofModal] = useState(null);
  const [proofFile, setProofFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [txData, profileData] = await Promise.all([
        api.get('/api/transactions'),
        api.get('/api/users/profile')
      ]);
      setTransactions(txData?.transactions || []);
      const userData = profileData?.user || null;
      setProfile(userData);
      if (userData) {
        dispatch(updateUser(userData));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleVerify = useCallback(async (id, decision) => {
    setProcessingId(id);
    try {
      await api.post(`/api/transactions/${id}/verify`, { decision });
      toast.success(decision === 'accept' ? 'Funds released successfully' : 'Dispute initiated');
      fetchData();
    } catch (err) { } finally {
      setProcessingId(null);
    }
  }, [fetchData]);

  const handleUploadProof = useCallback(async (e) => {
    e.preventDefault();
    if (!proofFile || !showProofModal) return;
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('proof', proofFile);
      await api.post(`/api/transactions/${showProofModal}/complete`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Proof of work submitted');
      setShowProofModal(null);
      setProofFile(null);
      fetchData();
    } catch (err) { } finally { setIsSubmitting(false); }
  }, [proofFile, showProofModal, fetchData]);

  const formatCurrency = useCallback((amount) => {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);
  }, []);

  const activeEscrows = useMemo(() => transactions.filter(t => t.status === 'held' || t.status === 'delivered'), [transactions]);
  
  const filteredEscrows = useMemo(() => {
    return activeTab === 'all' 
      ? activeEscrows 
      : activeTab === 'verify' 
        ? activeEscrows.filter(e => e.status === 'delivered')
        : activeEscrows.filter(e => e.status === 'held');
  }, [activeTab, activeEscrows]);

  const totalHeld = useMemo(() => activeEscrows.reduce((acc, t) => acc + t.amount, 0), [activeEscrows]);
  const actionRequired = useMemo(() => profile?.role === 'client' 
    ? activeEscrows.filter(e => e.status === 'delivered').length
    : activeEscrows.filter(e => e.status === 'held').length, [profile, activeEscrows]);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-8 animate-in fade-in duration-500">
      <SEO title="Active Escrows" description="Manage your funds held in secure neutral escrow." />
      
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-3">Active Escrows</h1>
        <p className="text-lg text-gray-500 max-w-[600px] font-medium leading-relaxed">
          {profile?.role === 'provider' 
            ? "Your earned funds are secured in TrustLayer's vaults. Deliver your work milestones to release payment." 
            : "Your funds are locked in secure vaults. Release them only after verifying the quality of work."}
        </p>
      </div>

      {/* METRICS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
            <BiLockAlt size={28} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total in Vault</p>
            <h2 className="text-3xl font-black text-gray-900 flex items-center">
              <BiRupee className="text-gray-400 -mr-1" />
              {formatCurrency(totalHeld)}
            </h2>
          </div>
        </div>
        
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
            <FiClock size={28} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Active Contracts</p>
            <h2 className="text-3xl font-black text-gray-900">{activeEscrows.length}</h2>
          </div>
        </div>

        <div className="bg-[#1a4d3e] rounded-3xl p-8 shadow-xl shadow-[#1a4d3e]/20 flex items-center gap-6 text-white">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-emerald-300">
            <FiZap size={28} className="fill-emerald-300/20" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest mb-1">Action Required</p>
            <h2 className="text-3xl font-black">{actionRequired}</h2>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="flex bg-gray-100/50 p-1.5 rounded-2xl mb-8 w-fit">
        <button 
          onClick={() => setActiveTab('all')}
          className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'all' ? 'bg-white text-gray-900 shadow-lg' : 'text-gray-500 hover:text-gray-900'}`}
        >
          All Active
        </button>
        <button 
          onClick={() => setActiveTab('verify')}
          className={`px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'verify' ? 'bg-white text-gray-900 shadow-lg' : 'text-gray-500 hover:text-gray-900'}`}
        >
          Ready to Verify
          {activeEscrows.filter(e => e.status === 'delivered').length > 0 && (
            <span className="bg-orange-500 text-white px-2 py-0.5 rounded-full text-[10px]">{activeEscrows.filter(e => e.status === 'delivered').length}</span>
          )}
        </button>
      </div>

      {/* ESCROWS LIST */}
      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 animate-pulse">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Opening Secure Vaults...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500 font-bold uppercase tracking-widest">{error}</div>
        ) : filteredEscrows.length === 0 ? (
          <div className="text-center py-24 bg-white border-2 border-dashed border-gray-100 rounded-[40px]">
            <FiShield size={48} className="mx-auto text-gray-200 mb-6" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No active escrows found</h3>
            <p className="text-gray-500 font-medium">Your vault is currently empty. Start a new transaction to see it here.</p>
          </div>
        ) : filteredEscrows.map((escrow) => (
          <div key={escrow._id} className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm hover:shadow-xl transition-all flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 group">
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">ID: {escrow.transactionId}</span>
                <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                  escrow.status === 'delivered' ? 'bg-orange-50 text-orange-700 border border-orange-100' : 'bg-blue-50 text-blue-700 border border-blue-100'
                }`}>
                  {escrow.status === 'delivered' ? 'Ready for Verification' : 'Held in Escrow'}
                </span>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-[#316C5B] transition-colors">{escrow.serviceId?.title || 'Contract'}</h3>
              <p className="text-sm text-gray-500 font-medium mb-4">
                Provider: <span className="text-gray-900 font-bold">{escrow.providerId?.name}</span> • 
                Client: <span className="text-gray-900 font-bold">{escrow.clientId?.name}</span>
              </p>
              
              <div className="flex items-center gap-3 bg-gray-50/50 w-fit px-4 py-2 rounded-xl">
                <div className={`w-2 h-2 rounded-full animate-pulse ${escrow.status === 'delivered' ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
                <span className="text-xs font-bold text-gray-600">
                  {escrow.status === 'delivered' ? 'Service delivery proof uploaded. Waiting for client release.' : 'Funds secured. Provider is working on the service.'}
                </span>
              </div>
            </div>

            <div className="flex flex-col lg:items-end w-full lg:w-auto gap-6 border-t lg:border-t-0 lg:border-l border-gray-100 pt-6 lg:pt-0 lg:pl-10">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 lg:text-right">Held Amount</p>
                <p className="text-3xl font-black text-gray-900 flex items-center lg:justify-end">
                  <BiRupee className="text-gray-400 -mr-1" />
                  {formatCurrency(escrow.amount)}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                {profile?.role === 'client' && escrow.status === 'delivered' && (
                  <>
                    <button 
                      disabled={processingId === escrow._id}
                      onClick={() => handleVerify(escrow._id, 'accept')}
                      className="flex-1 lg:flex-none px-8 py-3 bg-[#316C5B] text-white text-sm font-bold rounded-xl hover:bg-[#255245] transition-all shadow-lg shadow-[#316C5B]/20 disabled:opacity-50"
                    >
                      {processingId === escrow._id ? 'Releasing...' : 'Verify & Release'}
                    </button>
                    <button 
                      disabled={processingId === escrow._id}
                      onClick={() => handleVerify(escrow._id, 'reject')}
                      className="flex-1 lg:flex-none px-6 py-3 bg-white border border-red-100 text-red-600 text-sm font-bold rounded-xl hover:bg-red-50 transition-all"
                    >
                      Dispute
                    </button>
                  </>
                )}
                {profile?.role === 'provider' && escrow.status === 'held' && (
                  <button 
                    onClick={() => setShowProofModal(escrow._id)}
                    className="w-full lg:w-auto px-8 py-3 bg-[#316C5B] text-white text-sm font-bold rounded-xl hover:bg-[#255245] transition-all shadow-lg shadow-[#316C5B]/20"
                  >
                    Upload Proof of Work
                  </button>
                )}
              </div>
            </div>
            
          </div>
        ))}
      </div>

      {/* Proof Upload Modal */}
      {showProofModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-[40px] w-full max-w-md shadow-2xl p-10 animate-in zoom-in-95">
            <div className="flex justify-between items-start mb-8">
              <h2 className="text-3xl font-black text-gray-900 tracking-tighter">Submit Proof</h2>
              <button onClick={() => setShowProofModal(null)}><FiX size={24} className="text-gray-300" /></button>
            </div>
            <form onSubmit={handleUploadProof} className="flex flex-col gap-6">
              <label className="flex flex-col items-center justify-center w-full p-10 border-4 border-dashed border-gray-50 rounded-[32px] bg-gray-50/50 cursor-pointer hover:bg-emerald-50 hover:border-emerald-200 transition-all group">
                <FiUploadCloud size={40} className="text-gray-200 group-hover:text-emerald-500 mb-3" />
                <span className="text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-emerald-600">{proofFile ? proofFile.name : 'Select Proof File'}</span>
                <input type="file" className="hidden" onChange={e => setProofFile(e.target.files[0])} />
              </label>
              <button disabled={!proofFile || isSubmitting} className="w-full py-5 bg-[#1a4d3e] text-white font-black rounded-3xl uppercase text-[10px] tracking-widest shadow-lg shadow-emerald-900/20 disabled:opacity-50">
                {isSubmitting ? 'Uploading...' : 'Submit Evidence'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ActiveEscrows;
