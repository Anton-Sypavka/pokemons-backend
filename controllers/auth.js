const { authService } = require('../services');
const { authRepository } = require("../repositories");
const { ID_DB_FIELD } = require("../configs/db-fields");
module.exports = {
  generateNonce: async (req, res, next) => {
    try {
      const nonce = await authService.generateNonce(req.body.address);

      res.json({ nonce });

    } catch (error) {
      next(error);
    }
  },

  validateSignature: async (req, res, next) => {
    try {
      const user = await authService.validateSignature(req.body);

      res.json(user);

    } catch (error) {
      next(error);
    }
  },

  isLoggedIn: async (req, res, next) => {
    try {
      const user = await authRepository.findUser(ID_DB_FIELD, req.user_id);

      res.json(user);

    } catch (error) {
      next(error);
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const { token } = req.body;

      const user = await authService.refreshToken(token);

      res.json(user);

    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}