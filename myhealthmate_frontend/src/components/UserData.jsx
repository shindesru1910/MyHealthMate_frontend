import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';

export default function UserData() {
    const initialState = { weight: '', height: '', activity_level: '', dietary_preferences: '', health_conditions: '', medical_history: '', health_goals: '', membership_status: '' };
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

        let userInfo = JSON.parse(localStorage.getItem("userData"));

        const userDataToSend = {
            phone: userInfo.phone,
            email: userInfo.email,
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            date_of_birth: userInfo.date_of_birth,
            gender: userInfo.gender,
            password: userInfo.password,
            weight: userData.weight,
            height: userData.height,
            activity_level: userData.activity_level,
            dietary_preferences: userData.dietary_preferences,
            health_conditions: userData.health_conditions,
            medical_history: userData.medical_history,
            health_goals: userData.health_goals,
            membership_status: userData.membership_status
        };

        try {
            // Create User
            const userResponse = await axios.post("create-user", userDataToSend, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (userResponse.data.status === 200) {
                // Send Email
                const emailResponse = await axios.post("send-email", userDataToSend, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (emailResponse.data.status === 200) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'User created and email sent successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        navigate('/userlogin');
                    });
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: emailResponse.data.msg,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: userResponse.data.msg,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration" style={{ borderRadius: 15 }}>
                            <div className="card-body p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Enter Your Details</h3>
                                <form onSubmit={handleSubmit}>
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
                                                </select>
                                                <label className="form-label" htmlFor="dietary_preferences">Dietary Preferences</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <input type="text" id="health_conditions" name="health_conditions" className="form-control form-control-lg" onChange={handleChange} value={userData.health_conditions} />
                                                <label className="form-label" htmlFor="health_conditions">Health Conditions</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <input type="text" id="medical_history" name="medical_history" className="form-control form-control-lg" onChange={handleChange} value={userData.medical_history} />
                                                <label className="form-label" htmlFor="medical_history">Medical History</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <input type="text" id="health_goals" name="health_goals" className="form-control form-control-lg" onChange={handleChange} value={userData.health_goals} />
                                                <label className="form-label" htmlFor="health_goals">Health Goals</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <select id="membership_status" name="membership_status" className="form-control form-control-lg" onChange={handleChange} value={userData.membership_status}>
                                                    <option value="">Select Membership Status</option>
                                                    <option value="basic">Basic</option>
                                                    <option value="premium">Premium</option>
                                                </select>
                                                <label className="form-label" htmlFor="membership_status">Membership Status</label>
                                            </div>
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-lg mb-1" disabled={isLoading}>
                                        {isLoading ? "Submitting..." : "Submit"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
