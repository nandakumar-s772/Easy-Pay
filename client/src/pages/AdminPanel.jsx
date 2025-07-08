import React, { useEffect, useState } from 'react';

const AdminPanel = () => {
  const [complaints, setComplaints] = useState([]);
  const [replies, setReplies] = useState({}); // rEPLY TRACKING

  const fetchComplaints = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/complaints');
      const data = await res.json();
      setComplaints(data);
    } catch (err) {
      console.error('Error fetching complaints:', err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleReplyChange = (id, value) => {
    setReplies({ ...replies, [id]: value });
  };

  const handleSendReply = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/complaints/${id}/reply`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply: replies[id] }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Reply sent successfully');
        setReplies({ ...replies, [id]: '' });
        fetchComplaints(); // Refresh
      } else {
        alert(result.message || 'Failed to send reply');
      }
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center">Admin Panel - Complaints</h2>

      {complaints.length === 0 ? (
        <p className="text-center text-gray-500">No complaints submitted yet.</p>
      ) : (
        <div className="space-y-4">
          {complaints.map((c) => (
            <div key={c._id} className="bg-white shadow rounded p-4 border">
              <p><strong>Name:</strong> {c.name}</p>
              <p><strong>Email:</strong> {c.email}</p>
              <p><strong>Message:</strong> {c.message}</p>
              <p className="text-sm text-gray-500 mt-2"><strong>Date:</strong> {new Date(c.createdAt).toLocaleString()}</p>

              {c.reply ? (
                <p className="mt-3 text-green-700"><strong>Reply:</strong> {c.reply}</p>
              ) : (
                <div className="mt-4">
                  <textarea
                    placeholder="Type your reply..."
                    value={replies[c._id] || ''}
                    onChange={(e) => handleReplyChange(c._id, e.target.value)}
                    className="w-full border rounded p-2 mb-2"
                  />
                  <button
                    onClick={() => handleSendReply(c._id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Send Reply
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
