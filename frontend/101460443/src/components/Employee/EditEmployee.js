import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const [date_of_joining, setDateOfJoining] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');
  const { eid } = useParams(); // Get the employee ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/v1/emp/employees/${eid}`);
        const employee = response.data;
        setFirstName(employee.first_name);
        setLastName(employee.last_name);
        setEmail(employee.email);
        setPosition(employee.position);
        setSalary(employee.salary);
        const formattedDate = employee.date_of_joining.substring(0, 10);
        setDateOfJoining(formattedDate);
        setDepartment(employee.department);
      } catch (error) {
        console.error('Error fetching employee:', error);
        setError('Error fetching employee data.');
      }
    };
    fetchEmployee();
  }, [eid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedEmployee = {
      first_name,
      last_name,
      email,
      position,
      salary,
      date_of_joining,
      department,
    };

    try {
      const response = await axios.put(`http://localhost:8082/api/v1/emp/employees/${eid}`, updatedEmployee);
      if (response.status === 200) {
        navigate('/employee-list');
      }
    } catch (error) {
      console.error('Error updating employee:', error.response?.data?.message || error.message);
      setError(error.response?.data?.message || 'An error occurred while updating the employee.');
    }
  };

  return (
    <div>
      <h2>Update Employee</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Similar form fields as AddEmployee */}
        <label>First Name:</label>
        <input
          type="text"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <label>Last Name:</label>
        <input
          type="text"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Position:</label>
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />

        <label>Salary:</label>
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />

        <label>Date of Joining:</label>
        <input
          type="date"
          value={date_of_joining}
          onChange={(e) => setDateOfJoining(e.target.value)}
          required
        />

        <label>Department:</label>
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default EditEmployee;
