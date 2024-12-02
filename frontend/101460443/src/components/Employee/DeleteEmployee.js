import React from 'react';
import axios from 'axios';

const DeleteEmployee = ({ employeeId, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      const confirmation = window.confirm('Are you sure you want to delete this employee?');
      if (!confirmation) return;

      await axios.delete(`http://localhost:8082/api/v1/emp/employees/${employeeId}`);
      onDeleteSuccess(employeeId);  // Callback to update the parent component
      console.log(`Employee with ID ${employeeId} deleted`);
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Failed to delete employee');
    }
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default DeleteEmployee;