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

const getdbRecipesById = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findOne({
      where: {
        id,
      },
      include: Diet,
    });
    res.send(recipe);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getRecipesById = async (req, res) => {
  const { id } = req.params;
  try {
    const recipes = await axios(`http://localhost:4000/results/${id}`)
      .then((res) => res.data)
      .catch((err) => err.message);
    res.send(recipes);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const createRecipe = async (req, res) => {
  const { title, summary, healthScore, image, steps, diets } = req.body;
  if (!title || !summary) {
    return res.status(500).send('Sorry, name and summary are required.');
  }
  try {
    const newRecipe = await Recipe.create({
      title,
      summary,
      healthScore,
      image,
      steps: JSON.stringify(steps),
    });

    await diets.forEach(async (diet) => {
      await newRecipe.setDiets(await Diet.findOne({ where: { name: diet } }));
    });

    res.send(newRecipe);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getDiets = async (req, res) => {
  try {
    const diets = await await axios('http://localhost:4000/diets').then(
      (res) => res.data
    );

    res.send(diets);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getRecipes,
  getRecipesById,
  getdbRecipesById,
  createRecipe,
  getDiets,
};
