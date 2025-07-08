import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(user.upi_id);
    toast.success("UPI ID copied to clipboard!");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">
          Welcome, {user.name || user.email}
        </h1>

        <p className="mb-2">
          Your UPI ID: <strong>{user.upi_id}</strong>
        </p>
        <button
          onClick={handleCopy}
          className="text-sm text-blue-600 underline mb-4"
        >
          Copy UPI
        </button>

        <p className="mb-6">
          Balance: ₹<strong>{user.balance}</strong>
        </p>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <ToastContainer position="bottom-center" autoClose={2000} />
    </div>
  );
};

export default Dashboard;
