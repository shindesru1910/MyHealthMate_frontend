import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../common/Card';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import styles from './UserPage.module.css'; // Import CSS module

export default function UserPage() {
  const [userFirstName, setUserFirstName] = useState('');
  const [membershipStatus, setMembershipStatus] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

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
        },
      });

      if (response.status === 200) {
        setFeedbackText('');
      } else {
        console.error('Failed to submit feedback', response);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <>
      <div>
        <nav className={styles.navbarCustom}>
          <div className="container-fluid">
            <span className={styles.welcomeText}>Welcome to MyHealthMate, {userFirstName}</span>
          </div>
          <ul className="navbar-nav ms-auto">
            <li>
              <button className={styles.btnDanger} type="button" onClick={logout}>Logout</button>
            </li>
          </ul>
        </nav>
        <div className={styles.container}>
          <Card name="Health OverView" desc="Summary of health metrics" buttons={[]} to='/healthoverview' />
          <Card name="Health Recommendation" desc="Manage recommendations" buttons={[]} to='/health-recommendation' />
          <Card name="Membership Status" desc={`Your current plan: ${membershipStatus}`} buttons={[<button className="btn btn-primary" onClick={() => navigate('/premiumpage')}> ✧Upgrade Plan</button>]} />
          <Card name="Medical History" desc="Manage your medical files, Your medical history track." buttons={[<button className="btn btn-primary" onClick={() => navigate('/file-upload')}>Upload a File</button>]} />
          <Card
            name="Appointments"
            desc="Manage your appointments"
            buttons={[
              <button className="btn btn-primary" onClick={() => navigate('/appointment-form')}>Book an Appointment</button>,
              <button className="btn btn-primary" onClick={() => navigate('/view-appointments')}>View Appointments</button>
            ]}
          />
          <Card name="Feedback" desc="We value your feedback" buttons={[<button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#feedbackModal">Submit Feedback</button>]} />
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
                  <textarea
                    id="feedbackText"
                    className="form-control"
                    rows="3"
                    value={feedbackText}
                    onChange={handleFeedbackChange}
                  ></textarea>
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
