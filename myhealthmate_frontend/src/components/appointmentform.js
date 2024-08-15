import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch specialties
        const specialtiesResponse = await axios.get('http://127.0.0.1:8000/get-specialties');
        setSpecialties(specialtiesResponse.data.specialties || []);

        // Fetch doctors
        const doctorsResponse = await axios.get('http://127.0.0.1:8000/get-doctor');
        setDoctors(doctorsResponse.data.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data.');
        setSpecialties([]);  // Initialize to empty array if error occurs
        setDoctors([]);      // Initialize to empty array if error occurs
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter doctors when the selected specialty changes
    if (selectedSpecialty) {
      const filtered = doctors.filter(doc => doc.specialty === selectedSpecialty);
      setFilteredDoctors(filtered);
      setSelectedDoctor(''); // Reset selected doctor when specialty changes
    } else {
      setFilteredDoctors([]);
    }
  }, [selectedSpecialty, doctors]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    setLoading(true);
    setError('');
    setSuccessMessage('');
  
    try {
      const formData = new FormData(event.target);
  
      const response = await fetch('http://127.0.0.1:8000/submit-appointment', {
        method: 'POST',
        body: formData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.status === 'OK') {
          setSuccessMessage('Appointment submitted successfully.');
          event.target.reset();
        } else {
          throw new Error(data.error || 'Form submission failed.');
        }
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
      console.error('Fetch error:', error); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form className="appointment-form" onSubmit={handleSubmit}>
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6">
            <div className="form-group">
              <input type="text" name="name" placeholder="Your Name" className="form-control" required />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="form-group">
              <input type="email" name="email" placeholder="Your Email" className="form-control" required />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="form-group">
              <input type="tel" name="phone" placeholder="Your Phone Number" className="form-control" />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="form-group">
              <input type="date" name="date" className="form-control" required />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="form-group">
              <select 
                name="speciality" 
                className="form-control" 
                required 
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                value={selectedSpecialty}
              >
                <option value="">Select Speciality</option>
                {specialties.length > 0 && specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="form-group">
              <select 
                name="doctor" 
                className="form-control" 
                required 
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
              >
                <option value="">Select Doctor</option>
                {filteredDoctors.length > 0 && filteredDoctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>{`${doctor.first_name} ${doctor.last_name}`}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <textarea name="message" placeholder="Message" rows="5" className="form-control"></textarea>
            </div>
          </div>
          <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>

        {loading && <p className="text-center mt-3">Loading...</p>}
        {error && <p className="error-message text-center">{error}</p>}
        {successMessage && <p className="sent-message text-center">{successMessage}</p>}
      </form>
    </div>
  );
};

export default AppointmentForm;
