const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken'); // ✅ Ensure you have JWT
const moment = require('moment');
const config = require('../config/config');
const { Token } = require('../models');
const tokenTypes = require('../config/tokens');

// Generate token
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
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
  // If the user object don't have a valid id, create a new id
  const userId = user.id || uuidv4();

  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    'minutes'
  );
  const accessToken = generateToken(
    userId,
    accessTokenExpires,
    tokenTypes.ACCESS
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

  // If user.id exists save to db
  if (user.id) {
    await saveToken(
      refreshToken,
      user.id,
      refreshTokenExpires,
      tokenTypes.REFRESH
    );
  } else {
    const savedtoken = await saveToken(
      refreshToken,
      userId,
      refreshTokenExpires,
      tokenTypes.REFRESH
    );
  }

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
