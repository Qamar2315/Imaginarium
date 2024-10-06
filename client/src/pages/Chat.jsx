// client/src/pages/Chat.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; // Import Link
import AuthContext from '../context/AuthContext';
import '../styles/chat.css';

const Chat = () => {
    const { user } = useContext(AuthContext);
    const { characterId } = useParams();
    const navigate = useNavigate();
    const [character, setCharacter] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true; // Flag to track component mount status

        const fetchCharacterAndChat = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/characters/${characterId}`, {
                    headers: {
                        'Authorization': `Bearer ${await user.getIdToken()}`,
                    },
                });

                if (!response.ok) {
                    const err = await response.json();
                    throw new Error(err.message || "Failed to fetch character.");
                }

                const characterData = await response.json();

                if (isMounted) { // Check if the component is still mounted
                    setCharacter(characterData);
                }

                // Fetch chat history (replace with your actual API endpoint)
                const chatResponse = await fetch(`/api/chat/${characterId}`, {
                    headers: {
                        'Authorization': `Bearer ${await user.getIdToken()}`,
                    },
                });

                if (!chatResponse.ok) {
                    const err = await chatResponse.json();
                    throw new Error(err.message || 'Failed to fetch chat history.');
                }

                const chatData = await chatResponse.json();
                // Set chat messages, handling potential undefined data
                if (isMounted) {
                    setMessages(chatData.messages || []);
                }

            } catch (err) {
                console.error("Error fetching data:", err);
                if (isMounted) {  // Set state only if the component is still mounted
                    setError(err.message || "Failed to load character or chat");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchCharacterAndChat();

        return () => {
            isMounted = false; // Set flag to false when component unmounts
        };

    }, [characterId, user]); // Add characterId as a dependency

    const handleSendMessage = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/chat/${characterId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await user.getIdToken()}`, // Fix closing quote
                },
                body: JSON.stringify({ text: newMessage, sender: 'user' }),
            });

            if (!response.ok) {
                throw new Error("Failed to send message.");
            }

            const responseData = await response.json();
            // Update the chat messages with Gemini's response or handle as needed
            setMessages([...messages, responseData.message]); // Add the AI's message

            setNewMessage(''); // Clear input field
        } catch (error) {
            console.error("Error sending message:", error);
            setError("Failed to send message. Please try again."); // Display error to the user
        }
    };

    const handleDeleteCharacter = async () => {
        if (!window.confirm("Are you sure you want to delete this character?")) { // Confirmation dialog
            return;
        }

        try {
            const response = await fetch(`/api/characters/${characterId}`, { // Your delete route
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${await user.getIdToken()}`, // Fix closing quote
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete character");
            }

            navigate('/characters'); // Redirect after deletion
        } catch (error) {
            console.error("Delete error:", error);
            setError("An error occurred while deleting.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;  // Or a better loading indicator
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    if (!character) {
        return <div>Character not found.</div>; // Or handle appropriately
    }

    return (
        <div className="chat-page">
            <div className="character-info">
                <h1 className="character-name">{character.name}</h1>
                {/* Display other character info */}
                {character.imageUrl && <img src={character.imageUrl} alt={character.name} className="character-image" />} {/* Display image */}
                <p>{character.description}</p>
                {/* Edit and Delete Buttons */}
                <div className="edit-delete-buttons">
                    <Link to={`/edit/${character._id}`} className="edit-button">Edit</Link> {/* Link to edit page */}
                    <button onClick={handleDeleteCharacter} className="delete-button">Delete</button>
                </div>
            </div>

            <div className="chat-container">  {/* Add a dedicated chat container */}
                <div className="messages-list"> {/* Messages list container */}
                    {messages.map(message => (
                        <div key={message._id} className={`message ${message.sender}`}> {/* Dynamic class based on sender */}
                            <span className="sender">{message.sender}:</span>
                            <span className="text">{message.text}</span>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSendMessage} className="message-form">  {/* Add message form */}
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="message-input"
                    />
                    <button type="submit" className="send-button">Send</button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
