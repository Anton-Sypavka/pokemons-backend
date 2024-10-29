const { Pokemon } = require("../models");

module.exports = {
  getPokemons: (page, perPage) => {
    return Pokemon.find()
      .skip((page - 1) * perPage)
      .limit(perPage);
  },

  getPokemon: (field, query) => {
    return Pokemon.findOne({ [field]: query });
  },

  getTotalCount: () => {
    return Pokemon.countDocuments();
  },

  getOpponentPokemon: async (type) => {
    const opponentPokemon = await Pokemon.aggregate(
      [
        { $match: { type }},
        { $sample: { size: 1 } }
      ]
    );

    return opponentPokemon.length > 0 ? opponentPokemon[0] : null;
  }
}