const { Product } = require('../models');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

// Create a new product
const createProduct = async (productBody) => {
  const product = await Product.create(productBody);
  return product;
};

// Get all products
const getProducts = async () => {
  const products = await Product.find();
  return products;
};

// Get a product by ID
const getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(httpStatus.status.NOT_FOUND, 'Product not found');
  }
  return product;
};

// Update a product by ID
const updateProduct = async (id, updateBody) => {
  const product = await Product.findByIdAndUpdate(id, updateBody, {
    new: true, // Return the updated document
    runValidators: true,
  });
  if (!product) {
    throw new ApiError(httpStatus.status.NOT_FOUND, 'Product not found');
  }
  return product;
};

// Delete a product by ID
const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    throw new ApiError(httpStatus.status.NOT_FOUND, 'Product not found');
  }
  return product;
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
