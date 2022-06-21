const contactCreateSchema = require('../../schemas/contacts');
const { addContact } = require('../../models/contacts');
const { createError } = require('../../helpers');

const add = async (req, res) => {
  const { error } = contactCreateSchema.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }
  const result = await addContact(req.body);

  res.status(201).json(result);
};

module.exports = add;
