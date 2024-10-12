const express = require('express');
const Employee = require('../models/employee.js');
const router = express.Router();


    // Add a new employee
router.post('/employee', async (req, res) => {
    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

    // Validate request
    if (!first_name || !last_name || !email || !position || !salary || !date_of_joining || !department) {
        return res.status(400).json({
            message: "All fields (first name, last name, email, position, salary, date of joining, and department) are required."
        });
    }

    const employee = new Employee({
        first_name,
        last_name,
        email,
        position,
        salary,
        date_of_joining,
        department
    });

    try {
        // Save the employee
        await employee.save();
        res.status(201).json({ message: "Employee created successfully.", employee_id: employee._id });
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ error: "Error creating employee." });
    }
});

// Get all employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find(); // Fetch all employees from the database
        res.status(200).json(employees); // Return the list of employees
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: "Error fetching employees." });
    }
});

// Get employee details by employee ID
router.get('/employees/:eid', async (req, res) => {
    const { eid } = req.params; // Extract the employee ID from the URL parameters

    try {
        const employee = await Employee.findById(eid); // Fetch the employee by ID

        if (!employee) {
            return res.status(404).json({ message: "Employee not found." }); // Handle case where employee doesn't exist
        }

        res.status(200).json(employee); // Return the employee details
    } catch (error) {
        console.error('Error fetching employee:', error);
        res.status(500).json({ error: "Error fetching employee." });
    }
});

// Update employee details by employee ID
router.put('/employees/:eid', async (req, res) => {
    const { eid } = req.params; // Extract the employee ID from the URL parameters
    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body; // Get updated fields from request body

    // Trim the eid to remove any whitespace/newline characters
    const trimmedEid = eid.trim();

    // Create an object to hold the fields that will be updated
    const updateFields = {};
    if (first_name) updateFields.first_name = first_name;
    if (last_name) updateFields.last_name = last_name;
    if (email) updateFields.email = email;
    if (position) updateFields.position = position;
    if (salary) updateFields.salary = salary;
    if (date_of_joining) updateFields.date_of_joining = date_of_joining;
    if (department) updateFields.department = department;

    // Ensure at least one field is being updated
    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({
            message: "At least one field is required to update."
        });
    }

    try {
        // Update the employee with the fields provided
        const updatedEmployee = await Employee.findByIdAndUpdate(trimmedEid, {
            ...updateFields,
            updated_at: Date.now() // Update the timestamp
        }, { new: true }); // Return the updated document

        // Check if the employee was found and updated
        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found." });
        }

        // Return success response with updated employee details
        res.status(200).json({ message: "Employee updated successfully.", employee: updatedEmployee });
    } catch (error) {
        console.error('Error updating employee:', error.message); // Log the specific error message
        res.status(500).json({ error: "Error updating employee." });
    }
});



// Delete an employee by employee ID
router.delete('/employees/:eid', async (req, res) => {
    try {
        const employeeId = req.params.eid; // Extract the employee ID from the route parameters
        const deletedEmployee = await Employee.findByIdAndDelete(employeeId); // Delete the employee by ID

        if (!deletedEmployee) {
            return res.status(404).send("No Employee Found"); // Handle case where employee doesn't exist
        }

        res.status(204).send(); 
        console.log("The Employee has been deleted"); // Log the deletion
    } catch (err) {
        console.error('Error deleting employee:', err);
        res.status(500).json({ message: 'Internal Server Error' }); // Handle internal server error
    }
});





module.exports = router;