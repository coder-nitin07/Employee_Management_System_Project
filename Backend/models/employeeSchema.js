const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        enum: [ 'HR', 'Manager', 'Sales' ],
        required: true
    },
    gender: {
        type: String,
        enum: [ 'male', 'female' ],
        required: true
    },
    course: {
        type: String,
        enum: [ 'BCA', 'MCA', 'BBA', 'MBA', 'BA', 'MA' ]
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;