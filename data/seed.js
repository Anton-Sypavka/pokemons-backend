const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { DATABASE } = require('../configs/config');
const { Pokemon } = require('../models');
const { getRandomNumber } = require("../utils/random-number");

mongoose.connect(DATABASE);

const seedData = async () => {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf-8'));

    const dataForSeed = data.map(item => ({
      name: item.name.english,
      type: item.type[0],
      hp: item.base?.HP || getRandomNumber(45, 100),
      attack: item.base?.Attack || getRandomNumber(45, 100),
      defense: item.base?.Defense || getRandomNumber(45, 100),
      speed: item.base?.Speed || getRandomNumber(45, 100),
      species: item.species,
      level: 1,
      power: getRandomNumber(1, 10),
      description: item.description,
      image: item.image
    }));


    await Pokemon.deleteMany();

    await Pokemon.insertMany(dataForSeed);

    console.log('Data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();


