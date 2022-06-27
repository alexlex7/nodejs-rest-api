const express = require('express');
const { ctrlWrapper } = require('../../helpers');
const ctrl = require('../../controllers/contacts');
const { schemas } = require('../../models');
const { validation, isValidId } = require('../../middlewares');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getById));

router.post('/', validation(schemas.addContact), ctrlWrapper(ctrl.add));

router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.remove));

router.put(
  '/:contactId',
  isValidId,
  validation(schemas.addContactSchema),
  ctrlWrapper(ctrl.update)
);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validation(schemas.changeStatusSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
