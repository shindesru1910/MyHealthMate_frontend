import React from 'react';
import Card from '../common/Card';

export default function AdminPage() {
  return (
    <>
      <div>
        <nav className="bg-success d-flex justify-content-center" style={{ height: "50px", textAlign: 'center' }}>
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h1">Welcome to MyHealthmate, Admin</span>
          </div>
        </nav>
        <div className="container mt-3 d-flex flex-wrap justify-content-center">
          <Card name="User Management" desc="To manage users" buttons={["Add User", "Edit User", "Delete User"]} />
          <Card name="Appointments" desc="To see the total number of appointments" buttons={["Manage Appointments", "View Calendar"]} />
          <Card name="Doctor Management" desc="To manage doctors" buttons={["Add Doctor", "Edit Doctor", "Remove Doctor"]} />
          <Card name="Health Recommendation Management" desc="To see and manage recommendations" buttons={["Overview Health Recommendations", "Add Recommendation"]} />
          <Card name="Health Reports Management" desc="Health reports management" buttons={["Manage Health Reports", "View Reports"]} />
          <Card name="Feedback Overview" desc="Feedback viewer" buttons={["View Feedback", "Respond to Feedback"]} />
          <Card name="System Statistics" desc="Statistics of the system" buttons={["View", "Download Report"]} />
        </div>
      </div>
    </>
  );
}
