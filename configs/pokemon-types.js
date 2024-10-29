const FIRE = 'Fire';
const POISON = 'Poison';
const NORMAL = 'Normal';
const GRAS = 'Grass';
const BUG = 'Bug';
const ELECTRIC = 'Electric';
const GROUND = 'Ground';
const FIGHTING = 'Fighting';
const ICE = 'Ice';
const STEEL = 'Steel';
const GHOST = 'Ghost';
const DRAGON = 'Dragon';
const WATER = 'Water';
const FAIRY = 'Fairy';
const PSYCHIC = 'Psychic';
const FLYING = 'Flying';
const ROCK = 'Rock';

module.exports = {
  POKEMON_MATCH_TYPES: {
    [FIRE]: WATER,
    [POISON]: FAIRY,
    [NORMAL]: PSYCHIC,
    [GRAS]: FLYING,
    [BUG]: POISON,
    [ELECTRIC]: WATER,
    [GROUND]: FLYING,
    [FIGHTING]: NORMAL,
    [ICE]: FIRE,
    [STEEL]: ROCK,
    [GHOST]: NORMAL,
    [DRAGON]: WATER
  }
}