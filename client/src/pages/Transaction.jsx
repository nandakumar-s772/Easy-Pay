import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Transaction = () => {
  const [receiverUpi, setReceiverUpi] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [transactions, setTransactions] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchTransactions = async () => {
    if (!user?.upi_id) return;
    try {
      const response = await fetch(`http://localhost:5000/api/transactions/${user.upi_id}`);
      const data = await response.json();
      setTransactions(data);
    } catch (err) {
      console.error('Failed to load transactions:', err);
    }
  };

  const handleTransaction = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to make transactions.');
      return;
    }

    const response = await fetch('http://localhost:5000/api/transaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender_upi_id: user.upi_id,
        receiver_upi_id: receiverUpi,
        amount: parseFloat(amount),
        note: note.trim()
      }),
    });

    const data = await response.json();
    alert(data.message);

    if (response.ok) {
      setReceiverUpi('');
      setAmount('');
      setNote('');
      fetchTransactions();
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (!user) {
    return (
      <div className="p-6 text-center text-red-500 font-semibold">
        You can only access this page when you are logged in.
      </div>
    );
  }

  // Calculate total sent and received
  const sent = transactions
    .filter(txn => txn.sender_upi_id === user.upi_id)
    .reduce((sum, txn) => sum + txn.amount, 0);
  const received = transactions
    .filter(txn => txn.receiver_upi_id === user.upi_id)
    .reduce((sum, txn) => sum + txn.amount, 0);

  // Chart data
  const chartData = {
    labels: ['Sent', 'Received'],
    datasets: [
      {
        label: 'Transaction Amount (₹)',
        data: [sent, received],
        backgroundColor: ['#ef4444', '#22c55e'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Make a Payment</h2>

      {/* Transaction Insights Bar Chart */}
      <div className="bg-white p-4 mb-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Insights</h3>
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Payment Form */}
      <form onSubmit={handleTransaction} className="mb-8 bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Receiver UPI ID"
          value={receiverUpi}
          onChange={(e) => setReceiverUpi(e.target.value)}
          required
          className="w-full mb-3 px-3 py-2 border rounded"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="w-full mb-3 px-3 py-2 border rounded"
        />
        <input
          type="text"
          placeholder="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Send Money
        </button>
      </form>

      {/* Transaction History */}
      <h3 className="text-lg font-semibold mb-2">Your Transactions</h3>
      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul>
          {transactions.map((txn, index) => {
            const isSent = txn.sender_upi_id === user.upi_id;
            return (
              <li key={index} className="border-b py-3">
                <strong className={isSent ? 'text-red-600' : 'text-green-600'}>
                  {isSent ? 'Sent' : 'Received'}: ₹{txn.amount}
                </strong>
                <br />
                <small>
                  {isSent ? `To: ${txn.receiver_upi_id}` : `From: ${txn.sender_upi_id}`}
                </small>
                <br />
                {txn.note && (
                  <small className="text-gray-700">
                    <strong>Note:</strong> {txn.note}
                  </small>
                )}
                <br />
                <small className="text-gray-500">
                  {new Date(txn.timestamp).toLocaleString()}
                </small>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Transaction;
