const { createError } = require('../../helpers');
const { User } = require('../../models');

const updateUser = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const user = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  if (!user) {
    throw createError(404);
  }

  res.json({ email: user.email, subscription: user.subscription });
};

module.exports = updateUser;
