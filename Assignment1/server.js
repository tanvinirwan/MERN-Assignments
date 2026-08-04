const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cookieParser = require("cookie-parser");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("./AuthModel");
const productModel = require("./ProductModel");
const app = express();
const connectDB = require("./db");

app.use(express.json());
app.use(cookieParser());

// auth api starting from here =>

app.post("/register", async (req, res) => {
  try {
    const validateSchema = joi.object({
      name: joi.string().required().min(2).max(64),
      email: joi.string().email().required(),
      password: joi.string().min(8).required(),
    });

    const { error } = validateSchema.validate(req.body);

    if (error) {
      return res
        .status(400)
        .send("You have not filled info according to input rules");
    }

    const { name, email, password } = req.body;

    const userExist = await userModel.findOne({ email });

    if (userExist) {
      return res
        .status(400)
        .send("User already exists! Please try loging innn!!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Registration Successfullll!",
      user: newUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("SERVER THrOwInG ERROR!");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).send("User does not exist");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send("Invalid Password");
    }

    const token = jwt.sign({ userId: user._id }, "secretKey");

    res.cookie("token", token);

    res.status(200).send("Login Successful");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/createProduct", async (req, res) => {
  try {
    const { name, SKU, description, price, category } = req.body;

    if (!name || !SKU || !description || !price || !category) {
      return res.status(400).send("All fields are required");
    }

    const productExist = await productModel.findOne({ SKU });

    if (productExist) {
      return res.status(400).send("Product already exists");
    }

    const product = new productModel({
      name,
      SKU,
      description,
      price,
      category,
    });

    await product.save();

    res.status(201).send("Product created successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// function to get all the products

app.get("/getAllProducts", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 5;

    const products = await productModel
      .find()
      .select("-__v")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// if we have to search using id

app.get("/getSingleProduct/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// updating product

app.patch("/updateSingleProduct/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// delete any product

app.delete("/deleteProduct/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    await productModel.findByIdAndDelete(id);

    res.status(200).send("Product deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database Connection Error:", err);
  });