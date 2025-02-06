const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const tokenTypes = require('../config/tokens');
const logger = require('../config/logger');
const bcrypt = require('bcryptjs');

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  const isPasswordMatch = password === user.password;

  // console.log('Is password match', isPasswordMatch);
  if (!user || !isPasswordMatch) {
    throw new ApiError(
      httpStatus.status.UNAUTHORIZED,
      'Incorrect email or password'
    );
  }
  return user;
};

const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({
    token: refreshToken,
    type: tokenTypes.REFRESH,
    blacklisted: false,
  });

  if (!refreshTokenDoc)
    throw new ApiError(
      httpStatus.status.NOT_FOUND,
      'refreshTokenDoc Not found'
    );
  await refreshTokenDoc.deleteOne();
};

const refreshAuth = async (refreshToken) => {
  try {
    // Step 1: Verify Token
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      tokenTypes.REFRESH
    );

    if (!refreshTokenDoc) {
      // console.log('Refresh token not found or blacklisted.');
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid refresh token');
    }

    // Step 2: Get User
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      logger.debug('User not found for refresh token.');
      throw new ApiError(httpStatus.UNAUTHORIZED, 'User does not exist');
    }

    // Step 3: Remove Old Refresh Token (Before Creating a New One)
    await refreshTokenDoc.deleteOne();

    // Step 4: Generate & Return New Tokens
    const newTokens = await tokenService.generateAuthTokens(user);

    return newTokens;
  } catch (error) {
    logger.error('Error in refreshAuth:', error);
    throw new ApiError(httpStatus.status.UNAUTHORIZED, 'Please authenticate');
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
};
