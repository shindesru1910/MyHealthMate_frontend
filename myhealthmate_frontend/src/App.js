import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserTable from './components/UserTable';
import AdminPage from './components/AdminPage';
import UserPage from './components/UserPage';
import UserLogin from './components/UserLogin';
import RegistrationForm from './components/RegistrationForm';
import UserData from './components/UserData';
import DoctorTable from './components/DoctorTable';
import Auth from './components/Auth';
import Homepage from './components/Homepage';
import axios from 'axios';
import UserManagement from './components/UserManagement';
import DoctorManagement from './components/DoctorManagement';
import AddDoctor from './components/AddDoctor';
import Doctor from './components/Doctor';
import User from './components/User';
import PremiumPage from './components/PremiumPage';
import ChatbotComponent from './components/ChatbotComponent';
import chatbotOpen from './components/ChatbotComponent';
import ChatbotToggleButton from './components/ChatbotToggleButton';
import toggleChatbot from './components/ChatbotToggleButton';
import ForgotPassword from './components/ForgotPassword';
import AdminRoute from './common/AdminRoute';
import Exercise from './components/Exercise';
import AppointmentSection from './components/appointmentsection';
import GetFeedback from './components/GetFeedback';
import UserRoute from './common/UserRoute';
import Diet from './components/Diet';
import Sidebar from './components/Sidebar';
import HealthRecommendation from './components/HealthRecommedation';
import { createGlobalStyle } from 'styled-components';
import ViewAppointment from './components/ViewAppointment';
import healthoverview from './components/HealthOverview';
import HealthOverview from './components/HealthOverview';
import SystemStatistics from './components/SystemStatistics';
import Appointments from './components/Appointments';
import AdminFileManagement from './components/AdminFileManagement';
import FileUpload from './components/FileUpload';
import Blogs from './components/Blogs';
import DoctorRegistrationForm from './components/DoctorRegistrationForm';
import DoctorLogin from './components/DoctorLogin';
import DoctorDashboard from './components/DoctorDashboard';
import DoctorPatientComponent from './components/DoctorPatientComponent';
import AppointmentsPageDoctor from './components/AppointmentsDoctorView';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        background-color: transparent; /* Ensure body background is transparent */
    }
    section {
        background-color: transparent; /* Ensure section background is transparent */
    }
`;

axios.defaults.baseURL = 'http://localhost:8000';
 
function App() {
  
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setChatbotOpen(prevState => !prevState);
  };

  return (
    <Router>
      <div className="App">
        {chatbotOpen && <ChatbotComponent />}
        <ChatbotToggleButton onClick={toggleChatbot} />
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/userlist" element={<UserTable />} />
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="/Userpage" element={<UserPage />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/doctorlist" element={<AdminRoute><DoctorTable/></AdminRoute>} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/userdata" element={<UserData />} />
          <Route path="/user-management" element={<AdminRoute><UserManagement/></AdminRoute>} />
          <Route path="/doctor-management" element={<AdminRoute><DoctorManagement/></AdminRoute>} />
          <Route path="/add-doctor" element={<AddDoctor/>} />
          <Route path="/doctor" element={<Doctor/>} />
          <Route path="/users" element={<User/>} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="/premiumpage" element={<PremiumPage/>} />
          <Route path="/password-reset" element={<ForgotPassword/>} />
          <Route path="/exercise" element={<Exercise/>} />
          <Route path="/appointment-form" element={<AppointmentSection />} />
          <Route path="/get-feedback" element={<GetFeedback />} />
          <Route path="/appointment-form" element={<AppointmentSection />} />
          <Route path="/exercise" element={<Exercise />} />
          <Route path="/diet" element={<Diet />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/health-recommendation" element={<HealthRecommendation />} />
          <Route path="/view-appointments" element={<ViewAppointment />} />
          <Route path="/healthoverview" element={<HealthOverview />} />
          <Route path="/system-static" element={<SystemStatistics />} />
          <Route path="/get-appointments" element={<Appointments />} />
          <Route path="/file" element={<FileUpload />} />
          <Route path="/admin-file-management" element={<AdminFileManagement />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/doctor-registartion" element={<DoctorRegistrationForm />} />
          <Route path="/doctor-login" element={<DoctorLogin />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor/:doctorId/patient-management" element={<DoctorPatientComponent />} />
          <Route path="/appointments" element={<AppointmentsPageDoctor />} /> 
        </Routes>
      </div>
    </Router>
  );
}
 
export default App;
