const jwt = require('jsonwebtoken');
const tokenTypes = require('../config/tokens');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');

const auth = () => async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token
    if (!token)
      throw new ApiError(
        httpStatus.status.UNAUTHORIZED,
        'Access token required'
      );

    const decoded = await jwt.verify(token, config.jwt.secret);
    if (decoded.type !== tokenTypes.ACCESS)
      throw new ApiError(httpStatus.status.UNAUTHORIZED, 'Invalid token type');

    req.user = { id: decoded.sub, role: decoded.role }; // Attach user details
    next();
  } catch (error) {
    next(
      new ApiError(httpStatus.status.UNAUTHORIZED, 'Invalid or expired token')
    );
  }
};

module.exports = auth;
