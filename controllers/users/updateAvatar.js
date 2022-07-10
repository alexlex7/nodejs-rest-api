const fs = require('fs/promises');
const path = require('path');
const { User } = require('../../models');
const Jimp = require('jimp');

const updateAvatar = async (req, res, next) => {
  const { path: tempImagePath, originalname } = req.file;
  const resultImagePath = path.join(
    __dirname,
    '../../',
    'public',
    'avatars',
    `${req.user._id}_${originalname}`
  );
  try {
    const resizeImage = await Jimp.read(tempImagePath);
    await resizeImage.resize(250, 250);
    await resizeImage.write(tempImagePath);

    await fs.rename(tempImagePath, resultImagePath);

    const avatarURL = path.join('avatars', `${req.user._id}_${originalname}`);

    const result = await User.findByIdAndUpdate(
      req.user._id,
      { avatarURL },
      { new: true }
    );

    res.json({
      avatarURL: result.avatarURL,
    });
  } catch (error) {
    fs.unlink(tempImagePath);
    throw error;
  }
};

module.exports = updateAvatar;
