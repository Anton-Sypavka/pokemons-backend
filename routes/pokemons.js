const express = require('express');
const { pokemonsController } = require("../controllers");

const router = express.Router();

router.route('/')
  .get(pokemonsController.getPokemons)

module.exports = router;