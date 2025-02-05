const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');

const router = express.Router();

router.post(
  '/register',
  validate(authValidation.register), //issue
  authController.register
);
router.post('/login', validate(authValidation.login), authController.login);
router.post(
  '/admin/login',
  validate(authValidation.admin),
  authController.admin
);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post(
  '/refresh-tokens',
  validate(authValidation.refreshTokens),
  authController.refreshTokens
);

module.exports = router;
