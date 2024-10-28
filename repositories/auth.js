const { Nonce, User } = require('../models');
module.exports = {
  saveNonce: ({ address, nonce }) => {
    return Nonce.findOneAndUpdate(
      { address },
      { nonce },
      {
        upsert: true,
        new: true
      }
    );
  },

  getNonce: (field, query) => {
    return Nonce.findOne({ [field]: query });
  },

  createUser: (dto) => {
    return User.create(dto);
  },

  findUser: (field, query) => {
    return User.findOne({ [field]: query });
  }
}