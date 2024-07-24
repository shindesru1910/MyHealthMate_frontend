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
// import ExerciseReminderApp from './components/exercisereminderapp';
import DoctorManagement from './components/DoctorManagement';
import AddDoctor from './components/AddDoctor';
import Doctor from './components/Doctor';
<<<<<<< HEAD
import ExerciseReminderForm from './components/exercisereminderform';
=======
import PremiumPage from './components/PremiumPage';
>>>>>>> 0307894110070b644dec6786a9d7e6bf1cee518e

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
          <Route path="/" element={<Homepage />} />
          <Route path="/userlist" element={<UserTable />} />
          <Route path="/adminpage" element={<AdminPage/>} />
          <Route path="/Userpage" element={<UserPage/>} />
          <Route path="/userlogin" element={<UserLogin/>} />
          <Route path="/doctorlist" element={<DoctorTable/>} />
          <Route path="/register" element={<RegistrationForm/>} />
          <Route path="/userdata" element={<UserData/>} />
          <Route path="/user-management" element={<UserManagement/>} />
          <Route path="/exercise-reminder" element={<ExerciseReminderForm/>} />
          <Route path="/doctor-management" element={<DoctorManagement/>} />
          <Route path="/add-doctor" element={<AddDoctor/>} />
          {/* <Route path="/add-user" element={<AddUser/>} /> */}
          <Route path="/doctor" element={<Doctor/>} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="/premiumpage" element={<PremiumPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



