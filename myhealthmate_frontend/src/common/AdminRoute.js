import React from 'react'
import { Navigate } from 'react-router-dom'
import jwt from 'jwt-decode';

function AdminRoute({ children }) {
    const token = localStorage.getItem("token");
    let user;
    let user_role;
    if (token) {
        user = jwt(token);
        user_role = user.role;
    }
    if (!!user && user_role === "admin") {
        return children;
    } 
    else if (!!user && user_role !== "admin") {
        return <Navigate to="/" replace/>;
    } else {
        return <Navigate to="/login" replace/>;
    }
}
export default AdminRoute