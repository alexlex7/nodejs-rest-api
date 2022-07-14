const { createError } = require('../../helpers');
const { User } = require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { SECRET_KEY } = process.env;
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !bcrypt.compare(password, user.password)) {
    throw createError(401, 'Email or password is wrong');
  }

  if (!user.verify) {
    throw createError(401, 'Please verify your email');
  }

  const token = jwt.sign({ id: user._id }, SECRET_KEY, {
    expiresIn: '1h',
  });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
