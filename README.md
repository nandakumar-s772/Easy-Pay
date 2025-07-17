# 💳 Easy-Pay - A MERN Stack Digital Wallet Web App

Easy-Pay is a full-stack digital payment wallet web application built using the **MERN stack (MongoDB, Express, React, Node.js)**. It allows users to securely register, login, perform transactions, view transaction history, raise complaints, and access help — all with a clean and intuitive UI.

---

## 🚀 Features

- 🔐 Secure user signup and login with session management
- 💼 Dynamic user dashboard with UPI ID
- 💸 Send and receive money with transaction notes
- 📊 Bar chart insights of Sent vs Received
- 📜 Animated transaction history (sent in red, received in green)
- 🧾 Complaint submission system for user issues
- 🛠 Admin panel to manage user complaints
- 📷 QR Code generator for easy UPI payments
- 🌗 Light mode UI (Dark mode optional)
- 🔔 Toast notifications for feedback

---

## 🧩 Technologies Used

### 🔧 Frontend:
- React.js (with Vite)
- Tailwind CSS
- React Router DOM
- Chart.js
- Axios

### 🔧 Backend:
- Node.js
- Express.js
- MongoDB with Mongoose

### 📦 Tools:
- Postman (API testing)
- VS Code
- Git & GitHub

---

## 🛠 How It Works

1. Users register and receive a unique UPI ID.
2. After login, users are redirected to a personal dashboard.
3. From the transaction page, users can send or receive money (dummy transactions).
4. Transaction history is displayed with notes and color indicators.
5. Users can file complaints if issues occur.
6. Admin can log in via a protected route to view and delete complaints.

---

## 🔍 What I Improved / Customized

- 🧠 Added authentication checks using `localStorage` to persist login across navigation.
- 🎨 Designed a polished frontend with Tailwind CSS replacing Bootstrap.
- 📊 Integrated chart analytics for better insights.
- 🧹 Ensured proper routing, session control, and feedback messages.
- ⚙️ Enabled dynamic rendering based on logged-in state (e.g., dashboard stays visible until logout).
- 🔐 Secured admin-only access to sensitive data.

---

## 🏁 How to Run Locally

### 🖥 Frontend
```bash
cd client
npm install
npm run dev
