import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

// Utility to check for a cookie by name
function hasCookie(name) {
  return document.cookie
    .split(";")
    .some((c) => c.trim().startsWith(name + "="));
}

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const userJson = localStorage.getItem("user");
      if (userJson && hasCookie("access-token")) {
        setIsAuthenticated(true);
        try {
          const userData = JSON.parse(userJson);
          setUserRole(userData.role || "Member");
        } catch (error) {
          console.error("Error parsing user data:", error);
          setUserRole("Member");
        }
      } else {
        setIsAuthenticated(false);
        setUserRole(null);
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

  // If specific roles are required and user doesn't have the right role
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // Redirect to home page with unauthorized message
    return <Navigate to="/home" state={{ unauthorized: true }} replace />;
  }

  return children;
};

export default ProtectedRoute;
