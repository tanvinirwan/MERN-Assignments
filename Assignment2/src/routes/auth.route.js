// client -> route ->  middleware -> controller -> service -> model -> mongodb -> response 

const express = require('express') ;
const authRouter = express.Router() ; 
const validationMiddleware = require("../middleware/validationMiddleware") ;
const {registrationSchema,loginSchema} = require("../middleware/validationSchema/authSchema");
const {StudentModel , userModel , ProductModel} = require("../model") ;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const cookieParser = require("cookie-parser");
const authController = require('../controller/authController') ;


//register api logic
authRouter.post('/register',validationMiddleware(registrationSchema),authController.registerUser);


//login logic api
authRouter.post('/login',validationMiddleware(loginSchema),authController.loginUser);


//logout logic api 
authRouter.post('/logout',(req,res)=>{
   
});

module.exports = authRouter ;