const express = require('express');
const validate = require('../../middlewares/validate');
const { productController } = require('../../controllers');
const productValidation = require('../../validations/product.validation');
const isAdmin = require('../../middlewares/isAdmin');

const router = express.Router();

// Create a new product
router.post(
  '/',
  isAdmin, // Only admin can create products
  validate(productValidation.createProduct),
  productController.createProduct
);

// Get all products
router.get('/', productController.getProducts);

// Get a single product by ID
router.get('/:id', productController.getProductById);

// Update a product by ID
router.patch(
  '/:id',
  isAdmin,
  validate(productValidation.updateProduct),
  productController.updateProduct
);

// Delete a product by ID
router.delete('/:id', isAdmin, productController.deleteProduct);

module.exports = router;
