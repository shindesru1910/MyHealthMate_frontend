import React, { useEffect } from 'react';
import PureCounter from '@srexi/purecounterjs';

const StatsSection = () => {
  useEffect(() => {
    new PureCounter();
  }, []);

  return (
    //added center
    <section id="stats" className="stats section light-background text-center">
      <div className="container"  data-aos-delay="100"> 
        { /* added center */}
        <div className="row gy-4 justify-content-center">
          <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
            <i className="fa-solid fa-user-doctor"></i>
            <div className="stats-item">
              <span data-purecounter-start="0" data-purecounter-end="85" data-purecounter-duration="1" className="purecounter"></span>
              <p>Doctors</p>
            </div>
          </div>
          {/* End Stats Item */}

          <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
            <i className="fas fa-user"></i>
            <div className="stats-item">
              <span data-purecounter-start="0" data-purecounter-end="327" data-purecounter-duration="1" className="purecounter"></span>
              <p>Satisfied Users</p>
            </div>
          </div>
          {/* End Stats Item */}

          <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
            <i className="fas fa-award"></i>
            <div className="stats-item">
              <span data-purecounter-start="0" data-purecounter-end="6" data-purecounter-duration="1" className="purecounter"></span>
              <p>Awards</p>
            </div>
          </div>
          {/* End Stats Item */}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
