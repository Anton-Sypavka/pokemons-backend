const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');

const { PORT, DATABASE, URL } = require("./configs/config");
const ErrorHandler = require("./errors/error-handler");

const {
  authRouter,
  pokemonsRouter,
  battleRouter
} = require("./routes");


mongoose.connect(DATABASE)

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());
app.options('*', cors());

app.use('/auth', authRouter);
app.use('/pokemons', pokemonsRouter);
app.use('/battle', battleRouter);
app.get('/ping', (req, res) => res.send('pong'));
app.use(_globalErrorHandler);

server.listen(PORT, () => {
  console.log(`App listen on ${PORT}`);
});

function _globalErrorHandler(err, req, res, next) {
  console.log('Error --->', err);
  const message = err instanceof ErrorHandler ? err.message : 'Something went wrong';

  res
    .status(err.status || 500)
    .json({
      message
    });
}