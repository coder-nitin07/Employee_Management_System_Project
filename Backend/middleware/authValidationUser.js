const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required()
});

const validateUser = (req, res, next)=>{
    const { error } = userSchema.validate(req.body);

    if(error){
        return res.status(400).json({ message: 'Invalid Input', details: error.details });
    }

    next();
};

module.exports = validateUser;