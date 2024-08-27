import React from 'react';

const ContactSection = () => {
  return (
    <section id="contact" className="contact section">
      <div className="container section-title" >
        <h2>Contact</h2>
        <p>"Get in touch with us."</p> <br />
      </div>

      <div className="mb-5"  data-aos-delay="200">
        <iframe
          style={{ border: 0, width: '100%', height: '270px' }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14686.934748684165!2d72.568242740716!3d23.033548463779198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e844569484db7%3A0x272a9fad6c017db9!2sOld%20City%2C%20Khanpur%2C%20Ahmedabad%2C%20Gujarat%20380001!5e0!3m2!1sen!2sin!4v1721241548339!5m2!1sen!2sin"
          frameborder="0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      

      <div className="container"  data-aos-delay="100">
        <div className="row gy-4">

          {/* Contact Information */}
          <div className="col-lg-4">
            <div className="info-item d-flex"  data-aos-delay="300">
              <i className="bi bi-geo-alt flex-shrink-0"></i>
              <div>
                <h3>Location</h3>
                <p>Ahmedabad, Gujarat - 380001</p>
              </div>
            </div>

            <div className="info-item d-flex"  data-aos-delay="400">
              <i className="bi bi-telephone flex-shrink-0"></i>
              <div>
                <h3>Call Us</h3>
                <p>+1 2345 67899 01</p>
              </div>
            </div>

            <div className="info-item d-flex"  data-aos-delay="500">
              <i className="bi bi-envelope flex-shrink-0"></i>
              <div>
                <h3>Email Us</h3>
                <p>Myhealthmate@gmail.com</p>
              </div>
            </div>
          </div>

          

          {/* Contact Form */}

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
