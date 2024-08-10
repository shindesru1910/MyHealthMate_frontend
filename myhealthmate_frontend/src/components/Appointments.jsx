import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Table from '../common/Table';

const fetchUserName = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/users/${userId}`);
        return response.data.name;
    } catch (err) {
        console.error('Failed to fetch user details', err);
        return 'Unknown User';
    }
};

const fetchDoctorDetails = async (doctorId) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/doctors/${doctorId}`);
        return response.data;
    } catch (err) {
        console.error('Failed to fetch doctor details', err);
        return null;
    }
};

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingAppointment, setLoadingAppointment] = useState(null);
    const [error, setError] = useState(null);

    const cancelAppointment = async (appointment) => {
        const { id } = appointment;

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
                setLoadingAppointment(id);
                const formData = new FormData();
                formData.append('id', id);

                const response = await axios.post('http://localhost:8000/api/delete-appointment', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.data.status === 200) {
                    setAppointments(appointments.filter(appointment => appointment.id !== id));
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
                const response = await axios.get('http://localhost:8000/api/appointments');
                const data = response.data.data;

                const enrichedAppointments = await Promise.all(
                    data.map(async (appointment) => {
                        const userName = await fetchUserName(appointment.user);
                        const doctor = await fetchDoctorDetails(appointment.doctor);
                        return { 
                            ...appointment, 
                            userName,
                            doctorName: doctor ? `${doctor.first_name} ${doctor.last_name}` : 'Unknown',
                            doctorSpecialty: doctor ? doctor.specialty : 'Unknown',
                            doctorLocation: doctor ? doctor.location : 'Unknown'
                        };
                    })
                );

                setAppointments(enrichedAppointments);
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

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'userName', label: 'User Name' },
        { key: 'doctorName', label: 'Doctor Name' },
        { key: 'doctorSpecialty', label: 'Specialty' },
        { key: 'doctorLocation', label: 'Location' },
        { key: 'appointment_date', label: 'Appointment Date' },
        { key: 'status', label: 'Status' },
        { key: 'created_at', label: 'Created At' },
        { key: 'updated_at', label: 'Last Updated' }
    ];

    const data_access = [
        'id',
        'userName',
        'doctorName',
        'doctorSpecialty',
        'doctorLocation',
        'appointment_date',
        'status',
        'created_at',
        'updated_at'
    ];

    const handleDelete = (appointment) => {
        cancelAppointment(appointment);
    };

    // Inline style for gradient background
    const containerStyle = {
        background: 'linear-gradient(to right, #00c6ff, #0072ff)',
        padding: '20px',
        borderRadius: '8px',
        minHeight: '100vh',
    };

    return (
        <div style={containerStyle}>
            <h2></h2>
            <Table
                column={columns}
                data={appointments}
                data_access={data_access}
                title="Appointments"
                handledelete={handleDelete}
                setflag={() => {}}
                setmodalshow={() => {}}
                seteditdata={() => {}}
            />
        </div>
    );
};

export default Appointments;
