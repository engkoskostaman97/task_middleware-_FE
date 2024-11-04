// Import hooks from React
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

// Import hook useNavigate from react-router-dom
import { useNavigate } from "react-router-dom";

// Import API service
import api from '../../services/api'

export default function Login() {

    // Initialize navigate
    const navigate = useNavigate();

    // Define state variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Define state for validation errors
    const [validation, setValidation] = useState([]);

    // Function to handle login
    const login = async (e) => {
        e.preventDefault();
    
        try {
            const response = await api.post('/auth/login', {
                email: email,
                password: password,
            });
            console.log("Login response:", response.data); // Log the complete response for debugging
            
            // Check if the response contains the token
            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token); // Save the token to localStorage
                console.log("Token saved:", response.data.token);
            } else {
                console.log("Token not found in response");
            }

            // Save user ID to localStorage if present
            if (response.data && response.data.user && response.data.user.id) {
                localStorage.setItem('id', response.data.user.id); // Save user ID to localStorage
            } else {
                console.log("User ID not found in response");
            }
    
            navigate("/loans"); // Redirect to loans page
        } catch (error) {
            if (error.response && error.response.data) {
                setValidation(error.response.data);
            }
        }
    };
    
    return (
        <div className="row justify-content-center">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            <h4>LOGIN</h4>
                            <hr />
                            {
                                validation.errors && (
                                    <div className="alert alert-danger mt-2 pb-0">
                                        {
                                            validation.errors.map((error, index) => (
                                                <p key={index}>{error.path} : {error.msg}</p>
                                            ))
                                        }
                                    </div>
                                )
                            }
                            <form onSubmit={login}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label className="mb-1 fw-bold">Email address</label>
                                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control"
                                                placeholder="Email Address" required />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label className="mb-1 fw-bold">Password</label>
                                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control"
                                                placeholder="Password" required />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">LOGIN</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
