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

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <div>
        <nav className="navbarCustom">
          <div className="welcomeText">
            Welcome to MyHealthmate, Admin
          </div>
          <button className="btnDanger" type="button" onClick={logout}>
            Logout
          </button>
        </nav>
        <div className="containerCustom">
          <Card name="User Management" desc="To manage users" buttons={[]} to="/users" />
          <Card name="Doctor Management" desc="To manage doctors" buttons={[]} to="/doctor" />
          <Card name="Health Reports Management" desc="Health reports management" buttons={[<button className="btn btn-primary" onClick={() => handleNavigation('/admin-file-management')}>View Medical files</button>]} to='/admin-file-management' />
          <Card name="Feedback Overview" desc="Feedback viewer" buttons={[<button className="btn btn-primary" onClick={() => handleNavigation('/get-feedback')}>View Feedback</button>]} to='/get-feedback' />
          <Card name="Appointments" desc="See the appointments history" buttons={[<button className="btn btn-primary" onClick={() => handleNavigation('/get-appointments')}>View Appointment</button>]} to='/get-appointments' />
          <Card name="System Statistics" desc="Statistics of the system" buttons={[<button className="btn btn-primary" onClick={() => handleNavigation('/system-static')}>View</button>]} to='/system-static' />
        </div>
      </div>
    </>
  );
}
