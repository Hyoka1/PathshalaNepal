import React, { useState, useEffect } from "react";
import { Book, Users, ShoppingCart, TrendingUp } from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "../../constants/api";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    // TODO: Replace with actual API calls
    // Mock data for demonstration
    setStats({
      totalBooks: 150,
      totalUsers: 75,
      totalOrders: 25,
      totalRevenue: 2500,
    });
  }, []);

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <h2>Dashboard Overview</h2>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon books">
            <Book size={24} />
          </div>
          <div className="stat-details">
            <h4>Total Books</h4>
            <h3>{stats.totalBooks}</h3>
            <div className="trend positive">
              <TrendingUp size={16} />
              <span>12% increase</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon users">
            <Users size={24} />
          </div>
          <div className="stat-details">
            <h4>Total Users</h4>
            <h3>{stats.totalUsers}</h3>
            <div className="trend positive">
              <TrendingUp size={16} />
              <span>8% increase</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orders">
            <ShoppingCart size={24} />
          </div>
          <div className="stat-details">
            <h4>Total Orders</h4>
            <h3>{stats.totalOrders}</h3>
            <div className="trend positive">
              <TrendingUp size={16} />
              <span>15% increase</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon sales">
            <TrendingUp size={24} />
          </div>
          <div className="stat-details">
            <h4>Total Revenue</h4>
            <h3>${stats.totalRevenue}</h3>
            <div className="trend positive">
              <TrendingUp size={16} />
              <span>10% increase</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="dashboard-tables">
        <div className="table-section">
          <div className="table-header">
            <h3>Recent Orders</h3>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User</th>
                  <th>Books</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#ORD001</td>
                  <td>John Doe</td>
                  <td>3</td>
                  <td>$45.00</td>
                  <td>
                    <span className="status-badge completed">Completed</span>
                  </td>
                </tr>
                <tr>
                  <td>#ORD002</td>
                  <td>Jane Smith</td>
                  <td>2</td>
                  <td>$30.00</td>
                  <td>
                    <span className="status-badge processing">Processing</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="info-cards">
          <div className="info-card">
            <div className="info-header">
              <h3>Recent Activities</h3>
            </div>
            <ul className="activity-list">
              <li className="activity-item">
                <div className="activity-details">
                  <p>New user registered</p>
                  <span className="timestamp">2 hours ago</span>
                </div>
              </li>
              <li className="activity-item">
                <div className="activity-details">
                  <p>New book added to inventory</p>
                  <span className="timestamp">4 hours ago</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
