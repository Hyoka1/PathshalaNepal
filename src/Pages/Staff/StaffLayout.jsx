import React from "react";
import StaffHeader from "./StaffHeader";
import styles from "./StaffLayout.module.css";

const StaffLayout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <StaffHeader />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default StaffLayout;
