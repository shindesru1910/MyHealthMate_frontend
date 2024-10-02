import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode to decode the JWT token

const DoctorsSection = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(4); // Number of doctors to display per page
  const [loggedInDoctor, setLoggedInDoctor] = useState(null); // State for logged-in doctor

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/get-doctor');
        console.log('API response:', response.data);
        if (Array.isArray(response.data.data)) {
          setDoctors(response.data.data);
        } else {
          console.error('Unexpected response structure:', response.data);
          setError('Unexpected response structure');
        }
      } catch (error) {
        if (error.response) {
          console.error('Server responded with an error:', error.response.data);
          setError('Server error');
        } else if (error.request) {
          console.error('No response received:', error.request);
          setError('No response from server');
        } else {
          console.error('Error setting up request:', error.message);
          setError('Request setup error');
        }
      }
    };

    fetchDoctors();
  }, []);

  // Decode the token to get the logged-in doctor's name
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setLoggedInDoctor(decodedToken); // Store the decoded token data
    }
  }, []);

  // Calculate the index of the first and last doctor to display
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  // Handle page change
  const handleNextPage = (event) => {
    event.preventDefault();
    if (indexOfLastDoctor < doctors.length) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = (event) => {
    event.preventDefault();
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const paginationControlsStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  };

  const iconStyle = {
    fontSize: '50px',
    color: '#007bff', // Change to your preferred color
    textDecoration: 'none',
    padding: '10px',
    margin: '0 10px',
    cursor: 'pointer',
  };

  const disabledIconStyle = {
    ...iconStyle,
    color: '#d3d3d3', // Light grey for disabled state
    cursor: 'not-allowed',
  };

  return (
    <section id="doctors" className="doctors section">
      {/* Section Title */}
      <div className="container section-title">
        <h2>Doctors</h2>

        {/* <div className="d-flex justify-content-between align-items-right">
          {!loggedInDoctor ? ( // Check if a doctor is NOT logged in
            <h5 className="mb-0">Login for doctors to access Patient Records, Appointments, and more.</h5> // Display the login message
          ) : ( // If a doctor is logged in, display their name
            <a
              href="/doctor-login"
              className="btn btn-primary nav-link active ms-3"
              style={{
                textDecoration: 'none',
                backgroundColor: '#1977CC',
                color: '#fff',
                padding: "5px",
                border: 'none'
              }}
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
            >
            {loggedInDoctor.doctorname}
            </a>
          )}
          {loggedInDoctor ? null : ( // If no doctor is logged in, display the button
            <a
              href="/doctor-login"
              className="btn btn-primary nav-link active ms-3"
              style={{
                textDecoration: 'none',
                backgroundColor: '#1977CC',
                color: '#fff',
                padding: "5px",
                border: 'none'
              }}
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
            >
              For Doctors
            </a>
          )}
        </div> */}
        <div className="d-flex justify-content-between align-items-center">
  <div>
    {!loggedInDoctor ? ( // Check if a doctor is NOT logged in
      <h5 className="mb-0">Login for doctors to access Patient Records, Appointments, and more.</h5> // Display the login message
    ) : ( // If a doctor is logged in, display their name
      <span className="mb-0">Welcome, Dr. {loggedInDoctor.doctorname}!</span> // Display doctor's name
    )}
  </div>
  {!loggedInDoctor ? ( // If no doctor is logged in, display the button
    <a
      href="/doctor-login"
      className="btn btn-primary nav-link active ms-3"
      style={{
        textDecoration: 'none',
        backgroundColor: '#1977CC',
        color: '#fff',
        padding: "5px",
        border: 'none'
      }}
      onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
      onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
    >
      For Doctors
    </a>
  ) : ( // If a doctor is logged in, display the button on the right
    <a
      href="/doctor-dashboard"
      className="btn btn-primary nav-link active ms-3"
      style={{
        textDecoration: 'none',
        backgroundColor: '#1977CC',
        color: '#fff',
        padding: "5px 15px", // Adjust padding for a better look
        borderRadius: '20px', // Add roundness to the button
        border: 'none'
      }}
      onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
      onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
    >
      <i class="fas fa-user-md"></i> {loggedInDoctor.doctorname}
    </a>
  )}
</div>


        <p>"Our trusted doctors to help you achieve better health."</p>
      </div>

      {/* Doctors Content */}
      <div className="container">
        <div className="row gy-4">
          {error ? (
            <p>Error: {error}</p>
          ) : currentDoctors.length > 0 ? (
            currentDoctors.map(doctor => (
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

        {/* Pagination Controls */}
        <div style={paginationControlsStyle}>
          <a
            href="#"
            style={currentPage === 1 ? disabledIconStyle : iconStyle}
            onClick={handlePrevPage}
            aria-disabled={currentPage === 1}
          >
            &#8249;
          </a>
          <a
            href="#"
            style={indexOfLastDoctor >= doctors.length ? disabledIconStyle : iconStyle}
            onClick={handleNextPage}
            aria-disabled={indexOfLastDoctor >= doctors.length}
          >
            &#8250;
          </a>
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
