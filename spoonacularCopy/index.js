const express = require('express');
const recipes = require('./recipes.json').results;
const diets = require('./recipes.json').diets;

const app = express();

app.get('/results', (req, res) => {
  res.json(recipes);
});

app.get('/results/:id', (req, res) => {
  const { id } = req.params;

  const recipe = recipes.find((recipe) => recipe.id == id);

  res.json(recipe);
});

app.get('/diets', (req, res) => {
  res.send(diets);
});

app.listen(process.env.PORT, () => {
  console.log('server listening');
});
