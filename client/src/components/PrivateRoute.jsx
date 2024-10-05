// src/components/PrivateRoute.jsx (Example)
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom'; // For redirects
import AuthContext from '../context/AuthContext';


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext); // Get auth context

    if (loading) {
      return <div>Loading...</div>;  // Or a loading spinner component
    }

    return user ? children : <Navigate to="/login" />; // Redirect to login if no user
};

export default PrivateRoute;