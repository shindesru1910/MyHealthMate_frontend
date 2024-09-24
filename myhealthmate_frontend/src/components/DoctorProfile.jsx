import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DoctorProfile.css'; // Assuming you have a separate CSS file for styles

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState({});
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [doctorId, setDoctorId] = useState(null); // State to hold doctorId

  useEffect(() => {
    // Decode the token to extract doctor_id
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the JWT token
      setDoctorId(decodedToken.doctor_id); // Set doctorId from the token
    }

    // Fetch doctor profile only if doctorId is available
    const fetchDoctorProfile = async () => {
      if (doctorId) {
        try {
          const response = await axios.get(`/api/doctor/${doctorId}/`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          console.log("API Response:", response.data);
          setDoctor(response.data);
          setFormData(response.data); // Initialize formData with fetched data
        } catch (error) {
          console.error('Error fetching doctor profile:', error.response ? error.response.data : error);
        }
      }
    };

    fetchDoctorProfile();
  }, [doctorId]); // Add doctorId to the dependency array

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.put(`/api/doctor/${doctorId}/`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log("Update Response:", response.data);
      setIsEditing(false);
      setDoctor(formData); // Update state with the new form data
    } catch (error) {
      console.error('Error updating doctor profile:', error.response ? error.response.data : error);
    }
  };

  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img 
              className="rounded-circle mt-5" 
              width="150px" 
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" 
              alt="Doctor Avatar"
            />
            <span className="font-weight-bold">{doctor.first_name} {doctor.last_name}</span>
            <span className="text-black-50">{doctor.specialty}</span> {/* Display specialty instead of email */}
          </div>
        </div>
        <div className="col-md-9 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Profile Settings</h4>
            </div>
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="labels">First Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="first_name" 
                      value={formData.first_name || ''} 
                      onChange={handleChange}
                      readOnly 
                      placeholder="First Name" 
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">Last Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="last_name" 
                      value={formData.last_name || ''} 
                      onChange={handleChange} 
                      readOnly
                      placeholder="Last Name" 
                      required 
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">Specialty</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="specialty" 
                      value={formData.specialty || ''} 
                      onChange={handleChange} 
                      readOnly
                      placeholder="Enter Specialty" 
                      required 
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Contact Number</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="contact_info" 
                      value={formData.contact_info || ''} 
                      onChange={handleChange} 
                      placeholder="Enter Contact Number" 
                      required 
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Location</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="location" 
                      value={formData.location || ''} 
                      onChange={handleChange} 
                      placeholder="Enter Location" 
                      required 
                    />
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <button className="btn btn-primary profile-button" type="submit">Save Profile</button>
                  <button 
                    type="button" 
                    className="btn btn-secondary profile-button ml-3" 
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <p>First Name: {doctor.first_name}</p>
                <p>Last Name: {doctor.last_name}</p>
                <p>Specialty: {doctor.specialty}</p> {/* Display specialty here */}
                <p>Contact: {doctor.contact_info}</p>
                <p>Location: {doctor.location}</p>
                <div className="mt-5 text-center">
                  <button className="btn btn-primary profile-button" onClick={() => setIsEditing(true)}>Update Profile</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
