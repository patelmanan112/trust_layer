import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import api from '../services/api';
import { 
  FiPlus, FiDollarSign, FiClock, FiCheckCircle, FiAlertCircle, 
  FiBox, FiArrowRight, FiUser, FiBriefcase, FiZap, FiLock,
  FiUploadCloud, FiFileText, FiShield, FiStar, FiSettings, 
  FiTrendingUp, FiMoreHorizontal, FiActivity, FiX, FiPieChart, FiShoppingBag
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';

const Dashboard = () => {
  const { user: authUser } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [disputes, setDisputes] = useState([]);
  const [availableServices, setAvailableServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modals
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showProofUploadModal, setShowProofUploadModal] = useState(null);
  const [showRaiseModal, setShowRaiseModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form States
  const [serviceForm, setServiceForm] = useState({ title: '', description: '', price: '', category: 'Tech' });
  const [paymentForm, setPaymentForm] = useState({ serviceId: '', amount: '', customTitle: '', providerEmail: '' });
  const [raiseForm, setRaiseForm] = useState({ transactionId: '', reason: 'Service was not delivered', description: '' });
  const [proofFile, setProofFile] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [pData, tData, dData, sData] = await Promise.all([
        api.get('/api/users/profile'),
        api.get('/api/transactions'),
        api.get('/api/disputes'),
        api.get('/api/services')
      ]);
      const userData = pData?.user;
      setProfile(userData);
      setTransactions(tData?.transactions || []);
      setDisputes(dData?.disputes || []);
      
      const allServices = sData?.services || [];
      setAvailableServices(allServices);
      // Filter by industry if available
      if (userData?.industry) {
        setFilteredServices(allServices.filter(s => 
          s.category && s.category.toLowerCase() === userData.industry.toLowerCase()
        ));
      } else {
        setFilteredServices(allServices);
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

  const handleCreateService = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/api/services', serviceForm);
      toast.success('Service created successfully');
      setShowServiceModal(false);
      setServiceForm({ title: '', description: '', price: '', category: profile?.industry || 'Tech' });
      fetchData();
    } catch (err) { } finally { setIsSubmitting(false); }
  }, [serviceForm, profile, fetchData]);

  const handleMakePayment = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/api/transactions', {
        serviceId: paymentForm.serviceId,
        customTitle: paymentForm.serviceId === 'custom' ? paymentForm.customTitle : undefined,
        providerEmail: paymentForm.serviceId === 'custom' ? paymentForm.providerEmail : undefined,
        amount: Number(paymentForm.amount)
      });
      toast.success('Payment secured in escrow');
      setShowPaymentModal(false);
      setPaymentForm({ serviceId: '', amount: '', customTitle: '', providerEmail: '' });
      fetchData();
    } catch (err) { } finally { setIsSubmitting(false); }
  }, [paymentForm, fetchData]);

  const handleUploadProof = useCallback(async (e) => {
    e.preventDefault();
    if (!proofFile || !showProofUploadModal) return;
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('proof', proofFile);
      await api.post(`/api/transactions/${showProofUploadModal}/complete`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Work proof submitted');
      setShowProofUploadModal(null);
      setProofFile(null);
      fetchData();
    } catch (err) { } finally { setIsSubmitting(false); }
  }, [proofFile, showProofUploadModal, fetchData]);

  const handleRaiseDispute = useCallback(async (e) => {
    e.preventDefault();
    if (!raiseForm.transactionId || !raiseForm.description.trim()) {
      return toast.error('Please complete all fields');
    }
    setIsSubmitting(true);
    try {
      await api.post('/api/disputes', raiseForm);
      toast.success('Dispute filed successfully');
      setShowRaiseModal(false);
      setRaiseForm({ transactionId: '', reason: 'Service was not delivered', description: '' });
      fetchData();
    } catch (err) { } finally { setIsSubmitting(false); }
  }, [raiseForm, fetchData]);

  const role = profile?.role || 'client';
  const themeColor = role === 'provider' ? '#1a4d3e' : '#1e3a8a';
  const themeBg = role === 'provider' ? 'bg-[#1a4d3e]' : 'bg-[#1e3a8a]';
  const themeLightBg = role === 'provider' ? 'bg-emerald-50' : 'bg-blue-50';
  const themeText = role === 'provider' ? 'text-emerald-600' : 'text-blue-600';

  const activeEscrows = useMemo(() => transactions.filter(t => ['held', 'delivered', 'disputed'].includes(t.status)), [transactions]);
  const activeDisputes = useMemo(() => disputes.filter(d => d.status !== 'resolved'), [disputes]);
  const totalEarnings = useMemo(() => transactions.filter(t => t.status === 'completed').reduce((acc, t) => acc + t.amount, 0), [transactions]);
  const escrowBalance = useMemo(() => transactions.filter(t => ['held', 'delivered', 'disputed'].includes(t.status)).reduce((acc, t) => acc + t.amount, 0), [transactions]);

  if (loading) return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="w-10 h-10 border-2 border-gray-100 border-t-[#316C5B] rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500">
      <SEO title="Dashboard" />
      
      {/* GREETING & STATUS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Welcome back, {profile?.name?.split(' ')[0]}!</h1>
          <p className="text-gray-500 font-medium flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${role === 'provider' ? 'bg-emerald-500' : 'bg-blue-500'}`}></span>
            Active {role === 'provider' ? 'Freelancer' : 'Client'} Session • {profile?.industry} Industry
          </p>
        </div>
        <div className="flex items-center gap-3">
           <div className="px-4 py-2 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center gap-2">
              <FiStar className="text-yellow-500" />
              <span className="text-xs font-black text-gray-900">{profile?.trustScore || 100}% Trust Score</span>
           </div>
           <button className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-gray-900 shadow-sm transition-all"><FiSettings size={18} /></button>
        </div>
      </div>

      {/* METRICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col justify-between min-h-[160px] group hover:shadow-xl transition-all">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{role === 'provider' ? 'Total Earnings' : 'Funds in Escrow'}</p>
          <h2 className="text-3xl font-black text-gray-900">₹{(role === 'provider' ? totalEarnings : escrowBalance).toLocaleString()}</h2>
          <div className={`flex items-center gap-2 ${themeText} text-xs font-bold`}>
             <FiDollarSign /> <span className="uppercase tracking-widest text-[9px]">Verified Balance</span>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col justify-between min-h-[160px] group hover:shadow-xl transition-all">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Contracts</p>
          <h2 className="text-3xl font-black text-gray-900">{activeEscrows.length}</h2>
          <div className={`flex items-center gap-2 ${themeText} text-xs font-bold`}>
             <FiActivity /> <span className="uppercase tracking-widest text-[9px]">Ongoing Projects</span>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col justify-between min-h-[160px] group hover:shadow-xl transition-all">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Resolution Center</p>
          <h2 className="text-3xl font-black text-gray-900">{activeDisputes.length}</h2>
          <div className="flex items-center gap-2 text-red-600 text-xs font-bold">
             <FiAlertCircle /> <span className="uppercase tracking-widest text-[9px]">Pending Disputes</span>
          </div>
        </div>
        <div className={`${themeBg} p-8 rounded-[32px] text-white shadow-xl flex flex-col justify-between min-h-[160px] group hover:scale-[1.02] transition-all`}>
           <p className="text-[10px] font-black text-white/60 uppercase tracking-widest">Quick Action</p>
           {role === 'provider' ? (
             <button onClick={() => setShowServiceModal(true)} className="flex items-center justify-between group/btn">
               <span className="text-lg font-black leading-tight">List New Service</span>
               <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-emerald-900 transition-all">
                 <FiPlus size={20} />
               </div>
             </button>
           ) : (
             <button onClick={() => setShowPaymentModal(true)} className="flex items-center justify-between group/btn">
               <span className="text-lg font-black leading-tight">Start New Escrow</span>
               <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-blue-900 transition-all">
                 <FiPlus size={20} />
               </div>
             </button>
           )}
           <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{role === 'provider' ? 'Grow your business' : 'Secure your funds'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* MAIN FEED (TABLE) */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
             <div className="px-10 py-8 border-b border-gray-50 flex justify-between items-center">
                <h3 className="font-black text-gray-900 uppercase tracking-widest text-[10px]">Recent Activity</h3>
                <Link to="/transactions" className={`text-[10px] font-black ${themeText} uppercase tracking-widest hover:underline`}>View All</Link>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead className="bg-gray-50/50">
                   <tr>
                      <th className="px-10 py-5 text-[9px] font-black text-gray-400 uppercase tracking-widest">Project</th>
                      <th className="px-10 py-5 text-[9px] font-black text-gray-400 uppercase tracking-widest">{role === 'provider' ? 'Client' : 'Partner'}</th>
                      <th className="px-10 py-5 text-[9px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                      <th className="px-10 py-5 text-[9px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                      {role === 'client' && <th className="px-10 py-5 text-[9px] font-black text-gray-400 uppercase tracking-widest">Actions</th>}
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                   {transactions.slice(0, 5).map(txn => (
                     <tr key={txn._id} className="hover:bg-gray-50/50 transition-all group">
                        <td className="px-10 py-6">
                          <div className="font-black text-gray-900 text-sm group-hover:text-emerald-700 transition-colors">{txn.serviceId?.title || 'Custom Project'}</div>
                          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">REF: {txn.transactionId?.slice(-8).toUpperCase() || 'TXN-PENDING'}</div>
                        </td>
                        <td className="px-10 py-6 text-xs font-bold text-gray-500">
                          {role === 'provider' ? txn.clientId?.name : (txn.providerId?.name || 'Assigning...')}
                        </td>
                        <td className="px-10 py-6 font-black text-gray-900">₹{txn.amount.toLocaleString()}</td>
                        <td className="px-10 py-6">
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                            txn.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 
                            txn.status === 'held' ? 'bg-blue-50 text-blue-600' :
                            txn.status === 'delivered' ? 'bg-orange-50 text-orange-600' : 'bg-gray-50 text-gray-400'
                          }`}>{txn.status}</span>
                        </td>
                        {role === 'client' && (
                          <td className="px-10 py-6">
                            {['held', 'delivered'].includes(txn.status) && (
                              <button 
                                onClick={() => {
                                  setRaiseForm({...raiseForm, transactionId: txn._id});
                                  setShowRaiseModal(true);
                                }}
                                className="text-[9px] font-black text-red-600 uppercase tracking-widest hover:underline flex items-center gap-1"
                              >
                                <FiAlertCircle size={12} /> Raise Dispute
                              </button>
                            )}
                          </td>
                        )}
                     </tr>
                   ))}
                   {transactions.length === 0 && (
                     <tr>
                       <td colSpan="4" className="px-10 py-20 text-center text-gray-300 font-black uppercase tracking-widest text-[10px]">No recent activity found</td>
                     </tr>
                   )}
                 </tbody>
               </table>
             </div>
          </div>
        </div>

        {/* SIDE ACTIONS / RECENT STATS */}
        <div className="lg:col-span-4 flex flex-col gap-8">
           <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden">
              <h3 className="font-black text-gray-900 uppercase tracking-widest text-[10px] mb-8">Command Center</h3>
              <div className="flex flex-col gap-4">
                 {role === 'provider' && (
                    <button onClick={() => setShowProofUploadModal('select')} className="flex items-center gap-4 w-full p-5 rounded-3xl border border-gray-50 hover:bg-emerald-50 transition-all group">
                      <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                        <FiUploadCloud size={20} />
                      </div>
                      <div className="text-left">
                        <p className="text-[11px] font-black text-gray-900 uppercase tracking-tight">Submit Evidence</p>
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Deliver project proof</p>
                      </div>
                    </button>
                 )}
                 <button className="flex items-center gap-4 w-full p-5 rounded-3xl border border-gray-50 hover:bg-blue-50 transition-all group">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <FiFileText size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-[11px] font-black text-gray-900 uppercase tracking-tight">Contracts</p>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Review legal papers</p>
                    </div>
                 </button>
                 <button className="flex items-center gap-4 w-full p-5 rounded-3xl border border-gray-100 bg-gray-50/50 hover:bg-gray-100 transition-all group">
                    <div className="w-12 h-12 bg-white text-gray-400 rounded-2xl flex items-center justify-center group-hover:text-gray-900 shadow-sm transition-all">
                      <FiPieChart size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-[11px] font-black text-gray-900 uppercase tracking-tight">Analytics</p>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">View growth trends</p>
                    </div>
                 </button>
              </div>
           </div>

           <div className={`${themeBg} p-10 rounded-[40px] text-white shadow-xl relative overflow-hidden`}>
              <h3 className="font-black text-white/60 uppercase tracking-widest text-[10px] mb-6">Trust & Reliability</h3>
              <div className="flex items-end justify-between">
                 <div>
                    <h4 className="text-4xl font-black mb-1">{profile?.trustScore || 100}%</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Verified Reputation</p>
                 </div>
                 <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                    <FiShield size={32} className={`${role === 'provider' ? 'text-emerald-300' : 'text-blue-300'}`} />
                 </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
           </div>
        </div>
      </div>

      {/* MODALS */}
      {renderModals()}
    </div>
  );

  function renderModals() {
    return (
      <>
        {/* Create Service Modal */}
        {showServiceModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-[40px] w-full max-w-md shadow-2xl p-12 animate-in zoom-in-95">
              <h2 className="text-3xl font-black text-gray-900 mb-8 tracking-tighter">List Service</h2>
              <form onSubmit={handleCreateService} className="flex flex-col gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Service Title</label>
                    <input required value={serviceForm.title} onChange={e => setServiceForm({...serviceForm, title: e.target.value})} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl font-bold text-sm outline-none focus:bg-gray-100" placeholder="e.g. Modern UI Design" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Price (₹)</label>
                      <input required type="number" value={serviceForm.price} onChange={e => setServiceForm({...serviceForm, price: e.target.value})} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl font-bold text-sm outline-none focus:bg-gray-100" placeholder="5000" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Category</label>
                      <select value={serviceForm.category} onChange={e => setServiceForm({...serviceForm, category: e.target.value})} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl font-bold text-sm outline-none focus:bg-gray-100">
                        <option>Tech</option>
                        <option>Hospitality</option>
                        <option>Medical</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Description</label>
                    <textarea required value={serviceForm.description} onChange={e => setServiceForm({...serviceForm, description: e.target.value})} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl font-bold text-sm min-h-[100px] resize-none outline-none focus:bg-gray-100" placeholder="Describe what you offer..."></textarea>
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setShowServiceModal(false)} className="flex-1 text-gray-400 font-black uppercase text-[10px] tracking-widest">Cancel</button>
                  <button className={`flex-[2] py-5 ${themeBg} text-white font-black rounded-3xl uppercase text-[10px] tracking-widest shadow-xl shadow-gray-900/10`}>Launch Service</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* New Escrow Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-[40px] w-full max-w-md shadow-2xl p-12 animate-in zoom-in-95">
              <h2 className="text-3xl font-black text-gray-900 mb-8 tracking-tighter">New Escrow</h2>
              <form onSubmit={handleMakePayment} className="flex flex-col gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Service Provider</label>
                    <select required value={paymentForm.serviceId} onChange={e => {
                      const s = availableServices.find(srv => srv._id === e.target.value);
                      setPaymentForm({...paymentForm, serviceId: e.target.value, amount: s ? s.price : ''});
                    }} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl font-bold text-sm outline-none focus:bg-gray-100">
                      <option value="">Select Partner...</option>
                      {filteredServices.map(s => <option key={s._id} value={s._id}>{s.title} (₹{s.price})</option>)}
                      <option value="custom">Custom Partner</option>
                    </select>
                  </div>
                  {paymentForm.serviceId === 'custom' && (
                    <>
                      <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Freelancer Email Address</label>
                        <input required type="email" value={paymentForm.providerEmail || ''} onChange={e => setPaymentForm({...paymentForm, providerEmail: e.target.value})} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl font-bold text-sm outline-none focus:bg-gray-100" placeholder="freelancer@example.com" />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Contract Name</label>
                        <input required value={paymentForm.customTitle || ''} onChange={e => setPaymentForm({...paymentForm, customTitle: e.target.value})} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl font-bold text-sm outline-none focus:bg-gray-100" placeholder="e.g. Website Overhaul" />
                      </div>
                    </>
                  )}
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Contract Amount (₹)</label>
                    <input required type="number" value={paymentForm.amount} onChange={e => setPaymentForm({...paymentForm, amount: e.target.value})} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl font-bold text-sm outline-none focus:bg-gray-100" placeholder="10000" />
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setShowPaymentModal(false)} className="flex-1 text-gray-400 font-black uppercase text-[10px] tracking-widest">Cancel</button>
                  <button className={`flex-[2] py-5 ${themeBg} text-white font-black rounded-3xl uppercase text-[10px] tracking-widest shadow-xl shadow-gray-900/10`}>Lock Funds</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Proof Upload Modal */}
        {showProofUploadModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-[40px] w-full max-w-md shadow-2xl p-12 animate-in zoom-in-95">
              <div className="flex justify-between items-start mb-8">
                <h2 className="text-3xl font-black text-gray-900 tracking-tighter">Deliver Work</h2>
                <button onClick={() => setShowProofUploadModal(null)}><FiX size={24} className="text-gray-300" /></button>
              </div>
              <form onSubmit={handleUploadProof} className="flex flex-col gap-6">
                <div className="space-y-4">
                  {showProofUploadModal === 'select' && (
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Active Contract</label>
                      <select required onChange={(e) => setShowProofUploadModal(e.target.value)} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl font-bold text-sm outline-none focus:bg-gray-100">
                        <option value="">Select Project...</option>
                        {transactions.filter(t => t.status === 'held').map(t => <option key={t._id} value={t._id}>{t.serviceId?.title || 'Custom'} - ₹{t.amount}</option>)}
                      </select>
                    </div>
                  )}
                  <label className="flex flex-col items-center justify-center w-full p-12 border-4 border-dashed border-gray-50 rounded-[40px] bg-gray-50/50 cursor-pointer hover:bg-emerald-50 hover:border-emerald-200 transition-all group">
                    <FiUploadCloud size={48} className="text-gray-200 group-hover:text-emerald-500 mb-4" />
                    <span className="text-[11px] font-black uppercase tracking-widest text-gray-400 group-hover:text-emerald-600">{proofFile ? proofFile.name : 'Drop Evidence Files'}</span>
                    <input type="file" className="hidden" onChange={e => setProofFile(e.target.files[0])} />
                  </label>
                </div>
                <button disabled={!proofFile || showProofUploadModal === 'select'} className={`w-full py-5 ${themeBg} text-white font-black rounded-3xl uppercase text-[10px] tracking-widest shadow-xl shadow-gray-900/10 disabled:opacity-50`}>Submit Evidence</button>
              </form>
            </div>
          </div>
        )}

        {/* Raise Dispute Modal */}
        {showRaiseModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-[40px] w-full max-w-md shadow-2xl p-12 animate-in zoom-in-95">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-3xl font-black text-gray-900 tracking-tighter">Raise Dispute</h2>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Ref: {raiseForm.transactionId?.slice(-8).toUpperCase()}</p>
                </div>
                <button onClick={() => setShowRaiseModal(false)}><FiX size={24} className="text-gray-300" /></button>
              </div>
              <form onSubmit={handleRaiseDispute} className="flex flex-col gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Reason for Dispute</label>
                    <select required value={raiseForm.reason} onChange={e => setRaiseForm({...raiseForm, reason: e.target.value})} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl font-bold text-sm outline-none focus:bg-gray-100">
                      <option>Service was not delivered</option>
                      <option>Quality of work is poor</option>
                      <option>Communication issues</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Detailed Explanation</label>
                    <textarea required value={raiseForm.description} onChange={e => setRaiseForm({...raiseForm, description: e.target.value})} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl font-bold text-sm min-h-[120px] resize-none outline-none focus:bg-gray-100" placeholder="Please describe the issue in detail..."></textarea>
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setShowRaiseModal(false)} className="flex-1 text-gray-400 font-black uppercase text-[10px] tracking-widest">Cancel</button>
                  <button className="flex-[2] py-5 bg-red-600 text-white font-black rounded-3xl uppercase text-[10px] tracking-widest shadow-xl shadow-red-900/10">File Dispute</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    );
  }
};

export default Dashboard;
