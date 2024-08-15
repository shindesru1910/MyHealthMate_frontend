// import React from 'react';

// const ServicesSection = () => {
//   return (
//     <section id="services" className="services section">
//       {/* Section Title */}
//       <div className="container section-title" >
//         <h2>Services</h2>
//         <p>"Discover What We Offer."</p>
//       </div>
//       {/* End Section Title */}

//       <div className="container">
//         <div className="row gy-4">
//           <div className="col-lg-4 col-md-6"  data-aos-delay="100">
//             <div className="service-item position-relative">
//               <div className="icon">
//                 <i className="fas fa-heartbeat"></i>
//               </div>
//               <a href="#" className="stretched-link">
//                 <h3>Health Monitoring</h3>
//               </a>
//               <p>Facilitate monitoring of vital signs, symptoms, and health conditions with integrated health devices.</p>
//             </div>
//           </div>
//           {/* End Service Item */}

//           <div className="col-lg-4 col-md-6"  data-aos-delay="200">
//             <div className="service-item position-relative">
//               <div className="icon">
//                 <i className="fas fa-pills"></i>
//               </div>
//               <a href="#" className="stretched-link">
//                 <h3>Telemedicine and Consultations</h3>
//               </a>
//               <p>Provide access to virtual consultations with healthcare professionals for medical advice and follow-ups.</p>
//             </div>
//           </div>
//           {/* End Service Item */}

//           <div className="col-lg-4 col-md-6"  data-aos-delay="300">
//             <div className="service-item position-relative">
//               <div className="icon">
//                 <i className="fas fa-hospital-user"></i>
//               </div>
//               <a href="#" className="stretched-link">
//                 <h3>Appointment Scheduling</h3>
//               </a>
//               <p>Enable users to schedule and manage healthcare appointments seamlessly through the app.</p>
//             </div>
//           </div>
//           {/* End Service Item */}

//           <div className="col-lg-4 col-md-6"  data-aos-delay="400">
//             <div className="service-item position-relative">
//               <div className="icon">
//                 <i className="fas fa-dna"></i>
//               </div>
//               <a href="#" className="stretched-link">
//                 <h3>Health Analysis</h3>
//               </a>
//               <p>Experience personalized health analysis with MyHealthMate, utilizing your medical history, lifestyle factors, and health metrics to deliver actionable insights and tailored recommendations for optimizing your well-being.</p>
//             </div>
//           </div>
//           {/* End Service Item */}

//           <div className="col-lg-4 col-md-6" data-aos-delay="500">
//             <div className="service-item position-relative">
//               <div className="icon">
//                 <i className="fas fa-wheelchair"></i>
//               </div>
//               <a href="#" className="stretched-link">
//                 <h3>Emergency Assistance</h3>
//               </a>
//               <p> Offer features for accessing emergency contacts, medical history, and alerts in critical situations.</p>
//             </div>
//           </div>
//           {/* End Service Item */}

//           <div className="col-lg-4 col-md-6"  data-aos-delay="600">
//             <div className="service-item position-relative">
//               <div className="icon">
//                 <i className="fas fa-notes-medical"></i>
//               </div>
//               <a href="#" className="stretched-link">
//                 <h3>Health Education Resources</h3>
//               </a>
//               <p>Provide access to articles, videos, and resources on health topics to empower users with knowledge.</p>
//             </div>
//           </div>
//           {/* End Service Item */}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ServicesSection;
import React from 'react';

const ServicesSection = () => {
  return (
    <section id="services" className="services section">
      {/* Section Title */}
      <div className="container section-title">
        <h2>Services</h2>
        <p>"Discover What We Offer."</p>
      </div>
      {/* End Section Title */}

      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6" data-aos-delay="100">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="fas fa-heartbeat"></i>
              </div>
              <a 
                href="#" 
                className="stretched-link"
                style={{ textDecoration: 'none' }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                <h3>Health Monitoring</h3>
              </a>
              <p>Facilitate monitoring of vital signs, symptoms, and health conditions with integrated health devices.</p>
            </div>
          </div>
          {/* End Service Item */}

          <div className="col-lg-4 col-md-6" data-aos-delay="200">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="fas fa-pills"></i>
              </div>
              <a 
                href="#" 
                className="stretched-link"
                style={{ textDecoration: 'none' }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                <h3>Telemedicine and Consultations</h3>
              </a>
              <p>Provide access to virtual consultations with healthcare professionals for medical advice and follow-ups.</p>
            </div>
          </div>
          {/* End Service Item */}

          <div className="col-lg-4 col-md-6" data-aos-delay="300">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="fas fa-hospital-user"></i>
              </div>
              <a 
                href="#" 
                className="stretched-link"
                style={{ textDecoration: 'none' }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                <h3>Appointment Scheduling</h3>
              </a>
              <p>Enable users to schedule and manage healthcare appointments seamlessly through the app.</p>
            </div>
          </div>
          {/* End Service Item */}

          <div className="col-lg-4 col-md-6" data-aos-delay="400">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="fas fa-dna"></i>
              </div>
              <a 
                href="#" 
                className="stretched-link"
                style={{ textDecoration: 'none' }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                <h3>Health Analysis</h3>
              </a>
              <p>Experience personalized health analysis with MyHealthMate, utilizing your medical history, lifestyle factors, and health metrics to deliver actionable insights and tailored recommendations for optimizing your well-being.</p>
            </div>
          </div>
          {/* End Service Item */}

          <div className="col-lg-4 col-md-6" data-aos-delay="500">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="fas fa-wheelchair"></i>
              </div>
              <a 
                href="#" 
                className="stretched-link"
                style={{ textDecoration: 'none' }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                <h3>Emergency Assistance</h3>
              </a>
              <p>Offer features for accessing emergency contacts, medical history, and alerts in critical situations.</p>
            </div>
          </div>
          {/* End Service Item */}

          <div className="col-lg-4 col-md-6" data-aos-delay="600">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="fas fa-notes-medical"></i>
              </div>
              <a 
                href="#" 
                className="stretched-link"
                style={{ textDecoration: 'none' }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                <h3>Health Education Resources</h3>
              </a>
              <p>Provide access to articles, videos, and resources on health topics to empower users with knowledge.</p>
            </div>
          </div>
          {/* End Service Item */}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
