import React, { useState } from "react";
import "./Register.css";

function Register() {
    const [isFlipped, setIsFlipped] = useState(false);

    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        phone: "",
        dob: "",
        username: "",
        password: "",
    });

    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });

    const handleRegisterChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        console.log("Register Data:", registerData);
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log("Login Data:", loginData);
    };

    return (
        <div className="register-container">
            <div className="left-panel">
                <img src="/src/assets/Images/register.png" alt="register" />
            </div>

            <div className="right-panel">
                <div className={`card-container ${isFlipped ? "flipped" : ""}`}>
                    {/* Register Form */}
                    <div className="form-card front">
                        <form className="register-form" onSubmit={handleRegisterSubmit}>
                            <h2>Register</h2>

                            <label>Name</label>
                            <input type="text" name="name" value={registerData.name} onChange={handleRegisterChange} placeholder="Enter your name" required />

                            <label>Email ID</label>
                            <input type="email" name="email" value={registerData.email} onChange={handleRegisterChange} placeholder="Enter your email" required />

                            <label>Phone No</label>
                            <input type="tel" name="phone" value={registerData.phone} onChange={handleRegisterChange} placeholder="Enter your phone number" required />

                            <label>Date of Birth</label>
                            <input type="date" name="dob" value={registerData.dob} onChange={handleRegisterChange} required />

                            <label>Set Username</label>
                            <input type="text" name="username" value={registerData.username} onChange={handleRegisterChange} placeholder="Enter your username" required />

                            <label>Set Password</label>
                            <input type="password" name="password" value={registerData.password} onChange={handleRegisterChange} placeholder="Enter your password" required />

                            <button type="submit">Register</button>
                            <p className="flip-link" onClick={() => setIsFlipped(true)}>Already Registered? Login</p>
                        </form>
                    </div>

                    {/* Login Form */}
                    <div className="form-card back">
                        <form className="register-form" onSubmit={handleLoginSubmit}>
                            <h2>Login</h2>

                            <label>Username</label>
                            <input type="text" name="username" value={loginData.username} onChange={handleLoginChange} placeholder="Enter your username" required />

                            <label>Password</label>
                            <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} placeholder="Enter your password" required />

                            <button type="submit">Login</button>
                            <p className="flip-link" onClick={() => setIsFlipped(false)}>Don't have an account? Register</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
