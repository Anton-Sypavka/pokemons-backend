const {battleService} = require("../services");
module.exports = {
  start: async (req, res, next) => {
    try {
      const { pokemonId } = req.body;

      const data = await battleService.start(pokemonId);

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
  }
}