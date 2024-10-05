// client/src/components/CharacterList.js
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';


const CharacterList = () => {
    const { user } = useContext(AuthContext);
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await fetch('/api/characters', { // Your backend API endpoint
                    headers: {
                        'Authorization': `Bearer ${await user.getIdToken()}` // Include ID token
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setCharacters(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching characters:", error);
                setLoading(false); // Set loading to false even on error
            }
        };

        if (user) { // Only fetch if user is logged in
          fetchCharacters();
        }

    }, [user]); // Fetch characters when the user changes


    if (loading) {
        return <div>Loading Characters...</div>;
    }


    if (!characters || characters.length === 0) {
        return <p>No characters found. Create one!</p>;
    }


    return (
        <div>
            <h2>Your Characters</h2>
            <ul>
                {characters.map(character => (
                    <li key={character._id}>
                        <h3>{character.name}</h3>
                        {/* Display other character details */}
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default CharacterList;