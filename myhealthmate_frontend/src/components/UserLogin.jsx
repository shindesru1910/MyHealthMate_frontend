import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './UserLogin.css';
import {jwtDecode} from 'jwt-decode';
// import jwt from 'jwt-decode';

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    let login_formdata = new FormData();
    login_formdata.append('email', formData.email)
    login_formdata.append('password', formData.password)

    try {
      const response = await axios.post('/login', login_formdata); // Adjust the endpoint URL as per your Django API
      if (response.data.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token);

        const decodedToken = jwtDecode(token);
        const isAdmin = decodedToken.is_admin;

        setIsLoading(false);
        if (isAdmin) {
          navigate('/adminpage');
        } else {
          navigate('/userpage');
        }
      } else {
        setIsLoading(false);
        console.log(response);
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
          <form onSubmit={handleSubmit} className="needs-validation border border-primary p-4 rounded" noValidate>
            <h2 className="text-center mb-4">Login</h2>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                name="email"
                required
                />
              <div className="invalid-feedback">
                Please enter a valid email address.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                name="password"
                required
              />
            </div>
            <div className="text-center mt-3">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <div className="text-center mt-2">
              <span>Don't have an account? </span><Link to="/register">Register</Link>
              {isLoading ?
                <button type="submit" className="btn btn-primary w-100" disabled>
                  <div className="spinner-border spinner-border-sm text-light me-2" role="status">
                  </div>
                  Loading...
                </button>
                :
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;

