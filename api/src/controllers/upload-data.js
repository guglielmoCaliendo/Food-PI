const { Recipe, Diet } = require('../db.js');
const recipes = require('./data/recipes.json').results;
const diets = require('./data/diets.json').diets;

async function uploadData() {
  diets.map(async (diet, i) => {
    return await Diet.create({
      id: i + 1,
      name: diet,
    });
  });

  recipes.map(async (data) => {
    const recipe = await Recipe.create({
      name: data.title.toLowerCase(),
      abstract: data.summary,
      health_score: data.healthScore,
      img_url: data.image,
      steps: data.analyzedInstructions[0]
        ? JSON.stringify(
            data.analyzedInstructions[0].steps.map((step) => ({
              number: step.number,
              step: step.step,
            }))
          )
        : '',
    });

    data.diets.forEach(async (diet) => {
      await recipe.setDiets(await Diet.findOne({ where: { name: diet } }));
    });
  });
}

module.exports = uploadData;
