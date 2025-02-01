const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const productService = require('../services/product.service');

// Create a new product
const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct(req.body);
  res.status(httpStatus.status.CREATED).send(product);
});

// Get all products
const getProducts = catchAsync(async (req, res) => {
  const products = await productService.getProducts();
  res.status(httpStatus.status.OK).send(products);
});

// Get a product by ID
const getProductById = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  res.status(httpStatus.status.OK).send(product);
});

// Update a product by ID
const updateProduct = catchAsync(async (req, res) => {
  const product = await productService.updateProduct(req.params.id, req.body);
  res.status(httpStatus.status.OK).send(product);
});

// Delete a product by ID
const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProduct(req.params.id);
  res.status(httpStatus.status.OK).send({ message: 'Product deleted' });
});

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
