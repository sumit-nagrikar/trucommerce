const jwt = require('jsonwebtoken');
const config = require('../config/config');

const isAdmin = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, config.jwt.secret);

    if (decoded.type !== 'admin') {
      return res.status(403).json({ message: 'Access denied, admin only.' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Please authenticate as admin' });
  }
};

module.exports = isAdmin;
