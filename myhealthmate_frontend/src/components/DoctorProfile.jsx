import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState({});
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get('/api/doctor/', {
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
    };

    fetchDoctorProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.put('/api/doctor/', formData, {
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
    <div>
      <h2>Profile Overview</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="first_name"
            value={formData.first_name || ''}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="last_name"
            value={formData.last_name || ''}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
          <input
            type="text"
            name="specialty"
            value={formData.specialty || ''}
            onChange={handleChange}
            placeholder="Specialty"
            required
          />
          <input
            type="text"
            name="contact_info"
            value={formData.contact_info || ''}
            onChange={handleChange}
            placeholder="Contact Info"
            required
          />
          <input
            type="text"
            name="location"
            value={formData.location || ''}
            onChange={handleChange}
            placeholder="Location"
            required
          />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <p>First Name: {doctor.first_name}</p>
          <p>Last Name: {doctor.last_name}</p>
          <p>Specialty: {doctor.specialty}</p>
          <p>Contact: {doctor.contact_info}</p>
          <p>Location: {doctor.location}</p>
          <button onClick={() => setIsEditing(true)}>Update Profile</button>
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;
