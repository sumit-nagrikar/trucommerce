const passport = require('passport-jwt');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { roleRights } = require('../config/roles');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.status.UNAUTHORIZED, 'Invalid or expired token'));
  }

  req.user = user;

  if (requiredRights.length) {
    const userRights = roleRights.get(user.role) || [];
    const isAdmin = user.role === 'admin';

    const hasRequiredRights = isAdmin || requiredRights.every((right) => userRights.includes(right));

    if (!hasRequiredRights && req.params.userId !== user.id) {
      return reject(new ApiError(httpStatus.status.FORBIDDEN, 'Forbidden'));
    }
  }

  resolve();
};

const auth = (...requiredRights) => (req, res, next) => {
  new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = auth;
