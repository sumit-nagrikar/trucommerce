const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');

const authAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // get token from request header authorization array
  if (!token) {
    return next(
      new ApiError(httpStatus.status.UNAUTHORIZED, 'Token Not Found')
    );
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret);

    // Check if role exists and it's admin
    if (decoded.role !== 'admin') {
      return next(new ApiError(httpStatus.status.FORBIDDEN, 'Access denied'));
    }

    req.user = decoded;
    next();
  } catch (error) {
    return next(new ApiError(httpStatus.status.UNAUTHORIZED, 'Invalid token'));
  }
};

module.exports = authAdmin;
