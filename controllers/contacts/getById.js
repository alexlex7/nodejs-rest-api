const { createError } = require('../../helpers');
const { getContactById } = require('../../models/contacts');

const getById = async (req, res) => {
  const contact = await getContactById(req.params.contactId);
  if (!contact) {
    throw createError(404);
  }
  res.json(contact);
};

module.exports = getById;
