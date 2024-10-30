class GameFinished {
  message = 'The battle is over';

  constructor(pokemon, action) {
    this.winnerId = pokemon._id;
    this.winnerName = pokemon.name;
    this.action = action;
  }
}

module.exports = GameFinished;