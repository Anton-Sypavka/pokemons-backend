const { pokemonsService } = require("../services");
module.exports = {
  getPokemons: async (req, res, next) => {
    try {
      const { page, perPage } = req.query;

      const data = await pokemonsService.getPokemons(page || 1, perPage || 10);

      res.json(data);

    } catch (error) {
      next(error);
    }
  }
}