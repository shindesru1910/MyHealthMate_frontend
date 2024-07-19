// new

// src/App.js
import React , { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './components/Home'
import Home from './components/Homepage';
import UserTable from './components/UserTable';
import AdminPage from './components/AdminPage';
import UserPage from './components/UserPage';
import UserLogin from './components/UserLogin';
import Homepage from './components/Homepage';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;



