const catchAsync = require('../utils/catchAsync');
const cartService = require('../services/cart.service');

const getCart = catchAsync(async (req, res) => {
  const cart = await cartService.getCart(req.user.id);
  res.status(200).json(cart);
});

const addToCart = catchAsync(async (req, res) => {
  const { productId, quantity } = req.body;
  const updatedCart = await cartService.addToCart(
    req.user.id,
    productId,
    quantity
  );
  res.status(200).json(updatedCart);
});

const removeFromCart = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const updatedCart = await cartService.removeFromCart(req.user.id, productId);

  if (!updatedCart) {
    return res.status(404).json({ message: 'Product not found in cart' });
  }

  res.status(200).json(updatedCart);
});

const clearCart = catchAsync(async (req, res) => {
  await cartService.clearCart(req.user.id);
  res.status(200).json({ message: 'Cart cleared successfully' });
});

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
};
