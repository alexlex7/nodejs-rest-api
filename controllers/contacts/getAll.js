const { Contact } = require('../../models');

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page, limit, favorite = false } = req.query;

  const query = favorite ? { owner, favorite } : { owner };

  const skip = (Number(page) - 1) * Number(limit);

  const contacts = await Contact.find(query, '-createdAt -updatedAt', {
    skip,
    limit: Number(limit),
  }).populate('owner', 'email subscription');

  res.json({ contacts });
};

module.exports = getAll;
