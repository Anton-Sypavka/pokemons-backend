const { pokemonsRepository, battleRepository, actionRepository} = require("../repositories");
const { ID_DB_FIELD } = require("../configs/db-fields");
const { POKEMON_MATCH_TYPES } = require("../configs/pokemon-types");
const { getRandomNumber } = require("../utils/random-number");
const { BAD_REQUEST } = require("../configs/response-сodes");
const { GameFinished } = require("../utils");
const ErrorHandler = require("../errors/error-handler");

const USERS_POKEMON = 'usersPokemon';
const COMPUTERS_POKEMON = 'computersPokemon';

function getOpponent(pokemonType) {
  const possibleTypes = Object.entries(POKEMON_MATCH_TYPES)
    .filter(item => item.includes(pokemonType))
    .flatMap(item => item)
    .filter(item => item !== pokemonType);

  return possibleTypes[getRandomNumber(0, possibleTypes.length - 1)];
}

function defineTurn(battle, pokemonId) {
  switch (true) {
    case battle.usersPokemon._id.toString() === pokemonId:
      return { currentTurn: USERS_POKEMON, opponent: COMPUTERS_POKEMON };
    case battle.computersPokemon._id.toString() === pokemonId:
      return { currentTurn: COMPUTERS_POKEMON, opponent: USERS_POKEMON };
    default:
      return null;
  }
}

function getDamage(pokemon) {
  const randomFactor = getRandomNumber(0, 5);

  const damage = (((2 * pokemon.level / 5 + 2) * pokemon.power * (pokemon.attack / pokemon.defense)) / 50 + 2) * randomFactor;

  return Math.floor(damage);
}

module.exports = {
  start: async (usersPokemonId, userId) => {
    const usersPokemon = await pokemonsRepository.getPokemon(ID_DB_FIELD, usersPokemonId);

    if (!usersPokemon) {
      throw new ErrorHandler(BAD_REQUEST, `Pokemon doesn't exist`);
    }

    const opponentType = getOpponent(usersPokemon.type);

    const opponentPokemon = await pokemonsRepository.getOpponentPokemon(opponentType);

    const battle = await battleRepository.createBattle({
      user: userId,
      usersPokemon: usersPokemon._id,
      computersPokemon: opponentPokemon._id
    });

    return battleRepository
      .findBattle(ID_DB_FIELD, battle._id);
  },

  getBattle: (id) => {
    return battleRepository
      .findBattle(ID_DB_FIELD, id);
  },

  attack: async (battleId, pokemonId) => {
    const battle = await battleRepository.findBattle(ID_DB_FIELD, battleId);

    if (battle.isFinished) {
      throw new ErrorHandler(BAD_REQUEST, `The Battle is over`);
    }

    const { currentTurn, opponent } = defineTurn(battle, pokemonId);

    if (currentTurn === USERS_POKEMON && battle.isTurnInProgress) {
      throw new ErrorHandler(BAD_REQUEST, `Turn is already in progress`);
    }

    const damage = getDamage(battle[currentTurn]);

    const actions = battle.actions.filter(action => action.pokemon._id.toString() === pokemonId);

    const opponentHp = !actions.length
      ? battle[opponent].hp - damage
      : actions[0].opponentHp - damage;

    if (opponentHp <= 0) {
      await battleRepository.updateBattle(battleId, { isFinished: true });

      const action = await actionRepository.createAction({
        battle: battleId,
        pokemon: pokemonId,
        damage,
        opponentHp: 0
      });

      return new GameFinished(battle[currentTurn], action.toJSON());
    }

    await battleRepository.updateBattle(battleId, { isTurnInProgress: currentTurn === USERS_POKEMON });

    return actionRepository.createAction({
      battle: battleId,
      pokemon: pokemonId,
      damage,
      opponentHp
    });
  },

  quit: async (battleId) => {
    const battle = await battleRepository.findBattle(ID_DB_FIELD, battleId);

    if (!battle) {
      throw new ErrorHandler(BAD_REQUEST, 'Battle does not exist');
    }

    if (!battle.isFinished) {
      await actionRepository.deleteBattleActions(battleId);

      return { message: 'Battle actions deleted successfully' };
    }

    return { message: 'Battle is already finished' };
  }
}