const express = require('express');
const { battleController } = require("../controllers");
const {authMiddleware} = require("../middleware");

const router = express.Router();

router.route('/start')
  .post(
    authMiddleware.isLoggedIn,
    battleController.start
  );

router.route('/:id')
  .get(
    authMiddleware.isLoggedIn,
    battleController.getBattle
  );

module.exports = router;