import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../styles/signup.css"; // Import your CSS file

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // For error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    // Basic validation:
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      // Example password length validation
      setError("Password must be at least 6 characters.");
      return;
    }

    // Email validation (basic):
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      // Very basic validation!
      setError("Please enter a valid email address.");
      return;
    }

    try {
      await signup(email, password, name);
      navigate("/"); // Redirect after successful signup
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "An error occurred during signup."); // Display user-friendly error message
    }
  };

  return (
    <div className="signup-container">
      {" "}
      {/* Add a container */}
      <h2>Sign Up</h2>
      {error && <div className="error-message">{error}</div>}{" "}
      {/* Display error messages */}
      <form onSubmit={handleSubmit} className="signup-form">
        {" "}
        {/* Add form class */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required // HTML required attribute
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="signup-button">
          Sign Up
        </button>{" "}
        {/* Style the button */}
      </form>
    </div>
  );
};

export default Signup;
