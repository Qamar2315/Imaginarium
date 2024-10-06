// client/src/pages/Login.js
import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/login.css'; // Import your CSS

const Login = () => {
    const { signin } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State for error messages
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors

        // Basic validation
        if (!email || !password) {
            setError('Please fill in both email and password.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }


        try {
            await signin(email, password);
            navigate("/");
        } catch (err) {
            console.error("Login Error:", err);

            // Set user-friendly error message.
            switch (err.code) { // Use Firebase error codes for specific messages
                case 'auth/user-not-found':
                    setError('User not found.');
                    break;
                case 'auth/wrong-password':
                    setError('Incorrect password.');
                    break;
                case 'auth/invalid-email':
                    setError('Invalid email format.');
                    break;
                default:
                    setError('An error occurred during login.'); // Generic error message
            }


        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>

            {error && <div className="error-message">{error}</div>} {/* Display error messages */}

            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="login-button">Login</button>
            </form>

             {/* Add a link to the signup page */}
             <p className="signup-link">
                Don't have an account? <Link to="/signup">Sign up here</Link>
            </p>

        </div>
    );
};

export default Login;