const catchAsync = require('../utils/catchAsync');
const cartService = require('../services/cart.service');

const getCart = catchAsync(async (req, res) => {
    console.log("id:",req.user)
  const cart = await cartService.getCart(req.user.id);
  res.json(cart);
});

const addToCart = catchAsync(async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await cartService.addToCart(req.user.id, productId, quantity);
  res.json(cart);
});

const removeFromCart = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const cart = await cartService.removeFromCart(req.user.id, productId);
  res.json(cart);
});

const clearCart = catchAsync(async (req, res) => {
  await cartService.clearCart(req.user.id);
  res.json({ message: 'Cart cleared' });
});

module.exports = { getCart, addToCart, removeFromCart, clearCart };
