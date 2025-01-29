import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true }, // Quantity of the product in the order
      },
    ],
    amount: { type: Number, required: true },
    address: {
      type: mongoose.Schema.Types.ObbjectId,
      ref: 'Address',
      required: true,
    },
    status: {
      type: String,
      enum: ['Order Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Order Placed',
    },
    paymentMethod: {
      type: String,
      num: ['COD', 'Paypal'],
      required: true,
    },
    payment: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const orderModel =
  mongoose.models.Order || mongoose.model('Order', orderSchema);
export default orderModel;
