const User = require("../models/authSchema");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create User
const createUser = async (req, res)=>{
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if(existingUser){
            return res.status(404).json({ message: 'Invalid Credentails' });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashPassword });
        
        await newUser.save();
        res.status(201).json({ message: 'User created Successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
};

// login User
const loginUser = async (req, res)=>{
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if(!user){
            return res.status(401).json({ message: 'Invalid Credentails' });
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if(!checkPassword){
            return res.status(401).json({ message: 'Invalid Credentails' });
        }

        const payload = { userId: user._id, email: user.email  };
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login Successfully',
            token: token,
            user: {
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
};

module.exports = { createUser, loginUser };