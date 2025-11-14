import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TutorNavbar from "../components/TutorNavbar";

export default function TutorLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <div className="tutorLayout">
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
          <Outlet />
        </div>
      </div>
    </div>
  );
}
