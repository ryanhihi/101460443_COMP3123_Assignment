import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook for accessing the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Login function
  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8082/api/v1/user/login', { username, password });
      console.log('API Response:', response.data); // Inspect the API response
  
      if (response.data.status) { // Check for success status
        const user = {
          id: response.data.user_id,
          username: response.data.username,
          email: response.data.email,
        };
        setIsAuthenticated(true);
        setUser(user);
        return true;
      } else {
        throw new Error(response.data.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      setIsAuthenticated(false);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('authToken'); // Remove token
  };

  // Check for token in localStorage to maintain session on page reload
  const checkAuth = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      // Optionally fetch user data here if not stored
    } else {
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
