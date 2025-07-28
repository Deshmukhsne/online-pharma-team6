import React, { useState } from "react";
import "./Register.css";

function Register() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        username: '',
        phone: '',
        confirmPassword: '',
        gender: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(JSON.stringify(formData, null, 2));
    };

    return (
        <div className="register-container">
            <form className="form-box" onSubmit={handleSubmit}>
                <h2>Registration</h2>
                <div className="input-grid">
                    <input name="fullName" type="text" placeholder="Enter your name" onChange={handleChange} required />
                    <input name="username" type="text" placeholder="Enter your username" onChange={handleChange} required />
                    <input name="email" type="email" placeholder="Enter your email" onChange={handleChange} required />
                    <input name="phone" type="tel" placeholder="Enter your number" onChange={handleChange} required />
                    <input name="password" type="password" placeholder="Enter your password" onChange={handleChange} required />
                    <input name="confirmPassword" type="password" placeholder="Confirm your password" onChange={handleChange} required />
                </div>

                <div className="gender">
                    <label>Gender</label>
                    <div className="gender-options">
                        <label><input type="radio" name="gender" value="Male" onChange={handleChange} /> Male</label>
                        <label><input type="radio" name="gender" value="Female" onChange={handleChange} /> Female</label>
                        <label><input type="radio" name="gender" value="Prefer not to say" onChange={handleChange} /> Prefer not to say</label>
                    </div>
                </div>

                <button type="submit" className="register-btn">Register</button>
            </form>
        </div>
    );
};

export default Register;
