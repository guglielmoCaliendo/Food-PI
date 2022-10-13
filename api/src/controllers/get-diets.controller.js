const axios = require('axios');
const { Diet } = require('../db.js');

const getDiets = async (req, res) => {
  try {
    const diets = await axios('http://localhost:4000/diets').then(
      (res) => res.data
    );

    const dbDiets = await Diet.findAll();

    if (!dbDiets.length)
      diets.map(async (diet, i) => {
        return await Diet.create({
          id: i + 1,
          name: diet,
        });
      });

    res.send(diets);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = getDiets;
