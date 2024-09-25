//latest
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {jwtDecode} from "jwt-decode"; // Correct import of jwtDecode

const AppointmentsDoctorView = () => {
    const [doctorId, setDoctorId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingAppointment, setLoadingAppointment] = useState(null);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = jwtDecode(token);
            setDoctorId(decodedToken.doctor_id);
            setUserId(decodedToken.user_id);
            fetchAppointments(decodedToken.doctor_id);
        } else {
            setError('No token found. Please log in again.');
            setLoading(false);
        }
    }, []);

    const fetchAppointments = async (docId) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/doctor/${docId}/appointments/`);
            console.log('Fetched appointments:', response.data.data); // Debugging log
            setAppointments(response.data.data);
        } catch (error) {
            setError('Error fetching appointments. Please try again later.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        console.log('Cancelling appointment with ID:', appointmentId); // Log ID being cancelled

        if (!appointmentId) {
            Swal.fire('Error!', 'Invalid appointment ID.', 'error');
            return;
        }

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
                setLoadingAppointment(appointmentId); // Show loading state for the appointment being cancelled
                const response = await axios.post('http://localhost:8000/doctor-delete-appointment', {
                    id: appointmentId // Send the appointment ID as JSON
                });

                console.log('Cancel appointment response:', response.data); // Debugging log

                if (response.data.status === 200) {
                    setAppointments(prev => prev.filter(appointment => appointment.id !== appointmentId)); // Update state to remove cancelled appointment
                    Swal.fire('Cancelled!', 'Your appointment has been cancelled.', 'success');
                } else {
                    Swal.fire('Failed!', `Failed to cancel appointment: ${response.data.msg}`, 'error');
                }
            } catch (err) {
                console.error('Error cancelling appointment:', err); // Log error for debugging
                Swal.fire('Failed!', `Failed to cancel appointment: ${err.message}`, 'error');
            } finally {
                setLoadingAppointment(null); // Reset loading state
            }
        }
    };

    const filteredAppointments = appointments.filter(appointment => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        return (
            appointment.user.toLowerCase().includes(lowerCaseQuery) ||
            appointment.status.toLowerCase().includes(lowerCaseQuery)
        );
    });

    if (loading) {
        return <p>Loading appointments...</p>;
    }

    return (
        <div className="container">
            <h2>Appointments</h2>

            {/* Search Bar */}
            <div className="input-group search-bar-right mb-3">
                <div className="form-outline">
                    <input
                        type="search"
                        className="form-control"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search Appointments"
                    />
                </div>
                <button type="button" className="btn btn-primary ms-2 mt-0">
                    <i className="fas fa-search"></i>
                </button>
            </div>

            {error && <p className="text-danger">{error}</p>}
            {filteredAppointments.length === 0 ? (
                <p>No appointments found</p>
            ) : (
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Patient</th>
                            <th>Phone</th>
                            <th>Appointment Date</th>
                            <th>Time Slot</th>
                            <th>Status</th>
                            <th>Details</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAppointments.map((appointment, index) => {
                            console.log('Appointment:', appointment); // Log each appointment object
                            return (
                                <tr key={index}>
                                    <td>{appointment.user}</td>
                                    <td>{appointment.phone}</td>
                                    <td>{new Date(appointment.appointment_date).toLocaleDateString()}</td>
                                    <td>{appointment.time_slot}</td>
                                    <td>{appointment.status}</td>
                                    <td>
                                        <div>
                                            <strong>Message:</strong> {appointment.message || 'No message'}
                                            <br />
                                            <strong>Created At:</strong> {new Date(appointment.created_at).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => {
                                                console.log('Cancel button clicked'); // Debugging log
                                                cancelAppointment(appointment.id); // Pass the appointment ID
                                            }}
                                            disabled={loadingAppointment === appointment.id}
                                        >
                                            {loadingAppointment === appointment.id ? 'Cancelling...' : 'Cancel'}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AppointmentsDoctorView;
