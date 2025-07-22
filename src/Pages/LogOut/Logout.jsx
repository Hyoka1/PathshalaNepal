import React, { use, useEffect, useState } from "react";
import "../LogOut/logout.css";
import { Navigate, useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const [countdown, setCountdown] = useState(3);
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Clear user session/token info
    localStorage.clear(); // Or remove specific tokens

    // Set up countdown and redirect simulation
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setFadeOut(true);
          setTimeout(() => {
            navigate("/Login");
          }, 1000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="logout-container">
      <div className={`logout-box ${fadeOut ? "fade-out" : ""}`}>
        {/* Logo/Icon */}
        <div className="logo-container">
          <div className="logo-spinner"></div>
          <svg
            className="logo-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            ></path>
          </svg>
        </div>

        <h1 className="logout-title">Logging Out</h1>

        <div className="logout-message">
          <p>
            You are being securely logged out.
            <span className="countdown">
              Redirecting in{" "}
              <span className="countdown-number">{countdown}</span> seconds...
            </span>
          </p>
        </div>

        {/* Progress bar */}
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${(countdown / 3) * 100}%` }}
          ></div>
        </div>

        {/* Decorative elements */}
        <div className="dots-container">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
