import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import './PremiumPage.css';

const PremiumPage = () => {
  return (
    <div className="premium-page-body premium-page">
      <section style={{ backgroundColor: '#00B4DB' }}>
        <div className="container py-5">
          <header className="text-center mb-5 text-white">
            <div className="row">
              <div className="col-lg-7 mx-auto">
                <h1>MyHealthMate pricing table</h1>
                <p>
                  Choose the perfect plan to meet your health needs<br />
                  {/* <a href="#" className="text-reset">Bootstrap snippet by Brusky</a> */}
                </p>
              </div>
            </div>
          </header>

          <div className="row text-center align-items-end">
            <div className="col-lg-4 mb-5 mb-lg-0">
              <div className="bg-white p-5 rounded-lg shadow card-equal-height">
                <h1 className="h6 text-uppercase font-weight-bold mb-4 premium-text-uppercase">Free Trial</h1>
                <h2 className="h1 font-weight-bold">
                  ₹0
                  <span className="premium-text-small text-small font-weight-normal ml-2">/ 15 Days</span>
                </h2>

                <div className="custom-separator my-4 mx-auto bg-primary"></div>

                <ul className="list-unstyled my-5 text-small text-left">
                  <li className="mb-3">
                    <FontAwesomeIcon icon={faCheck} className="mr-2 text-primary" />
                    15 Days free trial
                  </li>
                  <li className="mb-3">
                    <FontAwesomeIcon icon={faCheck} className="mr-2 text-primary" />
                    Access to basic features
                  </li>
                  <li className="mb-3">
                    <FontAwesomeIcon icon={faCheck} className="mr-2 text-primary" />
                    Get fast Appointments
                  </li>
                  <li className="mb-3">
                    <FontAwesomeIcon icon={faCheck} className="mr-2 text-primary" />
                    Access to our Nutritional Guidance
                  </li>
                  <li className="mb-3 text-muted">
                    <FontAwesomeIcon icon={faTimes} className="mr-2" />
                    <del>Personalized health recommendations</del>
                  </li>
                  <li className="mb-3 text-muted">
                    <FontAwesomeIcon icon={faTimes} className="mr-2" />
                    <del>Discount on consultations</del>
                  </li>
                </ul>
                <a href="#" className="btn btn-primary btn-block p-2 shadow rounded-pill mt-auto">Subscribe</a>
              </div>
            </div>

            <div className="col-lg-4 mb-5 mb-lg-0">
              <div className="bg-white p-5 rounded-lg shadow card-equal-height">
                <h1 className="h6 text-uppercase font-weight-bold mb-4 premium-text-uppercase">Pro</h1>
                <h2 className="h1 font-weight-bold">
                  ₹399
                  <span className="premium-text-small text-small font-weight-normal ml-2">/ Month</span>
                </h2>

                <div className="custom-separator my-4 mx-auto bg-primary"></div>

                <ul className="list-unstyled my-5 text-small text-left font-weight-normal">
                  <li className="mb-3">
                    <FontAwesomeIcon icon={faCheck} className="mr-2 text-primary" />
                    Unlimited access to health resources
                  </li>
                  <li className="mb-3">
                    <FontAwesomeIcon icon={faCheck} className="mr-2 text-primary" />
                    personalized health recommendations
                  </li>
                  <li className="mb-3">
                    <FontAwesomeIcon icon={faCheck} className="mr-2 text-primary" />
                    Priority booking for appointments
                  </li>
                  <li className="mb-3">
                    <FontAwesomeIcon icon={faCheck} className="mr-2 text-primary" />
                    access to premium consultations
                  </li>
                  <li className="mb-3">
                    <FontAwesomeIcon icon={faCheck} className="mr-2 text-primary" />
                    Discounts on wellness products
                  </li>
                  <li className="mb-3 text-muted">
                    <FontAwesomeIcon icon={faTimes} className="mr-2" />
                    <del>Monthly report generation</del>
                  </li>
                </ul>
                <a href="#" className="btn btn-primary btn-block p-2 shadow rounded-pill mt-auto">Subscribe</a>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="bg-white p-5 rounded-lg shadow card-equal-height">
                <h1 className="h6 text-uppercase font-weight-bold mb-4 premium-text-uppercase">Enterprise</h1>
                <h2 className="h1 font-weight-bold">
                  ₹3500
                  <span className="premium-text-small text-small font-weight-normal ml-2">/ Year</span>
                </h2>

                <div className="custom-separator my-4 mx-auto bg-primary"></div>

                <ul className="list-unstyled my-5 text-small text-left font-weight-normal">
                  <li className="mb-3">
                    <FontAwesomeIcon icon={faCheck} className="mr-2 text-primary" />
                    Unlimited access to health resources
                  </li>
                  <li className="mb-3">
                    <FontAwesomeIcon icon={faCheck} className="mr-2 text-primary" />
                    Priority appointment booking
                  </li>
                  <li className="mb-3">
                    <FontAwesomeIcon icon={faCheck} className="mr-2 text-primary" />
                    Personalized health recommendations
                  </li>
                  <li className="mb-3">
                    <FontAwesomeIcon icon={faCheck} className="mr-2 text-primary" />
                    24/7 premium health consultations
                  </li>
                  <li className="mb-3">
                    <FontAwesomeIcon icon={faCheck} className="mr-2 text-primary" />
                    Discounts on consultations
                  </li>
                  <li className="mb-3">
                    <FontAwesomeIcon icon={faCheck} className="mr-2 text-primary" />
                    Comprehensive health reports
                  </li>
                </ul>
                <a href="#" className="btn btn-primary btn-block p-2 shadow rounded-pill mt-auto">Subscribe</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PremiumPage;
