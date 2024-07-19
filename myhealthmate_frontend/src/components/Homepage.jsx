// new Homepage.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import components 
import Header from './header';
import HeroSection from './herosection';
import AboutSection from './aboutsection';
import StatsSection from './statssection';
import ServicesSection from './servicessection';
import AppointmentSection from './appointmentsection';
import Specialitysection from './specialitysection'
import DoctorsSection from './doctorsection';
import TestimonialSection from './testimonialsection';
import GallerySection from './gallerysection';
import ContactSection from './contactsection';
import Footer from './footer';



const Homepage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <ServicesSection />
      <AppointmentSection />
      <Specialitysection />
      <DoctorsSection />
      <TestimonialSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default Homepage;

