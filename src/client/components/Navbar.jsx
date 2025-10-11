// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Tutor Connect</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/find-tutors">Find Tutors</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      {isAuthenticated ? (
        <>
          <Link to="/profile">
            <button className="profileBtn">Profile</button>
          </Link>
          <button className="logoutBtn" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : location.pathname === "/signup" ? (
        <Link to="/login">
          <button className="loginBtn">Login</button>
        </Link>
      ) : (
        <Link to="/signup">
          <button className="signUpBtn">Signup</button>
        </Link>
      )}
    </nav>
  );
}
