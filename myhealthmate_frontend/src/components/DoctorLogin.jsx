// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import { jwtDecode } from 'jwt-decode';
// import './UserLogin.css'; // Create a separate CSS file for styling

// const DoctorLogin = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const form = document.getElementById('doctorLoginForm');
//     form.addEventListener('submit', (event) => {
//       if (!form.checkValidity()) {
//         event.preventDefault();
//         event.stopPropagation();
//       }
//       form.classList.add('was-validated');
//     });
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     const loginData = {
//         email: formData.email,
//         password: formData.password
//     };

//     try {
//         const response = await axios.post('/doctor/login/', loginData, {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         if (response.data.status === 200) {
//             const token = response.data.token;
//             localStorage.setItem('token', token);

//             const decodedToken = jwtDecode(token);
//             const isAdmin = decodedToken.is_admin;

//             setIsLoading(false);
//             if (isAdmin) {
//                 navigate('/adminpage');
//             } else {
//                 navigate('/doctor-dashboard');
//             }
//         } else {
//             setIsLoading(false);
//             Swal.fire('Error', response.data.msg, 'error'); // Show error message if login fails
//         }
//     } catch (error) {
//         console.error(error);
//         setIsLoading(false);
//         Swal.fire('Error', 'An error occurred while logging in', 'error'); // Catch any network or server errors
//     }
// };


//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <h1 style={{ color: '#FFFFFF', textAlign: 'center' }}>MyHealthMate - Doctor Login</h1>
//           <br />
//           <form style={{ backgroundColor: '#FFFFFF' }} id="doctorLoginForm" onSubmit={handleSubmit} className="needs-validation border border-primary p-4 rounded" noValidate>
//             <h2 className="text-center mb-4">Doctor Login</h2>
//             <div className="mb-3">
//               <label htmlFor="email" className="form-label">Email address</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 id="doctorEmail"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 name="email"
//                 required
//               />
//               <div className="invalid-feedback">
//                 Please enter a valid email address.
//               </div>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="password" className="form-label">Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 id="doctorPassword"
//                 aria-describedby="passwordHelpBlock"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 name="password"
//                 required
//                 minLength="4"
//               />
//               <div className="invalid-feedback">
//                 Password must be at least 4 characters long.
//               </div>
//             </div>
//             <div className="text-center mt-3">
//               <Link to="/password-reset">Forgot Password?</Link>
//             </div>
//             <div className="text-center mt-2">
//               <span>Don't have an account? </span><Link to="/doctor-registartion">Register</Link>
//               {isLoading ?
//                 <button type="submit" className="btn btn-primary w-100" disabled>
//                   <div className="spinner-border spinner-border-sm text-light me-2" role="status"></div>
//                   Loading...
//                 </button>
//                 :
//                 <button type="submit" className="btn btn-primary w-100">
//                   Login
//                 </button>
//               }
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorLogin;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import {jwtDecode} from 'jwt-decode'; // Ensure you have this imported
import './UserLogin.css'; // Create a separate CSS file for styling

const DoctorLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState(''); // State to hold the username
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage and decode it
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.username); // Set the username from the token
        navigate('/doctor-dashboard'); // Redirect to dashboard if logged in
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }

    const form = document.getElementById('doctorLoginForm');
    form.addEventListener('submit', (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const loginData = {
      email: formData.email,
      password: formData.password
    };

    try {
      const response = await axios.post('/doctor/login/', loginData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token);

        const decodedToken = jwtDecode(token);
        const isAdmin = decodedToken.is_admin;

        setIsLoading(false);
        if (isAdmin) {
          navigate('/adminpage');
        } else {
          navigate('/doctor-dashboard');
        }
      } else {
        setIsLoading(false);
        Swal.fire('Error', response.data.msg, 'error'); // Show error message if login fails
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      Swal.fire('Error', 'An error occurred while logging in', 'error'); // Catch any network or server errors
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 style={{ color: '#FFFFFF', textAlign: 'center' }}>MyHealthMate - Doctor Login</h1>
          <br />
          <form
            style={{ backgroundColor: '#FFFFFF' }}
            id="doctorLoginForm"
            onSubmit={handleSubmit}
            className="needs-validation border border-primary p-4 rounded"
            noValidate
          >
            <h2 className="text-center mb-4">Doctor Login</h2>

            {/* Display the greeting if the user is logged in */}
            {username ? (
              <div className="alert alert-info text-center" role="alert">
                Welcome back, {username}!
              </div>
            ) : null}

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="doctorEmail"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                name="email"
                required
              />
              <div className="invalid-feedback">Please enter a valid email address.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="doctorPassword"
                aria-describedby="passwordHelpBlock"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                name="password"
                required
                minLength="4"
              />
              <div className="invalid-feedback">Password must be at least 4 characters long.</div>
            </div>
            <div className="text-center mt-3">
              <Link to="/password-reset">Forgot Password?</Link>
            </div>
            <div className="text-center mt-2">
              <span>Don't have an account? </span>
              <Link to="/doctor-registration">Register</Link>
              {isLoading ? (
                <button type="submit" className="btn btn-primary w-100" disabled>
                  <div className="spinner-border spinner-border-sm text-light me-2" role="status"></div>
                  Loading...
                </button>
              ) : (
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DoctorLogin;
