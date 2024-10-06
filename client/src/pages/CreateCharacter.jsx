// client/src/pages/CreateCharacter.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../styles/create-character.css";
const baseURL = process.env.REACT_APP_API_URL;

const CreateCharacter = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear errors

    // Basic validation
    if (!name || !description) {
      setError("Please fill in both name and description.");
      return;
    }

    try {
      const response = await fetch(`${baseURL}/api/characters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await user.getIdToken()}`, // Include auth token
        },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Get error details
        throw new Error(errorData.message || "Failed to create character.");
      }

      // Redirect to the character list page after successful creation
      navigate("/characters");
    } catch (err) {
      console.error("Error creating character:", err);
      setError(err.message || "An error occurred during character creation.");
    }
  };

  return (
    <div className="create-character-page">
      <h1 className="page-title">Create New Character</h1>

      {/* Error Message Display */}
      {error && <div className="error-message">{error}</div>}

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
        <button type="submit" className="create-button">
          Create Character
        </button>
      </form>
    </div>
  );
};

export default CreateCharacter;
