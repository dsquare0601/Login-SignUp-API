const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    EmpId: Number, 
    Name: String,
    Email: String,
    Designation: String,
    Password: String,
    Department: String,
    Salary: Number
}, {
    timestamp: true, versionKey: false
});

module.exports = mongoose.model('Employee', EmployeeSchema);