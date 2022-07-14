const { sendMail } = require('../../helpers');
const { User } = require('../../models');

const reSendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user.verify) {
    res.status(400).json({ message: 'Verification has already been passed' });
  }

  const mail = {
    to: email,
    subject: 'Підтвердження email',
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Натисніть щоб підтвердити реєстрацію</a>`,
  };

  await sendMail(mail);
  res.json({ message: 'Verification email sent' });
};

module.exports = reSendEmail;
