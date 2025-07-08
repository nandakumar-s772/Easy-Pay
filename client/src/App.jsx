import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Transaction from './pages/Transaction';
import Complaints from './pages/Complaints';
import Help from './pages/Help';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import Dashboard from './pages/Dashboard'; 
import './App.css';

function App() {
  return (
    <>
      <nav className="bg-blue-600 p-4 text-white flex justify-between">
        <div>
          <Link to="/" className="mx-2 font-bold text-xl">EasyPay</Link>
        </div>
        <div>
          <Link to="/" className="mx-2 hover:underline">Home</Link>
          <Link to="/login" className="mx-2 hover:underline">Login</Link>
          <Link to="/signup" className="mx-2 hover:underline">Signup</Link>
          <Link to="/transaction" className="mx-2 hover:underline">Transaction</Link>
          <Link to="/complaints" className="mx-2 hover:underline">Complaints</Link>
          <Link to="/help" className="mx-2 hover:underline">Help</Link>
          <Link to="/admin-login" className="mx-2 hover:underline text-yellow-300">Admin</Link>
        </div>
      </nav>

      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/transaction" element={<Transaction />} />
      <Route path="/complaints" element={<Complaints />} />
      <Route path="/help" element={<Help />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-panel" element={<AdminPanel />} /> {/* ✅ FIXED */}
      <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

    </>
  );
}

export default App;
