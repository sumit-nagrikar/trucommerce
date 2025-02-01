const express = require('express');
const validate = require('../../middlewares/validate');
const { productController } = require('../../controllers');
const productValidation = require('../../validations/product.validation');

const router = express.Router();

// Create a new product
router.post(
  '/',
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
  validate(productValidation.updateProduct),
  productController.updateProduct
);

// Delete a product by ID
router.delete('/:id', productController.deleteProduct);

module.exports = router;
