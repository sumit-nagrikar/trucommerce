const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config/config');
const { Token } = require('../models');
const tokenTypes = require('../config/tokens');

// Generate token
const generateToken = (
  userId,
  expires,
  type,
  role = null,
  secret = config.jwt.secret
) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
    role,
  };
  // Only include role if it's an access token & user is admin
  if (type === tokenTypes.ACCESS && role === 'admin') {
    payload.role = role;
  }
  return jwt.sign(payload, secret);
};

// Save token in DB
const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  try {
    const tokenDoc = await Token.create({
      token,
      user: userId,
      expires: expires.toDate(),
      type,
      blacklisted,
    });
    return tokenDoc;
  } catch (error) {
    console.error('Error saving token:', error);
    throw new Error('Error saving token');
  }
};

const generateAuthTokens = async (user) => {
  const userId = user._id || uuidv4(); //if user dont have id, create a new one

  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    'minutes'
  );
  const accessToken = generateToken(
    userId,
    accessTokenExpires,
    tokenTypes.ACCESS,
    user.role === 'admin' ? user.role : null // only add role for admin
  );

  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    'days'
  );
  const refreshToken = generateToken(
    userId,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  await saveToken(
    refreshToken,
    userId,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  return {
    access: { token: accessToken, expires: accessTokenExpires.toDate() },
    refresh: { token: refreshToken, expires: refreshTokenExpires.toDate() },
  };
};

module.exports = {
  generateToken,
  generateAuthTokens,
  saveToken,
};
