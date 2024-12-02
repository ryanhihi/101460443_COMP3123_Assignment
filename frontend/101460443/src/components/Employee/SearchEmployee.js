import React, { useState } from 'react';

const SearchEmployee = ({ onSearch }) => {
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ department, position }); // Pass search criteria to parent
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Department:</label>
      <input
        type="text"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />

      <label>Position:</label>
      <input
        type="text"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />

      <button type="submit">Search</button>
    </form>
  );
};

export default SearchEmployee;
