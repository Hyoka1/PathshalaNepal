import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/logo.png"; // Adjust the path to your logo image
import { toast } from "react-toastify";
import axios from "axios";
import { API_ENDPOINTS } from "../../constants/api";
// import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    gender: 1,
  });

  // Get today's date in YYYY-MM-DD format for max date
  const today = new Date().toISOString().split("T")[0];

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;
  const [loading, setLoading] = useState(false);

  const genderOptions = [
    { value: 1, label: "Male" },
    { value: 2, label: "Female" },
    { value: 3, label: "Other" },
  ];

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const validate = (step) => {
    const errs = {};

    if (step === 1 || step === "all") {
      if (!form.fullName) errs.fullName = "Full Name is required";

      if (!form.email) {
        errs.email = "Email is required";
      } else {
        // Email validation regex
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(form.email)) {
          errs.email = "Please enter a valid email address";
        }
      }

      if (!form.phoneNumber) errs.phoneNumber = "Phone number is required";
      if (!form.address) errs.address = "Address is required";

      if (!form.dateOfBirth) {
        errs.dateOfBirth = "Date of Birth is required";
      } else {
        const dob = new Date(form.dateOfBirth);
        const today = new Date();
        const minAge = 13;
        const maxAge = 100;

        // Check if date is in the future
        if (dob > today) {
          errs.dateOfBirth = "Date of Birth cannot be in the future";
        }

        // Calculate age
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < dob.getDate())
        ) {
          age--;
        }

        // Check age limits
        if (age < minAge) {
          errs.dateOfBirth = `You must be at least ${minAge} years old`;
        } else if (age > maxAge) {
          errs.dateOfBirth = `Age cannot be more than ${maxAge} years`;
        }
      }
    }

    if (step === 2 || step === "all") {
      if (!form.password) errs.password = "Password is required";
      if (!form.confirmPassword)
        errs.confirmPassword = "Confirm Password is required";
      if (form.password !== form.confirmPassword)
        errs.confirmPassword = "Passwords do not match";

      // Password strength validation
      if (form.password && form.password.length < 6) {
        errs.password = "Password must be at least 6 characters long";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (validate(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate("all")) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        API_ENDPOINTS.AUTH.REGISTER_MEMBER,
        {
          FullName: form.fullName,
          Email: form.email,
          PhoneNumber: form.phoneNumber,
          Address: form.address,
          DateOfBirth: form.dateOfBirth,
          Password: form.password,
          ConfirmPassword: form.confirmPassword,
          Gender: Number(form.gender),
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "text/plain",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Signup successful!");
        navigate("/login");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.errors?.Email?.[0] ||
        error.response?.data?.errors?.Address?.[0] ||
        error.response?.data?.errors?.FullName?.[0] ||
        error.response?.data?.errors?.Password?.[0] ||
        error.response?.data?.errors?.PhoneNumber?.[0] ||
        error.response?.data?.errors?.ConfirmPassword?.[0] ||
        error.response?.data ||
        "An error occurred. Please try again.";
      toast.error(errorMessage);
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="background-image"></div>
      <div className="overlay"></div>

      <div className="signup-card">
        <div className="card-content">
          <div className="logo-container">
            <a href="/">
              <img src={logo} alt="PathsalaNepal" className="logo" />
            </a>
          </div>

          <h1 className="signup-title">Create Your Account</h1>
          <p className="signup-subtitle">
            Join PathsalaNepal – Padna Pani, Badhna Pani
          </p>

          <div className="steps-indicator">
            {[...Array(totalSteps)].map((_, i) => (
              <div
                key={i}
                className={`step ${i + 1 === currentStep ? "active" : ""} ${
                  i + 1 < currentStep ? "completed" : ""
                }`}
              >
                <div className="step-number">{i + 1}</div>
                <div className="step-label">
                  {i === 0 ? "Personal Info" : "Account Setup"}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="signup-form">
            {currentStep === 1 && (
              <div className="step-content">
                {[
                  {
                    label: "Full Name",
                    name: "fullName",
                    type: "text",
                    placeholder: "Enter your full name",
                  },
                  {
                    label: "Email",
                    name: "email",
                    type: "email",
                    placeholder: "you@example.com",
                  },
                  {
                    label: "Phone Number",
                    name: "phoneNumber",
                    type: "text",
                    placeholder: "+977 98xxxxxxxx",
                  },
                  {
                    label: "Address",
                    name: "address",
                    type: "text",
                    placeholder: "Enter your address",
                  },
                  {
                    label: "Date of Birth",
                    name: "dateOfBirth",
                    type: "date",
                    placeholder: "Select your date of birth",
                    max: today,
                  },
                  {
                    label: "Gender",
                    name: "gender",
                    type: "select",
                    options: genderOptions,
                    placeholder: "Select your gender",
                  },
                ].map(({ label, name, type, placeholder, options, max }) => (
                  <div key={name} className="form-group">
                    <label>{label}</label>
                    {type === "select" ? (
                      <select
                        name={name}
                        value={form[name]}
                        onChange={handleChange}
                        className={errors[name] ? "input-error" : ""}
                      >
                        <option value="">{placeholder}</option>
                        {options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={type}
                        name={name}
                        value={form[name]}
                        onChange={handleChange}
                        className={errors[name] ? "input-error" : ""}
                        placeholder={placeholder}
                        max={max}
                      />
                    )}
                    {errors[name] && <p className="error">{errors[name]}</p>}
                  </div>
                ))}

                <div className="form-actions">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="next-button"
                  >
                    Continue <span className="arrow">→</span>
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="step-content">
                <div className="form-group">
                  <label>Password</label>
                  <div className="password-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      className={errors.password ? "input-error" : ""}
                      placeholder="Enter your password"
                    />
                    <span
                      onClick={togglePasswordVisibility}
                      className="password-toggle"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </span>
                  </div>
                  {errors.password && (
                    <p className="error">{errors.password}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Confirm Password</label>
                  <div className="password-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      className={errors.confirmPassword ? "input-error" : ""}
                      placeholder="Confirm your password"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="error">{errors.confirmPassword}</p>
                  )}
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="back-button"
                  >
                    <span className="arrow">←</span> Back
                  </button>
                  <button
                    type="submit"
                    className="signup-button"
                    disabled={loading}
                  >
                    {loading ? "Signing up..." : "Sign Up"}
                  </button>
                </div>
              </div>
            )}
          </form>

          <p className="login-text">
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Login
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

        .signup-container {
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

        .signup-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          width: 100%;
          max-width: 550px;
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

        .signup-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1d4ed8;
          margin: 0.5rem 0;
          text-align: center;
          letter-spacing: -0.5px;
          animation: fadeSlideUp 0.5s ease-out 0.2s both;
        }

        .signup-subtitle {
          font-size: 1rem;
          color: #6b7280;
          margin-bottom: 2rem;
          text-align: center;
          animation: fadeSlideUp 0.5s ease-out 0.3s both;
        }

        .steps-indicator {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 2rem;
          position: relative;
        }

        .steps-indicator::after {
          content: '';
          position: absolute;
          top: 23px;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 3px;
          background-color: #e5e7eb;
          z-index: 0;
        }

        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 33%;
          position: relative;
          z-index: 1;
          transition: all 0.3s ease;
        }

        .step-number {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background-color: #e5e7eb;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 600;
          color: #6b7280;
          margin-bottom: 0.5rem;
          border: 2px solid #fff;
          transition: all 0.3s ease;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .step.active .step-number {
          background-color: #2563eb;
          color: white;
          transform: scale(1.1);
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.2);
        }

        .step.completed .step-number {
          background-color: #10b981;
          color: white;
        }

        .step-label {
          font-size: 0.85rem;
          color: #6b7280;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .step.active .step-label {
          color: #2563eb;
          font-weight: 600;
        }

        .step.completed .step-label {
          color: #10b981;
        }

        .signup-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          animation: fadeSlideUp 0.5s ease-out 0.4s both;
        }

        .step-content {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          animation: fadeIn 0.4s ease-out;
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

        .signup-form input[type="text"],
        .signup-form input[type="email"],
        .signup-form input[type="password"],
        .signup-form select {
          padding: 0.75rem 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
          background-color: #f9fafb;
        }

        .signup-form input:focus,
        .signup-form select:focus {
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

        .agree-terms {
          margin-top: 0.5rem;
        }

        .remember-me {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
        }

        .remember-me input[type="checkbox"] {
          accent-color: #2563eb;
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        .remember-me a {
          color: #2563eb;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .remember-me a:hover {
          color: #1e40af;
          text-decoration: underline;
        }

        .form-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
        }

        .next-button,
        .back-button,
        .signup-button {
          background: linear-gradient(to right, #2563eb, #3b82f6);
          color: white;
          border: none;
          padding: 0.85rem 1.5rem;
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
          gap: 0.5rem;
          text-align: center;
        }

        .next-button {
          margin-left: auto;
        }

        .back-button {
          background: #f3f4f6;
          color: #4b5563;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .back-button:hover {
          background: #e5e7eb;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
          transform: translateY(-2px);
        }

        .next-button:hover,
        .signup-button:hover {
          background: linear-gradient(to right, #1e40af, #2563eb);
          box-shadow: 0 6px 16px rgba(37, 99, 235, 0.4);
          transform: translateY(-2px);
        }

        .next-button:active,
        .back-button:active,
        .signup-button:active {
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.4);
        }

        .next-button::after,
        .back-button::after,
        .signup-button::after {
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

        .next-button:focus:not(:active)::after,
        .back-button:focus:not(:active)::after,
        .signup-button:focus:not(:active)::after {
          animation: ripple 1s ease-out;
        }

        .arrow {
          font-size: 1.2rem;
          line-height: 1;
        }

        .login-text {
          margin-top: 1.5rem;
          font-size: 0.95rem;
          color: #6b7280;
          text-align: center;
          animation: fadeSlideUp 0.5s ease-out 0.8s both;
        }

        .login-link {
          color: #2563eb;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .login-link:hover {
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

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
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
          .signup-card {
            margin: 1rem;
            max-width: 90%;
          }
          
          .card-content {
            padding: 2rem 1.5rem;
          }
          
          .signup-title {
            font-size: 1.75rem;
          }
          
          .form-actions {
            flex-direction: column;
            gap: 1rem;
          }
          
          .next-button,
          .back-button,
          .signup-button {
            width: 100%;
          }
          
          .next-button {
            margin-left: 0;
          }
          
          .steps-indicator::after {
            width: 70%;
          }
        }

        .signup-form select {
          padding: 0.75rem 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
          background-color: #f9fafb;
          width: 100%;
          cursor: pointer;
        }

        .signup-form select:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
          background-color: #fff;
        }

        .signup-form select.input-error {
          border-color: #ef4444;
          background-color: #fef2f2;
        }
      `}</style>
    </div>
  );
};

export default Signup;
