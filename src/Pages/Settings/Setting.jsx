import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Bell, BellOff, User, Lock } from "lucide-react";
import "../Settings/Settings.css";

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  return (
    <motion.div
      className={`settings-wrapper ${darkMode ? "dark-mode" : ""}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="settings-card" variants={itemVariants}>
        <h1 className="settings-title">Account Settings</h1>

        <motion.section
          className="settings-section profile-section"
          variants={itemVariants}
        >
          <h2>
            <User className="section-icon" /> Profile Information
          </h2>
          <input
            type="text"
            placeholder="Full Name"
            className="settings-input"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="settings-input"
          />
          <button className="save-btn">Save Profile</button>
        </motion.section>

        <motion.section
          className="settings-section password-section"
          variants={itemVariants}
        >
          <h2>
            <Lock className="section-icon" /> Change Password
          </h2>
          <input
            type="password"
            placeholder="Current Password"
            className="settings-input"
          />
          <input
            type="password"
            placeholder="New Password"
            className="settings-input"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="settings-input"
          />
          <button className="save-btn">Update Password</button>
        </motion.section>

        <motion.section
          className="settings-section preferences-section"
          variants={itemVariants}
        >
          <h2>Preferences</h2>

          <motion.div
            className="toggle-container"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="toggle-label">
              {emailNotifications ? <Bell /> : <BellOff />}
              Enable Email Notifications
            </div>
            <motion.div
              className={`toggle-switch ${emailNotifications ? "active" : ""}`}
              onClick={() => setEmailNotifications(!emailNotifications)}
              animate={{
                backgroundColor: emailNotifications ? "#4CAF50" : "#FF5252",
              }}
            >
              <motion.div
                className="toggle-slider"
                layout
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="toggle-container"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="toggle-label">
              {darkMode ? <Moon /> : <Sun />}
              Enable Dark Mode
            </div>
            <motion.div
              className={`toggle-switch ${darkMode ? "active" : ""}`}
              onClick={() => setDarkMode(!darkMode)}
              animate={{
                backgroundColor: darkMode ? "#005792" : "#FFC107",
              }}
            >
              <motion.div
                className="toggle-slider"
                layout
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
              />
            </motion.div>
          </motion.div>
        </motion.section>
      </motion.div>
    </motion.div>
  );
};

export default SettingsPage;
