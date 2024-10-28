const { ethers } = require('ethers');
const ErrorHandler = require('../errors/error-handler');
const { BAD_REQUEST } = require('../configs/response-сodes');
const { REQUEST_HEADERS_AUTHORIZATION } = require("../configs/constants");
const { jwtUtil } = require("../utils");

module.exports = {
  isUserAddressValid: async (req, res, next) => {
    try {
      if(!ethers.isAddress(req.body.address)) {
        throw new ErrorHandler(BAD_REQUEST, 'Invalid address')
      }

      next();
    } catch (error) {
      next(error);
    }
  },

  isLoggedIn: async (req, res, next) => {
    try {
      const token = req.get(REQUEST_HEADERS_AUTHORIZATION) || req.body.token;

      const { user, user: { id } } = await jwtUtil.verifyToken(token);

      req.user_id = id;
      req.user = user;

      next();
    } catch (e) {
      next(e);
    }
  }
}