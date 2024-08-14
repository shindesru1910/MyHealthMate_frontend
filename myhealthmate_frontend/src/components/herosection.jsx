import React from 'react';

const HeroSection = () => {
  return (
    <main className="main">
      {/* Hero Section */}
      <section id="hero" className="hero section light-background">

        <img src="/assets/img/hero-bg.jpg" alt="" />
        
        <div className="container position-relative">
          <div className="welcome position-relative"  data-aos-delay="100">
            <h2>WELCOME TO MY HEALTH MATE</h2>
            <p>Your Comprehensive Health Companion</p>
          </div>
          {/* End Welcome */}

          <div className="content row gy-4">
            <div className="col-lg-4 d-flex align-items-stretch">
              <div className="why-box"  data-aos-delay="200">


                <h3>Why Choose My Health Mate?</h3>
                <p>
                MyHealthMate offers comprehensive health management with a user-friendly interface, ensuring your medical history, appointments, and medications are all in one secure place.
                Enjoy real-time updates, personalized care plans, all while having access to expert consultations and a supportive community. 
                Your health data is encrypted and compliant with HIPAA regulations, providing you peace of mind.
                </p>
                <div className="text-center">
                  <a href="#about" className="more-btn">
                    <span>Learn More</span> <i className="bi bi-chevron-right"></i>
                  </a>
                </div>
              </div>
            </div>
            {/* End Why Box */}

            <div className="col-lg-8 d-flex align-items-stretch">
              <div className="d-flex flex-column justify-content-center">
                <div className="row gy-4">
                  <div className="col-xl-4 d-flex align-items-stretch">
                    <div className="icon-box" data-aos-delay="300">
                      <i className="bi bi-clipboard-data"></i>
                      <h4>Science and Integrity</h4>
                      <p>We set high standards of quality, research, and transparency for what we share, ensuring you have access to nothing but the best.</p>
                    </div>
                  </div>
                  {/* End Icon Box */}

                  <div className="col-xl-4 d-flex align-items-stretch">
                    <div className="icon-box"  data-aos-delay="400">
                      <i className="bi bi-gem"></i>
                      <h4>Health Dashboard</h4>
                      <p>Experience a custom-tailored health journey with MyHealthMate's Personalized Health Dashboard.</p>
                    </div>
                  </div>
                  {/* End Icon Box */}

                  <div className="col-xl-4 d-flex align-items-stretch">
                    <div className="icon-box"  data-aos-delay="500">
                      <i className="bi bi-inboxes"></i>
                      <h4>Health Alerts and Notifications</h4>
                      <p>With MyHealthMate, receive timely health alerts and notifications in your dedicated inbox.</p>
                    </div>
                  </div>
                  {/* End Icon Box */}
                </div>
              </div>
            </div>
          </div>
          {/* End Content */}
        </div>
      </section>
      {/* /Hero Section */}
    </main>
  );
};

export default HeroSection;
