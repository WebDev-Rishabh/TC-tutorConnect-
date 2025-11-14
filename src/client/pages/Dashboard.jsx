import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [tutorData, setTutorData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch tutor profile when Dashboard loads
  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        const token = localStorage.getItem("authorization");
        if (!token) {
          window.location.href = "/login";
          return;
        }
  
        const response = await fetch("http://localhost:5000/api/tutor/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch tutor data");
  
        console.log("Tutor data:", data);
  
        const tutor = data.tutor || {};
  
        // ✅ Ensure upcomingSessions is always an array
        if (!Array.isArray(tutor.upcomingSessions)) {
          tutor.upcomingSessions = [];
        }
  
        // ✅ Normalize other fields to prevent undefined access
        setTutorData({
          fullName: tutor.fullName || "",
          studentsCount: tutor.studentsCount || 0,
          earnings: tutor.earnings || 0,
          completedSessions: tutor.completedSessions || 0,
          isVerified: tutor.isVerified || false,
          upcomingSessions: tutor.upcomingSessions,
        });
      } catch (error) {
        console.error("Error fetching tutor data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTutorData();
  }, []);
  
  if (loading) return <div className="dashboard-loading">Loading...</div>;

  return (
    <div className="dashboardContainer">
      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main Content */}
      <main className="mainContent">
        {/* Welcome Section */}
        <section className="welcomeSection">
          <h2>
            Welcome Back, <span>{tutorData?.fullName || "Tutor"}!</span>
          </h2>
          <p>Here’s a quick look at your progress.</p>

          {/* Stats Cards */}
          <div className="statsCards">
            <div className="card">
              <h3>{tutorData?.studentsCount || 0}</h3>
              <p>Total Students</p>
              <span>Active this month</span>
            </div>
            <div className="card">
              <h3>₹{tutorData?.earnings || 0}</h3>
              <p>Earnings</p>
              <span>This Month</span>
            </div>
            <div className="card">
              <h3>{tutorData?.completedSessions || 0}</h3>
              <p>Completed Sessions</p>
              <span>Past 30 Days</span>
            </div>
            <div className="card">
              <h3 className="verified">
                {tutorData?.isVerified ? "Verified" : "Pending"}
              </h3>
              <p>Profile Status</p>
              <span>Updated recently</span>
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
            {tutorData?.upcomingSessions?.length > 0 ? (
  tutorData.upcomingSessions.map((session, i) => (
    <tr key={i}>
      <td>{session.dateTime || "N/A"}</td>
      <td>{session.subject || "N/A"}</td>
      <td>{session.status || "N/A"}</td>
      <td>
        <button className="joinBtn">Join</button>
        <button className="cancelBtn">Cancel</button>
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="4" style={{ textAlign: "center" }}>
      No upcoming sessions found.
    </td>
  </tr>
)}
            </tbody>
          </table>
          <p className="seeAll">See all</p>
        </section>
      </main>
    </div>
  );
}
