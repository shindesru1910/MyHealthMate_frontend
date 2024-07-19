// new

// src/App.js
import React , { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import Header from './components/header';
// import HeroSection from './components/herosection';
// import AboutSection from './components/aboutsection';
// import StatsSection from './components/statssection';
// import ServicesSection from './components/servicessection';
// import AppointmentSection from './components/appointmentsection';
// import DoctorsSection from './components/doctorsection';
// import TestimonialSection from './components/testimonialsection';
// import GallerySection from './components/gallerysection';
// import ContactSection from './components/contactsection';
// import Footer from './components/footer';
import Home from './components/Homepage';
import UserTable from './components/UserTable';
import AdminPage from './components/AdminPage';
import UserPage from './components/UserPage';
// import UserLogin from './components/UserLogin';

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
          <Route path="/" element={<Home />} />
          <Route path="/userlist" element={<UserTable />} />
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="/Userpage" element={<UserPage />} />
          {/* <Route path="/userlogin" element={<UserLogin />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;



// // src/App.js
// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import PureCounter from '@srexi/purecounterjs';


// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // import Home from './components/Home'
// import Home from './components/Home';
// import UserTable from './components/UserTable';
// import AdminPage from './components/AdminPage';
// import UserPage from './components/UserPage';
// import UserLogin from './components/UserLogin';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/userlist" element={<UserTable />} />
//           <Route path="/adminpage" element={<AdminPage/>} />
//           <Route path="/Userpage" element={<UserPage/>} />
//           <Route path="/userlogin" element={<UserLogin/>} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;