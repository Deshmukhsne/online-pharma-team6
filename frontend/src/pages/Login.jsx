import React, { useState } from "react";
import "../styles/Login.css";


function Login() {
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(JSON.stringify(loginData, null, 2));
    };

    return (
        <div className="login-container">
            <form className="login-box" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="login-grid">
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        value={loginData.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="login-btn">Login</button>
                <p className="fpass"><a href="/ForgotPassword" >Forgot password </a></p>
                <p className="register-link">
                    Not registered? <a href="/register">Register now</a>
                </p>

            </form>
        </div>
    );
}

export default Login;
