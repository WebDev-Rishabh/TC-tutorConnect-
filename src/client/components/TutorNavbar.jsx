// src/components/TutorNavbar.jsx
import React, { useState } from "react";
import { Menu } from "lucide-react";
import "../styles/TutorNavbar.css";

export default function TutorNavbar({ isSidebarOpen, setIsSidebarOpen, activePage }) {
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <nav className="tutor-navbar">
      <button
        className="hamburger"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu size={26} />
      </button>

      <h2 className="tutor-navbar-title">{activePage}</h2>

      <div
        className="tutor-navbar-right"
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
      >
        <img
          src="/default-avatar.png"
          alt="Tutor Avatar"
          className="tutor-avatar"
        />

        {showMenu && (
          <div className="avatar-dropdown">
            <button
              className="dropdown-btn"
              onClick={() => (window.location.href = "/tutor/profile")}
            >
              Profile
            </button>
            <button className="dropdown-btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
