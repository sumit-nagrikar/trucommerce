const { Cart } = require('../models');

const getCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId }).populate('items.product');
  return cart || { user: userId, items: [] };
};

const addToCart = async (userId, productId, quantity) => {
  const cart = await Cart.findOneAndUpdate(
    { user: userId, 'items.product': productId }, // Find users cart with productId
    { $inc: { 'items.$.quantity': quantity } }, // Increase quantity
    { new: true }
  );

  if (!cart) {
    return await Cart.findOneAndUpdate(
      { user: userId },
      { $push: { items: { product: productId, quantity } } }, // Add new item if cart is not present
      { upsert: true, new: true }
    );
  }

  return cart;
};

const removeFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) return null;

  const filteredItems = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  if (filteredItems.length === cart.items.length) {
    return null; // if no item removed return null
  }

  cart.items = filteredItems;
  await cart.save();
  return cart;
};

const clearCart = async (userId) => {
  return await Cart.findOneAndDelete({ user: userId });
};

module.exports = { getCart, addToCart, removeFromCart, clearCart };
