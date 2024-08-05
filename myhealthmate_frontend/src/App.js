// src/App.js
import React, { useState } from 'react';
// new

import  { useEffect } from 'react';
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
import ExerciseReminderForm from './components/exercisereminderform';
import PremiumPage from './components/PremiumPage';
import ChatbotComponent from './components/ChatbotComponent';
import ChatbotToggleButton from './components/ChatbotToggleButton';
import ForgotPassword from './components/ForgotPassword';

axios.defaults.baseURL = 'http://localhost:8000';

function App() {
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setChatbotOpen(!chatbotOpen);
  };

  return (
    <Router>
      <div className="App">
       
        {chatbotOpen && <ChatbotComponent />}
        <ChatbotToggleButton onClick={toggleChatbot} />
        
        <Routes>
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
          <Route path="/doctorlist" element={<DoctorTable/>} />
          <Route path="/register" element={<RegistrationForm/>} />
          <Route path="/userdata" element={<UserData/>} />
          <Route path="/user-management" element={<UserManagement/>} />
          <Route path="/doctor-management" element={<DoctorManagement/>} />
          <Route path="/add-doctor" element={<AddDoctor/>} />
          <Route path="/doctor" element={<Doctor/>} />
          <Route path="/users" element={<User/>} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="/premiumpage" element={<PremiumPage/>} />
          <Route path="/password-reset" element={<ForgotPassword/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
