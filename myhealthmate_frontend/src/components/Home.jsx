import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';


const Home = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">MyHealthMate</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Contact</a>
              </li>
              <div className="ml-auto">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <button className="btn btn-secondary nav-link active" style={{ width: "66px", height: "40px", background: 'blue' }} type="button">Login</button>
                  </li>
                </ul>
              </div>
            </ul>
          </div>
        </div>
      </nav>

      {/* Services Section */}
      <section id="services" className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Welcome to MyHealthMate, your personalized health companion.</h2>
          <div className="row">
            <div className="col-md-4 text-center">
              <i className="fas fa-heartbeat fa-3x mb-3"></i>
              <h4>Personalized Health Recommendations</h4>
              <p>Receive tailored advice based on your health profile.</p>
            </div>
            <div className="col-md-4 text-center">
              <i className="fas fa-user-md fa-3x mb-3"></i>
              <h4>Doctor information and booking</h4>
              <p>Access detailed profiles and patient reviews.</p>
            </div>
            <div className="col-md-4 text-center">
              <i className="fas fa-calendar-check fa-3x mb-3"></i>
              <h4>Health report tracking</h4>
              <p>Schedule appointments effortlessly with reminders.</p>
            </div>
            <div className="col-md-4 text-center">
              <i className="fas fa-calendar-check fa-3x mb-3"></i>
              <h4>Exercise and activity monitoring</h4>
              <p>Schedule appointments effortlessly with reminders.</p>
            </div>
            <div className="col-md-4 text-center">
              <i className="fas fa-calendar-check fa-3x mb-3"></i>
              <h4>Premium features like consultation discount</h4>
              <p>Schedule appointments effortlessly with reminders.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section id="doctors" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Personalize Your Diet Plan</h2>
          <div className="row">
            {/* Doctor Card Example */}
            <div className="col-md-4 text-center">
              <div className="card">
                <img src="diet1.png" className="card-img-top" alt="Doctor" />
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
