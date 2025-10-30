// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import Pricing from "./pages/Pricing";
import Students from "./pages/Students";
import Earnings from "./pages/Earnings";
import CompleteProfile from "./components/Profile";
import Sidebar from "./components/Sidebar";
import TutorNavbar from "./components/TutorNavbar";
 // ✅ your main navbar

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  // ✅ Private Route Component
  const PrivateRoute = ({ children, roleRequired }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) return <Navigate to="/login" replace />;
    if (roleRequired && role !== roleRequired)
      return <Navigate to="/login" replace />;

    return children;
  };

  const isTutorLoggedIn =
    localStorage.getItem("token") && localStorage.getItem("role") === "tutor";

  return (
    <div className="appLayout">
      {isTutorLoggedIn ? (
        <>
          {/* ✅ Tutor Dashboard Layout */}
          <TutorNavbar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            activePage={activePage}
          />

          <div className="mainContent">
            <Sidebar isOpen={isSidebarOpen} setActivePage={setActivePage} />
            <div
              className={`pageContent ${isSidebarOpen ? "shifted" : ""}`}
              style={{
                transition: "margin-left 0.3s ease",
                marginLeft: isSidebarOpen ? "220px" : "70px",
                padding: "20px",
              }}
            >
              <Routes>
                <Route
                  path="/tutor/dashboard"
                  element={
                    <PrivateRoute roleRequired="tutor">
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/tutor/pricing"
                  element={
                    <PrivateRoute roleRequired="tutor">
                      <Pricing />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/tutor/students"
                  element={
                    <PrivateRoute roleRequired="tutor">
                      <Students />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/tutor/earnings"
                  element={
                    <PrivateRoute roleRequired="tutor">
                      <Earnings />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* ✅ Show your main Navbar for non-tutors */}
          <Navbar />

          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<CompleteProfile />} />
            {/* Add other public routes here */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </>
      )}
    </div>
  );
}
