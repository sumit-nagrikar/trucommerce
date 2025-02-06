const config = require('../config/config');
const { v4: uuidv4 } = require('uuid'); // UUID to generate a unique ID

const adminLogin = async (email, password) => {
  const { email: adminEmail, password: adminPassword } = config.admin;

  // Check if the email and password match the configured admin email and password
  if (email !== adminEmail || password !== adminPassword) {
    throw new ApiError(
      httpStatus.status.UNAUTHORIZED,
      'Incorrect email or password'
    );
  }

  // Generated a fake ID for the admin user
  const admin = {
    _id: uuidv4(),
    email: adminEmail,
    role: 'admin',
    name: 'Admin User', // custom name
  };

  return admin;
};

module.exports = {
  adminLogin,
};
