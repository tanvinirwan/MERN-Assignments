const joi = require('joi') ;

const productSchema = joi.object({
      name: joi.string().min(3).max(30).required(),
      description: joi.string().min(10).max(200).required(),
      price: joi.number().positive().required(),
      category: joi
        .string()
        .valid("Electronics", "Clothing", "Books", "Home", "Sports")
        .required(),
      SKU: joi.string().required(),
    });

    module.exports = {productSchema} ;