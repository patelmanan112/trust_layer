import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Pages
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ActiveEscrows from './pages/ActiveEscrows';
import Dispute from './pages/Dispute';
import Setting from './pages/Setting';
import TransactionHistory from './pages/TransactionHistory';

function App() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Auth routes */}
      <Route path="/login" element={<Login />} />

      {/* App routes wrapped in MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/escrows" element={<ActiveEscrows />} />
        <Route path="/disputes" element={<Dispute />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/transactions" element={<TransactionHistory />} />
      </Route>
    </Routes>
  );
}

export default App;
