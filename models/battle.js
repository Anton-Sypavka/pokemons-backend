const { Schema, model } = require('mongoose');
const { BATTLE, POKEMON } = require('../configs/db-tables');
const mongoose = require("mongoose");

const BattleSchema = new Schema({
  usersPokemon: { type: mongoose.Schema.Types.ObjectId, ref: POKEMON },
  computersPokemon: { type: mongoose.Schema.Types.ObjectId, ref: POKEMON },
});

module.exports = model(BATTLE, BattleSchema);