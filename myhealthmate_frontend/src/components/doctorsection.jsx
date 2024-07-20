import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorsSection = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/get-doctor');
        console.log('API response:', response.data);
        // setDoctors(response.data.doctors);
        if (Array.isArray(response.data.data)) {
          setDoctors(response.data.data);
        } else {
          console.error('Unexpected response structure:', response.data);
          setError('Unexpected response structure');
        }
      } catch (error) {
        if (error.response) {
          // Server responded with a status code that falls out of the range of 2xx
          console.error('Server responded with an error:', error.response.data);
          setError('Server error');
        } else if (error.request) {
          // Request was made but no response was received
          console.error('No response received:', error.request);
          setError('No response from server');
        } else {
          // Something went wrong in setting up the request
          console.error('Error setting up request:', error.message);
          setError('Request setup error');
        }
      }
    };

    fetchDoctors();
  }, []);

  return (
    <section id="doctors" className="doctors section">
      {/* Section Title */}
      <div className="container section-title">
        <h2>Doctors</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      {/* Doctors Content */}
      <div className="container">
        <div className="row gy-4">
          {error ? (
            <p>Error: {error}</p>
          ) : doctors.length > 0 ? (
            doctors.map(doctor => (
              <DoctorMember
                key={doctor.id}
                imgSrc={`assets/img/doctors/doctors-${doctor.id}.jpg`}
                name={`${doctor.first_name} ${doctor.last_name}`}
                specialization={doctor.specialty}
                description={doctor.reviews}
                contact_info={doctor.contact_info}
                location={doctor.location}
              />
            ))
          ) : (
            <p>No doctors available</p>
          )}
        </div>
      </div>
    </section>
  );
};

const DoctorMember = ({ imgSrc, name, specialization, description, contact_info, location }) => {
  return (
    <div className="col-lg-6" data-aos-delay="100">
      <div className="team-member d-flex align-items-start">
        <div className="pic"><img src={imgSrc} className="img-fluid" alt={name} /></div>
        <div className="member-info">
          <h4>{name}</h4>
          <span>{specialization}</span>
          <p>{description}</p>
          <p>{contact_info}</p>
          <p>{location}</p>
          <div className="social">
            <a href=""><i className="bi bi-telephone-fill"></i></a>
            <a href=""><i className="bi bi-chat"></i></a>
            <a href=""><i className="bi bi-facebook"></i></a>
            <a href=""><i className="bi bi-instagram"></i></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsSection;

