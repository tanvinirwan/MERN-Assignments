//contains the req , res handler only and calls "service"  for other works like fetching the database queries

const authService = require('../service/authService')

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await authService.registerService({name,email,password}) ;
      res.status(201).json({
      message: "Registration Successful!"
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("SERVER ERROR!");
  }
}


const loginUser = async(req,res) => {
    try{
        const {email,password} = req.body ;
       const token = await authService.loginService({ email, password });
    res.cookie("givenToken", token, {
      httpOnly: true,
    });

    res.status(200).json({
      message: "Login Successful!",
      token,
    });
    }catch(err){
        console.log("Not able to login\nError:",err) ;
    }
}

const logoutUser = async(req,res) => {
     try{
        res.clearCookie("token",{httpOnly:true});
        res.send("logout sucessfully ");

    }
    catch(err){
        console.log(err);
    }
}

module.exports = {
    registerUser,loginUser,
};