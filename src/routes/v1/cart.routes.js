const express = require('express');
const { cartController } = require('../../controllers');
const validate = require('../../middlewares/validate');
const { cartValidation } = require('../../validations');
const router = express.Router();

// Get the user's cart
router.get('/:userId', validate(cartValidation.getCart), cartController.getCart);

// Add a product to the user's cart
router.post('/add', validate(cartValidation.addItemToCart), cartController.addToCart);

// Update the quantity of a product in the user's cart
router.delete('/remove/:productId', validate(cartValidation.updateItemInCart), cartController.removeFromCart);

// Clear the user's cart
router.delete('/clear', cartController.clearCart);

module.exports = router;
