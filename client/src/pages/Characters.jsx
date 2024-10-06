// client/src/pages/Characters.js
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/characters.css'; // Import your CSS
const baseURL = process.env.REACT_APP_API_URL;

const Characters = () => {
    const { user } = useContext(AuthContext);
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchCharacters = async () => {
            if (!user) { 
                setLoading(false); // Set loading to false, even if no user (prevents infinite loop)
                return; 
            }
            try {
                const response = await fetch(`${baseURL}/api/characters`, {
                    headers: {
                        'Authorization': `Bearer ${await user.getIdToken()}`
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch characters.');
                }

                const data = await response.json();
                setCharacters(data);
            } catch (error) {
                console.error("Error fetching characters:", error);
                // Consider adding error handling/display to the user
            } finally {
                setLoading(false); // Ensure loading is set to false
            }
        };

        fetchCharacters(); // Call the function immediately

    }, [user]);  // Fetch when user changes (login/logout)




    if (loading) {
        return <div className="loading-message">Loading Characters...</div>;
    }


    return (
        <div className="characters-page">
            <h1 className="page-title">Your Characters</h1>



            <div className="character-list">
                {characters.map(character => (
                    <Link key={character._id} to={`/chat/${character._id}`} className="character-card"> {/* Link to chat route */}
                         {/* Add image if available */}
                         {character.imageUrl && <img src={character.imageUrl} alt={character.name} className="character-image" />}
                        <h2 className="character-name">{character.name}</h2>
                        {/* You can display other character details here */}
                    </Link>
                ))}


            </div>

            {/* Button to create a new character */}
            <Link to="/create-character" className="create-character-button">Create New Character</Link>

        </div>
    );
};

export default Characters;