import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import {jwtDecode} from 'jwt-decode'; // Ensure correct import of jwt-decode
import './UserLogin.css';

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    });

    // Check if the user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const isAdmin = decodedToken.is_admin;
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp > currentTime) {
          // If token is valid, redirect the user based on their role
          if (isAdmin) {
            navigate('/adminpage');
          } else {
            navigate('/userpage');
          }
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let login_formdata = new FormData();
    login_formdata.append('email', formData.email);
    login_formdata.append('password', formData.password);

    try {
      const response = await axios.post('/login', login_formdata);
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
        Swal.fire('Error', response.data.msg, 'error');
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      Swal.fire('Error', 'An error occurred while logging in', 'error');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 style={{ color: '#FFFFFF', textAlign: 'center' }}>MyHealthMate</h1>
          <br />
          <form
            style={{ backgroundColor: '#FFFFFF' }}
            id="loginForm"
            onSubmit={handleSubmit}
            className="needs-validation border border-primary p-4 rounded"
            noValidate
          >
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
                minLength="4"
              />
              <div className="invalid-feedback">
                Password must be at least 4 characters long.
              </div>
            </div>
            <div className="text-center mt-3">
              <Link to="/password-reset">Forgot Password?</Link>
            </div>
            <div className="text-center mt-2">
              <span>Don't have an account? </span><Link to="/register">Register</Link>
              {isLoading ? (
                <button type="submit" className="btn btn-primary w-100" disabled>
                  <div className="spinner-border spinner-border-sm text-light me-2" role="status"></div>
                  Loading...
                </button>
              ) : (
                <button type="submit" className="btn btn-primary w-100">Login</button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
