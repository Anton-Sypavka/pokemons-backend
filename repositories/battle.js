const { Battle } = require('../models');

module.exports = {
  createBattle: (dto) => {
    return Battle.create(dto);
  },

  findBattle: (field, query) => {
    return Battle.findOne({ [field]: query })
      .populate('user')
      .populate('usersPokemon')
      .populate({
        path: 'actions',
        options: { sort: { createdAt: -1 } }
      })
      .populate('computersPokemon');
  },

  updateBattle: (battleId, dto) => {
    return Battle.findByIdAndUpdate(battleId, dto);
  }
}