const express = require('express');
const authRoute = require('./auth.routes');
const userRoute = require('./user.routes');
const productRoute = require('./product.routes');
const cartRoute = require('./cart.routes');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/products',
    route: productRoute,
  },
  {
    path: '/cart',
    route: cartRoute,
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
