import React, { useState, useEffect } from 'react';
import { apiFetch, getToken } from '../lib/api';
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
} from 'react-icons/fi';

const Dispute = () => {
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
  const [raiseError, setRaiseError] = useState('');

  const loadData = () => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    
    Promise.all([
      apiFetch('/api/disputes', { token }),
      apiFetch('/api/disputes/summary', { token }),
      apiFetch('/api/transactions', { token })
    ])
    .then(([disputesData, summaryData, txnsData]) => {
      setDisputes(disputesData?.disputes || []);
      setSummary(summaryData || { Open: 0, 'Under Review': 0, Resolved: 0 });
      setTransactions(txnsData?.transactions || []);
      setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Open':
        return <span className="flex items-center gap-1.5 px-3 py-1 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-full text-xs font-bold uppercase tracking-wider"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> Open</span>;
      case 'Under Review':
        return <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-bold uppercase tracking-wider"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Under Review</span>;
      case 'Resolved':
        return <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-bold uppercase tracking-wider"><div className="w-2 h-2 rounded-full bg-green-500"></div> Resolved</span>;
      default: return null;
    }
  };

  const formatBytes = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setProofFiles(prev => [...prev, ...selected].slice(0, 5)); // max 5
  };

  const removeFile = (idx) => setProofFiles(prev => prev.filter((_, i) => i !== idx));

  const handleProofSubmit = async (e) => {
    e.preventDefault();
    if (proofFiles.length === 0) return;
    setProofSubmitting(true);
    
    try {
      const token = getToken();
      const formData = new FormData();
      proofFiles.forEach(f => formData.append('proof', f));
      // Optional: Send description as part of the body if backend API supports it or ignore it since the API doesn't take description for proof.
      // We will just upload the files.
      
      await apiFetch(`/api/disputes/${showProofModal}/proof`, {
        method: 'POST',
        token,
        body: formData
      });
      
      setProofSubmitting(false);
      setProofSuccess(true);
      loadData(); // reload data
      setTimeout(() => {
        setShowProofModal(null);
        setProofFiles([]);
        setProofDescription('');
        setProofSuccess(false);
      }, 1500);
    } catch (err) {
      alert("Failed to submit proof: " + err.message);
      setProofSubmitting(false);
    }
  };

  const handleRaiseDispute = async () => {
    if (!raiseTxnId) return alert('Please select a transaction');
    if (!raiseDescription.trim()) return alert('Description is required');
    
    setRaiseSubmitting(true);
    setRaiseError('');
    try {
      const token = getToken();
      const txn = transactions.find(t => t.transactionId === raiseTxnId);
      await apiFetch('/api/disputes', {
        method: 'POST',
        token,
        body: JSON.stringify({
          transactionId: raiseTxnId,
          provider: txn ? txn.provider : 'Unknown',
          reason: raiseReason,
          description: raiseDescription,
          amount: txn ? txn.amount : 0
        })
      });
      setRaiseSubmitting(false);
      setShowRaiseModal(false);
      setRaiseTxnId('');
      setRaiseDescription('');
      loadData(); // reload disputes
    } catch (err) {
      setRaiseError(err.message);
      setRaiseSubmitting(false);
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
            <h2 className="text-3xl font-bold text-gray-900">{summary.Open || 0}</h2>
          </div>
          <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-500">
            <FiAlertTriangle size={24} />
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Under Review</p>
            <h2 className="text-3xl font-bold text-gray-900">{summary['Under Review'] || 0}</h2>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
            <FiClock size={24} />
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Resolved</p>
            <h2 className="text-3xl font-bold text-gray-900">{summary.Resolved || 0}</h2>
          </div>
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-500">
            <FiCheckCircle size={24} />
          </div>
        </div>
      </div>

      {/* DISPUTES LIST */}
      <div className="flex flex-col gap-6">
        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading disputes...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">Error: {error}</div>
        ) : disputes.length === 0 ? (
          <div className="text-center py-10 text-gray-500 border border-dashed border-gray-300 rounded-2xl">No disputes found.</div>
        ) : disputes.map((dispute) => (
          <div key={dispute._id} className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col lg:flex-row">
            
            {/* Left Side: Info */}
            <div className="flex-[2] p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{dispute._id.substring(dispute._id.length-8)}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs font-bold text-gray-500">TXN: {dispute.transactionId}</span>
                </div>
                {getStatusBadge(dispute.status)}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-1">{dispute.reason}</h3>
              <p className="text-sm text-gray-500 font-medium mb-4">Against: <span className="text-gray-900">{dispute.provider}</span> • Date: {new Date(dispute.createdAt).toLocaleDateString()}</p>
              
              <div className="bg-gray-50 p-4 rounded-xl mb-6">
                <p className="text-sm text-gray-700 leading-relaxed">"{dispute.description}"</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                  <FiPaperclip /> 
                  {dispute.proof && dispute.proof.length > 0 ? `${dispute.proof.length} Files Attached` : 'No Evidence Uploaded'}
                </div>
                {dispute.status !== 'Resolved' && (
                  <button 
                    onClick={() => setShowProofModal(dispute._id)}
                    className="text-sm font-bold text-[#316C5B] hover:underline flex items-center gap-1"
                  >
                    <FiUploadCloud /> Add More Proof
                  </button>
                )}
              </div>
            </div>

            {/* Right Side: Actions & Amount */}
            <div className="flex-[1] p-6 lg:p-8 bg-gray-50 flex flex-col justify-center items-center text-center lg:items-start lg:text-left">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Disputed Amount</p>
              <p className="text-3xl font-bold text-gray-900 mb-6">₹{new Intl.NumberFormat('en-IN').format(dispute.amount)}</p>
              
              {dispute.status === 'Open' && (
                <button 
                  onClick={() => setShowProofModal(dispute._id)}
                  className="w-full py-3 bg-[#316C5B] text-white font-bold rounded-xl hover:bg-[#255245] transition-colors flex justify-center items-center gap-2 shadow-sm"
                >
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

      {/* ── SUBMIT PROOF MODAL ─────────────────────────────────────── */}
      {showProofModal && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-[560px] overflow-hidden shadow-2xl">
            
            {/* Header */}
            <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Submit Proof</h2>
                <p className="text-xs text-gray-500 mt-0.5">Dispute ID: <span className="font-bold text-gray-700">{showProofModal}</span></p>
              </div>
              <button onClick={() => { setShowProofModal(null); setProofFiles([]); setProofDescription(''); setProofSuccess(false); }} className="text-gray-400 hover:text-gray-700 transition-colors">
                <FiX size={24} />
              </button>
            </div>

            {proofSuccess ? (
              <div className="p-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                  <FiCheckCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Proof Submitted!</h3>
                <p className="text-sm text-gray-500">Your evidence has been recorded. The dispute will move to "Under Review".</p>
              </div>
            ) : (
              <form onSubmit={handleProofSubmit} className="p-8">

                {/* Description */}
                <div className="mb-5">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description of Evidence</label>
                  <textarea
                    value={proofDescription}
                    onChange={e => setProofDescription(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#316C5B] min-h-[90px] resize-none transition-colors"
                    placeholder="Briefly explain what this proof demonstrates..."
                  />
                </div>

                {/* File Upload Zone */}
                <div className="mb-5">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Upload Files <span className="text-gray-400 font-normal">(up to 5 files, max 10 MB each)</span>
                  </label>

                  <label
                    htmlFor="proof-upload"
                    className="flex flex-col items-center justify-center gap-2 w-full p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 text-center cursor-pointer hover:bg-[#f0f9f5] hover:border-[#316C5B] transition-colors"
                  >
                    <FiUploadCloud size={32} className="text-[#316C5B]" />
                    <p className="text-sm font-bold text-gray-700">Click to browse files</p>
                    <p className="text-xs text-gray-400">Screenshots, PDFs, documents, images</p>
                    <input
                      id="proof-upload"
                      type="file"
                      multiple
                      accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.txt"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>

                {/* Selected File List */}
                {proofFiles.length > 0 && (
                  <div className="mb-6 flex flex-col gap-2">
                    {proofFiles.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 bg-[#ecfdf5] rounded-lg flex items-center justify-center text-[#316C5B] shrink-0">
                            <FiFile size={16} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-800 truncate max-w-[280px]">{file.name}</p>
                            <p className="text-xs text-gray-400">{formatBytes(file.size)}</p>
                          </div>
                        </div>
                        <button type="button" onClick={() => removeFile(idx)} className="text-gray-400 hover:text-red-500 transition-colors ml-3 shrink-0">
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {proofFiles.length === 0 && (
                  <p className="text-xs text-red-400 mb-4 font-medium">* At least one file is required to submit proof.</p>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => { setShowProofModal(null); setProofFiles([]); setProofDescription(''); }}
                    className="flex-1 py-3.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={proofSubmitting || proofFiles.length === 0}
                    className="flex-1 py-3.5 bg-[#316C5B] text-white font-bold rounded-xl hover:bg-[#255245] shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {proofSubmitting ? (
                      <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Uploading…</>
                    ) : (
                      <><FiUploadCloud /> Submit Proof</>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── RAISE DISPUTE MODAL ────────────────────────────────────── */}
      {showRaiseModal && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-[600px] overflow-hidden shadow-2xl">
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
              {raiseError && <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">{raiseError}</div>}
              
              <div className="mb-5">
                <label className="block text-sm font-bold text-gray-700 mb-2">Select Transaction</label>
                <select 
                  value={raiseTxnId}
                  onChange={(e) => setRaiseTxnId(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#316C5B]"
                >
                  <option value="">-- Choose Transaction --</option>
                  {transactions.map(txn => (
                    <option key={txn._id} value={txn.transactionId}>{txn.transactionId} - {txn.service}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-5">
                <label className="block text-sm font-bold text-gray-700 mb-2">Reason for Dispute</label>
                <select 
                  value={raiseReason}
                  onChange={(e) => setRaiseReason(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#316C5B]"
                >
                  <option value="Service was not delivered">Service was not delivered</option>
                  <option value="Service quality is poor">Service quality is poor</option>
                  <option value="Overcharging has occurred">Overcharging has occurred</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">Detailed Description</label>
                <textarea 
                  value={raiseDescription}
                  onChange={(e) => setRaiseDescription(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#316C5B] min-h-[100px] resize-none"
                  placeholder="Clearly explain what went wrong..."
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button onClick={() => setShowRaiseModal(false)} className="flex-1 py-3.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50">
                  Cancel
                </button>
                <button 
                  onClick={handleRaiseDispute}
                  disabled={raiseSubmitting}
                  className="flex-1 py-3.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 shadow-md disabled:opacity-50"
                >
                  {raiseSubmitting ? 'Submitting...' : 'Submit Dispute'}
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
