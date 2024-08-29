// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Card from '../common/Card';
// import { jwtDecode } from 'jwt-decode';
// import axios from 'axios';
// import styles from './UserPage.module.css'; // Import CSS module

// export default function UserPage() {
//   const [userFirstName, setUserFirstName] = useState('');
//   const [membershipStatus, setMembershipStatus] = useState('');
//   const [feedbackText, setFeedbackText] = useState('');
//   const [userId, setUserId] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decodedToken = jwtDecode(token);
//       setUserFirstName(decodedToken.username);
//       setMembershipStatus(decodedToken.membershipStatus);
//       setUserId(decodedToken.user_id);
//     }
//   }, []);

//   const logout = () => {
//     localStorage.clear();
//     window.location.replace('/');
//   };

//   const handleFeedbackChange = (e) => {
//     setFeedbackText(e.target.value);
//   };

//   const handleSubmitFeedback = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       console.error('No token found');
//       return;
//     }

//     const formData = new URLSearchParams();
//     formData.append('user_id', userId);
//     formData.append('feedback_text', feedbackText);

//     try {
//       const response = await axios.post('/create-feedback', formData, {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//           'Authorization': `Token ${token}`,
//         },
//       });

//       if (response.status === 200) {
//         setFeedbackText('');
//       } else {
//         console.error('Failed to submit feedback', response);
//       }
//     } catch (error) {
//       console.error('Error submitting feedback:', error);
//     }
//   };

//   return (
//     <>
//       <div>
//         <nav className={styles.navbarCustom}>
//           <div className="container-fluid">
//             <span className={styles.welcomeText}>Welcome to MyHealthMate, {userFirstName}</span>
//           </div>
//           <ul className="navbar-nav ms-auto">
//             <li>
//               <button className={styles.btnDanger} type="button" onClick={logout}>Logout</button>
//             </li>
//           </ul>
//         </nav>
//         <div className={styles.container}>
//           <Card name="Health OverView" desc="Summary of Health Metrics" buttons={[]} to='/healthoverview' />
//           <Card name="Health Recommendation" desc="Get Your personalized Diet and Exercise recommendations" buttons={[]} to='/health-recommendation' />
//           <Card name="Membership Status" desc={`Your current plan: Regular`} buttons={[<button className="btn btn-primary" onClick={() => navigate('/premiumpage')}> ✧Upgrade Plan</button>]} />
//           <Card name="Medical History" desc="Manage your medical files, Your medical history track." buttons={[<button className="btn btn-primary" onClick={() => navigate('/file')}>Upload a File</button>]} />
//           <Card
//             name="Appointments"
//             desc="Manage your appointments"
//             buttons={[
//               <button className="btn btn-primary" onClick={() => navigate('/appointment-form')}>Book an Appointment</button>,
//               <button className="btn btn-primary" onClick={() => navigate('/view-appointments')}>View Appointments</button>
//             ]}
//           />
//           <Card name="Feedback" desc="We value your feedback" buttons={[<button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#feedbackModal">Submit Feedback</button>]} />
//         </div>
//       </div>

//       {/* Feedback Modal */}
//       <div className="modal fade" id="feedbackModal" tabIndex="-1" aria-labelledby="feedbackModalLabel" aria-hidden="true">
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="feedbackModalLabel">Submit Feedback</h5>
//               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             <div className="modal-body">
//               <form>
//                 <div className="mb-3">
//                   <label htmlFor="feedbackText" className="form-label">Feedback</label>
//                   <textarea
//                     id="feedbackText"
//                     className="form-control"
//                     rows="3"
//                     value={feedbackText}
//                     onChange={handleFeedbackChange}
//                   ></textarea>
//                 </div>
//               </form>
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//               <button type="button" className="btn btn-primary" onClick={handleSubmitFeedback}>Submit</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../common/Card';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import Confetti from 'react-confetti';
import styles from './UserPage.module.css';

export default function UserPage() {
  const [userFirstName, setUserFirstName] = useState('');
  const [membershipStatus, setMembershipStatus] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [userId, setUserId] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [theme, setTheme] = useState('light');
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
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      } else {
        console.error('Failed to submit feedback', response);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const tips = [
    "You can track your health metrics easily from the Health Overview!",
    "Submit feedback to help us improve your experience!",
    "Upgrade to Premium for more personalized health recommendations!",
    "You can upload your medical files froms the Medical History"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prevTip) => (prevTip + 1) % tips.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {showConfetti && <Confetti />}
      <div>
        <nav className={styles.navbarCustom}>
          <div className="container-fluid">
            <span className={styles.welcomeText}>Welcome to MyhealthMate! {getGreeting()}, {userFirstName}</span>
          </div>
          <ul className="navbar-nav ms-auto">
            <li>
              <button className={styles.btnDanger} type="button" onClick={logout}>Logout</button>
            </li>
          </ul>
        </nav>
        <div className={styles.container}>
          <Card name="Health OverView" desc="Summary of Health Metrics" buttons={[]} to='/healthoverview' />
          <Card name="Health Recommendation" desc="Get Your personalized Diet and Exercise recommendations" buttons={[]} to='/health-recommendation' />
          <Card name="Membership Status" desc={`Your current plan: Regular`} buttons={[<button className="btn btn-primary" onClick={() => navigate('/premiumpage')}> ✧Upgrade Plan</button>]} />
          <Card name="Medical History" desc="Manage your medical files, Your medical history track." buttons={[<button className="btn btn-primary" onClick={() => navigate('/file')}>Upload a File</button>]} />
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

        {/* Quick Tips Section */}
        <div className={styles.tipContainer}>
          <p>💡 {tips[currentTip]}</p>
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
