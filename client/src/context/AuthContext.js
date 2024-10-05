// src/context/AuthContext.js (Firebase context)
import React, { useState, useEffect, createContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged, // Listen for auth changes
  signOut,
} from "firebase/auth";
import app from "../firebaseConfig"; // Your Firebase config
const baseURL = process.env.REACT_APP_API_URL;

const auth = getAuth(app); // Initialize Firebase Auth

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    console.log(baseURL);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // Set loading to false when auth state is known
    });

    return () => unsubscribe(); // Clean up listener
  }, []);

  const signup = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      // Send POST request to your backend to save user data
      const response = await fetch(`${baseURL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid, name, email }), // Send name to backend
      });

      if (!response.ok) {
        const errorData = await response.json(); // Get error details from the server
        throw new Error(
          errorData.message || "Failed to create user on server."
        ); // Throw error with server message
      }
      userCredential.user.name = name; // Add name to user object
      setUser(userCredential.user); // Or handle user data differently if needed
      // Optionally redirect to a protected route after signup
    } catch (error) {
      console.error("Signup Error:", error.message); // Handle signup errors
    }
  };

  const signin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;
      const response = await fetch(`${baseURL}/api/users/${uid}`); // Fetch user data
      const data = await response.json();
      if(data.success) {
        userCredential.user.name = data.user.name; // Add name to user object
      }else {
        throw new Error(response.message || "Failed to fetch user data.");
      }
      setUser(userCredential.user);

      // Redirect after signin
    } catch (error) {
      console.error("Signin Error:", error.message);
    }
  };

  const signout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear user state
    } catch (error) {
      console.error("Signout Error:", error.message);
    }
  };

  // Make user and auth functions available to other components
  const value = {
    user, // Current user
    loading,
    signup,
    signin,
    signout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}{" "}
      {/* Only render children when auth state is known */}
    </AuthContext.Provider>
  );
};

export default AuthContext;
