const mongoose = require('mongoose');


const connectDB = async () => {

    try {

        await mongoose.connect(process.env.DBurl);

        console.log("Connected DB:", mongoose.connection.name);

    } catch (error) {

        console.error("Full DB Error:");
        console.error(error);
        console.error(error.message);

        throw error;
    }
};

module.exports = connectDB;