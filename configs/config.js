require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5001,
  URL: process.env.API_URL || 'http://localhost:5001',
  DATABASE: process.env.DB_CONNECTION_URL || 'mongodb://localhost:27017/PokemonsDB'
};