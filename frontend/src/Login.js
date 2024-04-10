// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function InputField({ type, id, label, value, onChange, required }) {
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <input type={type} id={id} value={value} onChange={onChange} required={required} />
        </div>
    );
}

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username === 'admin' && password === '1234') {
            navigate('/home');
            setMessage('Login successful!');
        } else {
            setMessage('Incorrect username or password. Please try again.');
        }
    };

    const handleSignupClick = () => {
        navigate('/signup');
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {message && <p className={message.includes('successful') ? 'success-message' : 'error-message'}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <InputField type="text" id="username" label="Username:" value={username} onChange={handleUsernameChange} required />
                <InputField type="password" id="password" label="Password:" value={password} onChange={handlePasswordChange} required />
                <button type="submit">Login</button>
                <button type="button" className="signup-button" onClick={handleSignupClick}>Signup</button>
            </form>
        </div>
    );
}

export default Login;
