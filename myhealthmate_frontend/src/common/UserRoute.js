// import React from 'react'
// import { Navigate } from 'react-router-dom'
// import {jwtDecode} from 'jwt-decode';

// function UserRoute({ children }) {
//     const token = localStorage.getItem("token");
//     let user;
//     let user_role;
//     if (token) {
//         user = jwtDecode(token);
//         user_role = user.role;
//     }
//     if (!!user && (user_role === "user" || user_role === "admin")) {
//         return children;
//     } else {
//         return <Navigate to="/userlogin" replace/>;
//     }
// }
// export default UserRoute

// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import {jwtDecode} from 'jwt-decode'; // Corrected import

// function UserRoute({ children }) {
//     const token = localStorage.getItem("token");
//     let user;
//     let is_admin;

//     if (token) {
//         try {
//             user = jwtDecode(token);
//             is_admin = user.is_admin;
//         } catch (error) {
//             console.error("Error decoding token:", error);
//         }
//     }

//     // Check if the user is an admin
//     if (user && is_admin) {
//         return children;
//     } 
//     // Check if the user is not an admin but is logged in
//     else if (user && !is_admin) {
//         return <Navigate to="/userpage" replace />;
//     } 
//     // Redirect to login if there is no token or user is not authenticated
//     else {
//         return <Navigate to="/userlogin" replace />;
//     }
// }

// export default UserRoute;
import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

function UserRoute({ children }) {
    const token = localStorage.getItem("token");
    let user;
    let is_admin;

    if (token) {
        try {
            user = jwtDecode(token);
            is_admin = user.is_admin;
        } catch (error) {
            console.error("Error decoding token:", error);
        }
    }

    console.log("User:", !!!user);
    console.log("Is Admin:", is_admin);

    if (!!user && is_admin || !!user && !is_admin) {
        return children;
    } else {
        return <Navigate to="/userlogin" replace />;
    }
}

export default UserRoute;