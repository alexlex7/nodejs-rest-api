const contactCreateSchema = require('../../schemas/contacts');
const { createError } = require('../../helpers');
const { updateContact } = require('../../models/contacts');

const update = async (req, res) => {
  const { error } = contactCreateSchema.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }
  const result = await updateContact(req.params.contactId, req.body);
  if (!result) {
    throw createError(404, 'Not found');
  }
  res.json(result);
};

module.exports = update;
