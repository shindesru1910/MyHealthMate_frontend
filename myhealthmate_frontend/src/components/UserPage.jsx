import React from 'react';
import Card from '../common/Card';

export default function AdminPage() {
  return (
    <>
      <div>
        <nav className="bg-success d-flex justify-content-center" style={{ height: "50px", textAlign: 'center' }}>
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h1">Welcome to MyHealthmate, User</span>
          </div>
        </nav>
        <div className="container mt-3 d-flex flex-wrap justify-content-center">
          <Card name="Health OverView" desc="Summary of health metrics  "buttons={[]} />
          <Card name="Health Recommendation" desc="To see and manage recommendations"buttons={[]} />
          <Card name="Health Reports" desc="To manage doctors" buttons={["Upload New Report"]} />
          <Card name="Feedback" desc="Feedback viewer" buttons={["Submit Feedback"]} />
          <Card name="Upcoming Appointments" desc="To see the total number of appointments" buttons={["Book an Appointment", "View an Appointments"]} />
          <Card name="Exercise Remainder" desc="Health reports management" buttons={["Edit", "Add New"]} />
          <Card name="Medical History" desc="Statistics of the system" buttons={["Add/Edit Information"]} />
          <Card name="Membership Status" desc="Statistics of the system" buttons={[]} />
        </div>
      </div>
    </>
  );
}
