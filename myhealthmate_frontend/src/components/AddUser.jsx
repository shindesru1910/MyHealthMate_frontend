import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { errortoast, successtoast } from '../functions/toast';

export default function AddUser() {
  const initialState = { email: '', first_name: '', last_name: '', phone: '', address: '', password: '', confirm_password: '', is_admin: false };
  const [userData, setUserData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setUserData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios.post("/user/create-user", userData)
      .then((response) => {
        if (response.data.status === 200) {
          successtoast(response.data.msg);
        } else {
          errortoast(response.data.msg);
        }
      })
      .catch(error => {
        errortoast("An error occurred. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} className='needs-validation was-validated'>
        <div className="container border mt-4 shadow p-4">
          <h2 className="text-center mb-4">Add User</h2>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={userData.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input type="text" className="form-control" name="first_name" value={userData.first_name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input type="text" className="form-control" name="last_name" value={userData.last_name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input type="tel" className="form-control" name="phone" value={userData.phone} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input type="text" className="form-control" name="address" value={userData.address} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={userData.password} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-control" name="confirm_password" value={userData.confirm_password} onChange={handleChange} required />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" name="is_admin" checked={userData.is_admin} onChange={handleCheckboxChange} />
            <label className="form-check-label">Is Admin?</label>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Loading...' : 'Submit'}</button>
          </div>
        </div>
      </form>
    </>
  );
}
