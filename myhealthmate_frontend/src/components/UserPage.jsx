import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../common/Card';
import { jwtDecode } from 'jwt-decode';
// import ReminderForm from './exercisereminderform';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';

export default function UserPage() {
  const [userFirstName, setUserFirstName] = useState('');
  const [membershipStatus, setMembershipStatus] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  // const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserFirstName(decodedToken.username);
      setMembershipStatus(decodedToken.membershipStatus);
      setUserId(decodedToken.user_id);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.replace('/');
  };



  const handleFeedbackChange = (e) => {
    setFeedbackText(e.target.value);
  };

  const handleSubmitFeedback = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    const formData = new URLSearchParams();
    formData.append('user_id', userId);
    formData.append('feedback_text', feedbackText);

    try {
      const response = await axios.post('/create-feedback', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Token ${token}`,
        }
      });

      if (response.status === 200) {
        alert('Feedback submitted successfully');
        setFeedbackText('');
      } else {
        console.error('Failed to submit feedback', response);
      }
    } catch (error) {
      alert('Failed to submit feedback');
      console.error('Error submitting feedback:', error);
    }
  };

  const handleAppointmentClick = () => {
    navigate('/userpage', { state: { scrollTo: 'appointment-section', userId: userId, userFirstName: userFirstName } });
  };
  const handleViewAppointmentClick = () => {
    navigate('/view-appointments');
  };
  return (
    <>
      <div>
        <nav className="bg-primary d-flex justify-content-center" style={{ height: "50px", textAlign: 'center' }}>
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h1" style={{ fontSize: '24px' }}>Welcome to MyHealthmate, {userFirstName}</span>
          </div>
          <ul className="navbar-nav ms-auto">
            <li>
              <button className="btn btn-secondary nav-link active" style={{ width: "66px", height: "40px", background: 'red' }} type="button" onClick={logout}>Logout</button>
            </li>
          </ul>
        </nav>
        <div className="container mt-3 d-flex flex-wrap justify-content-center">
          <Card name="Health OverView" desc="Summary of health metrics" buttons={[]} to='/healthoverview' />
          <Card name="Health Recommendation" desc="To see and manage recommendations" buttons={[]} to='/health-recommendation' />
          <Card name="Membership Status" desc={`Your current plan: Regular`} buttons={["✧Upgrade Plan"]} to="/premiumpage" />
          {/* <Card name="Appointments" desc="To see the total number of appointments" buttons={[<button onClick={handleAppointmentClick}>Book an Appointment</button>]} to='/appointment-form' /> */}
          <Card
            name="Appointments"
            desc="To see the total number of appointments"
            buttons={[
              <button className="btn btn-primary" onClick={() => navigate('/appointment-form')}>Book an Appointment</button>,
              <button className="btn btn-primary" onClick={() => navigate('/view-appointments')}>View Your Appointments</button>
            ]}
          />
          <Card
            name="Exercise Reminder"
            desc="Health reports management"
            buttons={[
              <button key="edit" className="btn btn-primary">Edit</button>,
              <button key="add-new" className="btn btn-primary">Add New</button>
            ]}
          />
          <Card
            name="Medical History"
            desc="Statistics of the system"
            buttons={[
              <button key="add-edit" className="btn btn-primary">Add/Edit Information</button>
            ]}
          />
          <Card name="Feedback" desc="Feedback viewer" buttons={[<button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#feedbackModal">Submit Feedback</button>]} />
        </div>
      </div>

      {/* Feedback Modal */}
      <div className="modal fade" id="feedbackModal" tabIndex="-1" aria-labelledby="feedbackModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="feedbackModalLabel">Submit Feedback</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="feedbackText" className="form-label">Feedback</label>
                  <textarea className="form-control" id="feedbackText" rows="3" value={feedbackText} onChange={handleFeedbackChange}></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmitFeedback}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

