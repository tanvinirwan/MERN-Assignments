//this service contains the logic to register the user 
const bcrypt = require("bcrypt");
const { userModel } = require("../model");
const jwt = require("jsonwebtoken") ;
const secretKey = "technonjr";

const registerService = async ({ name, email, password }) => {
    try{
        const userExist = await userModel.findOne({ email });
    if (userExist) {
     throw new Error("user already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
}catch (err) {
    console.log(err);
  }
}

const loginService = async({email,password}) => {
  try{
    const userExist = await userModel.findOne({email}) ;
        if(userExist) {
            throw new Error("User doesn't exist. Please try signing up.");
        }
        const isPasswordValid = await bcrypt.compare(password, userExist.password);

        if(!isPasswordValid){
            throw new Error("Invalid Credentials!") ;
        }

        const token = jwt.sign(
      {
        userID: userExist._id,
      },
      "SecretKey",
      {
        expiresIn: "1h",
      },
    );
    return token ;
  }catch(err){
    console.log(err) ;
  }
}

    
module.exports = {
    registerService,
    loginService,
};