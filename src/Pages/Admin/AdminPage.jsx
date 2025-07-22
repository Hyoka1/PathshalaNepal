import React, { useState, useEffect } from "react";
import {
  Users,
  Book,
  ShoppingCart,
  Settings,
  BarChart,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  Calendar,
  MessageSquare,
  HelpCircle,
  FileText,
  AlertTriangle,
  Clock,
  TrendingUp,
  DollarSign,
  UserCheck,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [period, setPeriod] = useState("weekly");
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New user registration", time: "5 min ago", read: false },
    {
      id: 2,
      message: "Server update completed",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      message: "Database backup successful",
      time: "3 hours ago",
      read: true,
    },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleNotifications = () => setShowNotifications(!showNotifications);

  const sidebarItems = [
    { icon: <BarChart />, label: "Dashboard" },
    { icon: <Users />, label: "Users" },
    { icon: <Book />, label: "Courses" },
    { icon: <ShoppingCart />, label: "Orders" },
    { icon: <Calendar />, label: "Schedule" },
    { icon: <MessageSquare />, label: "Messages" },
    { icon: <FileText />, label: "Reports" },
    { icon: <Settings />, label: "Settings" },
    { icon: <HelpCircle />, label: "Support" },
  ];

  // Sample data for charts
  const salesData = [
    { name: "Jan", sales: 4000, expenses: 2400, profit: 1600 },
    { name: "Feb", sales: 3000, expenses: 1398, profit: 1602 },
    { name: "Mar", sales: 2000, expenses: 9800, profit: -7800 },
    { name: "Apr", sales: 2780, expenses: 3908, profit: -1128 },
    { name: "May", sales: 1890, expenses: 4800, profit: -2910 },
    { name: "Jun", sales: 2390, expenses: 3800, profit: -1410 },
    { name: "Jul", sales: 3490, expenses: 4300, profit: -810 },
  ];

  const trafficData = [
    { name: "Mon", users: 2400, pageViews: 4200 },
    { name: "Tue", users: 1398, pageViews: 3200 },
    { name: "Wed", users: 9800, pageViews: 15800 },
    { name: "Thu", users: 3908, pageViews: 7800 },
    { name: "Fri", users: 4800, pageViews: 9600 },
    { name: "Sat", users: 3800, pageViews: 6600 },
    { name: "Sun", users: 4300, pageViews: 8200 },
  ];

  const userTypeData = [
    { name: "New", value: 400, color: "#0088FE" },
    { name: "Returning", value: 300, color: "#00C49F" },
    { name: "Inactive", value: 200, color: "#FFBB28" },
    { name: "Premium", value: 100, color: "#FF8042" },
  ];

  const coursePopularityData = [
    { name: "React", students: 4000 },
    { name: "Angular", students: 3000 },
    { name: "Vue", students: 2000 },
    { name: "Node.js", students: 2780 },
    { name: "Python", students: 1890 },
    { name: "Java", students: 2390 },
  ];

  // Recent orders data
  const recentOrders = [
    {
      id: "#3245",
      user: "John Doe",
      course: "React Pro",
      amount: "$99.99",
      status: "Completed",
    },
    {
      id: "#3244",
      user: "Jane Smith",
      course: "Vue Masterclass",
      amount: "$89.99",
      status: "Processing",
    },
    {
      id: "#3243",
      user: "Robert Johnson",
      course: "Node Backend",
      amount: "$129.99",
      status: "Completed",
    },
    {
      id: "#3242",
      user: "Emily Clark",
      course: "Python Data Science",
      amount: "$149.99",
      status: "Failed",
    },
  ];

  // Activity data
  const activities = [
    { action: "User John Doe registered", timestamp: "2 hours ago" },
    { action: "New course 'React 101' added", timestamp: "5 hours ago" },
    { action: "Order #12345 confirmed", timestamp: "1 day ago" },
    { action: "User feedback submitted by Maria", timestamp: "1 day ago" },
    { action: "System update scheduled", timestamp: "2 days ago" },
  ];

  const renderDashboardContent = () => {
    return (
      <>
        <div className="dashboard-controls">
          <div className="time-filter">
            <button
              className={period === "daily" ? "active" : ""}
              onClick={() => setPeriod("daily")}
            >
              Daily
            </button>
            <button
              className={period === "weekly" ? "active" : ""}
              onClick={() => setPeriod("weekly")}
            >
              Weekly
            </button>
            <button
              className={period === "monthly" ? "active" : ""}
              onClick={() => setPeriod("monthly")}
            >
              Monthly
            </button>
            <button
              className={period === "yearly" ? "active" : ""}
              onClick={() => setPeriod("yearly")}
            >
              Yearly
            </button>
          </div>
          <button className="refresh-btn">Refresh Data</button>
        </div>

        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-icon users">
              <UserCheck size={24} />
            </div>
            <div className="stat-details">
              <h4>Total Users</h4>
              <h3>24,532</h3>
              <p className="trend positive">
                <TrendingUp size={16} /> +12% from last week
              </p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon sales">
              <DollarSign size={24} />
            </div>
            <div className="stat-details">
              <h4>Revenue</h4>
              <h3>$86,589</h3>
              <p className="trend positive">
                <TrendingUp size={16} /> +5.3% from last week
              </p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon courses">
              <Book size={24} />
            </div>
            <div className="stat-details">
              <h4>Courses</h4>
              <h3>156</h3>
              <p className="trend positive">
                <TrendingUp size={16} /> +3 new this week
              </p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orders">
              <ShoppingCart size={24} />
            </div>
            <div className="stat-details">
              <h4>Orders</h4>
              <h3>1,352</h3>
              <p className="trend negative">
                <TrendingUp size={16} /> -2.5% from last week
              </p>
            </div>
          </div>
        </div>

        <div className="charts-container">
          <div className="chart-card wide">
            <div className="chart-header">
              <h3>Revenue Overview</h3>
              <div className="chart-actions">
                <button className="chart-action-btn">Export</button>
                <button className="chart-action-btn">Details</button>
              </div>
            </div>
            <div className="chart-content">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={salesData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="profit" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <h3>User Demographics</h3>
              <div className="chart-actions">
                <button className="chart-action-btn">Details</button>
              </div>
            </div>
            <div className="chart-content">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={userTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {userTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <h3>Course Popularity</h3>
              <div className="chart-actions">
                <button className="chart-action-btn">Details</button>
              </div>
            </div>
            <div className="chart-content">
              <ResponsiveContainer width="100%" height={240}>
                <RechartsBarChart
                  data={coursePopularityData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="students" fill="#8884d8" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-card wide">
            <div className="chart-header">
              <h3>Website Traffic</h3>
              <div className="chart-actions">
                <button className="chart-action-btn">Export</button>
                <button className="chart-action-btn">Details</button>
              </div>
            </div>
            <div className="chart-content">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={trafficData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                  <Area
                    type="monotone"
                    dataKey="pageViews"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

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
                    <th>Customer</th>
                    <th>Course</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr key={index}>
                      <td>{order.id}</td>
                      <td>{order.user}</td>
                      <td>{order.course}</td>
                      <td>{order.amount}</td>
                      <td>
                        <span
                          className={`status-badge ${order.status.toLowerCase()}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button className="action-btn">View</button>
                          <button className="action-btn">Edit</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="info-cards">
            <div className="info-card">
              <div className="info-header">
                <h3>Recent Activities</h3>
                <button className="view-all-btn">View All</button>
              </div>
              <ul className="activity-list">
                {activities.map((activity, idx) => (
                  <li key={idx} className="activity-item">
                    <div className="activity-content">
                      <span className="activity-icon">
                        <Clock size={16} />
                      </span>
                      <div className="activity-details">
                        <p>{activity.action}</p>
                        <span className="timestamp">{activity.timestamp}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="info-card">
              <div className="info-header">
                <h3>System Alerts</h3>
                <button className="view-all-btn">View All</button>
              </div>
              <ul className="alerts-list">
                <li className="alert-item warning">
                  <AlertTriangle size={16} />
                  <div className="alert-details">
                    <p>Server load is high (85%)</p>
                    <span className="timestamp">10 minutes ago</span>
                  </div>
                </li>
                <li className="alert-item info">
                  <Bell size={16} />
                  <div className="alert-details">
                    <p>5 new user registrations</p>
                    <span className="timestamp">1 hour ago</span>
                  </div>
                </li>
                <li className="alert-item error">
                  <AlertTriangle size={16} />
                  <div className="alert-details">
                    <p>Payment gateway error</p>
                    <span className="timestamp">2 hours ago</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return renderDashboardContent();
      case "Users":
        return (
          <div className="tab-content">
            <h2>Users Management</h2>
            <p>User management panel will be displayed here.</p>
          </div>
        );
      case "Courses":
        return (
          <div className="tab-content">
            <h2>Courses Management</h2>
            <p>Course management panel will be displayed here.</p>
          </div>
        );
      case "Orders":
        return (
          <div className="tab-content">
            <h2>Orders Management</h2>
            <p>Order management panel will be displayed here.</p>
          </div>
        );
      case "Schedule":
        return (
          <div className="tab-content">
            <h2>Schedule Management</h2>
            <p>Schedule management panel will be displayed here.</p>
          </div>
        );
      case "Messages":
        return (
          <div className="tab-content">
            <h2>Message Center</h2>
            <p>Message center panel will be displayed here.</p>
          </div>
        );
      case "Reports":
        return (
          <div className="tab-content">
            <h2>Reports</h2>
            <p>Reports panel will be displayed here.</p>
          </div>
        );
      case "Settings":
        return (
          <div className="tab-content">
            <h2>Settings</h2>
            <p>Settings panel will be displayed here.</p>
          </div>
        );
      case "Support":
        return (
          <div className="tab-content">
            <h2>Support</h2>
            <p>Support panel will be displayed here.</p>
          </div>
        );
      default:
        return renderDashboardContent();
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
        <div className="sidebar-header">
          <h1 className={!sidebarOpen ? "hidden" : ""}>Admin</h1>
          <button onClick={toggleSidebar} className="toggle-btn">
            {sidebarOpen ? <X /> : <Menu />}
          </button>
        </div>
        <ul className="sidebar-menu">
          {sidebarItems.map((item, index) => (
            <li
              key={index}
              onClick={() => setActiveTab(item.label)}
              className={`sidebar-item ${
                activeTab === item.label ? "active" : ""
              }`}
            >
              {item.icon}
              {sidebarOpen && <span>{item.label}</span>}
            </li>
          ))}
        </ul>
        <div className="sidebar-footer">
          {sidebarOpen && <span className="user-name">Admin User</span>}
          <LogOut className="icon logout-icon" title="Logout" />
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header-bar">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
          </div>
          <div className="header-icons">
            <div className="notification-wrapper">
              <Bell className="icon" onClick={toggleNotifications} />
              {notifications.filter((n) => !n.read).length > 0 && (
                <span className="notification-badge">
                  {notifications.filter((n) => !n.read).length}
                </span>
              )}

              {showNotifications && (
                <div className="notifications-dropdown">
                  <div className="notifications-header">
                    <h4>Notifications</h4>
                    <button className="mark-all-read">Mark all as read</button>
                  </div>
                  <ul className="notifications-list">
                    {notifications.map((notification) => (
                      <li
                        key={notification.id}
                        className={`notification-item ${
                          notification.read ? "read" : "unread"
                        }`}
                      >
                        <p>{notification.message}</p>
                        <span className="notification-time">
                          {notification.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="notifications-footer">
                    <button>View all notifications</button>
                  </div>
                </div>
              )}
            </div>
            <div className="user-avatar">
              <img src="/api/placeholder/40/40" alt="Admin" />
            </div>
          </div>
        </div>

        <div className="page-header">
          <h2>{activeTab}</h2>
          <div className="breadcrumb">
            <span>Home</span> / <span>{activeTab}</span>
          </div>
        </div>

        <div className="content-wrapper">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
