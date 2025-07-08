import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-100 to-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
              Welcome to EasyPay
            </h1>
            <p className="text-lg mb-6">
              Secure and fast digital wallet platform to send, receive, and manage money effortlessly.
            </p>
            <Link
              to="/signup"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          </div>
          <div>
            <img
              src="https://img.freepik.com/free-vector/secure-payment-landing-page-template_23-2148535734.jpg?semt=ais_hybrid&w=740"
              alt="Secure Payment"
              className="w-full rounded-xl shadow-md"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 text-blue-700">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white shadow p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">1. Create Account</h3>
              <p>Sign up using your email and get a UPI ID instantly.</p>
            </div>
            <div className="bg-white shadow p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">2. Add & Send Money</h3>
              <p>Use your UPI ID to send or receive money securely.</p>
            </div>
            <div className="bg-white shadow p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">3. Track Transactions</h3>
              <p>View detailed transaction history and manage your balance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">🔐 Secure Payments</h3>
              <p>End-to-end encrypted transactions to ensure safety and privacy.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">📊 Transaction Graphs</h3>
              <p>Visual insights of your spending and receiving trends.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">🧾 Complaint System</h3>
              <p>Raise and track service issues directly from your dashboard.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">💳 UPI Wallet</h3>
              <p>Each user gets a unique UPI ID to manage transactions easily.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10 text-blue-700">What Our Users Say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="italic mb-2">"EasyPay made sending money to friends super quick and safe."</p>
              <span className="font-bold text-blue-600">— Arya S.</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="italic mb-2">"I love the clean UI and fast signup process!"</p>
              <span className="font-bold text-blue-600">— Karthik R.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-white text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to simplify your payments?</h2>
        <Link
          to="/signup"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Join EasyPay Now
        </Link>
      </section>
    </div>
  );
}

export default Home;
