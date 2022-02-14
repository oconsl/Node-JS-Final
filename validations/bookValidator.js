const Joi = require('joi');

const alphaSpace = new RegExp('[a-zA-Z\\s\\.\\u00f1\\u00d1]+$', 'i');

const bodySchema = Joi.object({
  title: Joi.string().regex(alphaSpace).required(),
  author: Joi.string().regex(alphaSpace).min(3).max(30).required(),
  genre: Joi.string().regex(alphaSpace).required(),
  read: Joi.boolean().required(),
});

module.exports = bodySchema;
