import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from 'axios';
import { errortoast, successtoast } from '../functions/toast';

function AddEditUserModal(props) {
  const { onHide, flag, editUserData } = props;
  
  let initialState;
  if (flag === 'edit') {
    initialState = editUserData;
  } else {
    initialState = { phone: '', email: '', first_name: '', last_name: '', password: '', confirm_password: '', date_of_birth: '', gender: '', address: '', is_admin: false };
  }
  const [userData, setUserData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setUserData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSave = () => {
    const url = flag === 'add' ? '/user/create' : '/user/update';
    axios.post(url, userData)
      .then(response => {
        if (response.data.status === 200) {
          // successtoast(response.data.msg);
          onHide();
        } else {
          errortoast(response.data.msg);
        }
      })
      .catch(error => {
        errortoast("An error occurred. Please try again.");
      });
  };

  return (
    <Modal
      {...props}
      size="lg"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {flag === 'add' ? 'Add User' : 'Edit User'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row mb-2">
          <div className="col-3 d-flex justify-content-center">First Name</div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              name="first_name"
              value={userData.first_name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-3 d-flex justify-content-center">Last Name</div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              name="last_name"
              value={userData.last_name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-3 d-flex justify-content-center">Phone Number</div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-3 d-flex justify-content-center">Email</div>
          <div className="col">
            <input
              type="email"
              className="form-control"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-3 d-flex justify-content-center">Date of Birth</div>
          <div className="col">
            <input
              type="date"
              className="form-control"
              name="date_of_birth"
              value={userData.date_of_birth}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-3 d-flex justify-content-center">Gender</div>
          <div className="col">
            <select value={userData.gender} name="gender" onChange={handleChange} className="form-select" aria-label="Default select example">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-3 d-flex justify-content-center">Address</div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              name="address"
              value={userData.address}
              onChange={handleChange}
            />
          </div>
        </div>
        {flag === 'add' &&
          <>
            <div className="row mb-2">
              <div className="col-3 d-flex justify-content-center">Password</div>
              <div className="col">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-3 d-flex justify-content-center">Confirm Password</div>
              <div className="col">
                <input
                  type="password"
                  className="form-control"
                  name="confirm_password"
                  value={userData.confirm_password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </>
        }
        <div className="col ml-6 offset-1">
          <label>
            <input
              type="checkbox"
              name="is_admin"
              className="me-2"
              checked={userData.is_admin}
              onChange={handleCheckboxChange}
            />
            Is Admin?
          </label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
        <Button onClick={handleSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddEditUserModal;
