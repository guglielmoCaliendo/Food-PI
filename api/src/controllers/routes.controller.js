const { Recipe, Diet } = require('../db.js');
const { Op } = require('sequelize');

const getRecipes = async (req, res) => {
  const { name, sort } = req.query;

  try {
    if (!name) {
      const recipes = await Recipe.findAll({ include: Diet });
      return res.send(recipes);
    }
    if (sort) {
      const recipes = await Recipe.findAll({});
    }
    const recipes = await Recipe.findAll({
      where: {
        name: {
          [Op.substring]: name,
        },
        include: Diet,
      },
    });

    if (recipes.length) {
      return res.send(recipes);
    }

    res
      .status(404)
      .send(`Sorry, we can't find any recipe that contains ${name}.`);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getSortedRecipes = async (req, res) => {
  const { diets } = req.query;
  try {
    console.log(diets);
    const recipes = await Recipe.findAll({
      include: [
        {
          model: Diet,
          where: {
            name: diets.split(','),
          },
        },
      ],
    });
    res.send(recipes);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getRecipesById = async (req, res) => {
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

const createRecipe = async (req, res) => {
  const { name, abstract, health_score, img_url, steps, diets } = req.body;
  if (!name || !abstract) {
    return res.status(500).send('Sorry, name and abstract are required.');
  }
  try {
    const newRecipe = await Recipe.create({
      name,
      abstract,
      health_score,
      img_url,
      steps: JSON.stringify(steps),
    });

    await diets.forEach(async (diet) => {
      await newRecipe.setDiets(await Diet.findOne({ where: { name: diet } }));
    });

    res.send(newRecipe);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
};

const getDiets = async (req, res) => {
  const diets = await Diet.findAll();
  res.send(diets);
};

module.exports = {
  getRecipes,
  getSortedRecipes,
  getRecipesById,
  createRecipe,
  getDiets,
};
