const { createError } = require('../../helpers');
const { Contact } = require('../../models');

const remove = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw createError(404, 'Not found');
  }
  res.json({ message: 'contact deleted' });
};

module.exports = remove;
