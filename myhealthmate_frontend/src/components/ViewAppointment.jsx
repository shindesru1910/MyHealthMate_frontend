import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Correct import
import Swal from 'sweetalert2';
import './ViewAppointment.css';
import moment from 'moment';

const ViewAppointment = () => {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingAppointment, setLoadingAppointment] = useState(null);
  const [error, setError] = useState(null);

  // Fetch doctor details based on doctorId
  const fetchDoctorDetails = async (doctorId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/get-doctor/${doctorId}`);
      return response.data.data;
    } catch (err) {
      console.error('Failed to fetch doctor details', err);
      return null;
    }
  };

  // Cancel appointment function
  const cancelAppointment = async (appointmentId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to cancel this appointment?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!'
    });

    if (result.isConfirmed) {
      try {
        setLoadingAppointment(appointmentId);
        const formData = new FormData();
        formData.append('id', appointmentId);

        const response = await axios.post('http://localhost:8000/delete-appointment', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.data.status === 200) {
          setUpcomingAppointments(prev => prev.filter(appointment => appointment.id !== appointmentId));
          setCompletedAppointments(prev => prev.filter(appointment => appointment.id !== appointmentId));
          Swal.fire('Cancelled!', 'Your appointment has been cancelled.', 'success');
        } else {
          setError(`Failed to cancel appointment: ${response.data.msg}`);
          Swal.fire('Failed!', `Failed to cancel appointment: ${response.data.msg}`, 'error');
        }
      } catch (err) {
        setError(`Failed to cancel appointment: ${err.message}`);
        Swal.fire('Failed!', `Failed to cancel appointment: ${err.message}`, 'error');
      } finally {
        setLoadingAppointment(null);
      }
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('User not authenticated');
        }
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user_id;

        if (!userId) {
          throw new Error('User ID is not available');
        }

        const response = await axios.get('http://localhost:8000/get-appointments-by-user', {
          params: { user_id: userId }
        });

        const data = response.data.data;

        const userAppointments = await Promise.all(
          data.map(async (appointment) => {
            const doctor = await fetchDoctorDetails(appointment.doctor);
            return { 
              ...appointment, 
              doctorName: doctor ? `${doctor.first_name} ${doctor.last_name}` : 'Unknown',
              doctorSpecialty: doctor ? doctor.specialty : 'Unknown',
              doctorLocation: doctor ? doctor.location : 'Unknown',
            };
          })
        );

        // Separate and sort appointments
        const upcoming = userAppointments
          .filter(appointment => new Date(appointment.appointment_date) > new Date())
          .sort((a, b) => new Date(a.appointment_date) - new Date(b.appointment_date));

        const completed = userAppointments
          .filter(appointment => new Date(appointment.appointment_date) <= new Date())
          .sort((a, b) => new Date(b.appointment_date) - new Date(a.appointment_date));

        setUpcomingAppointments(upcoming);
        setCompletedAppointments(completed);
        setLoading(false);
      } catch (err) {
        setError(`Failed to load appointments: ${err.message}`);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="appointments-container">
      <h2>Your Appointments</h2>
      
      {upcomingAppointments.length > 0 && (
        <div className="appointments-section">
          <h3>Upcoming Appointments</h3>
          <ul className="appointments-list">
            {upcomingAppointments.map((appointment) => {
              const appointmentDate = new Date(appointment.appointment_date);
              return (
                <li key={appointment.id} className="appointment-item">
                  <button className="upcoming-button">Upcoming Appointment</button>
                  <div className="appointment-details">
                    <div className="top-row">
                      <p><strong>Appointment ID:</strong> {appointment.id}</p>
                      <p><strong>Date:</strong> {moment(appointmentDate).format('DD/MM/YYYY')}</p>
                      <p><strong>Time:</strong> {appointment.time_slot || 'Not Available'}</p>
                      <p><strong>Status:</strong> {appointment.status}</p>
                    </div>
                    <div className="bottom-row">
                      <p><strong>Doctor:</strong> {appointment.doctorName}</p>
                      <p><strong>Specialty:</strong> {appointment.doctorSpecialty}</p>
                    </div>
                    <p><i className="fas fa-map-marker-alt icon"></i> <strong>Location:</strong> {appointment.doctorLocation}</p>
                  </div>
                  <button 
                    className={`cancel-button ${loadingAppointment === appointment.id ? 'loading-button' : ''}`} 
                    onClick={() => cancelAppointment(appointment.id)}
                    disabled={loadingAppointment === appointment.id}
                  >
                    {loadingAppointment === appointment.id ? 'Canceling...' : 'Cancel Appointment'}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {completedAppointments.length > 0 && (
        <div className="appointments-section">
          <h3>Completed Appointments</h3>
          <ul className="appointments-list">
            {completedAppointments.map((appointment) => {
              const appointmentDate = new Date(appointment.appointment_date);
              return (
                <li key={appointment.id} className="appointment-item">
                  <div className="appointment-details">
                    <div className="top-row">
                      <p><strong>Appointment ID:</strong> {appointment.id}</p>
                      <p><strong>Date:</strong> {moment(appointmentDate).format('DD/MM/YYYY')}</p>
                      <p><strong>Time:</strong> {appointment.time_slot || 'Not Available'}</p>
                      <p><strong>Status:</strong> {appointment.status}</p>
                    </div>
                    <div className="bottom-row">
                      <p><strong>Doctor:</strong> {appointment.doctorName}</p>
                      <p><strong>Specialty:</strong> {appointment.doctorSpecialty}</p>
                    </div>
                    <p><i className="fas fa-map-marker-alt icon"></i> <strong>Location:</strong> {appointment.doctorLocation}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {upcomingAppointments.length === 0 && completedAppointments.length === 0 && (
        <p>No appointments found.</p>
      )}
    </div>
  );
};

export default ViewAppointment;
