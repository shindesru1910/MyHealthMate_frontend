import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from 'axios';



function AddEditdoctorModal(props) {
  const {  onHide, flag, editdoctorData, handlesave } = props;

  
  // console.log(cities);
  let InitialState;
  if (flag === 'edit') {
    InitialState = editdoctorData;
    // console.log(editdoctorData);
  } else {
    InitialState = { first_name: '', last_name: '', specialty: '', contact_info: '', reviews: '', location: ''}
  }
  const [doctorData, setdoctorData] = useState(InitialState);
  console.log(doctorData);
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdoctorData(Prev => ({ ...Prev, [name]: value }))
  }
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setdoctorData(Prev => ({ ...Prev, [name]: checked }))
    console.log(e.target.checked);
  };
  try {
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
            {flag === 'add' ? 'Add doctor' : 'Edit doctor'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <div className="row mb-2">
            <div className="col-3 d-flex justify-content-center">Fisrt Name</div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="first_name"
                value={doctorData.first_name}
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
                value={doctorData.last_name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-3 d-flex justify-content-center">speciality</div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="specialty"
                value={doctorData.specialty}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-3 d-flex justify-content-center">Phone</div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="contact_info"
                value={doctorData.contact_info}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-3 d-flex justify-content-center">Reviews</div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="reviews"
                value={doctorData.reviews}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-3 d-flex justify-content-center">Location</div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="location"
                value={doctorData.location}
                onChange={handleChange}
              />
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
          <Button onClick={() => handlesave(doctorData)}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  } catch (error) {
    // return <ErrorHandler error={error} />;
  }
}

export default AddEditdoctorModal;
