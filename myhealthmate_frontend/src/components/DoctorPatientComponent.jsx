import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const DoctorPatientComponent = () => {
    const [doctorId, setDoctorId] = useState(null);
    const [patients, setPatients] = useState([]);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = jwtDecode(token);
            const id = decodedToken.doctor_id; 
            setDoctorId(id);
            fetchPatients(id);
            fetchFiles();
        } else {
            setError('No token found');
            setLoading(false);
        }
    }, []);

    const fetchPatients = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/doctor/${id}/patients-reports/`);
            setPatients(response.data.patients);
        } catch (error) {
            setError('There was an error fetching patients!');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchFiles = async () => {
        try {
            const response = await axios.get("http://localhost:8000/files/");
            setFiles(response.data);
        } catch (error) {
            setError('There was an error fetching files!');
            console.error(error);
        }
    };

    const handleViewPatient = (patientId) => {
        navigate(`/patient/${patientId}`);
    };

    const getPatientFiles = (username) => {
        return files.filter(file => file.username === username);
    };

    if (loading) {
        return <p>Loading patients...</p>;
    }

    return (
        <div>
            <h2>Patients</h2>
            {error && <p className="error">{error}</p>}
            {patients.length === 0 ? (
                <p>No patients found</p>
            ) : (
                patients.map((patient) => {
                    const patientFiles = getPatientFiles(`${patient.first_name} ${patient.last_name}`);
                    return (
                        <div key={patient.id} className="patient-card">
                            <h3>{patient.first_name} {patient.last_name}</h3>
                            <p>Contact: {patient.phone}</p>
                            <p>Email: {patient.email}</p>
                            <p>Gender: {patient.gender}</p>
                            <p>Weight: {patient.weight} kg</p>
                            <p>Height: {patient.height} cm</p>
                            <p>Activity Level: {patient.activity_level}</p>
                            <p>Dietary Preferences: {patient.dietary_preferences}</p>
                            <p>Health Conditions: {patient.health_conditions}</p>
                            <p>Medical History: {patient.medical_history}</p>
                            <p>Health Goals: {patient.health_goals}</p>
                            <p>Membership Status: {patient.membership_status}</p>

                            <h4>Health Reports</h4>
                            {patientFiles.length === 0 ? (
                                <p>No reports uploaded</p>
                            ) : (
                                <ul>
                                    {patientFiles.map((file, index) => (
                                        <li key={index}>
                                            <a href={`http://localhost:8000/files/${file.filename}`} target="_blank" rel="noopener noreferrer">
                                                {file.filename} (Uploaded on: {file.upload_date ? new Date(file.upload_date).toLocaleDateString() : 'Unknown'})
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default DoctorPatientComponent;
