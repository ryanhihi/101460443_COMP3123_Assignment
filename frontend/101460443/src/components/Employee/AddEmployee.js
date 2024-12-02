import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'C:/Users/willb/Documents/101460443_COMP3123_Assignment1/frontend/101460443/src/context/AuthContext.js';

const AddEmployee = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const [date_of_joining, setDateOfJoining] = useState('');
  const [department, setDepartment] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEmployee = { first_name, last_name, email, position, salary, date_of_joining, department };

    try {
      await axios.post('http://localhost:8082/api/v1/emp/employee', newEmployee);

      if (isAuthenticated) {
        navigate('/employee-list'); // Redirect to employee list after adding
      } else {
        navigate('/login'); // Redirect to login if not authenticated
      }
    } catch (error) {
      console.error('Error adding employee:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
      <label>First Name:</label>
        <input type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} required />
        
        <label>Last Name:</label>
        <input type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} required />
        
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        
        <label>Position:</label>
        <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
        
        <label>Salary:</label>
        <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} required />
        
        <label>Date of Joining:</label>
        <input type="date" value={date_of_joining} onChange={(e) => setDateOfJoining(e.target.value)} required />
        
        <label>Department:</label>
        <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} required />

        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
