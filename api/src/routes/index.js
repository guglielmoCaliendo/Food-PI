const { Router } = require('express');
const {
  getRecipes,
  getRecipesById,
  getdbRecipesById,
  createRecipe,
  getDiets,
} = require('../controllers/routes.controller');

const router = Router();

router.get('/recipes', getRecipes);

router.get('/recipes/:id', getRecipesById);

router.get('/DBrecipes/:id', getdbRecipesById);

router.post('/recipes', createRecipe);

router.get('/diets', getDiets);

module.exports = router;
