import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/logo.png"; // Adjust the path to your logo image
import axios from "axios";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../../constants/api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.AUTH.CHECK_AUTH, {
          withCredentials: true,
        });

        if (response.data.isSuccess) {
          // User is authenticated, redirect to landing page
          navigate("/");
        }
      } catch (error) {
        // User is not authenticated, stay on login page
        console.log("User not authenticated");
      }
    };

    checkAuth();
  }, [navigate]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await axios.post(
        API_ENDPOINTS.AUTH.LOGIN,
        {
          username: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.isSuccess) {
        const { accessToken, fullName, email, role } = response.data.data;

        // Store access token in localStorage
        localStorage.setItem("accessToken", accessToken);

        // Store only user data in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            fullName,
            email,
            role,
          })
        );

        toast.success("Login successful!");
        if (role === "Staff") {
          navigate("/staff/");
        } else if (role === "Admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      } else {
        toast.error(response.data.error || "Login failed");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "An error occurred during login";
      toast.error(errorMessage);
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="background-image"></div>
      <div className="overlay"></div>

      <div className="login-card">
        <div className="card-content">
          <div className="logo-container">
            <div className="logo-container">
              <a href="/">
                <img src={logo} alt="PathsalaNepal" className="logo" />
              </a>
            </div>
          </div>

          <h1 className="login-title">PathsalaNepal</h1>
          <p className="login-subtitle">Login to your account</p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={errors.password ? "input-error" : ""}
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="password-toggle"
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            <div className="form-group remember-forgot">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <div className="social-logins">
            <button className="social-btn google">
              <span>Continue with Google</span>
            </button>
          </div>

          <p className="signup-text">
            Don't have an account?{" "}
            <Link to="/signup" className="signup-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Poppins', sans-serif;
        }

        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }

        .background-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('https://www.voicesofruralindia.org/wp-content/uploads/2020/11/ylswjsy7stw-scaled.jpg');
          background-size: cover;
          background-position: center;
          z-index: -2;
          animation: zoomBg 30s infinite alternate ease-in-out;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 100%);
          z-index: -1;
        }

        .login-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          width: 100%;
          max-width: 450px;
          margin: 2rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          overflow: hidden;
          transform: translateY(0);
          animation: floatIn 0.8s ease-out;
        }

        .card-content {
          padding: 2.5rem 2rem;
        }

        .logo-container {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .logo {
          width: 80px;
          height: 80px;
          object-fit: contain;
          border-radius: 50%;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          transition: all 0.3s ease;
          animation: pulse 2s infinite;
          background: white;
          padding: 0.5rem;
        }

        .logo:hover {
          transform: scale(1.05) rotate(5deg);
          box-shadow: 0 15px 30px rgba(29, 78, 216, 0.25);
        }

        .login-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1d4ed8;
          margin: 0.5rem 0;
          text-align: center;
          letter-spacing: -0.5px;
          animation: fadeSlideUp 0.5s ease-out 0.2s both;
        }

        .login-subtitle {
          font-size: 1rem;
          color: #6b7280;
          margin-bottom: 2rem;
          text-align: center;
          animation: fadeSlideUp 0.5s ease-out 0.3s both;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          animation: fadeSlideUp 0.5s ease-out 0.4s both;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-weight: 500;
          color: #374151;
          font-size: 0.95rem;
        }

        .login-form input[type="email"],
        .login-form input[type="password"],
        .login-form input[type="text"] {
          padding: 0.75rem 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
          background-color: #f9fafb;
        }

        .login-form input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
          background-color: #fff;
        }

        .input-error {
          border-color: #ef4444 !important;
          background-color: #fef2f2 !important;
        }

        .password-wrapper {
          position: relative;
        }

        .password-toggle {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.85rem;
          color: #2563eb;
          cursor: pointer;
          transition: all 0.2s ease;
          user-select: none;
        }

        .password-toggle:hover {
          color: #1d4ed8;
          text-decoration: underline;
        }

        .remember-forgot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
        }

        .remember-me {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .remember-me input[type="checkbox"] {
          accent-color: #2563eb;
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        .forgot-link {
          color: #2563eb;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .forgot-link:hover {
          color: #1e40af;
          text-decoration: underline;
        }

        .login-button {
          background: linear-gradient(to right, #2563eb, #3b82f6);
          color: white;
          border: none;
          padding: 0.85rem;
          border-radius: 10px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
          position: relative;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 0.5rem;
        }

        .login-button:hover {
          background: linear-gradient(to right, #1e40af, #2563eb);
          box-shadow: 0 6px 16px rgba(37, 99, 235, 0.4);
          transform: translateY(-2px);
        }

        .login-button:active {
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.4);
        }

        .login-button::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 5px;
          height: 5px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 0;
          border-radius: 100%;
          transform: scale(1, 1) translate(-50%);
          transform-origin: 50% 50%;
        }

        .login-button:focus:not(:active)::after {
          animation: ripple 1s ease-out;
        }

        .divider {
          display: flex;
          align-items: center;
          margin: 1.5rem 0;
          color: #9ca3af;
          animation: fadeSlideUp 0.5s ease-out 0.6s both;
        }

        .divider::before,
        .divider::after {
          content: "";
          flex: 1;
          border-bottom: 1px solid #e5e7eb;
        }

        .divider span {
          margin: 0 10px;
          font-size: 0.9rem;
        }

        .social-logins {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          animation: fadeSlideUp 0.5s ease-out 0.7s both;
        }

        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem;
          border-radius: 10px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid #e5e7eb;
          background-color: white;
          color: #374151;
          gap: 0.75rem;
        }

        .social-btn:hover {
          background-color: #f9fafb;
          border-color: #d1d5db;
          transform: translateY(-1px);
        }

        .social-btn.google::before {
          content: "G";
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          background: linear-gradient(45deg, #4285f4, #34a853, #fbbc05, #ea4335);
          border-radius: 50%;
          color: white;
          font-weight: bold;
          font-size: 12px;
        }

        .signup-text {
          margin-top: 1.5rem;
          font-size: 0.95rem;
          color: #6b7280;
          text-align: center;
          animation: fadeSlideUp 0.5s ease-out 0.8s both;
        }

        .signup-link {
          color: #2563eb;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .signup-link:hover {
          color: #1e40af;
          text-decoration: underline;
        }

        .error {
          color: #ef4444;
          font-size: 0.85rem;
          margin-top: 0.25rem;
          animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }

        @keyframes floatIn {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.5);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(37, 99, 235, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0);
          }
        }

        @keyframes ripple {
          0% {
            transform: scale(0, 0);
            opacity: 0.5;
          }
          20% {
            transform: scale(25, 25);
            opacity: 0.5;
          }
          100% {
            opacity: 0;
            transform: scale(40, 40);
          }
        }

        @keyframes shake {
          10%, 90% {
            transform: translateX(-1px);
          }
          20%, 80% {
            transform: translateX(2px);
          }
          30%, 50%, 70% {
            transform: translateX(-4px);
          }
          40%, 60% {
            transform: translateX(4px);
          }
        }

        @keyframes zoomBg {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.1);
          }
        }

        @media (max-width: 600px) {
          .login-card {
            margin: 1rem;
            max-width: 90%;
          }
          
          .card-content {
            padding: 2rem 1.5rem;
          }
          
          .login-title {
            font-size: 1.75rem;
          }
          
          .social-btn {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
