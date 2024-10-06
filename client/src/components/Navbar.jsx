// client/src/components/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/navbar.css';
// import logo from 'logo.png'; // Import your logo image

const Navbar = () => {
    const { user, signout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signout();
            navigate('/login');
        } catch (error) {
            console.error("Signout error:", error.message);
        }
    }

    return (
        <nav className="navbar">
            <Link to="/" className="logo-link">
                <img src={'logo.png'} alt="App Logo" className="logo" />
            </Link>

            <ul className="nav-links"> {/* Add a class for styling links */}
                {/* Conditionally render links based on authentication status */}
                {user ? (
                    <>
                        <li><Link to="/characters">Characters</Link></li>
                        <li><button onClick={handleSignOut} className="signout-button">Sign Out {user.name}</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;