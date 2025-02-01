const express = require('express');
const auth = require('../../middlewares/auth'); // Middleware for role-based access
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations');
const userController = require('../../controllers/user.controller');

const router = express.Router();

// Only admin can get all users
router.get(
  '/',
  auth('getUsers'),
  validate(userValidation.getUsers),
  userController.getUsers
);

// Only admin can delete a user
router.delete(
  '/:userId',
  auth('manageUsers'),
  validate(userValidation.deleteUser),
  userController.deleteUser
);

// Admin can update user roles
router.patch(
  '/:userId',
  auth('manageUsers'),
  validate(userValidation.updateUser),
  userController.updateUser
);

module.exports = router;
