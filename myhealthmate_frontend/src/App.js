import React , { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './components/Home'
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
 
axios.defaults.baseURL = 'http://localhost:8000';
 
function App() {
 
  return (
    <Router>
      <div className="App">
       
 
        {chatbotOpen && <ChatbotComponent />}
        <ChatbotToggleButton onClick={toggleChatbot} />
       
        <Routes>
        {/* <Route path="/" element={<ChangeRoute/>} /> */}
          <Route path="/" element={<Homepage />} />
          <Route path="/userlist" element={<UserTable />} />
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="/Userpage" element={<UserPage />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/doctorlist" element={<DoctorTable />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/userdata" element={<UserData />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/doctor-management" element={<DoctorManagement />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/premiumpage" element={<PremiumPage />} />
          <Route path="/adminpage" element={<AdminPage/>} />
          <Route path="/Userpage" element={<UserPage/>} />
          <Route path="/userlogin" element={<UserLogin/>} />
          <Route path="/doctorlist" element={<AdminRoute><DoctorTable/></AdminRoute>} />
          <Route path="/register" element={<RegistrationForm/>} />
          <Route path="/userdata" element={<UserData/>} />
          <Route path="/user-management" element={<UserManagement/>} />
          <Route path="/doctor-management" element={<DoctorManagement/>} />
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
        </Routes>
      </div>
    </Router>
  );
}
 
export default App;
 