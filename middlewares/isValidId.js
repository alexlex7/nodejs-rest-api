const { isValidObjectId } = require('mongoose');
const { createError } = require('../helpers');

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const result = isValidObjectId(contactId);
  if (!result) {
    next(createError(400, 'ID is not correct.'));
  }
  next();
};

module.exports = isValidId;
