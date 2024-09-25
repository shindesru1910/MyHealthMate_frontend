// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";  

// const AppointmentsDoctorView = () => {
//     const [doctorId, setDoctorId] = useState(null);
//     const [userId, setUserId] = useState(null);
//     const [appointments, setAppointments] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [searchQuery, setSearchQuery] = useState("");

//     useEffect(() => {
//         const token = localStorage.getItem('token');
        
//         if (token) {
//             const decodedToken = jwtDecode(token);
//             const docId = decodedToken.doctor_id;
//             const usrId = decodedToken.user_id;
//             setDoctorId(docId);
//             setUserId(usrId);
//             fetchAppointments(docId);
//         } else {
//             setError('No token found');
//             setLoading(false);
//         }
//     }, []);

//     const fetchAppointments = async (docId) => {
//         try {
//             const response = await axios.get(`http://localhost:8000/api/doctor/${docId}/appointments/`);
//             setAppointments(response.data.data);
//         } catch (error) {
//             setError('There was an error fetching appointments!');
//             console.error(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const filteredAppointments = appointments.filter(appointment => {
//         const lowerCaseQuery = searchQuery.toLowerCase();
//         return appointment.user.toLowerCase().includes(lowerCaseQuery);
//     });

//     if (loading) {
//         return <p>Loading appointments...</p>;
//     }

//     return (
//         <div className="container">
//             <h2>Appointments</h2>

//             {/* Search Bar */}
//             <div className="input-group search-bar-right mb-3">
//                 <div className="form-outline">
//                     <input
//                         type="search"
//                         className="form-control"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         placeholder="Search Appointments"
//                     />
//                 </div>
//                 <button type="button" className="btn btn-primary ms-2 mt-0">
//                     <i className="fas fa-search"></i>
//                 </button>
//             </div>

//             {error && <p className="text-danger">{error}</p>}
//             {filteredAppointments.length === 0 ? (
//                 <p>No appointments found</p>
//             ) : (
//                 <table className="table table-bordered">
//                     <thead className="table-dark">
//                         <tr>
//                             {/* <th>User ID</th>  */}
//                             <th>Patient</th>
//                             <th>Phone</th>
//                             <th>Appointment Date</th>
//                             <th>Time Slot</th>
//                             <th>Status</th>
//                             <th>Details</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredAppointments.map((appointment, index) => (
//                             <React.Fragment key={index}>
//                                 <tr>
//                                     {/* <td>{appointment.user_id}</td> Ensure user_id is fetched correctly */}
//                                     <td>{appointment.user}</td>
//                                     <td>{appointment.phone}</td>
//                                     <td>{new Date(appointment.appointment_date).toLocaleDateString()}</td>
//                                     <td>{appointment.time_slot}</td>
//                                     <td>{appointment.status}</td>
//                                     <td>
//                                         {/* Show details directly in a new row below */}
//                                         <div>
//                                             <strong>Message:</strong> {appointment.message || 'No message'}
//                                             <br />
//                                             <strong>Created At:</strong> {new Date(appointment.created_at).toLocaleDateString()}
//                                         </div>
//                                     </td>
//                                 </tr>
//                             </React.Fragment>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// };

// export default AppointmentsDoctorView;import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Correct import of jwtDecode

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
            const docId = decodedToken.doctor_id;
            const usrId = decodedToken.user_id;
            setDoctorId(docId);
            setUserId(usrId);
            fetchAppointments(docId);
        } else {
            setError('No token found');
            setLoading(false);
        }
    }, []);

    const fetchAppointments = async (docId) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/doctor/${docId}/appointments/`);
            console.log('Fetched appointments:', response.data.data); // Debugging log
            setAppointments(response.data.data);
        } catch (error) {
            setError('There was an error fetching appointments!');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        console.log('Cancelling appointment with ID:', appointmentId); // Add this to check if the ID is correct

        if (!appointmentId) {
            Swal.fire('Error!', 'Appointment ID is invalid or undefined.', 'error');
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
                setLoadingAppointment(appointmentId);

                // Ensure appointmentId is passed correctly in the form data
                const formData = new FormData();
                formData.append('id', appointmentId); // Ensure appointmentId is valid here

                console.log('Form data being sent:', formData.get('id')); // Debugging: Check the form data being sent

                const response = await axios.post('http://localhost:8000/doctor-delete-appointment', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                console.log('Cancel appointment response:', response.data); // Debugging log

                if (response.data.status === 200) {
                    setAppointments(prev => prev.filter(appointment => appointment.id !== appointmentId));
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

    const filteredAppointments = appointments.filter(appointment => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        return appointment.user.toLowerCase().includes(lowerCaseQuery);
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
                        {filteredAppointments.map((appointment, index) => (
                            <React.Fragment key={index}>
                                <tr>
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
                                            onClick={() => cancelAppointment(appointment.id)}
                                            disabled={loadingAppointment === appointment.id}
                                        >
                                            {loadingAppointment === appointment.id ? 'Cancelling...' : 'Cancel'}
                                        </button>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AppointmentsDoctorView;


