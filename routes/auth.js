const express = require('express');
const { authMiddleware } = require('../middleware');
const { authController } = require('../controllers');

const router = express.Router();

router.route('/generate-nonce')
  .post(
    authMiddleware.isUserAddressValid,
    authController.generateNonce
  );

router.route('/validate-signature')
  .post(
    authController.validateSignature
  );

router.route('/me')
  .get(
    authMiddleware.isLoggedIn,
    authController.isLoggedIn
  );

router.route('/refresh')
  .post(
    authController.refreshToken
  );

module.exports = router;