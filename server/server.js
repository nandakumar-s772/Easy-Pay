const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// ------------------ MODELS ------------------

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  upi_id: { type: String, unique: true },
  balance: Number
});
const User = mongoose.model('User', userSchema);

// Transaction Schema
const transactionSchema = new mongoose.Schema({
  sender_upi_id: String,
  receiver_upi_id: String,
  amount: Number,
  note: String,
  timestamp: { type: Date, default: Date.now }
});
const Transaction = mongoose.model('Transaction', transactionSchema);

// Complaint Schema (Updated with reply)
const complaintSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  reply: { type: String, default: '' }, // ✅ added reply field
  createdAt: { type: Date, default: Date.now }
});
const Complaint = mongoose.model('Complaint', complaintSchema);

// ------------------ UTIL ------------------

const generateUPI = () => `${crypto.randomBytes(4).toString('hex')}@easypay`;

// ------------------ ROUTES ------------------

// Signup
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).send({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const upi_id = generateUPI();

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      upi_id,
      balance: 1000
    });

    await newUser.save();

    res.status(201).send({ message: 'Signup successful', upi_id });

  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).send({ message: 'Server error' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).send({ message: 'Invalid credentials' });
  }
  res.status(200).send({
    message: 'Login success',
    upi_id: user.upi_id,
    balance: user.balance,
    email: user.email,
    name: user.name
  });
});

// Get user info
app.get('/api/user/:upi_id', async (req, res) => {
  const user = await User.findOne({ upi_id: req.params.upi_id });
  if (!user) return res.status(404).send({ message: 'User not found' });
  res.send(user);
});

// Make transaction
app.post('/api/transaction', async (req, res) => {
  try {
    const { sender_upi_id, receiver_upi_id, amount, note } = req.body;

    if (amount <= 0) return res.status(400).send({ message: 'Invalid amount' });

    const sender = await User.findOne({ upi_id: sender_upi_id });
    const receiver = await User.findOne({ upi_id: receiver_upi_id });

    if (!sender || !receiver)
      return res.status(404).send({ message: 'Sender or receiver not found' });

    if (sender.balance < amount)
      return res.status(400).send({ message: 'Insufficient balance' });

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    const transaction = new Transaction({ sender_upi_id, receiver_upi_id, amount, note });
    await transaction.save();

    res.status(200).send({ message: 'Transaction successful!' });
  } catch (error) {
    console.error('Transaction error:', error);
    res.status(500).send({ message: 'Server error' });
  }
});

// Get transaction history
app.get('/api/transactions/:upi_id', async (req, res) => {
  try {
    const upi_id = req.params.upi_id;
    const transactions = await Transaction.find({
      $or: [{ sender_upi_id: upi_id }, { receiver_upi_id: upi_id }]
    }).sort({ timestamp: -1 });

    res.status(200).send(transactions);
  } catch (err) {
    console.error('Transaction history error:', err);
    res.status(500).send({ message: 'Failed to fetch transactions' });
  }
});

// Submit complaint
app.post('/api/complaints', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newComplaint = new Complaint({ name, email, message });
    await newComplaint.save();
    res.status(201).json({ message: 'Complaint submitted successfully' });
  } catch (err) {
    console.error('❌ Error saving complaint:', err);
    res.status(500).json({ message: 'Server error while saving complaint' });
  }
});

// Get all complaints
app.get('/api/complaints', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (err) {
    console.error('❌ Error fetching complaints:', err);
    res.status(500).json({ message: 'Server error while fetching complaints' });
  }
});

// ✅ Admin replies to complaint
app.put('/api/complaints/:id/reply', async (req, res) => {
  try {
    const complaintId = req.params.id;
    const { reply } = req.body;

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { reply },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.status(200).json({ message: 'Reply added successfully', complaint: updatedComplaint });
  } catch (err) {
    console.error('❌ Error replying to complaint:', err);
    res.status(500).json({ message: 'Server error while replying to complaint' });
  }
});

// ------------------ START SERVER ------------------

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
