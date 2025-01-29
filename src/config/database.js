import mongoose from 'mongoose';
import { config } from './config.js';

// Connect to MongoDB
const connectDB = async () => {
  const conn = await mongoose.connect(config.mongoose.url);
  console.log('🚀 MongoDB Connected!');
  //Temprory logs
  console.log(`🔹 Host: ${conn.connection.host}`);
  console.log(`🔹 Port: ${conn.connection.port}`);
  console.log(`🔹 Database Name: ${conn.connection.name}`);
  console.log(`🔹 Connection State: ${conn.connection.readyState}`); // 1 = Connected
};

export default connectDB;
