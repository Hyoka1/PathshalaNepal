import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./StaffDashboard.module.css";

const StaffDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.staffDashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>Staff Dashboard</h1>
        <div className={styles.userInfo}>
          <span>Welcome, Staff</span>
        </div>
      </header>

      <div className={styles.statsContainer}>
        <div className={styles.dashboardCard}>
          <div
            className={styles.cardIcon}
            style={{ backgroundColor: "#ff9800" }}
          >
            📋
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>Process Orders</h3>
            <p className={styles.cardDescription}>
              Search and process orders by claim code
            </p>
          </div>
        </div>
      </div>

      <div className={styles.quickActionsContainer}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <div className={styles.quickActions}>
          <button
            className={styles.actionButton}
            onClick={() => navigate("/staff/order-details")}
          >
            Process New Order
          </button>
        </div>
      </div>

      <div className={styles.recentActivityContainer}>
        <h2 className={styles.sectionTitle}>Instructions</h2>
        <div className={styles.instructionsContainer}>
          <div className={styles.instructionItem}>
            <span className={styles.instructionNumber}>1</span>
            <span className={styles.instructionText}>
              Click "Process New Order" to start processing an order
            </span>
          </div>
          <div className={styles.instructionItem}>
            <span className={styles.instructionNumber}>2</span>
            <span className={styles.instructionText}>
              Enter the claim code provided by the member
            </span>
          </div>
          <div className={styles.instructionItem}>
            <span className={styles.instructionNumber}>3</span>
            <span className={styles.instructionText}>
              Review order details and click "Process Order"
            </span>
          </div>
          <div className={styles.instructionItem}>
            <span className={styles.instructionNumber}>4</span>
            <span className={styles.instructionText}>
              Once processed, mark the order as "Complete"
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
