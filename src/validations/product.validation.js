const Joi = require('joi');

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    image: Joi.array().items(Joi.string()).required(),
    category: Joi.string().required(),
    subCategory: Joi.string().required(),
    sizes: Joi.array().items(Joi.string()).required(),
    bestseller: Joi.boolean(),
  }),
};

const updateProduct = {
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    image: Joi.array().items(Joi.string()),
    category: Joi.string(),
    subCategory: Joi.string(),
    sizes: Joi.array().items(Joi.string()),
    bestseller: Joi.boolean(),
    date: Joi.number(),
  }),
};

module.exports = {
  createProduct,
  updateProduct,
};
