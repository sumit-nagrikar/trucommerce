const express = require('express');
const authRoute = require('./auth.routes');
// const userRoute = require('./user.routes');

const router = express.Router();

console.log('authRoute:', typeof authRoute);
// console.log('userRoute:', typeof userRoute);

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  //   {
  //     path: '/users',
  //     route: userRoute,
  //   },
];

defaultRoutes.forEach((route) => {
  console.log(`Registering route: ${route.path} ->`, typeof route.route);
  router.use(route.path, route.route);
});

module.exports = router;
