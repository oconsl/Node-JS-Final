const Joi = require('joi');

const bodySchema = Joi.alternatives().try(
  Joi.object({
    email: Joi.string().required(),
  }),
  Joi.object({
    userName: Joi.string().required(),
  })
);

module.exports = bodySchema;
