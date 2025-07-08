import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [success, setSuccess] = useState("");
  const [upiId, setUpiId] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess(""); setUpiId("");

    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(data.message);
        setUpiId(data.upi_id);
        setForm({ name: "", email: "", password: "" });
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    toast.success("UPI ID copied to clipboard!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Create an EasyPay Account</h2>

        {success && (
          <div className="text-center text-green-600 mb-3">
            <p>{success}</p>
            <p>Your UPI ID: <strong>{upiId}</strong></p>
            <button
              type="button"
              onClick={handleCopy}
              className="mt-2 px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300"
            >
              Copy UPI
            </button>
          </div>
        )}

        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border mb-3 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border mb-3 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border mb-4 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>

      {/* Toast notification container */}
      <ToastContainer position="bottom-center" autoClose={2000} />
    </div>
  );
};

export default Signup;
