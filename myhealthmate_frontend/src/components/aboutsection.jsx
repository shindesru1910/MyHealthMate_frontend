import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="row gy-4 gx-5">
          <div className="col-lg-6 position-relative align-self-start"  data-aos-delay="200">
            <img src="assets/img/about.jpg" className="img-fluid" alt="" />
            {/* <a href="https://www.youtube.com/watch?v=LXb3EKWsInQ" className="glightbox pulsating-play-btn"></a> */}
            <a href="https://www.youtube.com/watch?v=Cg_GW7yhq20" className='glightbox pulsating-play-btn'></a>
          </div>
          <div className="col-lg-6 content" data-aos-delay="100">
            <h3>About Us</h3>
            <p>
            My Health Mate is on a mission to make quality healthcare affordable and accessible for over a billion+ Indians. 
            We believe in empowering our users with the most accurate, comprehensive, and curated information and care, enabling them to make better healthcare decisions.  
            </p>
            <ul>
              <li>
                <i className="fa-solid fa-vial-circle-check"></i>
                <div>
                  <h5>Reliable Health Monitoring</h5>
                  <p>We provide accurate monitoring of vital signs, medical history, and appointments, offering personalized recommendations and comprehensive insights.</p>
                </div>
              </li>
              <li>
                <i className="fa-solid fa-pump-medical"></i>
                <div>
                  <h5>Effortless Medication Management</h5>
                  <p>Stay organized with MyHealthMate's timely reminders and detailed schedules, ensuring you never miss a dose.</p>
                </div>
              </li>
              <li>
                <i className="fa-solid fa-heart-circle-xmark"></i>
                <div>
                  <h5>Connect</h5>
                  <p>We understand healthcare goes beyond signs, symptoms, diagnosis, and treatment.
                     It's about the deep connection between doctors and patients that leads to continuous care and sustained, better outcomes.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
