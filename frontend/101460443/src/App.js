import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import Navbar from './components/common/Navbar';
import EmployeeList from './components/Employee/EmployeeList';
import AddEmployee from './components/Employee/AddEmployee';
import EditEmployee from './components/Employee/EditEmployee';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup'; 
import ProtectedRoute from './components/common/ProtectedRoute';  // Import ProtectedRoute
import Home from './components/common/Home';
import './App.css';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Navbar />
          <div className="main-content">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected routes */}
              <Route path="/employee-list" element={<ProtectedRoute element={<EmployeeList />} />} />
              <Route path="/add-employee" element={<ProtectedRoute element={<AddEmployee />} />} />
              <Route path="/edit-employee/:eid" element={<ProtectedRoute element={<EditEmployee />} />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
