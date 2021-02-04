const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    EmpId: Number, 
    Name: String,
    Designation: String,
    Department: String,
    Salary: Number
}, {
    timestamp: true, versionKey: false
});

module.exports = mongoose.model('Employee', EmployeeSchema);