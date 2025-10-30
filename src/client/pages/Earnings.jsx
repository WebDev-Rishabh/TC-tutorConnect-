import React, { useState } from "react";
import "../styles/Earnings.css";

export default function Earnings() {
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [bankOption, setBankOption] = useState("");
  const [upiDetails, setUpiDetails] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const totalEarnings = 15500;

  const transactions = [
    { id: 1, name:"a", email:"test@1.com", date: "27 Oct 2025", amount: "₹2,500", status: "Completed" },
    { id: 2, name:"a", email:"test@1.com", date: "18 Oct 2025", amount: "₹1,000", status: "Pending" },
    { id: 3, name:"a", email:"test@1.com",  date: "05 Oct 2025", amount: "₹4,000", status: "Completed" },
  ];

  const handleWithdraw = (e) => {
    e.preventDefault();
    if (!amount || !bankOption || !upiDetails || !acceptTerms) {
      alert("Please fill all fields and accept the terms.");
      return;
    }
    alert(`Withdrawal request of ₹${amount} submitted successfully!`);
    setShowModal(false);
  };

  return (
    <div className="earnings-container">
      <h2>Welcome Back, Dhruv!</h2>
      <p>Track your income, withdrawals, and transaction history.</p>

      {/* Stats Cards */}
      <div className="stats-container">
        <div className="stat-card">
          <h4>Total Earnings</h4>
          <h2>₹{totalEarnings.toLocaleString()}</h2>
          <button
            className="withdraw-inline-btn"
            onClick={() => setShowModal(true)}
          >
            Withdraw
          </button>
        </div>

        <div className="stat-card">
          <h4>This Month</h4>
          <h2>₹1,000</h2>
        </div>

        <div className="stat-card">
          <h4>Pending Payouts</h4>
          <h2>₹3,500</h2>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="transactions">
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>email</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.id}>
                <td>{txn.name}</td>
                <td>{txn.email}</td>
                <td>{txn.date}</td>
                <td>{txn.amount}</td>
                <td>
                  <span
                    className={`status ${txn.status.toLowerCase()}`}
                  >
                    {txn.status}
                  </span>
                </td>
                <td>
                  <button
                    className="manage-btn"
                    onClick={() => setShowModal(true)}
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Withdraw Modal */}
      {showModal && (
        <div className="withdraw-modal">
          <div className="modal-content">
            <button
              className="close-btn"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <div className="modal-header">
              <h3>Total Amount</h3>
              <h2>₹{totalEarnings.toLocaleString()}</h2>
            </div>

            <form onSubmit={handleWithdraw}>
              <h4>Withdraw Earnings</h4>
              <p>
                Transfer your available balance securely to your bank account
                or preferred payment method.
              </p>

              <label>Enter Amount</label>
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <label>Select Banking Option</label>
              <select
                value={bankOption}
                onChange={(e) => setBankOption(e.target.value)}
              >
                <option value="">Choose Option</option>
                <option value="bank">Bank Transfer</option>
                <option value="upi">UPI</option>
                <option value="paypal">PayPal</option>
              </select>

              <label>Bank/UPI Details</label>
              <textarea
                placeholder="Enter your bank account or UPI ID"
                value={upiDetails}
                onChange={(e) => setUpiDetails(e.target.value)}
              />

              <div className="terms">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={() => setAcceptTerms(!acceptTerms)}
                />
                <label>
                  I accept the terms <a href="#">Read our T&Cs</a>
                </label>
              </div>

              <button type="submit" className="withdraw-btn">
                Withdraw
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
