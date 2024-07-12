import React from 'react';
import Card from '../common/Card';



export default function AdminPage() {
  return (
    <>
    <div>
      <h1>Admin Overview </h1>
      <div className="container mt-3 d-flex flex-wrap justify-content-center" >
        <Card name="User management" desc="To Management for users " button="Add User"/>
        <Card name="Appointments" desc="To see the total number os appointment" button="Manage Appointments"/>
        <Card name ="Doctor Management"desc="To Management for Doctor" button="Add Doctor"/>
        <Card name = "Health Recommentdation Managements" desc="To see the recommentdations and managemthe recommentdations" button="Overview Health Recommendations"/>
        <Card name = "Health Reports Management" desc="Helath Reports managements" button="Manage Health Reports"/>
        <Card name = "Feedback Overview" desc="Feedback Viewer" button="View Feedback"/>
        <Card name = "System Statistics"desc="Statics Of the system" button="View"/>
        </div>
    </div>
    </>
  )
}
