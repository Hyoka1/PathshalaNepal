import React, { useEffect, useState } from "react";
import "./Header.css";
import { Book } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../../constants/api";

// Utility to check for a cookie by name
function hasCookie(name) {
  return document.cookie
    .split(";")
    .some((c) => c.trim().startsWith(name + "="));
}

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const userJson = localStorage.getItem("user");
      if (userJson && hasCookie("access-token")) {
        setIsAuthenticated(true);
        try {
          const userData = JSON.parse(userJson);
          setUserRole(userData.role);
        } catch (error) {
          console.error("Error parsing user data:", error);
          setUserRole(null);
        }
      } else {
        setIsAuthenticated(false);
        setUserRole(null);
      }
    };
    checkAuth();
    // Optionally, listen for storage changes (e.g., login/logout in another tab)
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        API_ENDPOINTS.AUTH.LOGOUT,
        {},
        { withCredentials: true }
      );
      setIsAuthenticated(false);
      localStorage.removeItem("user");
      navigate("/login");
    } catch {
      setIsAuthenticated(false);
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  const isAdmin = userRole === "Admin";

  return (
    <>
      <div className="Container">
        <nav className="navbar">
          <div className="navbar-brand">
            <Book className="book-icon" size={24} />
            <h1>Pathsala Nepal</h1>
          </div>
          <div className="navbar-links">
            {!isAdmin && (
              <>
                <Link to="/" className="nav-link active">
                  Home
                </Link>
                <Link to="/contact" className="nav-link">
                  Contact us
                </Link>
                <Link to="/report" className="nav-link">
                  Reports
                </Link>
                <Link to="/about" className="nav-link">
                  About us
                </Link>
              </>
            )}
          </div>
          <div className="navbar-auth">
            {isAuthenticated ? (
              <>
                {!isAdmin && (
                  <>
                    <Link to="/cart">
                      <button className="btn-admin">Cart</button>
                    </Link>
                    <Link to="/wishlist">
                      <button className="btn-admin">Wishlist</button>
                    </Link>
                    <Link to="/history">
                      <button className="btn-admin">History</button>
                    </Link>
                  </>
                )}
                <button className="btn-admin" onClick={handleLogout}>
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Log in</Link>
                <Link to="/signup">Sign up</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
