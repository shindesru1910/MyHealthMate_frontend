import React from 'react'
import { Navigate } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode';

function AdminRoute({ children }) {
    // {
    //     user_id: 11,
    //     useremail: 'admin@gmail.com',
    //     username: 'Admin Admin',
    //     is_admin: true,
    //     exp: 1723065899,
    //     iat: 1722461099
    //   }
    
    const token = localStorage.getItem("token");
    let user;
    let is_admin;
    if (token) {
        user = jwtDecode(token);
        is_admin = user.is_admin;
    }
    if (!!user && is_admin) {
        return children;
    } 
    else if (!!user && !is_admin) {
        return <Navigate to="/" replace/>;
    } else {
        return <Navigate to="/userlogin" replace/>;
    }
}
export default AdminRoute