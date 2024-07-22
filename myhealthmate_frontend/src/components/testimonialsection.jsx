import React, { useState, useEffect } from 'react';
import './testimonial.css'; 

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/get-feedback')
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          setTestimonials(data.data);
        } else {
          console.error('Error fetching testimonials:', data.msg);
        }
      })
      .catch(error => console.error('Error fetching testimonials:', error));
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  if (testimonials.length === 0) {
    return <p>Loading testimonials...</p>;
  }

  const { user, feedback_text: text } = testimonials[currentIndex];
  const userName = user ? `${user.first_name} ${user.last_name}` : 'Anonymous';

  return (
    <section id="testimonials" className="testimonials section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 info">
            <h3>Testimonials</h3>
            <p>
              Hear from our satisfied users about their experiences with our service. We value your feedback and strive to improve continuously.
            </p>
          </div>

          <div className="col-lg-7">
            <div className="slider">
              <button className="slider-button prev" onClick={prevTestimonial}>❮</button>
              <div className="slider-content">
                <div className="testimonial-item">
                  <div className="d-flex">
                    <div>
                      <h3>{userName}</h3>
                      <h4>Feedback</h4>
                    </div>
                  </div>
                  <p>
                    <i className="bi bi-quote quote-icon-left"></i>
                    <span>{text}</span>
                    <i className="bi bi-quote quote-icon-right"></i>
                  </p>
                </div>
              </div>
              <button className="slider-button next" onClick={nextTestimonial}>❯</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
