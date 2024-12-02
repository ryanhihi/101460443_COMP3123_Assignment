const mongoose = require('mongoose');

// Define the employee schema
const employeeSchema = new mongoose.Schema({
first_name: String,
 last_name: String,
 email: String,
 position: String,
 salary: Number,
 date_of_joining: Date,
 department: String,
 created_at: { type: Date, default: Date.now }, 
 updated_at: { type: Date, default: Date.now } 
});

// Create the employee model
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
