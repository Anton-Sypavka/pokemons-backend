const { Schema, model } = require('mongoose');
const {
  BATTLE,
  POKEMON,
  ACTION
} = require('../configs/db-tables');
const mongoose = require("mongoose");

const ActionSchema = new Schema({
  battle: { type: mongoose.Schema.Types.ObjectId, ref: BATTLE },
  pokemon: { type: mongoose.Schema.Types.ObjectId, ref: POKEMON },
  damage: Number,
  opponentHp: Number
}, { timestamps: true });

module.exports = model(ACTION, ActionSchema);