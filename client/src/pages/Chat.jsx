import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/chat.css'; // Ensure this contains the scrollable styles
const baseURL = process.env.REACT_APP_API_URL;

const Chat = () => {
    const { user } = useContext(AuthContext);
    const { characterId } = useParams();
    const navigate = useNavigate();
    const [character, setCharacter] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingAiReply, setLoadingAiReply] = useState(false); // Track loading state for AI reply
    const [error, setError] = useState('');
    const messagesEndRef = useRef(null); // Ref for auto-scrolling

    useEffect(() => {
        let isMounted = true;

        const fetchCharacterAndChat = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${baseURL}/api/characters/${characterId}`, {
                    headers: {
                        'Authorization': `Bearer ${await user.getIdToken()}`,
                    },
                });

                if (!response.ok) {
                    const err = await response.json();
                    throw new Error(err.message || "Failed to fetch character.");
                }

                const characterData = await response.json();
                if (isMounted) setCharacter(characterData);

                const chatResponse = await fetch(`${baseURL}/api/chat/${characterId}`, {
                    headers: {
                        'Authorization': `Bearer ${await user.getIdToken()}`,
                    },
                });

                if (!chatResponse.ok) {
                    const err = await chatResponse.json();
                    throw new Error(err.message || 'Failed to fetch chat history.');
                }

                const chatData = await chatResponse.json();
                if (isMounted) setMessages(chatData.messages || []);

            } catch (err) {
                console.error("Error fetching data:", err);
                if (isMounted) setError(err.message || "Failed to load character or chat");
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchCharacterAndChat();

        return () => {
            isMounted = false;
        };

    }, [characterId, user]);

    // Auto-scroll to the bottom of the chat when a new message is added
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!newMessage.trim()) return; // Don't send empty messages

        const userMessage = { sender: 'user', text: newMessage };
        setNewMessage(''); // Clear input after creating userMessage

        // Optimistically add the user's message to the messages state
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        setLoadingAiReply(true); // Set loading for AI reply

        try {
            const response = await fetch(`${baseURL}/api/chat/${characterId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await user.getIdToken()}`,
                },
                body: JSON.stringify({ text: userMessage.text, sender: 'user' }),
            });

            if (!response.ok) {
                // Rollback UI update if API call fails
                setMessages((prevMessages) => prevMessages.filter(m => m !== userMessage));
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to send message.");
            }

            const responseData = await response.json();
            const aiMessage = responseData.message;

            // Add AI message to state
            setMessages((prevMessages) => [...prevMessages, aiMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            setError(error.message || "Failed to send message. Please try again.");
        } finally {
            setLoadingAiReply(false); // Stop loading after AI reply is received
        }
    };

    const handleDeleteCharacter = async () => {
        if (!window.confirm("Are you sure you want to delete this character?")) {
            return;
        }

        try {
            const response = await fetch(`${baseURL}/api/characters/${characterId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${await user.getIdToken()}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete character");
            }

            navigate('/characters');
        } catch (error) {
            console.error("Delete error:", error);
            setError("An error occurred while deleting.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    if (!character) {
        return <div>Character not found.</div>;
    }

    return (
        <div className="chat-page">
            <div className="character-info">
                <h1 className="character-name">{character.name}</h1>
                {character.imageUrl && <img src={character.imageUrl} alt={character.name} className="character-image" />}
                <p>{character.description}</p>
                <div className="edit-delete-buttons">
                    <Link to={`/edit/${character._id}`} className="edit-button">Edit</Link>
                    <button onClick={handleDeleteCharacter} className="delete-button">Delete</button>
                </div>
            </div>

            <div className="chat-container">
                <div className="messages-list">
                    {messages.map((message, index) => (
                        <div key={message._id || index} className={`message ${message.sender}`}>
                            <span className="sender">{message.sender}:</span>
                            <span className="text">{message.text}</span>
                        </div>
                    ))}
                    <div ref={messagesEndRef} /> {/* Auto scroll target */}
                </div>

                {/* Show loading indicator while waiting for AI response */}
                {loadingAiReply && <div className="loading-spinner">{character.name} is typing...</div>}

                <form onSubmit={handleSendMessage} className="message-form">
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
