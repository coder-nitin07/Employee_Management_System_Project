const Joi = require('joi');

const employeeValidSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    mobile: Joi.string().pattern(/^[0-9]{10}$/),
    designation: Joi.string().valid('HR', 'Manager', 'Sales'),
    course: Joi.string().valid('BCA', 'MCA', 'BBA', 'MBA', 'BA', 'MA'),
    image: Joi.string().optional()
});

const updateEmployeeValidation = (req, res, next)=>{
    const { error } = employeeValidSchema.validate(req.body, { allowUnknown: true });

    if(error){
        return res.status(400).json({ message: 'Invalid Input', details: error.details });
    }

    next();
};

module.exports = updateEmployeeValidation;