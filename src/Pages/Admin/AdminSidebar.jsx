import React from "react";
import { NavLink } from "react-router-dom";
import { Book, Tags } from "lucide-react";
import "./AdminDashboard.css";

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <h1>Admin Panel</h1>
      </div>

      <ul className="sidebar-menu">
        <li>
          <NavLink to="/admin/books" className="sidebar-item">
            <Book size={20} />
            <span>Books</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/discounts" className="sidebar-item">
            <Tags size={20} />
            <span>Discounts</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
