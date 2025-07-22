// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import './index.css';

// function Signup() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     address: '',
//     dateOfBirth: '',
//     gender: 1,
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validation
//     if (formData.password !== formData.confirmPassword) {
//       toast.error("Passwords don't match!");
//       return;
//     }

//     if (formData.password.length < 6) {
//       toast.error("Password must be at least 6 characters long!");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await axios.post('https://6430-1a00-b040-e51a-19c8-fb00-b156-22cc.ngrok-free.app/api/Member', {
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         address: formData.address,
//         dateOfBirth: formData.dateOfBirth,
//         gender: parseInt(formData.gender),
//         email: formData.email,
//         password: formData.password
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//           'accept': 'text/plain'
//         }
//       });

//       if (response.status === 200) {
//         toast.success('Signup successful!');
//         navigate('/login');
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data || 'An error occurred. Please try again.';
//       toast.error(errorMessage);
//       console.error('Signup error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-form-container">
//         <h2>Create Account</h2>
//         <form onSubmit={handleSubmit} className="signup-form">
//           <div className="form-group">
//             <label htmlFor="firstName">First Name</label>
//             <input
//               type="text"
//               id="firstName"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="lastName">Last Name</label>
//             <input
//               type="text"
//               id="lastName"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="confirmPassword">Confirm Password</label>
//             <input
//               type="password"
//               id="confirmPassword"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="address">Address</label>
//             <textarea
//               id="address"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="dateOfBirth">Date of Birth</label>
//             <input
//               type="date"
//               id="dateOfBirth"
//               name="dateOfBirth"
//               value={formData.dateOfBirth}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="gender">Gender</label>
//             <select
//               id="gender"
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               required
//             >
//               <option value={1}>Male</option>
//               <option value={2}>Female</option>
//               <option value={3}>Other</option>
//             </select>
//           </div>

//           <button 
//             type="submit" 
//             className="signup-button"
//             disabled={loading}
//           >
//             {loading ? 'Signing up...' : 'Sign Up'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Signup; 