const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
  },
  { timestamps: true }
);

// Applying the toJSON plugin to the schema for proper JSON output
cartSchema.plugin(toJSON);

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);
module.exports = Cart;
