import React from 'react';
import AppointmentForm from './appointmentform';

const AppointmentSection = () => {
  return (
    
    <section id="appointment" className="appointment section">
      <div className="container">
        <div className="row align-items-center">
          {/* this col is in middle */}
          <div className="col-lg9 info" data-aos-delay="100">
            <div className="container section-title" >
              <h3>Appointments</h3>
              <p>
                "Book Your Appointments with Ease."
              </p>
            </div>
            <AppointmentForm />
          </div>
        </div>
      </div>

    </section>
          
  );
};

export default AppointmentSection;