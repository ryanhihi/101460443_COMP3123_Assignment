import React from 'react';
import { Navigate } from 'react-router-dom'; 
import { useAuth } from 'C:/Users/willb/Documents/101460443_COMP3123_Assignment1/frontend/101460443/src/context/AuthContext.js';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();  // Fetch the authentication status

  // If the user is not authenticated, redirect them to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;  // Use Navigate for redirection
  }

  // If authenticated, render the requested element
  return element;
};

export default ProtectedRoute;