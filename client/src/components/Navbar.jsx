// client/src/components/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import AuthContext from '../context/AuthContext';
import '../styles/navbar.css'; // Import your CSS

const Navbar = () => {
    const { user, signout } = useContext(AuthContext);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSignOut = async () => {
        try {
            await signout();
            navigate('/login'); // Redirect to login after signout
        } catch (error) {
            console.error("Signout error:", error.message);
            // Handle signout error, e.g., display a message to the user
        }
    }


    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/">Home</Link></li> {/* Link to the home page */}

                {/* Conditionally render links based on authentication status */}
                {user ? (
                    <>
                      {/* Links for logged-in users */}
                      <li><Link to="/characters">Characters</Link></li> {/* Example protected route link */}
                      <li><button onClick={handleSignOut} className="signout-button">Sign Out</button></li>
                    </>
                ) : (
                    <>
                      {/* Links for guests */}
                      <li><Link to="/login">Login</Link></li>
                      <li><Link to="/signup">Sign Up</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;