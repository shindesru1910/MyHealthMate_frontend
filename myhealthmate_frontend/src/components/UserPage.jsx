  import React, { useEffect, useState } from 'react';
  import Card from '../common/Card';
  import {jwtDecode} from 'jwt-decode';

  export default function UserPage() {
    const [userFirstName, setUserFirstName] = useState('');
    const [membershipStatus, setMembershipStatus] = useState('');

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken.username);
        setUserFirstName(decodedToken.username);
        setMembershipStatus(decodedToken.membershipStatus);
      }
    }, []);
    
    console.log({userFirstName});
    console.log({membershipStatus});

    const logout = () => {
      localStorage.clear();
      window.location.replace('/');
    };
    return (
      <>
        <div>
          <nav className="bg-primary d-flex justify-content-center" style={{ height: "50px", textAlign: 'center' }}>
            <div className="container-fluid ">
              <span className="navbar-brand mb-0 h1" style={{fontSize: '24px'}}>Welcome to MyHealthmate, {userFirstName}</span>
            </div>
            <ul className="navbar-nav ms-auto">
                <li>
                  <button className="btn btn-secondary nav-link active" style={{ width: "66px",height: "40px",background:'red'}} type="button" onClick={logout}>Logout</button>
                </li>
              </ul>
          </nav>
          <div className="container mt-3 d-flex flex-wrap justify-content-center" >
            <Card name="Health OverView" desc="Summary of health metrics  "buttons={[]} />
            <Card name="Health Recommendation" desc="To see and manage recommendations"buttons={[]} />
            {/* <Card name="Health Reports" desc="To manage doctors" buttons={["Upload New Report"]} /> */}
            <Card name="Membership Status" desc={`Your current plan:Regular `} buttons={["✧Upgrade Plan"]} to="/premiumpage" />
            <Card name="Upcoming Appointments" desc="To see the total number of appointments" buttons={["AppointmentForm.js","View Appointment"]} />
            <Card name="Exercise Remainder" desc="Health reports management" buttons={["Edit", "Add New"]} />
            <Card name="Medical History" desc="Statistics of the system" buttons={["Add/Edit Information"]} />
            <Card name="Feedback" desc="Feedback viewer" buttons={["Submit Feedback"]} />
          </div>
<<<<<<< HEAD
=======
          <ul className="navbar-nav ms-auto">
              <li>
                <button className="btn btn-secondary nav-link active" style={{ width: "66px",height: "40px",background:'red'}} type="button" onClick={logout}>Logout</button>
              </li>
            </ul>
        </nav>
        <div className="container mt-3 d-flex flex-wrap justify-content-center" >
          <Card name="Health OverView" desc="Summary of health metrics  "buttons={[]} />
          <Card name="Health Recommendation" desc="To see and manage recommendations"buttons={[]} />
          {/* <Card name="Health Reports" desc="To manage doctors" buttons={["Upload New Report"]} /> */}
          <Card name="Membership Status" desc={`Your current plan:Regular `} buttons={["✧Upgrade Plan"]} to="/premiumpage" />
          <Card name="Upcoming Appointments" desc="To see the total number of appointments" buttons={["AppointmentForm.js","View Appointment"]} />
          <Card name="Exercise Reminder" desc="Health reports management" buttons={["Add New"]} to = "/exercise-reminder" />
          <Card name="Medical History" desc="Statistics of the system" buttons={["Add/Edit Information"]} />
          <Card name="Feedback" desc="Feedback viewer" buttons={["Submit Feedback"]} />
>>>>>>> 3f2bc7b6a2a4d50b5807997de6324489a794877d
        </div>
      </>
    );
  }
