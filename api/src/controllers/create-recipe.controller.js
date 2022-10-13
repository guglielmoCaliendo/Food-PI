const { Recipe, Diet } = require('../db.js');

const createRecipe = async (req, res) => {
  const { title, summary, healthScore, image, steps, diets, rating } = req.body;
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

module.exports = createRecipe;
