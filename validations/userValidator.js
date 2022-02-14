const Joi = require('joi');

const alphaSpace = new RegExp('[a-zA-Z\\s\\.\\u00f1\\u00d1]+$', 'i');

const bodySchema = Joi.object({
  firstName: Joi.string().regex(alphaSpace).trim().required(),
  lastName: Joi.string().regex(alphaSpace).trim().required(),
  userName: Joi.string().alphanum().lowercase().trim().required().required(),
  password: Joi.string().min(8).max(15).required(),
  email: Joi.string().email().trim().required(),
  address: Joi.string()
    .regex(new RegExp('^[A-Za-z0-9\\.\\-\\s\\,\\u00f1\\u00d1]+$', 'i'))
    .trim()
    .required(),
  phone: Joi.string().regex(new RegExp('^[0-9]+$')).trim().required(),
});

module.exports = bodySchema;
