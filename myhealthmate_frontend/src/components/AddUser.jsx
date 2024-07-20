// src/components/RegistrationForm.js
import React, { useEffect, useState } from "react";
import './RegistrationForm.css';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { errortoast, successtoast } from '../functions/toast';
import { useNavigate } from 'react-router-dom';

export default function AddUser() {
    const initialState = { email: '', phone: '', password: '', first_name: '', last_name: '', date_of_birth: '', gender: '' };
    const [userData, setUserData] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // useEffect(()=>{
    //     let userInfo = JSON.parse(localStorage.getItem('userData'));
    //     setUserData(prev=>({...prev,
    //         email:userInfo.email,
    //         password:userInfo.password,
    //         phone:userInfo.phone,
    //         first_name:userInfo.first_name,
    //         last_name:userInfo.last_name,
    //         date_of_birth:userInfo.date_of_birth,
    //         gender:userInfo.gender,
    //     }))
    // },[])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        let formdata = new FormData();
        formdata.append('phone', userData.phone)
        formdata.append('email', userData.email)
        formdata.append('first_name', userData.first_name)
        formdata.append('last_name', userData.last_name)
        formdata.append('date_of_birth', userData.date_of_birth)
        formdata.append('gender', userData.gender)
        formdata.append('password', userData.password)


        localStorage.setItem('userData', JSON.stringify(userData));
        // successtoast(response.data.msg);
        navigate('/userdata');
    };

    return (
        <section className="vh-100 gradient-custom">
            <ToastContainer />
            <div className="container py-5 h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration" style={{ borderRadius: 15 }}>
                            <div className="card-body p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">User Deatils Form</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <input type="text" id="firstName" name="first_name" className="form-control form-control-lg" onChange={handleChange} value={userData.first_name} />
                                                <label className="form-label" htmlFor="firstName">First Name</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <input type="text" id="lastName" name="last_name" className="form-control form-control-lg" onChange={handleChange} value={userData.last_name} />
                                                <label className="form-label" htmlFor="lastName">Last Name</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-4 d-flex align-items-center">
                                            <div className="form-outline datepicker w-100">
                                                <input type="date" className="form-control form-control-lg" id="birthdayDate" name="date_of_birth" onChange={handleChange} value={userData.date_of_birth} />
                                                <label htmlFor="birthdayDate" className="form-label">Birthday</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <h6 className="mb-2 pb-1">Gender: </h6>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="gender" id="femaleGender" value="female" checked={userData.gender === "female"} onChange={handleChange} />
                                                <label className="form-check-label" htmlFor="femaleGender">Female</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="gender" id="maleGender" value="male" checked={userData.gender === "male"} onChange={handleChange} />
                                                <label className="form-check-label" htmlFor="maleGender">Male</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="gender" id="otherGender" value="other" checked={userData.gender === "other"} onChange={handleChange} />
                                                <label className="form-check-label" htmlFor="otherGender">Other</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-4 pb-2">
                                            <div className="form-outline">
                                                <input type="email" id="emailAddress" name="email" className="form-control form-control-lg" onChange={handleChange} value={userData.email} />
                                                <label className="form-label" htmlFor="emailAddress">Email</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4 pb-2">
                                            <div className="form-outline">
                                                <input type="tel" id="phoneNumber" name="phone" className="form-control form-control-lg" onChange={handleChange} value={userData.phone} />
                                                <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4 pb-2">
                                            <div className="form-outline">
                                                <input type="password" id="password" name="password" className="form-control form-control-lg" onChange={handleChange} value={userData.password} />
                                                <label className="form-label" htmlFor="password">Password</label>
                                            </div>
                                        </div>
                                    </div>

                                    {isLoading ?
                                        <button type="submit" className="btn btn-primary w-100" disabled>
                                            <div className="spinner-border spinner-border-sm text-light me-2" role="status">
                                            </div>
                                            Loading...
                                        </button>
                                        :
                                        <button type="submit" className="btn btn-primary w-100">
                                            Submit
                                        </button>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
