import React, { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Navbar from "./components/Navbar"
import Homepage from "./components/Homepage"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import Dashboard from "./pages/Dashboard"
import CompleteProfile from "./components/Profile"

export default function App() {
  // const [message, setMessage] = useState("loading...")

  // useEffect(() => {
  //   fetch("/api/hello")
  //     .then(res => res.json())
  //     .then(data => setMessage(data.message))
  //     .catch(() => setMessage("Error fetching API"))
  // }, [])
  const PrivateRoute = ({ children, roleRequired }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
  
    if (!token) return <Navigate to="/login" replace />;
    if (roleRequired && role !== roleRequired) return <Navigate to="/login" replace />;
  
    return children;
  };
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<CompleteProfile />} />
        <Route path="/login" element={<Login />} />
        <Route
  path="/dashboard"
  element={
    <PrivateRoute roleRequired="tutor">
      <Dashboard />
    </PrivateRoute>
  }
/>
      </Routes>
      
      
      
      {/* <div style={{ padding: "24px" }}>
        <h3>API status:</h3>
        <p>{message}</p>
      </div> */}
    </div>
  )
}
