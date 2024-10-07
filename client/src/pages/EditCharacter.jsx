// client/src/pages/EditCharacter.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/edit-character.css'; // Import your CSS
const baseURL = process.env.REACT_APP_API_URL;
const EditCharacter = () => {
    const { user } = useContext(AuthContext);
    const { characterId } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await fetch(`${baseURL}/api/characters/${characterId}`, {
                    headers: {
                        'Authorization': `Bearer ${await user.getIdToken()}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch character details.');
                }

                const characterData = await response.json();
                setName(characterData.name);
                setDescription(characterData.description);
            } catch (error) {
                console.error("Error fetching character:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) { // Only fetch if the user is logged in
            fetchCharacter();
        }
    }, [characterId, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${baseURL}/api/characters/${characterId}`, { // Use characterId in the URL
                method: 'PUT', // Use PUT for updates
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await user.getIdToken()}`,
                },
                body: JSON.stringify({ name, description }),  // Send updated data
            });

            if (!response.ok) {
                throw new Error("Failed to update character");
            }

            navigate(`/characters`);
        } catch (err) {
            console.error("Update Error:", err);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Or a nicer loading indicator
    }

    return (
        <div className="edit-character-page">
            <h1 className="page-title">Edit Character</h1>

            <form onSubmit={handleSubmit} className="character-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="save-button">Save Changes</button>
            </form>
        </div>
    );
};

export default EditCharacter;
