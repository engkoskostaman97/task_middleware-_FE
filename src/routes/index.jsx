/* eslint-disable no-unused-vars */
//import useContext
import React, { useContext } from 'react';

//import context
import { AuthContext } from '../context/AuthContext';

//import react router dom
import { Routes, Route, Navigate } from "react-router-dom";

//import view home
import Home from "../views/home/index.jsx";

//import view register
import Register from "../views/auth/register.jsx";

//import view login
import Login from "../views/auth/login.jsx";

import Loan from "../views/auth/loan.jsx";

//import view admin dashboard
import Dashboard from "../views/admin/dashboard/index.jsx";




export default function AppRoutes() {

    //destructure context "isAuthenticated"
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Routes>
            {/* route "/" */}
            <Route path="/" element={<Home />} />

            {/* route "/register" */}
            <Route path="/register" element={
                isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Register />
 } />

            {/* route "/login" */}
            <Route path="/login" element={
                isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Login />
            } />
            



            {/* route "/loans" */}
            <Route path="/loans" element = { <Loan /> } />
            
            {/* route "/admin/dashboard" */}
            <Route path="/admin/dashboard" element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
            } />

        </Routes>
    );
}