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
        A cardiologist is a doctor who specializes in the care of the heart and blood vessels, and is also known as a heart specialist. They can help treat or prevent a variety of cardiovascular conditions, such as: Heart failure, Abnormal heart rhythms, Heart problems present at birth, Coronary artery disease, and Valvular heart disease.
        </p>
        <p>A cardiologist is a physician who's an expert in the care of your heart and blood vessels. </p>
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
        Neurology is the branch of medicine concerned with the study and treatment of disorders of the nervous system. The nervous system is a complex, sophisticated system that regulates and coordinates body activities. It has two major divisions: Central nervous system: the brain and spinal cord
        </p>
        <p>You might see a neurologist if you have symptoms like tingling, numbness, vertigo, tinnitus, memory loss, seizures, headaches, or migraines</p>
      </div>
      <div className="col-md-5">
        <img src="assets/img/departments-2.jpg" alt="" className="img-fluid" />
      </div>
    </div>
  </SpecialityTab>
  <SpecialityTab id="specialist-tab-3" title="Hepatology">
    <div className="row">
      <div className="col-md-7">
        <p className="fst-italic">Hepatology is a subspecialty of gastroenterology, which studies all the organs in your digestive system, including your liver. Gastroenterologists also treat liver disease, but hepatologists specialize in it.</p>
        <p>Hepatologists are doctors who specialize in hepatology, and are usually gastroenterologists who focus on liver disease. While all hepatologists are gastroenterologists, not all gastroenterologists are hepatologists.</p>
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
        Pediatrics is the branch of medicine dealing with the health and medical care of infants, children, and adolescents from birth up to the age of 18. The word “paediatrics” means “healer of children”; they are derived from two Greek words: (pais = child) and (iatros = doctor or healer).
        </p>
        <p>A doctor who has special training in preventing, diagnosing, and treating diseases and injuries in children. Pediatricians also help manage other problems that affect children, such as developmental disorders and behavioral, emotional, and social problems.</p>
      </div>
      <div className="col-md-5">
        <img src="assets/img/departments-4.jpg" alt="" className="img-fluid" />
      </div>
    </div>
  </SpecialityTab>
  <SpecialityTab id="specialist-tab-5" title="Eye Care">
    <div className="row">
      <div className="col-md-7">
        <p className="fst-italic">Eye care refers to the practice of implementing various protocols such as ocular lubricants, lid taping, and moisture chambers to prevent conditions like exposure keratopathy in patients, such as comatose and sedated children in intensive care units.</p>
        <p>The eye is our organ of vision. Its complicated design means that an image can pass through its many layers and end up crisply focused on the back of the eye, called the retina. The retina is covered with light sensitive cells, called rods and cones.</p>
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
