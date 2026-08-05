
const joi = require('joi') ;


const registrationSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).max(20).required(),
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).max(20).required(),
});

module.exports = {registrationSchema,loginSchema} ;