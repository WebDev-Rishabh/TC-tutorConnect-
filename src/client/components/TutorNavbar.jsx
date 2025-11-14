// src/components/TutorNavbar.jsx
import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import axios from "axios";
import "../styles/TutorNavbar.css";

export default function TutorNavbar({ isSidebarOpen, setIsSidebarOpen, activePage }) {
  const [showMenu, setShowMenu] = useState(false);
  const [avatar, setAvatar] = useState("/default-avatar.png");

  // ✅ Fetch the logged-in tutor’s profile to get avatar
  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const token = localStorage.getItem("authorization");
        if (!token) return;

        const res = await axios.get("http://localhost:5000/api/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = res.data.user;
        const tutor = res.data.tutor;

        // Prefer tutor avatar; fallback to user avatar
        if (tutor?.avatar) {
          const avatarUrl = tutor.avatar.startsWith("http")
            ? tutor.avatar
            : `http://localhost:5000${tutor.avatar}`;
          setAvatar(avatarUrl);
        } else if (user?.avatar) {
          const avatarUrl = user.avatar.startsWith("http")
            ? user.avatar
            : `http://localhost:5000${user.avatar}`;
          setAvatar(avatarUrl);
        }
      } catch (err) {
        console.error("Error fetching avatar:", err);
      }
    };

    fetchAvatar();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authorization");
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
        onClick={() => setShowMenu(!showMenu)}
      >
        <img
          src={avatar}
          alt="Tutor Avatar"
          className="tutor-avatar"
          onError={(e) => (e.target.src = "/default-avatar.png")}
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
