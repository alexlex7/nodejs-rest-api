const { removeContact } = require('../../models/contacts');
const { createError } = require('../../helpers');

const remove = async (req, res) => {
  const result = await removeContact(req.params.contactId);
  if (!result) {
    throw createError(404, 'Not found');
  }
  res.json({ message: 'contact deleted' });
};

module.exports = remove;
