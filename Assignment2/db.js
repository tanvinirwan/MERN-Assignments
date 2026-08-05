const mongoose = require('mongoose') ;
// const url = process.env.DBurl ;
//bc we are doing database fetching , hence we are usign async and await


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected DB:", mongoose.connection.name);
  } catch (error) {
    console.error("Full DB Error:");
    console.error(error);
    console.error(error.message);
  }
};
 
module.exports = connectDB ;
