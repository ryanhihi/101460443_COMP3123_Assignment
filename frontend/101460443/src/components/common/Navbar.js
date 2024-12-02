import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate(); // useNavigate 

  const handleLogout = () => {
    logout(); // Call logout function from context
    navigate('/login'); // Redirect to login after logging out
  };

  return (
    <div className="navbar">
      <ul>
        {/* Always show these links */}
        <li><Link to="/">Home</Link></li>

        {/* Show "Employee List" and related links only if the user is authenticated */}
        {isAuthenticated && (
          <>
            <li><Link to="/employee-list">Employee List</Link></li>
            <li><Link to="/add-employee">Add Employee</Link></li>
          </>
        )}

        {/* Show "Login" or "Signup" links if the user is not authenticated */}
        {!isAuthenticated ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        ) : (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
