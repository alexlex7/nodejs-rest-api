const { createError } = require('../../helpers');
const { Contact } = require('../../models');

const update = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw createError(404, 'Not found');
  }
  res.json(result);
};

module.exports = update;
