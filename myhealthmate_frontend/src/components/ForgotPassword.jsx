import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Create FormData and append email
    let form_data = new FormData();
    form_data.append('email', email);

    try {
      console.log('Sending request to backend...');
      const response = await axios.post('http://127.0.0.1:8000/password-reset-request', form_data);  // Ensure URL matches backend endpoint
      console.log('Response from backend:', response);
      setIsLoading(false);
      Swal.fire('Success', response.data.message, 'success');
    } catch (error) {
      console.error('Error from backend:', error);
      setIsLoading(false);
      if (error.response && error.response.data && error.response.data.message) {
        Swal.fire('Error', error.response.data.message, 'error');
      } else {
        Swal.fire('Error', 'An error occurred while requesting the password reset', 'error');
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Forgot Password</h2>
          <form onSubmit={handleSubmit} className="border border-primary p-4 rounded">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                Submit
              </button>
            }
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
