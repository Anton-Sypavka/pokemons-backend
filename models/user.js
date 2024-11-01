const { Schema, model } = require('mongoose');
const { USER } = require('../configs/db-tables');

const UserSchema = new Schema({
  address: String,
}, { timestamps: true});

module.exports = model(USER, UserSchema);