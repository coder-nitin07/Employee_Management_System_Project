const express = require('express');
const { upload } = require('../middleware/upload');
const { createEmployee, getEmployee, updateEmployee, getAllEmployees, deleteEmployee } = require('../controllers/employeeController');
const validateEmployee = require('../middleware/validateEmployee');
const updateEmployeeValidation = require('../middleware/updateEmployeeValidation');
const authMiddleware = require('../middleware/authMiddleware');
const employeeRouter = express.Router();

employeeRouter.post('/createEmployee', authMiddleware, upload.single('image'), validateEmployee, createEmployee);
employeeRouter.get('/getEmployee/:id', authMiddleware, getEmployee);
employeeRouter.put('/updateEmployee/:id', authMiddleware, upload.single('image'), updateEmployeeValidation, updateEmployee);
employeeRouter.get('/getAllEmployee', authMiddleware, getAllEmployees);
employeeRouter.delete('/deleteEmployee/:id', authMiddleware, deleteEmployee);

module.exports = { employeeRouter };