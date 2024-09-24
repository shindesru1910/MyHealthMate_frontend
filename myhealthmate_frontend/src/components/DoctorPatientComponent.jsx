import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import './AdminFileManagement.css';

const DoctorPatientComponent = () => {
    const [doctorId, setDoctorId] = useState(null);
    const [patients, setPatients] = useState([]);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = jwtDecode(token);
            const id = decodedToken.user_id;
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

    const handleDownload = (filename) => {
        window.location.href = `http://localhost:8000/download/${filename}`;
    };

    const getPatientFiles = (username) => {
        return files.filter(file => file.username === username);
    };

    const filteredPatients = patients.filter(patient => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const nameMatch = `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(lowerCaseQuery);
        return nameMatch;
    });

    const calculateAge = (dateOfBirth) => {
        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const openModal = (patient) => {
        setSelectedPatient(patient);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedPatient(null);
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
        return <p>Loading patients...</p>;
    }

    return (
        <div className="container">
            <h2>Patients and Uploaded Files</h2>

            {/* Search Bar */}
            <div className="input-group search-bar-right">
                <div className="form-outline">
                    <input
                        type="search"
                        id="form1"
                        className="form-control"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search Patients"
                    />
                </div>
                <button type="button" className="btn btn-primary ms-2 mt-0">
                    <i className="fas fa-search"></i>
                </button>
            </div>

            {error && <p className="error">{error}</p>}
            {filteredPatients.length === 0 ? (
                <p>No patients found</p>
            ) : (
                <table className="table">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Contact</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatients.map((patient) => (
                            <tr key={patient.id}>
                                <td>{patient.id}</td>
                                <td onClick={() => openModal(patient)} style={{ cursor: 'pointer', color: 'blue' }}>
                                    {patient.first_name}
                                </td>
                                <td>{patient.last_name}</td>
                                <td>{patient.phone}</td>
                                <td>{patient.email}</td>
                                <td>{calculateAge(patient.date_of_birth)} years</td>
                                <td>
                                    <button className="btn btn-info" onClick={() => openModal(patient)}>View Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Patient Detail Modal */}
            {modalOpen && selectedPatient && (
                <div style={modalStyles}>
                    <div style={modalContentStyles}>
                        <span style={closeButtonStyles} onClick={closeModal}>&times;</span>
                        <h3>Details of {selectedPatient.first_name} {selectedPatient.last_name}</h3>
                        <p><strong>ID:</strong> {selectedPatient.id}</p>
                        <p><strong>Email:</strong> {selectedPatient.email}</p>
                        <p><strong>Contact:</strong> {selectedPatient.phone}</p>
                        <p><strong>Age:</strong> {calculateAge(selectedPatient.date_of_birth)} years</p>
                        <p><strong>Gender:</strong> {selectedPatient.gender}</p>
                        <p><strong>Height:</strong> {selectedPatient.height} cm</p>
                        <p><strong>Weight:</strong> {selectedPatient.weight} kg</p>
                        <p><strong>Activity Level:</strong> {selectedPatient.activity_level}</p>
                        <p><strong>Dietary Preferences:</strong> {selectedPatient.dietary_preferences}</p>
                        <p><strong>Health Conditions:</strong> {selectedPatient.health_conditions || 'None'}</p>
                        <p><strong>Health Goals:</strong> {selectedPatient.health_goals}</p>
                        <p><strong>Medical History:</strong> {selectedPatient.medical_history || 'No medical history available'}</p>
                        <p><strong>Membership Status:</strong> {selectedPatient.membership_status || 'Regular'}</p>
                        <h4>Uploaded Files</h4>
                        {getPatientFiles(`${selectedPatient.first_name} ${selectedPatient.last_name}`).length === 0 ? (
                            <p>No files uploaded</p>
                        ) : (
                            <table className="table">
                                <thead className="table-dark">
                                    <tr>
                                        <th>#</th>
                                        <th>Filename</th>
                                        <th>Upload Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getPatientFiles(`${selectedPatient.first_name} ${selectedPatient.last_name}`).map((file, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{file.filename}</td>
                                            <td>{file.upload_date ? new Date(file.upload_date).toLocaleDateString() : 'Unknown'}</td>
                                            <td>
                                                <div className="button-group">
                                                    <button
                                                        className="cssbuttons-io-button"
                                                        onClick={() => handleDownload(file.filename)}
                                                    >
                                                        <span>Download</span>
                                                    </button>
                                                    {/* Removed the Remove button */}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorPatientComponent;
