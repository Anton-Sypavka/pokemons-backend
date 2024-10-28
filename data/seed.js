const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { DATABASE } = require('../configs/config');
const { Pokemon } = require('../models');

mongoose.connect(DATABASE);

function getRandomNumber() {
  return Math.floor(Math.random() * (100 - 35 + 1)) + 35;
}

const seedData = async () => {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf-8'));

    const dataForSeed = data.map(item => ({
      name: item.name.english,
      type: item.type,
      hp: item.base?.HP || getRandomNumber(),
      attack: item.base?.Attack || getRandomNumber(),
      defense: item.base?.Defense || getRandomNumber(),
      speed: item.base?.Speed || getRandomNumber(),
      species: item.species,
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


