import React, { useState } from 'react';

import './Registration.css';
import axios from 'axios';

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [message, setMessage] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        setUsernameError('');
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordError('');
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        setConfirmPasswordError('');
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setEmailError('');
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
        setPhoneError('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Minimum character validations (Frontend)
        if (username.length < 5) {
            setUsernameError('Username must be at least 5 characters.');
            return;
        }
        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters.');
            return;
        }
        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
            return;
        }
        if (phone.length !== 11) {
            setPhoneError('Phone number must be 11 digits long.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/register', {
                username,
                password,
                email,
                phone,
            });
            setMessage(response.data.message);
        } catch (error) {
            if (error.response.status === 400) {
                setUsernameError('Username already exists');
            } else {
                console.error('Error registering user:', error);
                setMessage('Registration failed. Please try again.');
            }
        }
    };

    return (
        <div className="registration-container">
            <h2>Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                    {usernameError && <p className="error">{usernameError}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    {emailError && <p className="error">{emailError}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="phone"
                        id="phone"
                        value={phone}
                        onChange={handlePhoneChange}
                        required
                    />
                    {phoneError && <p className="error">{phoneError}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    {passwordError && <p className="error">{passwordError}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                    />
                    {confirmPasswordError && <p className="error">{confirmPasswordError}</p>}
                </div>

                <div className="button-container">
                    <button type="submit">Register</button>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RegistrationForm;
