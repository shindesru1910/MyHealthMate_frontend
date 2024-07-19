import React from 'react';

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="testimonials section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 info" data-aos-delay="100">
            <h3>Testimonials</h3>
            <p>
              Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
            </p>
          </div>

          <div className="col-lg-7"  data-aos-delay="200">
            <div className="swiper init-swiper">
              <div className="swiper-wrapper">
                {/* Testimonial Items */}

                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <div className="d-flex">
                      <img src="assets/img/testimonials/testimonials-1.jpg" className="testimonial-img flex-shrink-0" alt="" />
                      <div>
                        <h3>Saul Goodman</h3>
                        <h4>Ceo & Founder</h4>
                        <div className="stars">
                          <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
                        </div>
                      </div>
                    </div>
                    <p>
                      <i className="bi bi-quote quote-icon-left"></i>
                      <span>Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.</span>
                      <i className="bi bi-quote quote-icon-right"></i>
                    </p>
                  </div>
                </div>
               

                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <div className="d-flex">
                      <img src="assets/img/testimonials/testimonials-1.jpg" className="testimonial-img flex-shrink-0" alt="" />
                      <div>
                        <h3>Sabadman</h3>
                        <h4>Founder</h4>
                        <div className="stars">
                          <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
                        </div>
                      </div>
                    </div>
                    <p>
                      <i className="bi bi-quote quote-icon-left"></i>
                      <span>Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.</span>
                      <i className="bi bi-quote quote-icon-right"></i>
                    </p>
                  </div>
                </div>
               
                {/* Repeat for other testimonials */}
                {/* You can add more swiper-slide divs for each testimonial */}

              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
        </div>
      </div>
      
      
    </section>
  );
};

export default TestimonialsSection;


