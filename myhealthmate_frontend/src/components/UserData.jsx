// src/components/RegistrationForm.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './RegistrationForm.css';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { errortoast, successtoast } from '../functions/toast';
import RegistrationForm from "./RegistrationForm";


export default function UserData() {
    const initialState = { weight: '', height: '', activity_level: '', dietary_preferences: '', health_conditions: '', medical_history: '', health_goals: '', membership_status: '' };
    const [userData, setUserData] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        let userInfo = JSON.parse(localStorage.getItem("userData"));
        // console.log(data);

        let formdata = new FormData();
        formdata.append('phone', userInfo.phone)
        formdata.append('email', userInfo.email)
        formdata.append('first_name', userInfo.first_name)
        formdata.append('last_name', userInfo.last_name)
        formdata.append('date_of_birth', userInfo.date_of_birth)
        formdata.append('gender', userInfo.gender)
        formdata.append('password', userInfo.password)

        formdata.append('weight', userData.weight)
        formdata.append('height', userData.height)
        formdata.append('activity_level', userData.activity_level)
        formdata.append('dietary_preferences', userData.dietary_preferences)
        formdata.append('health_conditions', userData.health_conditions)
        formdata.append('medical_history', userData.medical_history)
        formdata.append('health_goals', userData.health_goals)
        formdata.append('membership_status', userData.membership_status)


        axios.post("/create-user", formdata)
            .then((response) => {
                if (response.data.status === 200) {
                    // localStorage.setItem('token', response.data.token);
                    successtoast(response.data.msg);
                    navigate('/userlogin');
                } else {
                    errortoast(response.data.msg);
                }
            })
            .catch(error => {
                errortoast("An error occurred. Please try again.");
            })
            .finally(() => setIsLoading(false));

    };
    const handleFormSubmit = (formData) => {
        setUserData(formData);
    };

    return (
        <section className="vh-100 gradient-custom">
            <ToastContainer />
            <div className="container py-5 h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration" style={{ borderRadius: 15 }}>
                            <div className="card-body p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Enter Your Details</h3>
                                <form onSubmit={handleSubmit}>
                                    {/* <RegistrationForm onFormSubmit={handleFormSubmit} />
                                <h1>User's First Name: {userData.first_name}</h1> */}
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <input type="number" id="weight" name="weight" className="form-control form-control-lg" onChange={handleChange} value={userData.weight} />
                                                <label className="form-label" htmlFor="weight">Weight</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <input type="number" id="height" name="height" className="form-control form-control-lg" onChange={handleChange} value={userData.height} />
                                                <label className="form-label" htmlFor="height">Height</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <select id="activity_level" name="activity_level" className="form-control form-control-lg" onChange={handleChange} value={userData.activity_level}>
                                                    <option value="">Select Activity Level</option>
                                                    <option value="sedentary">Sedentary</option>
                                                    <option value="lightly_active">Lightly Active</option>
                                                    <option value="moderately_active">Moderately Active</option>
                                                    <option value="very_active">Very Active</option>
                                                </select>
                                                <label className="form-label" htmlFor="activity_level">Activity Level</label>
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <select id="dietary_preferences" name="dietary_preferences" className="form-control form-control-lg" onChange={handleChange} value={userData.dietary_preferences}>
                                                    <option value="">Select Dietary Preference</option>
                                                    <option value="vegetarian">Vegetarian</option>
                                                    <option value="vegan">Vegan</option>
                                                    <option value="gluten_free">Gluten-Free</option>
                                                    <option value="low_carb">Low-Carb</option>
                                                    <option value="high_protein">High-Protein</option>
                                                    <option value="diabetic_friendly">Diabetic-Friendly</option>
                                                    <option value="allergies">Allergies</option>
                                                </select>
                                                <label className="form-label" htmlFor="dietary_preferences">Dietary Preferences</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-4 pb-2">
                                            <div className="form-outline">
                                                <select id="health_conditions" name="health_conditions" className="form-control form-control-lg" onChange={handleChange} value={userData.health_conditions}>
                                                    <option value="">Select Health Condition</option>
                                                    <option value="diabetes">Diabetes</option>
                                                    <option value="asthma">Asthma</option>
                                                    <option value="heart_disease">Heart Disease</option>
                                                    <option value="allergy">Allergy</option>
                                                    <option value="thyroid">Thyroid</option>
                                                    <option value="cancer">Cancer</option>
                                                    <option value="kidney_disease">Kidney Disease</option>
                                                    <option value="none">None</option>
                                                </select>
                                                <label className="form-label" htmlFor="health_conditions">Health Conditions</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4 pb-2">
                                            <div className="form-outline">
                                                <select id="medical_history" name="medical_history" className="form-control form-control-lg" onChange={handleChange} value={userData.medical_history}>
                                                    <option value="">Select Medical History</option>
                                                    <option value="previous_surgeries">Previous Surgeries</option>
                                                    <option value="chronic_illnesses">Chronic Illnesses</option>
                                                    <option value="medications">Medications</option>
                                                    <option value="allergies">Allergies</option>
                                                    <option value="none">None</option>
                                                </select>
                                                <label className="form-label" htmlFor="medical_history">Medical History</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-4 pb-2">
                                            <div className="form-outline">
                                                <select id="health_goals" name="health_goals" className="form-control form-control-lg" onChange={handleChange} value={userData.health_goals}>
                                                    <option value="">Select Health Goal</option>
                                                    <option value="weight_loss">Weight Loss</option>
                                                    <option value="muscle_gain">Muscle Gain</option>
                                                    <option value="flexibility">Flexibility</option>
                                                    <option value="general_fitness">General Fitness</option>
                                                    <option value="stress_relief">Stress Relief</option>
                                                </select>
                                                <label className="form-label" htmlFor="health_goals">Health Goals</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4 pb-2">
                                            <div className="form-outline">
                                                <select id="membership_status" name="membership_status" className="form-control form-control-lg" onChange={handleChange} value={userData.membership_status}>
                                                    <option value="regular">Regular</option>
                                                    <option value="premium">Premium</option>
                                                </select>
                                                <label className="form-label" htmlFor="membership_status">Membership Status</label>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <button type="submit" disabled={loading}>Submit</button> */}
                                    <div className="mt-4 pt-2">
                                        <input data-mdb-ripple-init className="btn btn-primary btn-lg" type="submit" value="Submit" />
                                    </div>
                                    <Link to='/register'>Previous</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
