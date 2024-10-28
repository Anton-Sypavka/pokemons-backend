const { Schema, model } = require('mongoose');
const { NONCE } = require('../configs/db-tables');

const NonceSchema = new Schema({
  address: String,
  nonce: String,
  createdAt: { type: Date, expires: '5m', default: Date.now }
});

module.exports = model(NONCE, NonceSchema);