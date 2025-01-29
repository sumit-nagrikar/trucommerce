import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' }, // Reference to Address model
    cart: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
      },
    ], // Array of products in cart
  },
  { timestamps: true, minimize: false }
);

const userModel = mongoose.models.User || mongoose.model('User', userSchema);

export default userModel;
