// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {jwtDecode} from 'jwt-decode'; // Make sure you import jwtDecode

// const DoctorReport = () => {
//     const [reportData, setReportData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [doctorId, setDoctorId] = useState(null); // State to hold the doctor ID

//     useEffect(() => {
//         const token = localStorage.getItem('token');

//         if (token) {
//             const decodedToken = jwtDecode(token);
//             const id = decodedToken.doctor_id; // Extract the doctor ID from the token
//             setDoctorId(id);
//             fetchDoctorReport(id); // Fetch the report using the doctor ID
//         } else {
//             setError('No token found');
//             setLoading(false);
//         }
//     }, []);

//     const fetchDoctorReport = async (id) => {
//         try {
//             const response = await axios.get(`http://127.0.0.1:8000/api/doctors/${id}/report/`);
//             setReportData(response.data);
//         } catch (err) {
//             setError('Error fetching data');
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>{error}</div>;
//     }

//     if (!reportData) {
//         return <div>No report data available.</div>; // Handle the case where there is no report data
//     }

//     return (
//         <div>
//             <h2>Doctor Report for {reportData.doctor_name}</h2>
//             <p>Total Appointments: {reportData.total_appointments}</p>
//             <p>Total Patients: {reportData.total_patients}</p>
            
//             <h3>Past Appointments</h3>
//             {reportData.past_appointments.length > 0 ? (
//                 <ul>
//                     {reportData.past_appointments.map(appt => (
//                         <li key={appt.appointment_id}>
//                             {appt.patient_name} - {new Date(appt.appointment_date).toLocaleString()} - Status: {appt.status}
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No past appointments.</p>
//             )}
            
//             <h3>Upcoming Appointments</h3>
//             {reportData.upcoming_appointments.length > 0 ? (
//                 <ul>
//                     {reportData.upcoming_appointments.map(appt => (
//                         <li key={appt.appointment_id}>
//                             {appt.patient_name} - {new Date(appt.appointment_date).toLocaleString()} - Status: {appt.status}
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No upcoming appointments.</p>
//             )}
//         </div>
//     );
// };

// export default DoctorReport;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Make sure you import jwtDecode

const DoctorReport = () => {
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [doctorId, setDoctorId] = useState(null); // State to hold the doctor ID

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = jwtDecode(token);
            const id = decodedToken.doctor_id; // Extract the doctor ID from the token
            setDoctorId(id);
            fetchDoctorReport(id); // Fetch the report using the doctor ID
        } else {
            setError('No token found');
            setLoading(false);
        }
    }, []);

    const fetchDoctorReport = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/doctors/${id}/report/`);
            setReportData(response.data);
        } catch (err) {
            setError('Error fetching data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!reportData) {
        return <div>No report data available.</div>; // Handle the case where there is no report data
    }

    // Get current date without time
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Set to start of the day

    // Filter past appointments (already handled)
    const pastAppointments = reportData.past_appointments.filter(appt => 
        new Date(appt.appointment_date) < new Date() // already in the past
    );

    // Filter upcoming appointments based on the current date
    const upcomingAppointments = reportData.upcoming_appointments.filter(appt => 
        new Date(appt.appointment_date) >= now // appointment is today or in the future
    );

    return (
        <div>
            <h2>Doctor Report for {reportData.doctor_name}</h2>
            <p>Total Appointments: {reportData.total_appointments}</p>
            <p>Total Patients: {reportData.total_patients}</p>
            
            <h3>Past Appointments</h3>
            {pastAppointments.length > 0 ? (
                <ul>
                    {pastAppointments.map(appt => (
                        <li key={appt.appointment_id}>
                            {appt.patient_name} - {new Date(appt.appointment_date).toLocaleString()} - Status: {appt.status}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No past appointments.</p>
            )}
            
            <h3>Upcoming Appointments</h3>
            {upcomingAppointments.length > 0 ? (
                <ul>
                    {upcomingAppointments.map(appt => (
                        <li key={appt.appointment_id}>
                            {appt.patient_name} - {new Date(appt.appointment_date).toLocaleString()} - Status: {appt.status}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No upcoming appointments.</p>
            )}
        </div>
    );
};

export default DoctorReport;
