const mongoose = require('mongoose');

const dbConnection = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log('Succcessully connected to the Database');
    } catch (err) {
        console.log("fhsdbhbhsbsdhbvsdjh")
        console.log({ message: 'Error while connecting with DB.', error: err.message });

        process.exit(1);
    }
};

module.exports = dbConnection;