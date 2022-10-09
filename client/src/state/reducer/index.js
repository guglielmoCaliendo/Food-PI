import {
  GET_RECIPES,
  GET_RECIPES_SORT,
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
    case GET_RECIPES_SORT:
      return {
        ...state,
        recipes: action.payload,
      };
    case GET_RECIPE_BY_ID:
      const formatedSteps = {
        ...action.payload,
        abstract: action.payload.abstract.replaceAll(
          '<a',
          `<a target='_blank' rel='noreferrer'`
        ),
        steps: action.payload.steps ? JSON.parse(action.payload.steps) : '',
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
