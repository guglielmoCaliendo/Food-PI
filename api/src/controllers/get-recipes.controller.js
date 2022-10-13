const { Recipe, Diet } = require('../db.js');
const axios = require('axios');

const getRecipes = async (req, res) => {
  try {
    const recipes = await axios('http://localhost:4000/results')
      .then((res) => res.data)
      .catch((err) => err.message);

    const dbRecipes = JSON.parse(
      JSON.stringify(await Recipe.findAll({ include: Diet }))
    );

    const formatedDBRecipes = await dbRecipes.map((recipe) => ({
      ...recipe,
      diets: recipe.diets.map((diet) => diet.name),
    }));

    res.send([...formatedDBRecipes, ...recipes]);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = getRecipes;
