import React, { useEffect, useState } from 'react';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [message, setMessage] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));

  const fetchUserComplaints = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/complaints');
      const data = await res.json();
      const userComplaints = data.filter(c => c.email === user?.email);
      setComplaints(userComplaints);
    } catch (err) {
      console.error('Failed to load complaints:', err);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchUserComplaints();
    }
  }, [user?.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitSuccess('');
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          message,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitSuccess(data.message);
        setMessage('');
        fetchUserComplaints();
      } else {
        setError(data.message || 'Failed to submit complaint');
      }
    } catch (err) {
      console.error('Complaint submit error:', err);
      setError('Something went wrong');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Complaints</h2>

      {/* Complaint submit */}
      {user && (
        <form onSubmit={handleSubmit} className="bg-white shadow p-4 mb-6 rounded border">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your complaint here..."
            required
            className="w-full border p-2 rounded mb-3"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Complaint
          </button>
          {submitSuccess && <p className="text-green-600 mt-2">{submitSuccess}</p>}
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      )}

      {/* Complaints */}
      {complaints.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t submitted any complaints yet.</p>
      ) : (
        <div className="space-y-4">
          {complaints.map((c, index) => (
            <div key={index} className="bg-white shadow rounded p-4 border">
              <p><strong>Message:</strong> {c.message}</p>
              <p className="text-sm text-gray-500"><strong>Submitted:</strong> {new Date(c.createdAt).toLocaleString()}</p>
              {c.reply ? (
                <p className="mt-3 text-green-600"><strong>Admin Reply:</strong> {c.reply}</p>
              ) : (
                <p className="mt-3 text-yellow-600"><strong>Status:</strong> Awaiting admin response</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Complaints;
