import httpStatus from 'http-status';
import User from '../models/User';
import ApiError from '../utils/ApiError';

// Create a new user
const createUser = async (userBody) => {
  // Check if email is already taken
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  // Save the new user to the database
  return User.create(userBody);
};

// Find a user by their ID
const getUserById = async (id) => {
  return User.findById(id);
};

// Find a user by their email
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

// Update a user details by their ID
const updateUserById = async (userId, updateBody) => {
  // Find the user by ID
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  // Check if the new email is already taken
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  // Update the user's details
  Object.assign(user, updateBody);
  await user.save(); // Save the updated details to the database
  return user;
};

// Delete a user by their ID
const deleteUserById = async (userId) => {
  // Find the user by ID
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  // Remove the user from the database
  await user.remove();
  return user;
};

export {
  createUser,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
