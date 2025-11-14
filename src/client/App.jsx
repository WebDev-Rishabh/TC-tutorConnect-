import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./components/Homepage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import MySubjects from "./pages/MySubjects";
import Pricing from "./pages/Pricing";
import Students from "./pages/Students";
import Earnings from "./pages/Earnings";
import CompleteProfile from "./components/Profile";
import TutorLayout from "./layouts/TutorLayout";
import PublicLayout from "./layouts/PublicLayout";

const PrivateRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem("authorization");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />;
  if (roleRequired && role !== roleRequired)
    return <Navigate to="/login" replace />;

  return children;
};

export default function App() {
  return (
    <Routes>
      {/* Public Layout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Tutor Layout */}
      <Route
        path="/tutor"
        element={
          <PrivateRoute roleRequired="tutor">
            <TutorLayout />
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="subjects" element={<MySubjects />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="students" element={<Students />} />
        <Route path="earnings" element={<Earnings />} />
        <Route path="profile" element={<CompleteProfile />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
      
    </Routes>
  );
}
