const { Cart } = require('../models');

const getCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId }).populate('items.product');
  return cart || { user: userId, items: [] };
};

const addToCart = async (userId, productId, quantity) => {
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
  }

  const productExists = cart.items.find(
    (item) => item.product.toString() === productId
  );
  if (productExists) {
    productExists.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  cart.updatedAt = new Date();
  await cart.save();
  return cart;
};

const removeFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ user: userId });

  if (cart) {
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    cart.updatedAt = new Date();
    await cart.save();
  }

  return cart;
};

const clearCart = async (userId) => {
  return await Cart.findOneAndDelete({ user: userId });
};

module.exports = { getCart, addToCart, removeFromCart, clearCart };
