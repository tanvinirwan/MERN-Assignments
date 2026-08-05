const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();


const express = require("express");

const {StudentModel , userModel , ProductModel} = require("./src/model") ;
const { loginSchema , registrationSchema } = require("./src/middleware/validationSchema/authSchema");
const { productSchema } = require("./src/middleware/validationSchema/productSchema");


const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const cookieParser = require("cookie-parser");

const connectDB = require("./db");
const validationMiddleware = require("./src/middleware/validationMiddleware");
const authRouter =require("./src/routes/auth.route")
const { productRouter } = require("./src/routes/product.route");


const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

//------------------------ REGISTERATION ------------------------

app.use("/auth",authRouter) ;
app.use("/product",productRouter) ;



//home
app.get("/", (req, res) => {
  res.send("Server Running...");
});

//server

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database Connection Error:", err);
  });
