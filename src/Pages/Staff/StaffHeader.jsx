import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Book } from "lucide-react";
import styles from "./StaffHeader.module.css";

const StaffHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem("user");
    // Clear cookies
    document.cookie =
      "access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Redirect to login
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Book className={styles.logoIcon} size={24} />
        <span className={styles.logoText}>Pathsala Nepal</span>
      </div>
      <div className={styles.rightSection}>
        <nav className={styles.nav}>
          <Link
            to="/staff"
            className={
              location.pathname === "/staff" ? styles.activeLink : styles.link
            }
          >
            Dashboard
          </Link>
          <Link
            to="/staff/order-details"
            className={
              location.pathname === "/staff/order-details"
                ? styles.activeLink
                : styles.link
            }
          >
            Process Orders
          </Link>
        </nav>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default StaffHeader;
