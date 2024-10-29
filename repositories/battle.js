const { Battle } = require('../models');

module.exports = {
  createBattle: (dto) => {
    return Battle.create(dto);
  },

  findBattle: (field, query) => {
    return Battle.findOne({ [field]: query })
      .populate('usersPokemon')
      .populate('computersPokemon');
  }
}