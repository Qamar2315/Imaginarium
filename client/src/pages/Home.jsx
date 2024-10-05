import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';


const Home = () => {
    const { user, signout } = useContext(AuthContext);

    return (
        <div>
            <h1>Welcome Home!</h1>
            {user && (
                <div>
                    <p>You are logged in as: {user.email}</p>
                    <p>Your user ID is: {user.uid}</p>
                    <p>Your name is: {user.name}</p>
                    <button onClick={signout}>Sign Out</button>
                </div>
            )}
        </div>
    );
};

export default Home;