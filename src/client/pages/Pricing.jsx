import React, { useState } from "react";
import Sidebar from "../components/Sidebar"; // ✅ Make sure this path is correct
import "../styles/Pricing.css";
import "../styles/Sidebar.css"; // so sidebar styles apply

export default function Pricing() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    batchType: "",
    fee: "",
    termsAccepted: false,
  });

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert("Please accept the terms to continue.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/tutor/pricing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Pricing information saved successfully!");
      } else {
        alert(data.message || "Failed to save pricing info.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className={`dashboardContainer `}>
      {/* ===== Sidebar ===== */}
      

     
      <main className="mainContent">
        

        {/* ===== Pricing Content ===== */}
        <div className="pricingPage">
          <h2 className="pricingTitle">Welcome Back, Dhruv!</h2>
          <p className="pricingSubtext">
            Track your teaching subjects, manage classes, and monitor earnings in one place.
          </p>

          <div className="pricingStats">
            <div className="statCard">
              <h3>Physics</h3>
              <p className="amount">₹4000</p>
              <span>Weekly</span>
            </div>
            <div className="statCard">
              <h3>Subject</h3>
              <p className="amount">Price</p>
              <span>Teaching Period</span>
            </div>
            <div className="statCard">
              <h3>N/A</h3>
              <p className="amount">N/A</p>
              <span>Weekly/Month</span>
            </div>
          </div>

          <h3 className="pricingInfoTitle">Pricing Information</h3>

          <form className="pricingForm" onSubmit={handleSubmit}>
            <label>Subject Name</label>
            <input
              type="text"
              name="subject"
              placeholder="Value"
              value={formData.subject}
              onChange={handleChange}
            />

            <label>Choose the batch (Weekly/Monthly)</label>
            <select
              name="batchType"
              value={formData.batchType}
              onChange={handleChange}
            >
              <option value="">Value</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>

            <label>Choose your fee</label>
            <input
              type="number"
              name="fee"
              placeholder="Value"
              value={formData.fee}
              onChange={handleChange}
            />

            <div className="checkboxRow">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
              />
              <label>
                I accept the terms <a href="#">Read our T&Cs</a>
              </label>
            </div>

            <button type="submit" className="submitBtn">
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
