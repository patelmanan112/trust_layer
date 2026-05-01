import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { 
  FiGrid, 
  FiShield, 
  FiFileText, 
  FiAlertCircle, 
  FiSettings,
  FiHelpCircle,
  FiCheckCircle,
  FiLogOut,
  FiUser
} from 'react-icons/fi';
import { BiBuildingHouse } from 'react-icons/bi';
import toast from 'react-hot-toast';

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentPath = location.pathname;
  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/login', { replace: true });
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiGrid /> },
    { name: 'Active Escrows', path: '/escrows', icon: <FiShield /> },
    { name: 'Transaction History', path: '/transactions', icon: <FiFileText /> },
    { name: 'Dispute Center', path: '/disputes', icon: <FiAlertCircle /> },
    { name: 'Settings', path: '/settings', icon: <FiSettings /> },
  ];

  return (
    <div className="min-h-screen flex bg-[#f9fafb] font-sans text-gray-900">
      {/* SIDEBAR */}
      <aside className="w-[280px] bg-white border-r border-gray-100 flex flex-col shrink-0 sticky top-0 h-screen">
        <div className="p-10 pb-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1a4d3e] rounded-lg flex items-center justify-center text-white font-black">T</div>
            <span className="text-xl font-black text-gray-900 tracking-tighter">TrustLayer</span>
          </Link>
        </div>

        <nav className="flex-1 px-6 flex flex-col gap-2 mt-4">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4 mb-2">Management</p>
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                  isActive 
                    ? 'bg-[#f0f4f2] text-[#1a4d3e] shadow-sm' 
                    : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="text-lg">{link.icon}</div>
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-8 border-t border-gray-50 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center border border-gray-100">
              <FiUser size={18} />
            </div>
            <div className="overflow-hidden">
              <p className="text-[11px] font-black text-gray-900 truncate uppercase tracking-tighter">{user?.name || 'Authorized User'}</p>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{user?.role || 'Verified account'}</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <button onClick={handleLogout} className="flex items-center gap-3 text-[10px] font-black text-red-500 uppercase tracking-widest hover:text-red-700 transition-colors">
              <FiLogOut className="text-lg" /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 bg-white flex flex-col h-screen overflow-y-auto relative scroll-smooth">
        <div className="flex-1 p-8 xl:p-14">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
