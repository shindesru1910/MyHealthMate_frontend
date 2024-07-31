import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Header from './header';
import HeroSection from './herosection';
import AboutSection from './aboutsection';
import StatsSection from './statssection';
import ServicesSection from './servicessection';
import AppointmentSection from './appointmentsection';
import Specialitysection from './specialitysection';
import DoctorsSection from './doctorsection';
import TestimonialSection from './testimonialsection';
import GallerySection from './gallerysection';
import ContactSection from './contactsection';
import Footer from './footer';

<<<<<<< HEAD






=======
>>>>>>> 20f3d56c32e8c4262fc5bff9cb1064cfed9ce8e1
const Homepage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div>
     
      <Header />
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <ServicesSection />
      <AppointmentSection id="appointment-section" />
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
