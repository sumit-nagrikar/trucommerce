const express = require('express');
const { cartController } = require('../../controllers');
const validate = require('../../middlewares/validate');
const { cartValidation } = require('../../validations');
const authenticate = require('../../middlewares/authenticate.cart');
const router = express.Router();

// Get the logged-in user's cart
router.get('/', authenticate(), cartController.getCart);

// Add a product to the cart
router.post(
  '/add',
  authenticate(),
  validate(cartValidation.addItemToCart),
  cartController.addToCart
);

// Remove a product from the cart
router.delete(
  '/remove/:productId',
  authenticate(),
  cartController.removeFromCart
);

// Clear the cart
router.delete('/clear', authenticate(), cartController.clearCart);

module.exports = router;
