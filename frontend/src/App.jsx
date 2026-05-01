import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy loaded pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const RoleSelection = lazy(() => import('./pages/RoleSelection'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ActiveEscrows = lazy(() => import('./pages/ActiveEscrows'));
const TransactionHistory = lazy(() => import('./pages/TransactionHistory'));
const Dispute = lazy(() => import('./pages/Dispute'));
const Setting = lazy(() => import('./pages/Setting'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
    <div className="w-10 h-10 border-2 border-gray-100 border-t-[#316C5B] rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/role-selection" element={<RoleSelection />} />
            <Route path="/login" element={<Login />} />

            {/* App Routes (Inside Layout) */}
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Fixed paths to match Sidebar links */}
              <Route path="/escrows" element={<ActiveEscrows />} />
              <Route path="/transactions" element={<TransactionHistory />} />
              <Route path="/disputes" element={<Dispute />} />
              <Route path="/settings" element={<Setting />} />
              
              {/* Aliases for backward compatibility */}
              <Route path="/active-escrows" element={<Navigate to="/escrows" replace />} />
              <Route path="/dispute" element={<Navigate to="/disputes" replace />} />
            </Route>

            {/* Catch-all Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
