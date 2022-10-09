const { Router } = require('express');
const {
  getRecipes,
  getSortedRecipes,
  getRecipesById,
  createRecipe,
  getDiets,
} = require('../controllers/routes.controller');

const router = Router();

router.get('/recipes', getRecipes);

router.get('/recipes/sort/', getSortedRecipes);

router.get('/recipes/:id', getRecipesById);

router.post('/recipes', createRecipe);

router.get('/diets', getDiets);

module.exports = router;
