const Joi = require('joi');

const bodySchema = Joi.object({
  userName: Joi.string().alphanum().lowercase().trim().required().required(),
  password: Joi.string().min(8).max(15).required(),
});

module.exports = bodySchema;
