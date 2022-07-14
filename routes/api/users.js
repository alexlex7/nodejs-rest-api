const express = require('express');
const ctrl = require('../../controllers/users');
const { ctrlWrapper } = require('../../helpers');
const { validation, authenticate, upload } = require('../../middlewares');
const { userSchemas } = require('../../models');

const router = express.Router();

router.post(
  '/signup',
  validation(userSchemas.signup),
  ctrlWrapper(ctrl.signup)
);

router.post('/login', validation(userSchemas.signup), ctrlWrapper(ctrl.login));

router.get('/logout', authenticate, ctrlWrapper(ctrl.logout));
router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent));
router.patch(
  '/',
  authenticate,
  validation(userSchemas.subscription),
  ctrlWrapper(ctrl.updateUser)
);
router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyEmail));
router.post(
  '/verify',
  validation(userSchemas.verification),
  ctrlWrapper(ctrl.reSendEmail)
);

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
