
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import DeleteEmployee from './DeleteEmployee';  
import { fetchEmployees, searchEmployees } from '../../services/employeeService';
import SearchEmployee from './SearchEmployee';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      console.log('EmployeeList component loaded');

      // Fetch employee list
      axios.get('http://localhost:8082/api/v1/emp/employees')
        .then(response => {
          setEmployees(response.data);
        })
        .catch(error => {
          console.error('Error fetching employees:', error);
          alert('Failed to load employees');
        });
    }
  }, [isAuthenticated, navigate]);

  const handleDeleteSuccess = (employeeId) => {
    setEmployees(prevEmployees => prevEmployees.filter(employee => employee._id !== employeeId));
  };

  const handleSearch = async (criteria) => {
    try {
      const results = await searchEmployees(criteria);
      setEmployees(results);
    } catch (error) {
      console.error('Error searching employees:', error);
      alert('Failed to search employees');
    }
  };

  return (
    <div>
      <h2>Employee List</h2>
      <SearchEmployee onSearch={handleSearch} />
      
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map(employee => (
              <tr key={employee._id}>
                <td>{employee.first_name} {employee.last_name}</td>
                <td>{employee.position}</td>
                <td>
                  <button onClick={() => navigate(`/edit-employee/${employee._id}`)}>Update</button>
                  <DeleteEmployee
                    employeeId={employee._id}
                    onDeleteSuccess={handleDeleteSuccess}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No employees available</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={() => navigate('/add-employee')}>Add Employee</button>
    </div>
  );
};

export default EmployeeList;
