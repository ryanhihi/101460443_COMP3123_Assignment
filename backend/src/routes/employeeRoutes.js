const express = require('express');
const Employee = require('../models/employee');
const employeeController = require('../controllers/employeeController');
const router = express.Router();

// 1. Get all employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find(); // Fetch all employees from the database
        res.status(200).json(employees); // Return the list of employees
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: "Error fetching employees." });
    }
});

// 2. Get employee details by employee ID
router.get('/employees/:eid', async (req, res) => {
    const { eid } = req.params; // Extract the employee ID from the URL parameters

    try {
        const employee = await Employee.findById(eid); // Fetch the employee by ID

        if (!employee) {
            return res.status(404).json({ message: "Employee not found." });
        }

        res.status(200).json(employee); // Return the employee details
    } catch (error) {
        console.error('Error fetching employee:', error);
        res.status(500).json({ error: "Error fetching employee." });
    }
});

// 3. Update employee details by employee ID
router.put('/employees/:eid', async (req, res) => {
    const { eid } = req.params; // Extract the employee ID from the URL parameters
    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body; // Get updated fields from request body

    const updateFields = {};
    if (first_name) updateFields.first_name = first_name;
    if (last_name) updateFields.last_name = last_name;
    if (email) updateFields.email = email;
    if (position) updateFields.position = position;
    if (salary) updateFields.salary = salary;
    if (date_of_joining) updateFields.date_of_joining = date_of_joining;
    if (department) updateFields.department = department;

    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ message: "At least one field is required to update." });
    }

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(eid, { ...updateFields, updated_at: Date.now() }, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found." });
        }

        res.status(200).json({ message: "Employee updated successfully.", employee: updatedEmployee });
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ error: "Error updating employee." });
    }
});

// 4. Delete an employee by employee ID
router.delete('/employees/:eid', async (req, res) => {
    const { eid } = req.params;

    try {
        const deletedEmployee = await Employee.findByIdAndDelete(eid); // Delete the employee by ID

        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found." });
        }

        res.status(204).send(); // Successful deletion, no content returned
        console.log("Employee deleted successfully.");
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});




// Search Employees by Department or Position
router.get('/employees/search', async (req, res) => {
    try {
        const { department, position } = req.query;

        // If both department and position are not provided, send an error
        if (!department && !position) {
            return res.status(400).json({
                error: 'Please provide at least one search criterion (department or position).',
            });
        }

        // Build the filter object dynamically based on the query
        const filter = {};

        // If department is provided, add it to the filter
        if (department) filter.department = department;

        // If position is provided, add it to the filter
        if (position) filter.position = position;

        console.log('Filter object:', filter); // Debugging log to check the query object

        // Perform the search with the filter
        const employees = await Employee.find(filter);

        // If no employees are found
        if (employees.length === 0) {
            return res.status(404).json({
                message: 'No employees found matching the criteria.',
            });
        }

        res.status(200).json(employees); // Return the list of employees found
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Error fetching employees.' });
    }
});


module.exports = router;



  

  
  
module.exports = router;
