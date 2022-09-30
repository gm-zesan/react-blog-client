import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleRegister = async (event) => {
        event.preventDefault();
        setError(false);
        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    username,
                    email,
                    password,
                }
            );
            res.data && window.location.replace("/login");
        } catch (err) {
            setError(true);
        }
    };
    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form className="registerForm" onSubmit={handleRegister}>
                <label>Username</label>
                <input
                    className="registerInput"
                    name="username"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username..."
                />
                <label>Email</label>
                <input
                    className="registerInput"
                    name="email"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email..."
                />
                <label>Password</label>
                <input
                    className="registerInput"
                    name="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password..."
                />
                <button className="registerButton" type="submit">
                    Register
                </button>
                {error && (
                    <span style={{ color: "red", marginTop: "10px" }}>
                        Something went wrong!
                    </span>
                )}
            </form>
            <button className="registerLoginButton">
                <Link className="link" to="/login">
                    Login
                </Link>
            </button>
        </div>
    );
};

export default Register;
