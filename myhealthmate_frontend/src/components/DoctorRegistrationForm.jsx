import React, { useState } from "react";
import './RegistrationForm.css';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { errortoast } from '../functions/toast';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function DoctorRegistrationForm() {
    const initialState = { 
        email: '',  
        password: '', 
        first_name: '', 
        last_name: '', 
        specialty: '', 
        contact_info: '',
        location:'' 
    };
    
    const [userData, setUserData] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:8000/doctor/register/', userData);
            // Show SweetAlert on success
            Swal.fire({
                title: 'Success!',
                text: response.data.message,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/doctor-login'); // Redirect after alert confirmation
            });
        } catch (error) {
            errortoast(error.response?.data?.error || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="vh-100 gradient-custom">
            <ToastContainer />
            <div className="container py-5 h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration" style={{ borderRadius: 15 }}>
                            <div className="card-body p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Doctor Registration Form</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <input 
                                                    type="text" 
                                                    id="firstName" 
                                                    name="first_name" 
                                                    className="form-control form-control-lg" 
                                                    onChange={handleChange} 
                                                    value={userData.first_name} 
                                                    required 
                                                />
                                                <label className="form-label" htmlFor="firstName">First Name</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <input 
                                                    type="text" 
                                                    id="lastName" 
                                                    name="last_name" 
                                                    className="form-control form-control-lg" 
                                                    onChange={handleChange} 
                                                    value={userData.last_name} 
                                                    required 
                                                />
                                                <label className="form-label" htmlFor="lastName">Last Name</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <input 
                                                    type="email" 
                                                    id="emailAddress" 
                                                    name="email" 
                                                    className="form-control form-control-lg" 
                                                    onChange={handleChange} 
                                                    value={userData.email} 
                                                    required 
                                                />
                                                <label className="form-label" htmlFor="emailAddress">Email</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <input 
                                                    type="password" 
                                                    id="password" 
                                                    name="password" 
                                                    className="form-control form-control-lg" 
                                                    onChange={handleChange} 
                                                    value={userData.password} 
                                                    required 
                                                />
                                                <label className="form-label" htmlFor="password">Password</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <input 
                                                    type="text" 
                                                    id="contactInfo" 
                                                    name="contact_info" 
                                                    className="form-control form-control-lg" 
                                                    onChange={handleChange} 
                                                    value={userData.contact_info} 
                                                    required 
                                                />
                                                <label className="form-label" htmlFor="contactInfo">Contact Info</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <input 
                                                    type="text" 
                                                    id="specialty" 
                                                    name="specialty" 
                                                    className="form-control form-control-lg" 
                                                    onChange={handleChange} 
                                                    value={userData.specialty} 
                                                    required 
                                                />
                                                <label className="form-label" htmlFor="specialty">Specialty</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <input 
                                                    type="text" 
                                                    id="location" 
                                                    name="location" 
                                                    className="form-control form-control-lg" 
                                                    onChange={handleChange} 
                                                    value={userData.location} 
                                                    required 
                                                />
                                                <label className="form-label" htmlFor="location">Location</label>
                                            </div>
                                        </div>
                                    </div>

                                    {isLoading ? (
                                        <button type="submit" className="btn btn-primary w-100" disabled>
                                            <div className="spinner-border spinner-border-sm text-light me-2" role="status"></div>
                                            Loading...
                                        </button>
                                    ) : (
                                        <button type="submit" className="btn btn-primary w-100">Submit</button>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
