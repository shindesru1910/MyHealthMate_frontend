import React from 'react';
import Card from '../common/Card';
import { useNavigate } from 'react-router-dom';


export default function AdminPage() {

  const navigate = useNavigate();

  const logout=()=>{
    // console.log('Logout');
    localStorage.clear();
    window.location.replace('/');
  }

  const handleMedicalFilesClick = () => {
    navigate('/user-files');
  };

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
          <Card name="User Management" desc="To manage users" buttons={[]} to="/users" />
          {/* <Card name="Appointments" desc="To see the total number of appointments" buttons={["Manage Appointments", "View Calendar"]} /> */}
          <Card name="Doctor Management" desc="To manage doctors" buttons={[]} to="/doctor"/>
          {/* <Card name="Health Recommendation Management" desc="To see and manage recommendations" buttons={["Overview Health Recommendations", "Add Recommendation"]} /> */}
          <Card name="Health Reports Management" desc="Health reports management" buttons={[<button onClick={handleMedicalFilesClick}>View Medical files</button>]} to='/user-files/'/>
          <Card name="Feedback Overview" desc="Feedback viewer" buttons={["View Feedback"]} to='/get-feedback' />
          <Card name="System Statistics" desc="Statistics of the system" buttons={["View", "Download Report"]} />
        </div>
      </div>
    </>
  );
}
