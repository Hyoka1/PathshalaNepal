import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

// Utility to check for a cookie by name
function hasCookie(name) {
  return document.cookie
    .split(";")
    .some((c) => c.trim().startsWith(name + "="));
}

const StaffRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isStaff, setIsStaff] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const userJson = localStorage.getItem("user");
      if (userJson && hasCookie("access-token")) {
        setIsAuthenticated(true);
        try {
          const userData = JSON.parse(userJson);
          setIsStaff(userData.role === "Staff");
        } catch (error) {
          console.error("Error parsing user data:", error);
          setIsStaff(false);
        }
      } else {
        setIsAuthenticated(false);
        setIsStaff(false);
      }
    };
    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login page but save the attempted url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isStaff) {
    // Redirect to home page with unauthorized message if not staff
    return <Navigate to="/home" state={{ unauthorized: true }} replace />;
  }

  return children;
};

export default StaffRoute;
