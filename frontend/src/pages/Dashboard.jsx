import React, { useEffect, useState } from 'react';
import { 
  FiCheckCircle, 
  FiMoreHorizontal, 
  FiAlertTriangle, 
  FiArrowRight,
  FiShield,
  FiLock,
  FiClock
} from 'react-icons/fi';
import { BiWalletAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { apiFetch, getToken, setToken } from '../lib/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [me, setMe] = useState(null);
  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('tl_notes') || '[]');
    } catch {
      return [];
    }
  });
  const [noteTitle, setNoteTitle] = useState('');
  const [noteBody, setNoteBody] = useState('');
  const [notesError, setNotesError] = useState('');

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    let cancelled = false;
    apiFetch('/api/dashboard', { token })
      .then((data) => {
        if (!cancelled) setMe(data?.user || null);
      })
      .catch(() => {
        setToken(null);
        navigate('/login', { replace: true });
      });

    apiFetch('/api/notes', { token })
      .then((data) => {
        if (cancelled) return;
        const list = data?.notes || [];
        setNotes(list);
        localStorage.setItem('tl_notes', JSON.stringify(list));
      })
      .catch(() => {
        if (!cancelled) setNotesError('Could not load notes');
      });

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const handleCreateNote = async () => {
    const token = getToken();
    if (!token) return;
    setNotesError('');
    try {
      const data = await apiFetch('/api/notes', {
        token,
        method: 'POST',
        body: JSON.stringify({ title: noteTitle, body: noteBody }),
      });
      const created = data?.note;
      if (created) {
        const next = [created, ...notes].slice(0, 20);
        setNotes(next);
        localStorage.setItem('tl_notes', JSON.stringify(next));
      }
      setNoteTitle('');
      setNoteBody('');
    } catch (e) {
      setNotesError(e?.message || 'Could not create note');
    }
  };

  return (
    <div className="w-full max-w-[1100px] mx-auto pb-10 relative">
      
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
        <div>
          <h1 className="text-[32px] font-bold text-gray-900 mb-1">
            Welcome back{me?.fullName ? `, ${me.fullName}` : ''}.
          </h1>
          <p className="text-[15px] text-gray-500 max-w-[500px]">
            Manage your high-value assets and secure transactions with precision.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-[#316C5B] text-[#316C5B] font-semibold text-sm hover:bg-[#316C5B]/5 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
              <line x1="12" y1="22" x2="12" y2="15.5"></line>
              <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
              <polyline points="2 15.5 12 8.5 22 15.5"></polyline>
              <line x1="12" y1="2" x2="12" y2="8.5"></line>
            </svg>
            Verify Service
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#316C5B] text-white font-semibold text-sm hover:bg-[#255245] shadow-md transition-colors">
            + New Transaction
          </button>
        </div>
      </div>

        {/* BASIC MONGODB STORAGE DEMO (Notes) */}
        <div className="w-full border border-gray-100 rounded-2xl bg-white shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">My Notes (stored in MongoDB)</h3>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{notes.length}/20</span>
          </div>

          {notesError ? (
            <div className="mb-4 bg-red-50 border border-red-100 text-red-700 text-sm font-semibold rounded-lg p-3">
              {notesError}
            </div>
          ) : null}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-4">
            <input
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder="Title"
              className="px-4 py-3 bg-gray-50 border rounded-lg text-[15px] text-gray-900 outline-none focus:bg-gray-100 transition-colors border-transparent"
            />
            <input
              value={noteBody}
              onChange={(e) => setNoteBody(e.target.value)}
              placeholder="Body (optional)"
              className="px-4 py-3 bg-gray-50 border rounded-lg text-[15px] text-gray-900 outline-none focus:bg-gray-100 transition-colors border-transparent lg:col-span-2"
            />
          </div>

          <button
            onClick={handleCreateNote}
            disabled={!noteTitle.trim()}
            className="mb-6 px-5 py-2.5 rounded-lg bg-[#316C5B] text-white font-semibold text-sm hover:bg-[#255245] shadow-md transition-colors disabled:opacity-50"
          >
            Save Note
          </button>

          <div className="flex flex-col gap-3">
            {notes.length === 0 ? (
              <div className="text-sm text-gray-500">No notes yet. Create your first one above.</div>
            ) : (
              notes.map((n) => (
                <div key={n.id} className="border border-gray-100 rounded-xl p-4 bg-gray-50/40">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-sm font-bold text-gray-900">{n.title}</div>
                    <div className="text-[11px] text-gray-400 font-semibold">
                      {n.createdAt ? new Date(n.createdAt).toLocaleString() : ''}
                    </div>
                  </div>
                  {n.body ? <div className="text-sm text-gray-600 mt-1">{n.body}</div> : null}
                </div>
              ))
            )}
          </div>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 mb-6">
        
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-6">
          
          {/* TOTAL ESCROW BALANCE */}
          <div className="border border-gray-200 rounded-2xl p-8 relative overflow-hidden bg-white shadow-sm">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#316C5B]"></div>
            
            <div className="flex justify-between items-start mb-10">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Total Escrow Balance</p>
                <h2 className="text-[42px] font-bold text-gray-900 tracking-tight leading-none">$248,500.00</h2>
              </div>
              <div className="w-10 h-10 bg-[#e8f3ef] rounded-full flex items-center justify-center text-[#316C5B]">
                <BiWalletAlt size={20} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-4">
                <p className="text-xs text-gray-500 font-medium mb-1">Available</p>
                <p className="text-xl font-bold text-gray-900">$142k</p>
              </div>
              <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-4">
                <p className="text-xs text-gray-500 font-medium mb-1">In Transit</p>
                <p className="text-xl font-bold text-gray-900">$86k</p>
              </div>
              <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-4">
                <p className="text-xs text-gray-500 font-medium mb-1">Yield (APY)</p>
                <p className="text-xl font-bold text-[#316C5B]">4.2%</p>
              </div>
            </div>
          </div>

          {/* SECURITY ALERT */}
          <div className="bg-[#fcf5f5] border border-[#f5e1e1] rounded-2xl p-6">
            <div className="flex items-center gap-2 text-red-600 mb-4">
              <FiAlertTriangle size={18} />
              <span className="text-[11px] font-bold uppercase tracking-widest">Security Alert</span>
            </div>
            <p className="text-[15px] text-red-900/80 mb-6 leading-relaxed max-w-sm font-medium">
              Pending identity verification for transaction #TV-9021. Review required within 12 hours.
            </p>
            <button className="bg-[#8b5a5a] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#7a4e4e] transition-colors">
              Verify Identity
            </button>
          </div>

          {/* MARKET INTELLIGENCE CARD */}
          <div className="rounded-2xl overflow-hidden relative shadow-md">
            <div className="absolute inset-0 bg-[#0d261e] z-0"></div>
            <img 
              src="https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=2000&auto=format&fit=crop" 
              className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay z-10"
              alt="Dashboard abstract"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081a14] via-transparent to-transparent z-20"></div>
            
            <div className="relative z-30 p-8 h-[240px] flex flex-col justify-end">
              <p className="text-[10px] font-bold text-green-300 uppercase tracking-widest mb-2">Live Market Intelligence</p>
              <h3 className="text-2xl font-bold text-white max-w-sm leading-tight">Escrow trends are shifting towards decentralized nodes.</h3>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-6">
          
          {/* ACTIVE PAYMENTS */}
          <div className="border border-gray-100 rounded-2xl bg-white shadow-sm p-6 flex flex-col h-[280px]">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-6">Active Payments</p>
            
            <div className="flex-1 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#ecfdf5] flex items-center justify-center text-[#059669]">
                    <FiCheckCircle size={20} />
                  </div>
                  <div>
                    <p className="text-[15px] font-bold text-gray-900">12 Completed</p>
                    <p className="text-[11px] text-gray-400 font-medium">Last 30 days</p>
                  </div>
                </div>
                <span className="text-[#059669] text-sm font-bold">+14%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                    <FiMoreHorizontal size={20} />
                  </div>
                  <div>
                    <p className="text-[15px] font-bold text-gray-900">4 Processing</p>
                    <p className="text-[11px] text-gray-400 font-medium">Average 24h TTM</p>
                  </div>
                </div>
                <span className="text-gray-500 text-sm font-bold">Stable</span>
              </div>
            </div>

            <button className="w-full py-3 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors mt-auto">
              View All Activity
            </button>
          </div>

          {/* PENDING VERIFICATIONS */}
          <div className="border border-gray-100 rounded-2xl bg-white shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Pending Verifications</h3>
              <button className="text-xs font-semibold text-[#316C5B] flex items-center gap-1 hover:underline">
                Review All <FiArrowRight size={14} />
              </button>
            </div>
            
            <div className="w-full">
              <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-3 mb-3">
                <div>Contract Entity</div>
                <div>Value</div>
                <div>Due Date</div>
                <div>Status</div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center text-[13px]">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#316C5B] border-[3px] border-[#c0dcd3]"></div>
                    <span className="font-semibold text-gray-900">Apex Global Logistics</span>
                  </div>
                  <div className="font-bold text-gray-900">$12,400</div>
                  <div className="text-gray-500">Oct 24, 2023</div>
                  <div><span className="px-2 py-1 bg-[#ecfdf5] text-[#059669] text-[10px] font-bold rounded uppercase">HELD</span></div>
                </div>

                <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center text-[13px]">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-900 border-[3px] border-blue-200"></div>
                    <span className="font-semibold text-gray-900">Studio Nova Design</span>
                  </div>
                  <div className="font-bold text-gray-900">$4,200</div>
                  <div className="text-gray-500">Oct 28, 2023</div>
                  <div><span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase">IN REVIEW</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* PROTECT HIGH STAKES */}
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">Need to protect a high-stakes transaction?</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Our institutional-grade escrow engine ensures that funds are only released when both parties reach absolute consensus on project milestones.
            </p>
            
            <div className="grid grid-cols-3 gap-2">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#316C5B] mb-1">
                  <FiCheckCircle size={14} /> A+ Rated
                </div>
                <p className="text-[10px] text-gray-400 font-medium">Financial Integrity</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700 mb-1">
                  <FiLock size={14} /> 256-bit
                </div>
                <p className="text-[10px] text-gray-400 font-medium">AES Encryption</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700 mb-1">
                  <FiClock size={14} /> Audit Trail
                </div>
                <p className="text-[10px] text-gray-400 font-medium">Immutable Logs</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* FOOTER AREA */}
      <div className="flex justify-between items-center border-t border-gray-100 pt-6 mt-6">
        <div className="flex gap-4 text-gray-400">
          <button className="hover:text-gray-600 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          </button>
          <button className="hover:text-gray-600 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
          </button>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
          Experiencing issues? <button className="text-red-600 font-bold hover:underline flex items-center gap-1"><FiAlertTriangle size={12}/> Raise Dispute</button>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
