const Joi = require('joi');

const addItemToCart = {
  body: Joi.object().keys({
    productId: Joi.string().required(),
    quantity: Joi.number().required().min(1),
  }),
};

const updateItemInCart = {
  body: Joi.object().keys({
    productId: Joi.string().required(),
    quantity: Joi.number().required().min(1),
  }),
};

const getCart = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};

module.exports = {
  addItemToCart,
  updateItemInCart,
  getCart,
};
