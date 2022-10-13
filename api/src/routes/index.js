const { Router } = require('express');
const getRecipes = require('../controllers/get-recipes.controller');
const getRecipesById = require('../controllers/get-recipe-by-id.controller');
const getdbRecipesById = require('../controllers/get-db-recipe-by-id.controller');
const createRecipe = require('../controllers/create-recipe.controller');
const getDiets = require('../controllers/get-diets.controller');

const router = Router();

router.get('/recipes', getRecipes);

router.get('/recipes/:id', getRecipesById);

router.get('/DBrecipes/:id', getdbRecipesById);

router.post('/recipes', createRecipe);

router.get('/diets', getDiets);

module.exports = router;
