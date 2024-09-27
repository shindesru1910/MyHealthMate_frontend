import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorViewReports = () => {
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timeFrame, setTimeFrame] = useState('monthly'); // State for time frame selection

    // Function to fetch the report data
    const fetchReportData = async () => {
        const token = localStorage.getItem('token'); // Get the token from localStorage

        if (!token) {
            setError('No authentication token found. Please log in.');
            setLoading(false);
            return;
        }

        try {
            // Decode the token to extract doctor_id
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const id = decodedToken.doctor_id;

            // Check if doctor_id is present
            if (!id) {
                setError('Invalid token. Doctor ID not found.');
                setLoading(false);
                return;
            }

            const response = await axios.get(`http://localhost:8000/doctor/${id}/report/?timeFrame=${timeFrame}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setReportData(response.data); // Set the report data in state
        } catch (err) {
            console.error('Error fetching report data:', err.response);
            if (err.response && err.response.status === 401) {
                setError('Unauthorized access. Please log in again.'); // Handle unauthorized access
            } else {
                setError('Failed to fetch report data or doctor not found');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReportData(); // Fetch report data when component mounts or timeFrame changes
    }, [timeFrame]); // Add timeFrame as a dependency

    // Render loading, error, or report data
    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="report-container">
            <h2>Doctor Report</h2>
            <p className="total-patients">Total Patients: {reportData.patientsCount}</p>
            <p className="total-appointments">Total Appointments: {reportData.totalAppointments}</p> {/* New line for total appointments */}

            {/* Dropdown for selecting time frame */}
            <div className="time-frame-selector">
                <label htmlFor="timeFrame">Select Time Frame: </label>
                <select
                    id="timeFrame"
                    value={timeFrame}
                    onChange={(e) => setTimeFrame(e.target.value)} // Update state on change
                >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>
            </div>

            <table className="report-table">
                <thead>
                    <tr>
                        <th>Patient ID</th>
                        <th>Patient Name</th>
                        <th>Total Appointments</th>
                        {/* <th>Appointments This Time Frame</th> */}
                    </tr>
                </thead>
                <tbody>
                    {reportData.appointmentsData.map((appointment) => (
                        <tr key={appointment.patientId}>
                            <td>{appointment.patientId}</td>
                            <td>{appointment.patientName}</td>
                            <td>{appointment.totalAppointments}</td>
                            {/* <td>{appointment.appointmentsThisTimeFrame}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>

            <style jsx>{`
                .report-container {
                    max-width: 800px;
                    margin: 20px auto;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    background-color: #f9f9f9;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }

                h2 {
                    text-align: center;
                    color: #333;
                }

                .total-patients, .total-appointments {
                    font-size: 1.2em;
                    margin: 10px 0;
                    text-align: center;
                }

                .time-frame-selector {
                    text-align: right;
                    margin-bottom: 20px;
                }

                .report-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }

                .report-table th, .report-table td {
                    padding: 12px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }

                .report-table th {
                    background-color: #4CAF50;
                    color: white;
                }

                .report-table tr:hover {
                    background-color: #f1f1f1;
                }

                .loading {
                    text-align: center;
                    font-size: 1.5em;
                }

                .error {
                    color: red;
                    text-align: center;
                }
            `}</style>
        </div>
    );
};

export default DoctorViewReports;
