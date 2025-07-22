import React from "react";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";
import "./AdminDashboard.css";

const AdminLayout = () => (
  <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh' }}>
    <AdminSidebar />
    <main className="admin-content" style={{ flex: 1, padding: '2rem' }}>
      <Outlet />
    </main>
  </div>
);

export default AdminLayout; 