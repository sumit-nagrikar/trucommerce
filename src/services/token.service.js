import jwt from 'jsonwebtoken';
import moment from 'moment';
import { config } from '../config/config';
import Token from '../models/token';
import { tokenTypes } from '../config/tokens';

// Generates a new JWT token with user ID and expiration time
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId, // Stores the user ID
    iat: moment().unix(), // Token creation time
    exp: expires.unix(), // Token expiration time
    type, // Token type (ACCESS, REFRESH, etc from env variables)
  };
  return jwt.sign(payload, secret); // use jwt.sign method and return tooken
};

// Saves a token in the database (mainly for refresh tokens)
const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  return await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
};

// Verifies if a token is valid and returns its details
const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret); // Decodes the token
  const tokenDoc = await Token.findOne({
    token,
    type,
    user: payload.sub, // Checks if the token belongs to the user
    blacklisted: false, // Ensures the token is not revoked
  });
  if (!tokenDoc) throw new Error('Token not found'); // Throws error if token is invalid
  return tokenDoc;
};

// Generates access and refresh tokens for a user
const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    'minutes'
  );
  const accessToken = generateToken(
    user.id,
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    'days'
  );
  const refreshToken = generateToken(
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  await saveToken(
    refreshToken,
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  return {
    access: { token: accessToken, expires: accessTokenExpires.toDate() },
    refresh: { token: refreshToken, expires: refreshTokenExpires.toDate() },
  };
};

export { generateToken, saveToken, verifyToken, generateAuthTokens };
