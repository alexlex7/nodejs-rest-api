const { createError } = require('../../helpers');
const { Contact } = require('../../models');

const updateStatusContact = async (req, res) => {
  const { favorite } = req.body;
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );

  if (!result) {
    throw createError(404);
  }

  res.json(result);
};

module.exports = updateStatusContact;
