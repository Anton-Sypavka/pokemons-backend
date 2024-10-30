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

router.route('/attack')
  .post(
    authMiddleware.isLoggedIn,
    battleController.attack
  );

router.route('/quit/:id')
  .get(
    authMiddleware.isLoggedIn,
    battleController.quit
  );

module.exports = router;