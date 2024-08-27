import React from 'react';

const SpecialitySection = () => {
  return (
    // dont change className
    <section id="speciality" className="departments section"> 
      {/* Section Title */}
      <div className="container section-title" >
        <h2>Specialist</h2>
        <p>"Specialized expertise for individualized health solutions."</p> <br />
      </div>
      
      {/* specialist Content */}
      <div className="container"  data-aos-delay="100">
        <div className="row">
          <div className="col-lg-3">
            <ul className="nav nav-tabs flex-column">
              <SpecialityNav/>
            </ul>
          </div>
          <div className="col-lg-9 col-md-3 mt-4 mt-lg-0">
            <div className="tab-content">
              <SpecialistContent/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SpecialityNav = () => {
  return (
    <>
      <li className="nav-item">
        <a className="nav-link active show" data-bs-toggle="tab" href="#specialist-tab-1">Cardiology</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-bs-toggle="tab" href="#specialist-tab-2">Neurology</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-bs-toggle="tab" href="#specialist-tab-3">Hepatology</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-bs-toggle="tab" href="#specialist-tab-4">Pediatrics</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-bs-toggle="tab" href="#specialist-tab-5">Eye Care</a>
      </li>
    </>
  );
};

const SpecialistContent = () => {
  return (
    <>
  <SpecialityTab id="specialist-tab-1" title="Cardiology">
    <div className="row">
      <div className="col-md-8">
        <p className="fst-italic">
          Qui laudantium consequatur laborum sit qui ad sapiente dila parde sonata raqer a videna mareta paulona marka
        </p>
        <p>Et nobis maiores eius. Voluptatibus ut enim blanditiis atque harum sint...</p>
      </div>
      <div className="col-md-4">
        <img src="assets/img/departments-1.jpg" alt="" className="img-fluid" />
      </div>
    </div>
  </SpecialityTab>
  <SpecialityTab id="specialist-tab-2" title="Neurology">
    <div className="row">
      <div className="col-md-7">
        <p className="fst-italic">
          Qui laudantium consequatur laborum sit qui ad sapiente dila parde sonata raqer a videna mareta paulona marka
        </p>
        <p>Ea ipsum voluptatem consequatur quis est. Illum error ullam omnis quia et reiciendis sunt...</p>
      </div>
      <div className="col-md-5">
        <img src="assets/img/departments-2.jpg" alt="" className="img-fluid" />
      </div>
    </div>
  </SpecialityTab>
  <SpecialityTab id="specialist-tab-3" title="Hepatology">
    <div className="row">
      <div className="col-md-7">
        <p className="fst-italic">Eos voluptatibus quo. Odio similique illum id quidem non enim fuga. Qui natus non sunt...</p>
        <p>Iure officiis odit rerum. Harum sequi eum illum corrupti culpa veritatis quisquam. Neque...</p>
      </div>
      <div className="col-md-5">
        <img src="assets/img/departments-3.jpg" alt="" className="img-fluid" />
      </div>
    </div>
  </SpecialityTab>
  <SpecialityTab id="specialist-tab-4" title="Pediatrics">
    <div className="row">
      <div className="col-md-7">
        <p className="fst-italic">
          Totam aperiam accusamus. Repellat consequuntur iure voluptas iure porro quis delectus
        </p>
        <p>Eaque consequuntur consequuntur libero expedita in voluptas. Nostrum ipsam necessitatibus...</p>
      </div>
      <div className="col-md-5">
        <img src="assets/img/departments-4.jpg" alt="" className="img-fluid" />
      </div>
    </div>
  </SpecialityTab>
  <SpecialityTab id="specialist-tab-5" title="Eye Care">
    <div className="row">
      <div className="col-md-7">
        <p className="fst-italic">Omnis blanditiis saepe eos autem qui sunt debitis porro quia.</p>
        <p>Exercitationem nostrum omnis. Ut reiciendis repudiandae minus. Omnis recusandae ut non...</p>
      </div>
      <div className="col-md-5">
        <img src="assets/img/departments-5.jpg" alt="" className="img-fluid" />
      </div>
    </div>
  </SpecialityTab>
</>

  
  );
};

const SpecialityTab = ({ id, title, children }) => {
  return (
    <div className="tab-pane" id={id}>
      <div className="row">
        <div className="col-lg-8 details order-2 order-lg-1">
          <h3>{title}</h3>
          {children}
        </div>
        <div className="col-lg-4 text-center order-1 order-lg-2">
          <img src={`assets/img/${id}.jpg`} alt="" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default SpecialitySection;
