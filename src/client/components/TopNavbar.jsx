import React, { useState } from "react";
import { Menu } from "lucide-react";
import "../styles/TopNavbar.css";

export default function TopNavbar({ toggleSidebar }) {
  return (
    <header className="topNavbar">
      <div className="navLeft">
        <button className="menuBtn" onClick={toggleSidebar}>
          <Menu size={26} />
        </button>
        <h2 className="navTitle">Tutor Dashboard</h2>
      </div>
      <div className="navRight">
        <img
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          alt="profile"
          className="navAvatar"
        />
      </div>
    </header>
  );
}
