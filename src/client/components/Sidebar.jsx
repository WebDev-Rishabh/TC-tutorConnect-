import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  DollarSign,
  Users,
  Wallet,
  Settings,
} from "lucide-react";

import "../styles/Sidebar.css";

export default function Sidebar({ isOpen, setActivePage }) {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "dashboard" },
    { name: "My Subjects", icon: <BookOpen size={20} />, path: "subjects" },
    { name: "Pricing", icon: <DollarSign size={20} />, path: "pricing" },
    { name: "Students", icon: <Users size={20} />, path: "students" },
    { name: "Earnings", icon: <Wallet size={20} />, path: "earnings" },
    { name: "Settings", icon: <Settings size={20} />, path: "settings" },
  ];

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={location.pathname.includes(item.path) ? "active" : ""}
            onClick={() => setActivePage(item.name)}
          >
            <Link to={item.path} className="sidebar-link">
              {item.icon}
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
