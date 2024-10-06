import React from 'react';
import '../styles/home.css';
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <div className="home-container">
            <div className="hero-section">
                <h1 className="welcome-title">Welcome to Our World!</h1>
                <p className="welcome-text">Explore exciting characters, stories, and more.</p>

                <div className="button-group"> {/* Container for buttons */}
                    <Link to="/characters"> {/* Link to Characters page */}
                        <button className="explore-button">Explore Now</button>
                    </Link>
                    <Link to="/signup"> {/* Link to Sign Up page */}
                        <button className="signup-button">Sign Up Now</button>
                    </Link>
                </div>
                <p className="signup-prompt">Not registered yet? <Link to="/signup" className="signup-link">Sign Up here</Link></p>


            </div>
        </div>
    );
};

export default Home;