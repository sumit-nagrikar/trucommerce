const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {
  authService,
  userService,
  tokenService,
  adminService,
} = require('../services');

//user service going to save user data with role for later RBAC
const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body); //create user object
  const tokens = await tokenService.generateAuthTokens(user); // create token object
  res
    .status(httpStatus.status.CREATED)
    .send({ message: 'Registerd successfully', user, tokens }); //send both user and token in another object
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ message: 'Login successful', user, tokens });
});

const admin = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const admin = await adminService.adminLogin(email, password);
  const tokens = await tokenService.generateAuthTokens(admin);
  res.status(200).send({ message: 'Admin login successful', admin, tokens });
});
const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.status.OK).send({ message: 'Logout successful' });
});

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
