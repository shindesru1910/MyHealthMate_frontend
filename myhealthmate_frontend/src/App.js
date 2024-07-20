// new

// src/App.js
import React , { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './components/Home'
import UserTable from './components/UserTable';
import AdminPage from './components/AdminPage';
import UserPage from './components/UserPage';
import UserLogin from './components/UserLogin';
import axios from 'axios';
import RegistrationForm from './components/RegistrationForm';
import UserData from './components/UserData';
import DoctorTable from './components/DoctorTable';
import Auth from './components/Auth';
import Homepage from './components/Homepage';
import UserManagement from './components/UserManagement';
import DoctorManagement from './components/DoctorManagement';
import AddDoctor from './components/AddDoctor';
import AddUser from './components/AddUser';

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
          <Route path="/doctor-management" element={<DoctorManagement/>} />
          <Route path="/add-doctor" element={<AddDoctor/>} />
          <Route path="/add-user" element={<AddUser/>} />
          <Route path="/auth" element={<Auth/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



