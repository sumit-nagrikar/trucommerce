const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {
  authService,
  userService,
  tokenService,
  adminService,
} = require('../services');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res
    .status(httpStatus.status.CREATED)
    .send({ message: 'Registerd successfully', user, tokens });
});

//login based on email and password
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ message: 'Login successful', user, tokens });
});

//admin will login then access protected routes
const admin = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const admin = await adminService.adminLogin(email, password);
  const tokens = await tokenService.generateAuthTokens(admin);
  res.status(200).send({ message: 'Admin login successful', admin, tokens });
});

//Delete refresh token hence automatic logout happens
const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.status.OK).send({ message: 'Logout successful' });
});

//Delete the old token and generate a new one
const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  admin,
};
