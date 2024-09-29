// import React from 'react';

// const Header = () => {
//   return (
//     <header id="header" className="header sticky-top">
//       <div className="topbar d-flex align-items-center">
//         <div className="container d-flex justify-content-center justify-content-md-between">
//           <div className="contact-info d-flex align-items-center">
//             <i className="bi bi-envelope d-flex align-items-center">
//               <a
//                 href="mailto:contact@example.com"
//                 style={{ textDecoration: 'none' }}
//                 onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
//                 onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
//               >
//                 myhealthmate2002@gmail.com
//               </a>
//             </i>
//             <i className="bi bi-phone d-flex align-items-center ms-4">
//               <span>+1 2345 67899 01</span>
//             </i>
//           </div>
//           <div className="social-links d-none d-md-flex align-items-center">
//             <a
//               href="/userlogin"
//               className="btn btn-secondary nav-link active"
//               style={{ textDecoration: 'none' }}
//               onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
//               onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
//             >
//               LOGIN
//             </a>
//           </div>
//         </div>
//       </div>

//       <div className="branding d-flex align-items-center">
//         <div className="container position-relative d-flex align-items-center justify-content-between">
//           <a
//             href="index.html"
//             className="logo d-flex align-items-center me-auto"
//             style={{ textDecoration: 'none' }}
//             onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
//             onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
//           >
//             <h1 className="sitename">My Health Mate</h1>
//           </a>

//           <nav id="navmenu" className="navmenu" style={{ backgroundColor: 'white' }}>
//             <ul>
//               <li><a
//                 href="#hero"
//                 className="active"
//                 style={{ textDecoration: 'none' }}
//                 onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
//                 onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
//               >
//                 Home
//               </a></li>
//               <li><a
//                 href="#about"
//                 style={{ textDecoration: 'none' }}
//                 onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
//                 onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
//               >
//                 About
//               </a></li>
//               <li><a
//                 href="#services"
//                 style={{ textDecoration: 'none' }}
//                 onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
//                 onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
//               >
//                 Services
//               </a></li>
//               <li><a
//                 href="#speciality"
//                 style={{ textDecoration: 'none' }}
//                 onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
//                 onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
//               >
//                 Speciality
//               </a></li>
//               <li><a
//                 href="#doctors"
//                 style={{ textDecoration: 'none' }}
//                 onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
//                 onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
//               >
//                 Doctors
//               </a></li>
//               <li><a
//                 href="#contact"
//                 style={{ textDecoration: 'none' }}
//                 onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
//                 onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
//               >
//                 Contact
//               </a></li>
//             </ul>
//             <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
//           </nav>

//           <a
//             className="cta-btn d-none d-sm-block"
//             href="#appointment"
//             style={{ textDecoration: 'none' }}
//             onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
//             onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
//           >
//             Make an Appointment
//           </a>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const Header = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Get token from local storage (assuming token is stored there after login)
    const token = localStorage.getItem('token');

    if (token) {
      try {
        // Decode the token to get user information
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.username); // Assuming the token contains `username`
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  return (
    <header id="header" className="header sticky-top">
      <div className="topbar d-flex align-items-center">
        <div className="container d-flex justify-content-center justify-content-md-between">
          <div className="contact-info d-flex align-items-center">
            <i className="bi bi-envelope d-flex align-items-center">
              <a
                href="mailto:contact@example.com"
                style={{ textDecoration: 'none' }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                myhealthmate2002@gmail.com
              </a>
            </i>
            <i className="bi bi-phone d-flex align-items-center ms-4">
              <span>+1 2345 67899 01</span>
            </i>
          </div>

          <div className="social-links d-none d-md-flex align-items-center">
            {username ? (
              <a style={{ fontSize: '18px', color: 'white' }} 
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'} 
                href='/userlogin'>
                  <i class="bi bi-person"></i> {username}
              </a> 
            ) : (
              <a
                href="/userlogin"
                className="btn btn-secondary nav-link active"
                style={{ textDecoration: 'none' }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                LOGIN
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="branding d-flex align-items-center">
        <div className="container position-relative d-flex align-items-center justify-content-between">
          <a
            href="index.html"
            className="logo d-flex align-items-center me-auto"
            style={{ textDecoration: 'none' }}
            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
          >
            <h1 className="sitename">My Health Mate</h1>
          </a>

          <nav id="navmenu" className="navmenu" style={{ backgroundColor: 'white' }}>
            <ul>
              <li><a
                href="#hero"
                className="active"
                style={{ textDecoration: 'none' }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                Home
              </a></li>
              <li><a
                href="#about"
                style={{ textDecoration: 'none' }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                About
              </a></li>
              <li><a
                href="#services"
                style={{ textDecoration: 'none' }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                Services
              </a></li>
              <li><a
                href="#speciality"
                style={{ textDecoration: 'none' }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                Speciality
              </a></li>
              <li><a
                href="#doctors"
                style={{ textDecoration: 'none' }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                Doctors
              </a></li>
              <li><a
                href="#contact"
                style={{ textDecoration: 'none' }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                Contact
              </a></li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>

          <a
            className="cta-btn d-none d-sm-block"
            href="#appointment"
            style={{ textDecoration: 'none' }}
            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
          >
            Make an Appointment
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
