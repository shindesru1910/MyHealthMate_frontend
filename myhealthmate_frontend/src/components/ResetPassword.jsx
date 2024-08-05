import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Retrieve uidb64 and token from the global window object
  const uidb64 = window.uidb64;
  const token = window.token;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire('Error', 'Passwords do not match', 'error');
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(`/reset/${uidb64}/${token}/`, { password });
      setIsLoading(false);
      Swal.fire('Success', response.data.message, 'success');
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      Swal.fire('Error', 'An error occurred while resetting the password', 'error');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Reset Password</h2>
          <form onSubmit={handleSubmit} className="border border-primary p-4 rounded">
            <div className="mb-3">
              <label htmlFor="password" className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {isLoading ?
              <button type="submit" className="btn btn-primary w-100" disabled>
                <div className="spinner-border spinner-border-sm text-light me-2" role="status"></div>
                Loading...
              </button>
              :
              <button type="submit" className="btn btn-primary w-100">
                Reset Password
              </button>
            }
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
