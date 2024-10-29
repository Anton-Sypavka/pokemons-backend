const { pokemonsRepository } = require("../repositories");

module.exports = {
  getPokemons: async (page, perPage) => {
    const total = await pokemonsRepository.getTotalCount();

    const pokemons = await pokemonsRepository.getPokemons(page, perPage);

    return {
      total,
      pokemons
    };
  }
}