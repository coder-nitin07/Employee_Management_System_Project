const express = require('express');
const dbConnection = require('./config/db');
const { employeeRouter } = require('./routes/employeeRoutes');
const { authRouter } = require('./routes/authRoutes');
const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv').config();

app.use(express.json());

// DB Connection
dbConnection();

// Uploads file folder
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/auth', authRouter);
app.use('/api', employeeRouter);

app.get('/', (req, res)=>{
    res.send('Employee Management System.');
});

PORT= process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
});