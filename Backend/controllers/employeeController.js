const Employee = require("../models/employeeSchema");

// Create employee
const createEmployee = async(req, res)=>{
    try {
        const { name, email, mobile, designation, gender, course } = req.body;
        const image = req.file ? req.file.filename : null;

        const newEmployee = await Employee.create({ 
            name,
            email,
            mobile,
            designation,
            gender,
            course,
            image
         });

         res.status(200).json({ message: 'Employee Created successfully', employee: newEmployee });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
};

// Get SIngle employee
const getEmployee = async (req, res)=>{
    try {
        const { id } = req.params;
        const getTheEmployee = await Employee.findById(id);
        
        if(!getTheEmployee){
            return res.status(404).json({ message: 'Employee Not Found' });
        }

        res.status(200).json({ message: 'Successfully get the Employee', employee: getTheEmployee });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
};

// Update the Employee
const updateEmployee = async (req, res)=>{
    try {
        const { id } = req.params;
        const { name, mobile, designation, course } = req.body;
        const image = req.file;

        const employee = await Employee.findById(id);

        if(!employee){
            return res.status(404).json({ message: 'Employee not found' });
        }

        const updateFields = {};

        if(name !== undefined) updateFields.name = name;
        if(mobile !== undefined) updateFields.mobile = mobile;
        if(designation !== undefined) updateFields.designation = designation;
        if(course !== undefined) updateFields.course = course;
        if(image !== undefined) updateFields.image = image;

        const updatedEmployee = await Employee.findByIdAndUpdate(
           id,
           updateFields,
           { new: true }
        );

        res.status(200).json({ message: 'Updated Employee Successfully', employee: updatedEmployee });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
};

// Get All employees
const getAllEmployees = async (req, res)=>{
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const search = req.query.search || '';
        const sortBy = req.query.sortBy || 'name';
        const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

        const query = {
            name: { $regex: search, $options: 'i' } 
        }

        const sortCriteria = {};
        if(sortBy === 'name' || sortBy === 'designation'){
            sortCriteria[sortBy] = sortOrder;
        }

        const employees = await Employee.find(query).sort(sortCriteria).skip(skip).limit(limit);

        const totalEmployees = await Employee.countDocuments(query);

        if(employees.length === 0){
            return res.status(404).json({ message: 'No Employee Found' });
        }

        res.status(200).json({ 
            message: 'Successfully fetched all employees list',
            currentPage: page,
            totalPages: Math.ceil(totalEmployees / limit),
            totalEmployees, 
            Employees: employees 
        });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
};

// Delete the Employee
const deleteEmployee = async (req, res)=>{
    try {
        const { id } = req.params;
        const getEmployee = await Employee.findById(id);

        if(!getEmployee){
            return res.status(404).json({ message: 'Employee not found' });
        }

        const deletedEmployee = await Employee.findByIdAndDelete(getEmployee);
        res.status(200).json({ message: 'Employee Deleted Successfully', employee: deletedEmployee });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
};

module.exports = { createEmployee, getEmployee, updateEmployee, getAllEmployees, deleteEmployee };