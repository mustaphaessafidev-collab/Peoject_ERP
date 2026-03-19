import React from "react";
import "./Sidebar.css";
import {
  LayoutDashboard,
  Car,
  History,
  FileText,
  User,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const nav = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Fleet", icon: Car },
    { name: "History", icon: History },
    { name: "Invoices", icon: FileText },
    { name: "Profile", icon: User },
    { name: "Settings", icon: Settings },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">ERP Rental</div>

      <nav>
        {nav.map((item, i) => {
          const Icon = item.icon;

          return (
            <div key={i} className="navItem">
              <Icon size={18} />
              {item.name}
            </div>
          );
        })}
      </nav>

      <button className="rentBtn">Rent a Car</button>
    </aside>
  );
}