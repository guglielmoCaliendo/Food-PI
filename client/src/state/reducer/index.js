import {
  GET_RECIPES,
  GET_RECIPE_BY_ID,
  CREATE_RECIPE,
  GET_DIETS,
  SET_SEARCH,
  SET_CURRENT_PAGE,
  SET_SORT,
  REMOVE_SORT,
  SET_ORDER,
} from '../actions/action-types.js';

const initialState = {
  recipes: [],
  recipe: {},
  diets: [],
  search: '',
  currentPage: 0,
  sort: [],
  order: 'A-Z',
  error: '',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case SET_SORT:
      return {
        ...state,
        sort: [...state.sort, action.payload],
      };
    case REMOVE_SORT:
      return {
        ...state,
        sort: state.sort.filter((diet) => diet !== action.payload),
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case SET_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };
    case GET_RECIPE_BY_ID:
      let instructions;
      const diets = () => {
        let formatedDiets;

        if (action.payload.diets[0]) {
          if (action.payload.diets[0].id) {
            return (formatedDiets = action.payload.diets.map(
              (diet) => diet.name
            ));
          } else {
            // eslint-disable-next-line no-unused-vars
            return (formatedDiets = action.payload.diets);
          }
        }
      };
      if (action.payload.steps) {
        instructions = JSON.parse(action.payload.steps);
      }
      if (action.payload.analyzedInstructions) {
        if (action.payload.analyzedInstructions[0]) {
          instructions = action.payload.analyzedInstructions[0].steps;
        }
      }

      const formatedSteps = {
        ...action.payload,
        summary: action.payload.summary.replaceAll(
          '<a',
          `<a target='_blank' rel='noreferrer'`
        ),
        instructions: instructions ? instructions : '',
        diets: diets(),
      };
      return {
        ...state,
        recipe: formatedSteps,
      };
    case CREATE_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
