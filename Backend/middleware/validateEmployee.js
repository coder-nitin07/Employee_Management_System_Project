const Joi = require('joi');

const userValidSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    mobile: Joi.string().pattern(/^[0-9]{10}$/).required(),
    designation: Joi.string().valid('HR', 'Manager', 'Sales').required(),
    gender: Joi.string().valid('male', 'female').required(),
    course: Joi.string().valid('BCA', 'MCA', 'BBA', 'MBA', 'BA', 'MA').required(),
    image: Joi.string().optional()
});

const validateEmployee = (req, res, next)=>{
    const { error } = userValidSchema.validate(req.body);

    if(error){
        return res.status(400).json({ message: 'Invalid Input', details: error.details });
    }

    next();
};

module.exports = validateEmployee;