const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: mongoose.Schema.Types.Decimal128, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: Array, required: true },
  bestseller: { type: Boolean },
  date: { type: Number, default: Date.now },
});

// Add plugin that converts document to JSON
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;
