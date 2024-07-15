import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';  // Make sure to create a corresponding CSS file for custom styles

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section text-center text-white d-flex justify-content-center align-items-center">
        <div className="container">
          <h1>Welcome to MyHealthMate</h1>
          <p>Your Comprehensive Health Companion</p>
          <a href="#services" className="btn btn-primary">Learn More</a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Our Services</h2>
          <div className="row">
            <div className="col-md-4 text-center">
              <i className="fas fa-heartbeat fa-3x mb-3"></i>
              <h4>Personalized Health Recommendations</h4>
              <p>Receive tailored advice based on your health profile.</p>
            </div>
            <div className="col-md-4 text-center">
              <i className="fas fa-user-md fa-3x mb-3"></i>
              <h4>Doctor Information</h4>
              <p>Access detailed profiles and patient reviews.</p>
            </div>
            <div className="col-md-4 text-center">
              <i className="fas fa-calendar-check fa-3x mb-3"></i>
              <h4>Appointment Booking</h4>
              <p>Schedule appointments effortlessly with reminders.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section id="doctors" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Meet Our Doctors</h2>
          <div className="row">
            {/* Doctor Card Example */}
            <div className="col-md-4 text-center">
              <div className="card">
                <img src="doctor1.jpg" className="card-img-top" alt="Doctor" />
                <div className="card-body">
                  <h5 className="card-title">Dr. John Doe</h5>
                  <p className="card-text">Cardiologist</p>
                </div>
              </div>
            </div>
            {/* Repeat for other doctors */}
          </div>
        </div>
      </section>

      {/* Health Reports Section */}
      <section id="health-reports" className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Health Reports</h2>
          <div className="row">
            <div className="col-md-12 text-center">
              <i className="fas fa-file-medical-alt fa-3x mb-3"></i>
              <h4>Store and Access Your Medical Records Securely</h4>
              <p>Monitor your health trends over time and share reports with your doctors.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Exercise Tracking Section */}
      <section id="exercise-tracking" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Exercise Tracking</h2>
          <div className="row">
            <div className="col-md-12 text-center">
              <i className="fas fa-running fa-3x mb-3"></i>
              <h4>Log Your Workouts and Track Your Progress</h4>
              <p>Set fitness goals and integrate with popular fitness devices and apps.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer py-4 bg-dark text-white text-center">
        <div className="container">
          <p>&copy; 2024 MyHealthMate. All Rights Reserved.</p>
          <p>
            <a href="/terms" className="text-white">Terms of Service</a> | 
            <a href="/privacy" className="text-white"> Privacy Policy</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
