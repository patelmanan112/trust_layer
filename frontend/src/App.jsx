import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Pages (These will be moved to features/ if they contain feature-specific logic later)
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ActiveEscrows from './pages/ActiveEscrows';
import Dispute from './pages/Dispute';
import Setting from './pages/Setting';
import TransactionHistory from './pages/TransactionHistory';

function App() {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/login" element={<Login />} />

      {/* App routes wrapped in MainLayout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="escrows" element={<ActiveEscrows />} />
        <Route path="disputes" element={<Dispute />} />
        <Route path="settings" element={<Setting />} />
        <Route path="transactions" element={<TransactionHistory />} />
      </Route>
    </Routes>
  );
}

export default App;
