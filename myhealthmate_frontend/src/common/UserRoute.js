import React from 'react'
import { Navigate } from 'react-router-dom'
import jwt from 'jwt-decode';

function UserRoute({ children }) {
    const token = localStorage.getItem("token");
    let user;
    let user_role;
    if (token) {
        user = jwt(token);
        user_role = user.role;
    }
    if (!!user && (user_role === "user" || user_role === "admin")) {
        return children;
    } else {
        return <Navigate to="/login" replace/>;
    }
}
export default UserRoute