const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');
const getCurrent = require('./getCurrent');
const updateUser = require('./updateUser');
const verifyEmail = require('./verifyEmail');
const reSendEmail = require('./reSendEmail');
const updateAvatar = require('./updateAvatar');

module.exports = {
  signup,
  login,
  logout,
  getCurrent,
  updateUser,
  verifyEmail,
  reSendEmail,
  updateAvatar,
};
