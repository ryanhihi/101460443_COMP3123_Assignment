const Employee = require('../models/employee');

exports.searchEmployees = async (criteria) => {
  const query = {};
  if (criteria.department) query.department = criteria.department;
  if (criteria.position) query.position = criteria.position;

  return Employee.find(query); // Perform a MongoDB search
};
