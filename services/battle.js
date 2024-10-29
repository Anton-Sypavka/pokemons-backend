const { pokemonsRepository, battleRepository} = require("../repositories");
const { ID_DB_FIELD } = require("../configs/db-fields");
const { POKEMON_MATCH_TYPES } = require("../configs/pokemon-types");
const { getRandomNumber } = require("../utils/random-number");
const { BAD_REQUEST } = require("../configs/response-сodes");
const ErrorHandler = require("../errors/error-handler");

function getOpponent(pokemonType) {
  const possibleTypes = Object.entries(POKEMON_MATCH_TYPES)
    .filter(item => item.includes(pokemonType))
    .flatMap(item => item)
    .filter(item => item !== pokemonType);

  return possibleTypes[getRandomNumber(0, possibleTypes.length - 1)];
}

module.exports = {
  start: async (usersPokemonId) => {
    const usersPokemon = await pokemonsRepository.getPokemon(ID_DB_FIELD, usersPokemonId);

    if (!usersPokemon) {
      throw new ErrorHandler(BAD_REQUEST, `Pokemon doesn't exist`);
    }

    const opponentType = getOpponent(usersPokemon.type);

    const opponentPokemon = await pokemonsRepository.getOpponentPokemon(opponentType);

    const battle = await battleRepository.createBattle({
      usersPokemon: usersPokemon._id,
      computersPokemon: opponentPokemon._id
    });

    return battleRepository
      .findBattle(ID_DB_FIELD, battle._id);
  },

  getBattle: (id) => {
    return battleRepository
      .findBattle(ID_DB_FIELD, id);
  }
}