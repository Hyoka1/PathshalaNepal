import React, { useState, useEffect } from "react";
import { Bell, Book, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminHeader = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Handle real-time order notifications
  useEffect(() => {
    // TODO: Implement WebSocket connection for real-time updates
    const mockOrderNotification = {
      id: Date.now(),
      type: "order",
      message: "New order #1234 has been placed",
      timestamp: new Date().toISOString(),
      read: false,
    };

    // Mock notification for demonstration
    const timer = setInterval(() => {
      setNotifications((prev) => [mockOrderNotification, ...prev].slice(0, 10));
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    document.cookie =
      "access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  };

  const toggleNotifications = () => setShowNotifications(!showNotifications);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <header className="admin-header">
      <div className="header-brand">
        <Book size={24} />
        <h1>Admin Dashboard</h1>
      </div>

      <div className="header-actions">
        <div className="notification-wrapper">
          <Bell className="notification-icon" onClick={toggleNotifications} />
          {notifications.filter((n) => !n.read).length > 0 && (
            <span className="notification-badge">
              {notifications.filter((n) => !n.read).length}
            </span>
          )}

          {showNotifications && (
            <div className="notifications-dropdown">
              <div className="notifications-header">
                <h3>Notifications</h3>
                <button onClick={markAllAsRead}>Mark all as read</button>
              </div>
              <div className="notifications-list">
                {notifications.length === 0 ? (
                  <p className="no-notifications">No notifications</p>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`notification-item ${
                        !notification.read ? "unread" : ""
                      }`}
                    >
                      <p>{notification.message}</p>
                      <span className="notification-time">
                        {new Date(notification.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
