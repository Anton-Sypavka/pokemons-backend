const { Schema, model } = require('mongoose');
const { POKEMON } = require('../configs/db-tables');

const PokemonSchema = new Schema({
  name: String,
  type: String,
  hp: Number,
  attack: Number,
  defense: Number,
  speed: Number,
  species: String,
  description: String,
  power: Number,
  level: Number,
  image: {
    sprite: { type: String },
    thumbnail: { type: String },
    hires: { type: String }
  }
});

module.exports = model(POKEMON, PokemonSchema);