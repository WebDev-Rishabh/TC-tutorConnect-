import React, { useState } from "react";
import Sidebar from "../components/Sidebar"; // ✅ use your existing sidebar
import "../styles/Dashboard.css";


export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <div className="dashboardContainer">
      {/* Sidebar */}
      

      {/* Main Content */}
      <main className={`mainContent`}>
        
        

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
            </tbody>
          </table>
          <p className="seeAll">See all</p>
        </section>
      </main>
    </div>
  );
}
