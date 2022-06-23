const express = require('express');
const { ctrlWrapper } = require('../../helpers');
const ctrl = require('../../controllers/contacts');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', ctrlWrapper(ctrl.add));

router.delete('/:contactId', ctrlWrapper(ctrl.remove));

router.put('/:contactId', ctrlWrapper(ctrl.update));

module.exports = router;
