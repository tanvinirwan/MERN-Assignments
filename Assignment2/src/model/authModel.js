const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8, 
      maxlength: 20,
    },
    address : {
      type : mongoose.Schema.Types.ObjectId ,
      required : true 
    }
  },
  {
    timestamps: true,
  }
);

const StudentModel = mongoose.model("student", studentSchema);

module.exports = StudentModel;