import React from 'react';

const DoctorsSection = () => {
  return (
    <section id="doctors" className="doctors section">
      {/* Section Title */}
      <div className="container section-title"   >
        <h2>Doctors</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      {/* Doctors Content */}
      <div className="container">
        <div className="row gy-4">
          <DoctorMember
            imgSrc="assets/img/doctors/doctors-1.jpg"
            name="Walter White"
            specialization="Chief Medical Officer"
            description="Explicabo voluptatem mollitia et repellat qui dolorum quasi"
          />
          <DoctorMember
            imgSrc="assets/img/doctors/doctors-2.jpg"
            name="Sarah Jhonson"
            specialization="Anesthesiologist"
            description="Aut maiores voluptates amet et quis praesentium qui senda para"
          />
          <DoctorMember
            imgSrc="assets/img/doctors/doctors-3.jpg"
            name="William Anderson"
            specialization="Cardiology"
            description="Quisquam facilis cum velit laborum corrupti fuga rerum quia"
          />
          <DoctorMember
            imgSrc="assets/img/doctors/doctors-4.jpg"
            name="Amanda Jepson"
            specialization="Neurosurgeon"
            description="Dolorum tempora officiis odit laborum officiis et et accusamus"
          />
        </div>
      </div>
    </section>
  );
};

const DoctorMember = ({ imgSrc, name, specialization, description }) => {
  return (
    <div className="col-lg-6"  data-aos-delay="100">
      <div className="team-member d-flex align-items-start">
        <div className="pic"><img src={imgSrc} className="img-fluid" alt="" /></div>
        <div className="member-info">
          <h4>{name}</h4>
          <span>{specialization}</span>
          <p>{description}</p>
          <div className="social">
            {/* <a href=""><i className="bi bi-twitter-x"></i></a> */}
            <a href=""><i className="bi bi-telephone-fill"></i></a>
            <a href=""><i className="bi bi-chat"></i></a>
            <a href=""><i className="bi bi-facebook"></i></a>
            <a href=""><i className="bi bi-instagram"></i></a>
            {/* <a href=""> <i className="bi bi-linkedin"></i> </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsSection;
