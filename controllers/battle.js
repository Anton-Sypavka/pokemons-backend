const { battleService } = require("../services");
const { GameFinished } = require("../utils");

module.exports = {
  start: async (req, res, next) => {
    try {
      const { pokemonId } = req.body;
      const { user_id } = req;

      const data = await battleService.start(pokemonId, user_id);

      res.json(data);

    } catch (error) {
      next(error);
    }
  },

  getBattle: async (req, res, next) => {
    try {
      const battle = await battleService.getBattle(req.params.id);

      return res.json(battle);

    } catch (error) {
      next(error);
    }
  },

  attack: async (req, res, next) => {
    try {
      const { battleId, pokemonId } = req.body;

      const action = await battleService.attack(battleId, pokemonId);

      if (action instanceof GameFinished) {
        return res.status(203).json(action);
      }

      return res.json(action);

    } catch (error) {
      next(error);
    }
  },

  quit: async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await battleService.quit(id);

      return res.status(203).json(result);

    } catch (error) {
      next(error);
    }
  }
}