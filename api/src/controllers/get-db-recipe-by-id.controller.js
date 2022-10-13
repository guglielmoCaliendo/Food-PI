const { Recipe, Diet } = require('../db.js');

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

module.exports = getdbRecipesById;
