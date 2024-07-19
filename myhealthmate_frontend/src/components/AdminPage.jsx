import React from 'react';
import Card from '../common/Card';

export default function AdminPage() {
  const logout=()=>{
    // console.log('Logout');
    localStorage.clear();
    window.location.replace('/');
  }
  return (
    <>
      <div>
        <nav className="bg-primary d-flex justify-content-center" style={{ height: "50px", textAlign: 'center' }}>
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h1" style={{ fontSize: '24px' }}>Welcome to MyHealthmate, Admin</span>
          </div>
          <ul className="navbar-nav ms-auto">
              <li>
                <button className="btn btn-secondary nav-link active" style={{ width: "66px",height: "40px",background:'red'}} type="button" onClick={logout}>Logout</button>
              </li>
            </ul>
        </nav>
        <div className="container mt-3 d-flex flex-wrap justify-content-center">
          <Card name="User Management" desc="To manage users" buttons={[]} to="/user-management" />
          <Card name="Appointments" desc="To see the total number of appointments" buttons={["Manage Appointments", "View Calendar"]} />
          <Card name="Doctor Management" desc="To manage doctors" buttons={["Add Doctor", "Edit Doctor", "Remove Doctor"]} to="/doctor-management"/>
          <Card name="Health Recommendation Management" desc="To see and manage recommendations" buttons={["Overview Health Recommendations", "Add Recommendation"]} />
          <Card name="Health Reports Management" desc="Health reports management" buttons={["Manage Health Reports", "View Reports"]} />
          <Card name="Feedback Overview" desc="Feedback viewer" buttons={["View Feedback", "Respond to Feedback"]} />
          <Card name="System Statistics" desc="Statistics of the system" buttons={["View", "Download Report"]} />
        </div>
      </div>
    </>
  );
}
