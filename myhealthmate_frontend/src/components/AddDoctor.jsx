import React, { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

export default function AddDoctor() {
    const [doctorData, setDoctorData] = useState({
        first_name: '',
        last_name: '',
        specialty: '',
        contact_info: '',
        reviews: '',
        location: ''
    });

    // const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctorData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let formdata = new FormData()
        formdata.append('first_name',doctorData.first_name)
        formdata.append('last_name',doctorData.last_name)
        formdata.append('specialty',doctorData.specialty)
        formdata.append('contact_info',doctorData.contact_info)
        formdata.append('reviews',doctorData.reviews)
        formdata.append('location',doctorData.location)

        axios.post('/create-doctor', formdata)
            .then(response => {
                if (response.data.status === 200) {
                    alert('Doctor added successfully!');
                    // navigate('/path-to-redirect-after-success');  // Update with your desired path
                } else {
                    alert('Error adding doctor: ' + response.data.msg);
                }
            })
            .catch(error => {
                alert('An error occurred: ' + error.message);
            });
    };

    return (
        <div className="card text-center">
            <div className="card-header">
                Add Doctor
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" className="form-control" name="first_name" value={doctorData.first_name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" className="form-control" name="last_name" value={doctorData.last_name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Specialty</label>
                        <input type="text" className="form-control" name="specialty" value={doctorData.specialty} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Contact Info</label>
                        <input type="number" className="form-control" name="contact_info" value={doctorData.contact_info} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Reviews</label>
                        <textarea className="form-control" name="reviews" value={doctorData.reviews} onChange={handleChange}></textarea>
                    </div>
                    <div className="form-group">
                        <label>Location</label>
                        <input type="text" className="form-control" name="location" value={doctorData.location} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Add Doctor</button>
                </form>
            </div>
        </div>
    );
}
