import React from 'react';

const Header = () => {
  return (
    <header id="header" className="header sticky-top">
      <div className="topbar d-flex align-items-center">
        <div className="container d-flex justify-content-center justify-content-md-between">
          <div className="contact-info d-flex align-items-center">
            <i className="bi bi-envelope d-flex align-items-center">
              <a href="mailto:contact@example.com">Myhealthmate@gmail.com</a>
            </i>
            <i className="bi bi-phone d-flex align-items-center ms-4">
              <span>+1 2345 67899 01</span>
            </i>
          </div>
          <div className="social-links d-none d-md-flex align-items-center">
            {/* <a href="#" className="twitter"><i className="bi bi-twitter-x"></i></a> */}
            {/* <a href="#" className="facebook"><i className="bi bi-facebook"></i></a> */}
            <a href ="/userlogin" className="btn btn-secondary nav-link active">LOGIN</a>
            {/* <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
            <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a> */}
          </div>
        </div>
      </div>

      <div className="branding d-flex align-items-center">
        <div className="container position-relative d-flex align-items-center justify-content-between">
          <a href="index.html" className="logo d-flex align-items-center me-auto">
            {/* Uncomment the line below if you also wish to use an image logo */}
            {/* <img src="assets/img/logo.png" alt=""></img> */}
           
            <h1 className="sitename">My Health Mate</h1>
          </a>

          <nav id="navmenu" className="navmenu">
            <ul>
              <li><a href="#hero" className="active">Home<br /></a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#speciality">Speciality</a></li>
              <li><a href="#doctors">Doctors</a></li>

              {/* <li className="dropdown">
                <a href="#"><span>Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                <ul>
                  <li><a href="#">Dropdown 1</a></li>
                  <li className="dropdown">
                    <a href="#"><span>Deep Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                    <ul>
                      <li><a href="#">Deep Dropdown 1</a></li>
                      <li><a href="#">Deep Dropdown 2</a></li>
                      <li><a href="#">Deep Dropdown 3</a></li>
                      <li><a href="#">Deep Dropdown 4</a></li>
                      <li><a href="#">Deep Dropdown 5</a></li>
                    </ul>
                  </li>
                  <li><a href="#">Dropdown 2</a></li>
                  <li><a href="#">Dropdown 3</a></li>
                  <li><a href="#">Dropdown 4</a></li>
                </ul>
              </li> */}
              
              <li><a href="#contact">Contact</a></li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>

          <a className="cta-btn d-none d-sm-block" href="#appointment">Make an Appointment</a>
          {/* <a className='cta-btn d-none d-sm-block' href='appointmentsection.js'></a> */}
        </div>
      </div>
    </header>
  );
}

export default Header;
