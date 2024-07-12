import React from 'react';
import Card from '../common/Card';



export default function AdminPage() {
    return (
        <>
            <div>
                <nav class="bg-success d-flex justify-content-center" style={{ height: "50px",textAlign:'center' }}>
                    <div class="container-fluid">
                        <span class="navbar-brand mb-0 h1">Welcome to MyHealthmate,User</span>
                    </div>
                </nav>
                <div className="container mt-3 d-flex flex-wrap justify-content-center" >
                    <Card name="Health Overview" desc="Summary of health metrics " button="Click Here" />
                    <Card name="Health Recommentdation" desc="Personlized diet and health recommendations" button="View" />
                    <Card name="Health Reports" desc="Recently uploaded reports download and view options" button="Upload a new reports" />
                    <Card name="Feedback" desc="Provide Feedback About our website and services" button="Submit Feedback" />
                    <Card name=" Upcoming Appointments" desc="List Of Upcoming apoointments with doctors" button="Book An Appointments" />
                    <Card name="Exercise Reminders" desc="Upcoming exercise reaminders will be shown here" button="view" />
                    <Card name="Medical History" desc="Summary of past medical history" button="View" />
                    <Card name="Membership Status" desc="Displays Current membership status" button="View" />
                </div>
            </div>
        </>
    )
}
