import React, { useEffect, useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";  

const AppointmentsDoctorView = () => {
    const [doctorId, setDoctorId] = useState(null);
    const [userId, setUserId] = useState(null);  // Add userId state
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Extract doctor_id and user_id from the token
    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (token) {
            const decodedToken = jwtDecode(token);
            const docId = decodedToken.doctor_id;  // Fetch doctor_id
            const usrId = decodedToken.user_id;    // Fetch user_id
            setDoctorId(docId);
            setUserId(usrId);                     // Set the user_id (can be used for auth-related logic if needed)
            fetchAppointments(docId);             // Use doctor_id to fetch appointments
        } else {
            setError('No token found');
            setLoading(false);
        }
    }, []);

    // Fetch appointments based on doctor_id
    const fetchAppointments = async (docId) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/doctor/${docId}/appointments/`);
            setAppointments(response.data.data);
        } catch (error) {
            setError('There was an error fetching appointments!');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const filteredAppointments = appointments.filter(appointment => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const nameMatch = appointment.user.toLowerCase().includes(lowerCaseQuery);
        return nameMatch;
    });

    const openModal = (appointment) => {
        setSelectedAppointment(appointment);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedAppointment(null);
    };

    const modalStyles = {
        display: modalOpen ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    };

    const modalContentStyles = {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '5px',
        width: '90%',
        maxWidth: '800px',
        maxHeight: '80vh',
        overflowY: 'auto',
    };

    const closeButtonStyles = {
        float: 'right',
        fontSize: '24px',
        cursor: 'pointer',
    };

    if (loading) {
        return <p>Loading appointments...</p>;
    }

    return (
        <div className="container">
            <h2>Appointments</h2>

            {/* Search Bar */}
            <div className="input-group search-bar-right">
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

            {error && <p className="error">{error}</p>}
            {filteredAppointments.length === 0 ? (
                <p>No appointments found</p>
            ) : (
                <table className="table">
                    <thead className="table-dark">
                        <tr>
                            <th>User</th>
                            <th>Phone</th>
                            <th>Specialty</th>
                            <th>Appointment Date</th>
                            <th>Time Slot</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAppointments.map((appointment, index) => (
                            <tr key={index}>
                                <td>{appointment.user}</td>
                                <td>{appointment.phone}</td>
                                <td>{appointment.specialty}</td>
                                <td>{new Date(appointment.appointment_date).toLocaleDateString()}</td>
                                <td>{appointment.time_slot}</td>
                                <td>{appointment.status}</td>
                                <td>
                                    <button className="btn btn-info" onClick={() => openModal(appointment)}>View Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Appointment Detail Modal */}
            {modalOpen && selectedAppointment && (
                <div style={modalStyles}>
                    <div style={modalContentStyles}>
                        <span style={closeButtonStyles} onClick={closeModal}>&times;</span>
                        <h3>Details of Appointment</h3>
                        <p><strong>User:</strong> {selectedAppointment.user}</p>
                        <p><strong>Phone:</strong> {selectedAppointment.phone}</p>
                        <p><strong>Specialty:</strong> {selectedAppointment.specialty}</p>
                        <p><strong>Appointment Date:</strong> {new Date(selectedAppointment.appointment_date).toLocaleDateString()}</p>
                        <p><strong>Time Slot:</strong> {selectedAppointment.time_slot}</p>
                        <p><strong>Status:</strong> {selectedAppointment.status}</p>
                        <p><strong>Message:</strong> {selectedAppointment.message || 'No message'}</p>
                        <p><strong>Created At:</strong> {new Date(selectedAppointment.created_at).toLocaleDateString()}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppointmentsDoctorView;

