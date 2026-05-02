import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import api from '../services/api';
import { 
  FiAlertTriangle, 
  FiFileText, 
  FiUploadCloud, 
  FiMessageSquare,
  FiCheckCircle,
  FiClock,
  FiPaperclip,
  FiX,
  FiFile,
  FiTrash2,
  FiInfo,
  FiArrowRight,
  FiPlus,
  FiShield
} from 'react-icons/fi';
import { BiRupee } from 'react-icons/bi';
import toast from 'react-hot-toast';

const Dispute = () => {
  const { token, user } = useSelector((state) => state.auth);
  const [showRaiseModal, setShowRaiseModal]     = useState(false);
  const [showProofModal, setShowProofModal]     = useState(null); // holds dispute id
  const [proofFiles, setProofFiles]             = useState([]);
  const [proofDescription, setProofDescription] = useState('');
  const [proofSubmitting, setProofSubmitting]   = useState(false);
  const [proofSuccess, setProofSuccess]         = useState(false);

  const [disputes, setDisputes] = useState([]);
  const [summary, setSummary] = useState({ Open: 0, 'Under Review': 0, Resolved: 0 });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Raise dispute state
  const [raiseTxnId, setRaiseTxnId] = useState('');
  const [raiseReason, setRaiseReason] = useState('Service was not delivered');
  const [raiseDescription, setRaiseDescription] = useState('');
  const [raiseSubmitting, setRaiseSubmitting] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [disputesData, summaryData, txnsData] = await Promise.all([
        api.get('/api/disputes'),
        api.get('/api/disputes/summary'),
        api.get('/api/transactions')
      ]);
      setDisputes(disputesData?.disputes || []);
      setSummary(summaryData || { Open: 0, 'Under Review': 0, Resolved: 0 });
      setTransactions(txnsData?.transactions || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const getStatusConfig = useCallback((status) => {
    switch(status?.toLowerCase()) {
      case 'open':
        return { label: 'Open', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: <FiAlertTriangle size={12} /> };
      case 'under_review':
        return { label: 'Under Review', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: <FiClock size={12} /> };
      case 'resolved':
        return { label: 'Resolved', color: 'bg-green-50 text-green-700 border-green-200', icon: <FiCheckCircle size={12} /> };
      default: 
        return { label: status, color: 'bg-gray-50 text-gray-700 border-gray-200', icon: <FiInfo size={12} /> };
    }
  }, []);

  const handleFileChange = useCallback((e) => {
    const selected = Array.from(e.target.files);
    setProofFiles(prev => [...prev, ...selected].slice(0, 5));
  }, []);

  const removeFile = useCallback((idx) => setProofFiles(prev => prev.filter((_, i) => i !== idx)), []);

  const handleProofSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (proofFiles.length === 0) return;
    setProofSubmitting(true);
    
    try {
      const formData = new FormData();
      proofFiles.forEach(f => formData.append('proof', f));
      
      await api.post(`/api/disputes/${showProofModal}/proof`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setProofSuccess(true);
      toast.success('Evidence submitted successfully');
      setTimeout(() => {
        setShowProofModal(null);
        setProofFiles([]);
        setProofDescription('');
        setProofSuccess(false);
        loadData();
      }, 1500);
    } catch (err) {
      // toast.error handles this via interceptor
    } finally {
      setProofSubmitting(false);
    }
  }, [proofFiles, showProofModal, loadData]);

  const handleRaiseDispute = useCallback(async () => {
    if (!raiseTxnId) return toast.error('Please select a transaction');
    if (!raiseDescription.trim()) return toast.error('Description is required');
    
    setRaiseSubmitting(true);
    try {
      await api.post('/api/disputes', {
        transactionId: raiseTxnId,
        reason: raiseReason,
        description: raiseDescription
      });
      toast.success('Dispute filed successfully');
      setShowRaiseModal(false);
      setRaiseTxnId('');
      setRaiseDescription('');
      loadData();
    } catch (err) {
    } finally {
      setRaiseSubmitting(false);
    }
  }, [raiseTxnId, raiseDescription, raiseReason, loadData]);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-8 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-3">Dispute Center</h1>
          <p className="text-lg text-gray-500 max-w-[600px] font-medium leading-relaxed">
            Protecting your interests through verifiable evidence and expert resolution.
          </p>
        </div>
        {user?.role === 'client' && (
          <button 
            onClick={() => setShowRaiseModal(true)}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-red-600 text-white font-black text-sm hover:bg-red-700 shadow-xl shadow-red-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <FiAlertTriangle size={20} /> Raise a Dispute
          </button>
        )}
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Open Cases</p>
            <h2 className="text-4xl font-black text-gray-900">{summary.Open || 0}</h2>
          </div>
          <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-transform">
            <FiAlertTriangle size={28} />
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Under Review</p>
            <h2 className="text-4xl font-black text-gray-900">{summary['Under Review'] || 0}</h2>
          </div>
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
            <FiClock size={28} />
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Resolved</p>
            <h2 className="text-4xl font-black text-gray-900">{summary.Resolved || 0}</h2>
          </div>
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
            <FiCheckCircle size={28} />
          </div>
        </div>
      </div>

      {/* DISPUTES LIST */}
      <div className="flex flex-col gap-8">
        {loading ? (
          <div className="text-center py-24 bg-white rounded-[40px] border border-gray-100">
            <div className="w-10 h-10 border-2 border-gray-100 border-t-[#316C5B] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Consulting Registry...</p>
          </div>
        ) : disputes.length === 0 ? (
          <div className="text-center py-24 bg-white border-2 border-dashed border-gray-100 rounded-[40px]">
            <FiShield size={48} className="mx-auto text-gray-200 mb-6" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No disputes on record</h3>
            <p className="text-gray-500 font-medium">Your account is in good standing with no active conflicts.</p>
          </div>
        ) : disputes.map((dispute) => {
          const config = getStatusConfig(dispute.status);
          return (
            <div key={dispute._id} className="bg-white border border-gray-100 rounded-[32px] shadow-sm hover:shadow-2xl transition-all overflow-hidden flex flex-col lg:flex-row group">
              
              {/* Left Side: Info */}
              <div className="flex-[2] p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-50">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">ID: {dispute._id?.substring(dispute._id.length-8)}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span className="text-[10px] font-black text-[#316C5B] uppercase tracking-widest">TXN: {dispute.transactionId?.transactionId || 'N/A'}</span>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1.5 border rounded-xl text-[10px] font-black uppercase tracking-wider ${config.color}`}>
                    {config.icon}
                    {config.label}
                  </div>
                </div>
                
                <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-red-600 transition-colors">{dispute.reason}</h3>
                <p className="text-sm text-gray-500 font-medium mb-6">
                  Against: <span className="text-gray-900 font-bold">{dispute.providerId?.name}</span> • 
                  Date: <span className="text-gray-900 font-bold">{new Date(dispute.createdAt).toLocaleDateString()}</span>
                </p>
                
                <div className="bg-gray-50/50 p-6 rounded-2xl mb-8 border border-gray-100">
                  <p className="text-sm text-gray-700 leading-relaxed font-medium italic">"{dispute.description}"</p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                      <FiPaperclip size={14} className="text-gray-400" /> 
                      {dispute.proof && dispute.proof.length > 0 ? `${dispute.proof.length} Evidentiary Files` : 'No Evidence Provided'}
                    </div>
                    {dispute.status !== 'resolved' && (
                      <button 
                        onClick={() => setShowProofModal(dispute._id)}
                        className="text-[11px] font-black text-[#316C5B] uppercase tracking-widest hover:underline flex items-center gap-2"
                      >
                        <FiPlus size={14} /> {user?.role === 'provider' ? 'Add Counter-Proof' : 'Add Evidence'}
                      </button>
                    )}
                  </div>

                  {dispute.proof && dispute.proof.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {dispute.proof.map((file, idx) => {
                        const fileName = file.split(/[\\/]/).pop();
                        const isImage = /\.(jpg|jpeg|png|gif)$/i.test(fileName);
                        const fileUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/${file.replace(/\\/g, '/')}`;
                        
                        return (
                          <a 
                            key={idx} 
                            href={fileUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl hover:bg-white hover:border-[#316C5B] hover:shadow-md transition-all group"
                          >
                            {isImage ? <FiUploadCloud className="text-[#316C5B]" /> : <FiFileText className="text-blue-500" />}
                            <span className="text-[10px] font-bold text-gray-500 group-hover:text-gray-900 truncate max-w-[100px]">{fileName}</span>
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side: Actions & Amount */}
              <div className="flex-[1] p-8 lg:p-10 bg-gray-50/50 flex flex-col justify-center items-center text-center lg:items-start lg:text-left">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Disputed Funds</p>
                <h2 className="text-4xl font-black text-gray-900 mb-8 flex items-center">
                  <BiRupee className="text-gray-400 -mr-1" />
                  {new Intl.NumberFormat('en-IN').format(dispute.transactionId?.amount || 0)}
                </h2>
                
                {dispute.status === 'open' && (
                  <button 
                    onClick={() => setShowProofModal(dispute._id)}
                    className="w-full py-4 bg-[#316C5B] text-white font-black rounded-2xl hover:bg-[#255245] transition-all flex justify-center items-center gap-3 shadow-xl shadow-[#316C5B]/20"
                  >
                    <FiUploadCloud size={18} /> {user?.role === 'provider' ? 'Submit Counter-Proof' : 'Submit Evidence'}
                  </button>
                )}
                {dispute.status === 'under_review' && (
                  <button className="w-full py-4 bg-white border border-gray-200 text-gray-700 font-black rounded-2xl hover:bg-gray-100 transition-all flex justify-center items-center gap-3 shadow-sm">
                    <FiMessageSquare size={18} /> Admin Status
                  </button>
                )}
                {dispute.status === 'resolved' && (
                  <button className="w-full py-4 bg-emerald-100 text-emerald-800 font-black rounded-2xl hover:bg-emerald-200 transition-all flex justify-center items-center gap-3 shadow-sm">
                    <FiCheckCircle size={18} /> Resolution Report
                  </button>
                )}
              </div>
              
            </div>
          );
        })}
      </div>

      {/* ── SUBMIT PROOF MODAL ─────────────────────────────────────── */}
      {showProofModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] w-full max-w-[500px] shadow-2xl p-8 animate-in zoom-in-95 duration-200">
            
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Submit Evidence</h2>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Dispute: {showProofModal.substring(showProofModal.length-8)}</p>
              </div>
              <button onClick={() => { setShowProofModal(null); setProofFiles([]); setProofDescription(''); }} className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                <FiX size={24} />
              </button>
            </div>

            {proofSuccess ? (
              <div className="py-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600 mb-6 animate-bounce">
                  <FiCheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Evidence Recorded</h3>
                <p className="text-gray-500 font-medium">The review committee has been notified.</p>
              </div>
            ) : (
              <form onSubmit={handleProofSubmit} className="flex flex-col gap-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Upload Files (Max 5)</label>
                  <label className="flex flex-col items-center justify-center gap-3 w-full p-8 border-2 border-dashed border-gray-100 rounded-3xl bg-gray-50/50 text-center cursor-pointer hover:bg-emerald-50 hover:border-emerald-200 transition-all group">
                    <FiUploadCloud size={32} className="text-gray-300 group-hover:text-[#316C5B] transition-colors" />
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-widest">Select Files</p>
                    <input type="file" multiple className="hidden" onChange={handleFileChange} />
                  </label>
                </div>

                {proofFiles.length > 0 && (
                  <div className="flex flex-col gap-2 max-h-[150px] overflow-y-auto pr-2">
                    {proofFiles.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <span className="text-xs font-bold text-gray-700 truncate">{file.name}</span>
                        <button type="button" onClick={() => removeFile(idx)} className="text-red-400 hover:text-red-600">
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-3 mt-2">
                  <button 
                    type="button"
                    onClick={() => setShowProofModal(null)}
                    className="flex-1 py-4 border border-gray-100 text-gray-700 font-black rounded-2xl hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    disabled={proofSubmitting || proofFiles.length === 0}
                    className="flex-1 py-4 bg-[#316C5B] text-white font-black rounded-2xl hover:bg-[#255245] shadow-xl shadow-[#316C5B]/20 disabled:opacity-50"
                  >
                    {proofSubmitting ? 'Uploading...' : 'Submit Evidence'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── RAISE DISPUTE MODAL ────────────────────────────────────── */}
      {showRaiseModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] w-full max-w-[550px] shadow-2xl p-8 animate-in zoom-in-95 duration-200">
            
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Raise Dispute</h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Funds will be locked in legal hold.</p>
              </div>
              <button onClick={() => setShowRaiseModal(false)} className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                <FiX size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Select Transaction</label>
                <select 
                  value={raiseTxnId}
                  onChange={(e) => setRaiseTxnId(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-[#316C5B] outline-none transition-all"
                >
                  <option value="">-- Choose Contract --</option>
                  {transactions.map(txn => (
                    <option key={txn._id} value={txn._id}>{txn.transactionId} - {txn.serviceId?.title}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Reason</label>
                <select 
                  value={raiseReason}
                  onChange={(e) => setRaiseReason(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-[#316C5B] outline-none transition-all"
                >
                  <option value="Service was not delivered">Service was not delivered</option>
                  <option value="Service quality is poor">Service quality is poor</option>
                  <option value="Overcharging has occurred">Overcharging has occurred</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Detailed Description</label>
                <textarea 
                  value={raiseDescription}
                  onChange={(e) => setRaiseDescription(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-[#316C5B] outline-none transition-all min-h-[120px] resize-none"
                  placeholder="Explain the situation in detail..."
                ></textarea>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setShowRaiseModal(false)} className="flex-1 py-4 border border-gray-100 text-gray-700 font-black rounded-2xl hover:bg-gray-50">
                  Cancel
                </button>
                <button 
                  onClick={handleRaiseDispute}
                  disabled={raiseSubmitting}
                  className="flex-1 py-4 bg-red-600 text-white font-black rounded-2xl hover:bg-red-700 shadow-xl shadow-red-600/20 disabled:opacity-50"
                >
                  {raiseSubmitting ? 'Filing...' : 'File Dispute'}
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
