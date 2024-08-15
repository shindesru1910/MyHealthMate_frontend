// import React from 'react';

// const Footer = () => {
//   return (
//     <footer id="footer" className="footer light-background">
//       <div className="container footer-top">
//         <div className="row gy-4">
//           {/* Footer About */}
//           <div className="col-lg-4 col-md-6 footer-about">
//             <a href="index.html" className="logo d-flex align-items-center">
//               <span className="sitename">My Health Mate</span>
//             </a>
//             <div className="footer-contact pt-3">
//               <p>Ahmedabad, Gujarat-380001</p>
//               <p className="mt-3"><strong>Phone:</strong> <span>+1 2345 67899 01</span></p>
//               <p><strong>Email:</strong> <span>myhealthmate2002@gmail.com</span></p>
//             </div>
//             <div className="social-links d-flex mt-4">
//               <a href=""><i className="bi bi-twitter-x"></i></a>
//               <a href=""><i className="bi bi-facebook"></i></a>
//               {/* <a href=""><i className="bi bi-instagram"></i></a>
//               <a href=""><i className="bi bi-linkedin"></i></a> */}
//             </div>
//           </div>

//           {/* Useful Links */}
//           <div className="col-lg-2 col-md-3 footer-links">
//             <h4>Useful Links</h4>
//             <ul>
//               <li><a href="#">Home</a></li>
//               <li><a href="#">About us</a></li>
//               <li><a href="#">Services</a></li>
//               <li><a href="#">Terms of service</a></li>
//               <li><a href="#">Privacy policy</a></li>
//             </ul>
//           </div>

//           {/* Our Services */}
//           <div className="col-lg-2 col-md-3 footer-links">
//             <h4>Our Services</h4>
//             <ul>
//               <li><a href="#">Health Consultations</a></li>
//               <li><a href="#">Appointment Scheduling</a></li>
//               <li><a href="#">Health Resources</a></li>
//               <li><a href="#">Nutritional Guidance</a></li>
//               <li><a href="#">Custom Exercise Plans</a></li>
//             </ul>
//           </div>

//         </div>
//       </div>

//       {/* Copyright Section */}
//       <div className="container copyright text-center mt-4">
//         <p>© <span>Copyright</span> <strong className="px-1 sitename">Myhealthmate</strong> <span>All Rights Reserved</span></p>
//         {/* <div className="credits">
        
//         </div> */}
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from 'react';

const Footer = () => {
  return (
    <footer id="footer" className="footer light-background">
      <div className="container footer-top">
        <div className="row gy-4">
          {/* Footer About */}
          <div className="col-lg-4 col-md-6 footer-about">
            <a 
              href="index.html" 
              className="logo d-flex align-items-center" 
              style={{ textDecoration: 'none' }}
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
            >
              <span className="sitename">My Health Mate</span>
            </a>
            <div className="footer-contact pt-3">
              <p>Ahmedabad, Gujarat-380001</p>
              <p className="mt-3"><strong>Phone:</strong> <span>+1 2345 67899 01</span></p>
              <p><strong>Email:</strong> <span>myhealthmate2002@gmail.com</span></p>
            </div>
            <div className="social-links d-flex mt-4">
              <a 
                href="" 
                style={{ textDecoration: 'none' }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                <i className="bi bi-twitter-x"></i>
              </a>
              <a 
                href="" 
                style={{ textDecoration: 'none' }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                <i className="bi bi-facebook"></i>
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li>
                <a 
                  href="#" 
                  style={{ textDecoration: 'none' }}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  style={{ textDecoration: 'none' }}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  About us
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  style={{ textDecoration: 'none' }}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  Services
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  style={{ textDecoration: 'none' }}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  Terms of service
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  style={{ textDecoration: 'none' }}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li>
                <a 
                  href="#" 
                  style={{ textDecoration: 'none' }}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  Health Consultations
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  style={{ textDecoration: 'none' }}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  Appointment Scheduling
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  style={{ textDecoration: 'none' }}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  Health Resources
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  style={{ textDecoration: 'none' }}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  Nutritional Guidance
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  style={{ textDecoration: 'none' }}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  Custom Exercise Plans
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="container copyright text-center mt-4">
        <p>
          © 
          <span>Copyright</span> 
          <strong className="px-1 sitename">Myhealthmate</strong> 
          <span>All Rights Reserved</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
