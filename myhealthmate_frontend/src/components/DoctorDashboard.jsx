import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Import jwtDecode
import axios from 'axios';
import Confetti from 'react-confetti';
import Card from '../common/Card';
import styles from './UserPage.module.css'; // Updated CSS module name

export default function DoctorDashboard() {
  const [doctorName, setDoctorName] = useState(''); // Set initial doctor name
  const [specialty, setSpecialty] = useState(''); // Set initial specialty
  const [contactInfo, setContactInfo] = useState(''); // Set initial contact info
  const [patients, setPatients] = useState([]); // Set initial patients list
  const [showConfetti, setShowConfetti] = useState(false); // Confetti effect
  const navigate = useNavigate(); // For navigation

  // Function to handle login and store token
  const loginDoctor = async (loginData) => {
    try {
      const response = await axios.post('YOUR_LOGIN_API_URL', loginData);
      const token = response.data.token;
      
      // Store the token in localStorage
      localStorage.setItem('token', token);

      // Navigate to the dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // UseEffect to decode and fetch data from token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        
        // Use correct fields from the token
        setDoctorName(decodedToken.doctorname || 'Doctor');
        setSpecialty(decodedToken.specialty || 'Unknown Specialty');
        setContactInfo(decodedToken.contact_info || 'No Contact Info');
      } catch (error) {
        console.error('Token decoding error:', error);
      }
    }
  }, []);

  // Function to handle logout
  const logout = () => {
    localStorage.clear(); // Clear all data in localStorage
    window.location.replace('/'); // Redirect to homepage
  };

  return (
    <>
      {showConfetti && <Confetti />} {/* Show confetti if triggered */}
      <div>
        <nav className={styles.navbarCustom}>
          <div className="container-fluid">
            <span className={styles.welcomeText}>Welcome, Dr. {doctorName}</span>
          </div>
          <ul className="navbar-nav ms-auto">
            <li>
              <button className={styles.btnDanger} type="button" onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        </nav>
        <div className={styles.container}>
          {/* Cards for various management features */}
          <Card
            name="Profile Overview"
            desc={`Specialty: ${specialty} \nContact: ${contactInfo}`}
            buttons={[
              <button className="btn btn-primary" onClick={() => navigate('/update-profile')}>
                Update Profile
              </button>
            ]}
          />
          <Card
            name="Patient Management"
            desc="Manage your patients"
            buttons={[
              <button className="btn btn-primary" onClick={() => navigate('/patients')}>
                View Patients
              </button>
            ]}
          />
          <Card
            name="Appointments Management"
            desc="Manage upcoming appointments"
            buttons={[
              <button className="btn btn-primary" onClick={() => navigate('/appointments')}>
                View Appointments
              </button>
            ]}
          />
          <Card
            name="Prescription Management"
            desc="Manage prescriptions for your patients"
            buttons={[
              <button className="btn btn-primary" onClick={() => navigate('/prescriptions')}>
                View Prescriptions
              </button>
            ]}
          />
          <Card
            name="Reports and Analytics"
            desc="View patient statistics and performance metrics"
            buttons={[
              <button className="btn btn-primary" onClick={() => navigate('/reports')}>
                View Reports
              </button>
            ]}
          />
        </div>
      </div>
    </>
  );
}
