import React from "react";
import styles from "./StaffDashboard.module.css";

const LoadingState = ({ message = "Loading..." }) => {
  return (
    <div className={styles.staffDashboard}>
      <div className={styles.loadingState}>
        <div className={styles.loadingSpinner}></div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default LoadingState;
