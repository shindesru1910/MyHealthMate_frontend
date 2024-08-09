import React from 'react';
import Card from '../common/Card';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css'; // Import the CSS file

export default function AdminPage() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    window.location.replace('/');
  };

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
              <button className="btn btn-secondary nav-link active" style={{ width: "66px", height: "40px", background: 'red' }} type="button" onClick={logout}>Logout</button>
            </li>
          </ul>
        </nav>
        <div className="container mt-3 d-flex flex-wrap justify-content-center">
          <Card name="User Management" desc="To manage users" buttons={[]} to="/users" />
          <Card name="Doctor Management" desc="To manage doctors" buttons={[]} to="/doctor" />
          <Card name="Health Reports Management" desc="Health reports management" buttons={[<button className="btn btn-primary" onClick={handleMedicalFilesClick}>View Medical files</button>]} to='/user-files/' />
          <Card name="Feedback Overview" desc="Feedback viewer" buttons={[<button className="btn btn-primary" onClick={handleMedicalFilesClick}>View Feedback</button>]} to='/get-feedback' />
          <Card name="Appointments" desc="see the appointmets history" buttons={[<button className="btn btn-primary" onClick={handleMedicalFilesClick}>View Appointment</button>]} to='/get-appointments' />
          <Card name="System Statistics" desc="Statistics of the system" buttons={[<button className="btn btn-primary" onClick={handleMedicalFilesClick}>View</button>]} to='/system-static' />
        </div>
      </div>
    </>
  );
}
