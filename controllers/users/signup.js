const { createError, sendMail } = require('../../helpers');
const { User } = require('../../models');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const gravatar = require('gravatar');

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = uuidv4();
  const avatarURL = gravatar.url(email);

  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: 'Підтвердження email',
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Натисніть щоб підтвердити реєстрацію</a>`,
  };

  await sendMail(mail);

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
      avatarURL: result.avatarURL,
    },
  });
};

module.exports = signup;
