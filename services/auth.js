const crypto = require('crypto');
const { ethers } = require('ethers');
const { authRepository } = require('../repositories');
const ErrorHandler = require("../errors/error-handler");
const { BAD_REQUEST } = require("../configs/response-сodes");
const { NONCE_DB_FIELD, ADDRESS_DB_FIELD, ID_DB_FIELD} = require("../configs/db-fields");
const { jwtUtil } = require("../utils");
const { REFRESH_TOKEN_TYPE } = require("../configs/constants");

module.exports = {
  generateNonce: async (address) => {
    const nonce = crypto.randomBytes(16).toString('hex');

    await authRepository.saveNonce({ address, nonce });

    return nonce;
  },

  validateSignature: async ({ signature, nonce }) => {
    const nonceFromDB = await authRepository.getNonce(NONCE_DB_FIELD, nonce);

    if (!nonceFromDB) {
      throw new ErrorHandler(BAD_REQUEST, 'Nonce expired');
    }

    const signerAddress = ethers.verifyMessage(nonce, signature);

    if (signerAddress.toLowerCase() !== nonceFromDB.address.toLowerCase()) {
      throw new ErrorHandler(BAD_REQUEST, 'Invalid signature');
    }

    let user = await authRepository.findUser(ADDRESS_DB_FIELD, nonceFromDB.address);

    if (!user) {
      user = await authRepository.createUser({ [ADDRESS_DB_FIELD]: nonceFromDB.address})
    }

    const tokenPair = jwtUtil.generateTokenPair(user);

    return {
      user,
      ...tokenPair
    };
  },

  refreshToken: async (token) => {
    const decodedToken = await jwtUtil.verifyToken(token, REFRESH_TOKEN_TYPE);

    const user = await authRepository.findUser(ID_DB_FIELD, decodedToken.user._id);

    if(!user) {
      throw new ErrorHandler(BAD_REQUEST, 'User does not exists!');
    }

    const tokenPair = jwtUtil.generateTokenPair(user);

    return {
      ...tokenPair,
      user
    }
  }
}