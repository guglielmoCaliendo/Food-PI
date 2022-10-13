const axios = require('axios');

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

module.exports = getRecipesById;
