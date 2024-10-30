const { Action} = require('../models');

module.exports = {
  createAction: async (dto) => {
    const action = await Action.create(dto);
    return action.populate('pokemon');
  },

  deleteBattleActions: (battle) => {
    return Action.deleteMany({ battle });
  }
}