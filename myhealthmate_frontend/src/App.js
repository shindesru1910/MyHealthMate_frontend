// new

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
import ExerciseReminderForm from './components/exercisereminderform';
import PremiumPage from './components/PremiumPage';
import ForgotPassword from './components/ForgotPassword';
import GetFeedback from './components/GetFeedback';
import AppointmentSection from './components/appointmentsection';
import UserRoute from './common/UserRoute';
import AdminRoute from './common/AdminRoute';
import Exercise from './components/Exercise';


axios.defaults.baseURL = 'http://localhost:8000';

function App() {

  return (
    <Router>
      <div className="App">
        {/* <Header />
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <ServicesSection />
        <AppointmentSection />
        <DoctorsSection />
        <TestimonialSection />
        <GallerySection />
        <ContactSection />
        <Footer /> */}
        <Routes>
        {/* <Route path="/" element={<ChangeRoute/>} /> */}
          <Route path="/" element={<Homepage />} />
          <Route path="/userlist" element={<AdminRoute><UserTable /></AdminRoute>} />
          <Route path="/adminpage" element={<AdminRoute><AdminPage/></AdminRoute>} />
          {/* <Route path="/userpage" element={<UserPage/>} /> */}
          <Route path="/userpage" element={<UserRoute><UserPage/></UserRoute>} />
          <Route path="/userlogin" element={<UserLogin/>} />
          <Route path="/doctorlist" element={<AdminRoute><DoctorTable/></AdminRoute>} />
          <Route path="/register" element={<RegistrationForm/>} />
          <Route path="/userdata" element={<UserData/>} />
          <Route path="/user-management" element={<AdminRoute><UserManagement/></AdminRoute>} />
          <Route path="/doctor-management" element={<AdminRoute><DoctorManagement/></AdminRoute>} />
          <Route path="/add-doctor" element={<AddDoctor/>} />
          <Route path="/doctor" element={<Doctor/>} />
          <Route path="/users" element={<User/>} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="/premiumpage" element={<PremiumPage/>} />
          <Route path="/password-reset" element={<ForgotPassword/>} />
          <Route path="/get-feedback" element={<GetFeedback/>} />
          <Route path="/appointment-form" element={<AppointmentSection/>} />
          <Route path="/exercise" element={<Exercise/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



