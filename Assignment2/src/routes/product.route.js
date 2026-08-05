const express = require('express') ;
const productRouter = express.Router() ; 
const validationMiddleware = require("../middleware/validationMiddleware") ;
const productSchema = require("../middleware/validationSchema/productSchema") ;
const {StudentModel , userModel , ProductModel} = require("../model") ;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const cookieParser = require("cookie-parser");

productRouter.post("/createProduct",validationMiddleware(productSchema), async (req, res) => {
  try {
    const { name, description, price, category, SKU } = req.body;

    const productExist = await ProductModel.findOne({
      $or: [{ name }, { SKU }],
    });

    if (productExist) {
      return res.status(400).send("Product already exists!");
    }

    const product = await ProductModel.create({
      name,
      description,
      price,
      category,
      SKU,
    });

    res.status(201).json({
      message: "Product created successfully!",
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("SERVER ERROR!");
  }
});

productRouter.get("/getProduct",async (req, res) => {
  try {
    const products = await ProductModel.find();

    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).send("SERVER ERROR!");
  }
});

productRouter.get("/getSingleProduct/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

productRouter.patch("/updateProduct/:id", async (req, res) => {
      try {
    const id = req.params.id;

    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).send(error.message);
  }
})
productRouter.delete("/deleteProduct/:id", async (req, res) => {
     try {
    const id = req.params.id;
0
    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    await ProductModel.findByIdAndDelete(id);

    res.status(200).send("Product deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
})

module.exports = {productRouter} ;

