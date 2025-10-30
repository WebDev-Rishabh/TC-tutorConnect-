import React from "react";
import { Link } from "react-router-dom";
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
  
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/tutor/dashboard" },
    { name: "My Subjects", icon: <BookOpen size={20} />, path: "/tutor/subjects" },
    { name: "Pricing", icon: <DollarSign size={20} />, path: "/tutor/pricing" },
    { name: "Students", icon: <Users size={20} />, path: "/tutor/students" },
    { name: "Earnings", icon: <Wallet size={20} />, path: "/tutor/earnings" },
    { name: "Settings", icon: <Settings size={20} />, path: "/tutor/settings" },
  ];

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul>
        {menuItems.map((item) => (
          <li key={item.name} onClick={() => setActivePage(item.name)}>
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
