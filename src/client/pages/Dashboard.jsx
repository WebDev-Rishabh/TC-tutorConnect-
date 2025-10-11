import React from "react";
import "../styles/Dashboard.css";
import {
  FaHome,
  FaBookOpen,
  FaTags,
  FaUserGraduate,
  FaRupeeSign,
  FaCog,
} from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className="dashboardContainer">
      {/* ===== Sidebar ===== */}
      <aside className="sidebar">
        <h2 className="logo">TutorConnect</h2>
        <ul className="menu">
          <li className="active">
            <FaHome /> Dashboard
          </li>
          <li>
            <FaBookOpen /> My Subjects
          </li>
          <li>
            <FaTags /> Pricing
          </li>
          <li>
            <FaUserGraduate /> Students
          </li>
          <li>
            <FaRupeeSign /> Earnings
          </li>
          <li>
            <FaCog /> Settings
          </li>
        </ul>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="mainContent">
        {/* Top bar */}
        <div className="topBar">
          <h3>Dashboard</h3>
          <div className="profileIcon">
            <img
              src="https://img.icons8.com/ios-filled/50/1D4E89/user-male-circle.png"
              alt="profile"
            />
          </div>
        </div>

        {/* Welcome Section */}
        <section className="welcomeSection">
          <h2>
            Welcome Back, <span>Dhruv!</span>
          </h2>
          <p>Here’s a quick look at your progress.</p>

          {/* Stats Cards */}
          <div className="statsCards">
            <div className="card">
              <h3>120</h3>
              <p>Total Students</p>
              <span>Active this month</span>
            </div>
            <div className="card">
              <h3>₹25,400</h3>
              <p>Earnings</p>
              <span>This Month</span>
            </div>
            <div className="card">
              <h3>48</h3>
              <p>Completed Sessions</p>
              <span>Past 30 Days</span>
            </div>
            <div className="card">
              <h3 className="verified">Verified</h3>
              <p>Profile Status</p>
              <span>Active this month</span>
            </div>
          </div>
        </section>

        {/* Sessions Table */}
        <section className="sessionSection">
          <h3>Your Upcoming Sessions</h3>
          <table className="sessionTable">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>25 Sep 2025, 12:00 PM</td>
                <td>Physics</td>
                <td>Active</td>
                <td>
                  <button className="joinBtn">Join</button>
                  <button className="cancelBtn">Cancel</button>
                </td>
              </tr>
              <tr>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>
                  <button className="joinBtn">Join</button>
                  <button className="cancelBtn">Cancel</button>
                </td>
              </tr>
              <tr>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>
                  <button className="joinBtn">Join</button>
                  <button className="cancelBtn">Cancel</button>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="seeAll">See all</p>
        </section>
      </main>
    </div>
  );
}
