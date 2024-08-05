import React from 'react'
import { Navigate } from 'react-router-dom'
// import jwt from 'jwt-decode';
import { jwtDecode as jwt } from 'jwt-decode';




export default function ChangeRoute() {
    const token = localStorage.getItem("token");
    let user;
    let user_role;
    if (token) {
        user = jwt(token);
        user_role = user.role;
    }
    
    if (!!user && user_role === "admin") {
        return <Navigate to="/adminpage" replace/>;
    } else if(!!user && user_role === "user") {
        return <Navigate to="/userpage" replace/>;
    }else{
        return <Navigate to="/login" replace/>;

    }
}
