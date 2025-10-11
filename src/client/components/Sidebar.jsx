import React from "react";
import { LayoutDashboard, BookOpen, DollarSign, Users, Wallet, Settings } from "lucide-react";
import "../styles/Sidebar.css";

export default function Sidebar({ isOpen, setActivePage }) {
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "My Subjects", icon: <BookOpen size={20} /> },
    { name: "Pricing", icon: <DollarSign size={20}  /> },
    { name: "Students", icon: <Users size={20} /> },
    { name: "Earnings", icon: <Wallet size={20} /> },
    { name: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul>
        {menuItems.map((item) => (
          <li key={item.name} onClick={() => setActivePage(item.name)}>
            {item.icon}
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
