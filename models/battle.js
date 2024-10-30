const { Schema, model } = require('mongoose');
const {
  BATTLE,
  POKEMON,
  USER,
  ACTION
} = require('../configs/db-tables');
const mongoose = require("mongoose");

const BattleSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: USER },
  usersPokemon: { type: mongoose.Schema.Types.ObjectId, ref: POKEMON },
  computersPokemon: { type: mongoose.Schema.Types.ObjectId, ref: POKEMON },
  isFinished: { type: Boolean, default: false},
  isTurnInProgress: { type: Boolean, default: false }
}, { timestamps: true, toJSON: { virtuals: true } });

BattleSchema.virtual('actions', {
  ref: ACTION,
  localField: '_id',
  foreignField: 'battle'
});

module.exports = model(BATTLE, BattleSchema);