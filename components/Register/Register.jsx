import React, { useState } from 'react';

function RegisterForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }
        // Your form submission logic goes here
    };

    return (
        <div>
            <h1 className="header">Register an account</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="name-container">
                    <div>
                        <label className="firstName">First Name:</label>
                        <input className="firstName-field" type="text" id="first-name" name="first-name" value={firstName} onChange={handleFirstNameChange} />
                    </div>
                    <div>
                        <label className="lastName">Last Name:</label>
                        <input className="lastName-field" type="text" id="last-name" name="last-name" value={lastName} onChange={handleLastNameChange} />
                    </div>
                </div>
                <div>
                    <label className="email" htmlFor="email">Email:</label>
                    <input className="email-field" type="email" id="email" name="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} />
                </div>
                <div className="password-container">
                    <div>
                        <label className="password" htmlFor="password">Password:</label>
                        <input className="password-field" type="password" id="password" name="password" placeholder="Enter your password" pattern="^(?=.*[A-Z])(?=.*\d).{8,}$" required value={password} onChange={handlePasswordChange} />
                        <label>Password must contain:<br />- a capital letter<br />- a number<br />- at least 8 characters</label>
                    </div>
                    <div>
                        <label className="confirmPassword" htmlFor="confirmPassword">Confirm Password:</label>
                        <input className="confirmPassword-field" type="password" id="confirmPassword" name="confirmPassword" required value={confirmPassword} onChange={handleConfirmPasswordChange} />
                        <span id="confirmPasswordError" className="error">{passwordError}</span>
                    </div>
                </div>
                <div className="submit-button">
                    <button className="submit" type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default RegisterForm;