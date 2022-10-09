import {
  GET_RECIPES,
  GET_RECIPE_BY_ID,
  CREATE_RECIPE,
  GET_RECIPES_SORT,
  GET_DIETS,
  SET_SEARCH,
  SET_CURRENT_PAGE,
  SET_SORT,
  SET_ORDER,
  REMOVE_SORT,
} from './action-types.js';

export const setOrder = (order) => {
  return {
    type: SET_ORDER,
    payload: order,
  };
};

export const setSort = (diet) => {
  return {
    type: SET_SORT,
    payload: diet,
  };
};

export const removeSort = (diet) => {
  return {
    type: REMOVE_SORT,
    payload: diet,
  };
};

export const setCurrentPage = (page) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: page,
  };
};

export const setSearch = (search) => {
  return {
    type: SET_SEARCH,
    payload: search,
  };
};

export const getRecipes = (name) => {
  if (name) {
    return async (dispatch) => {
      return await fetch(`http://localhost:3001/recipes?name=${name}`)
        .then((response) => response.json())
        .then((data) =>
          dispatch({
            type: GET_RECIPES,
            payload: data,
          })
        );
    };
  }
  return async (dispatch) => {
    return await fetch('http://localhost:3001/recipes')
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: GET_RECIPES,
          payload: data,
        })
      );
  };
};

export const getRecipesSort = (diets) => {
  return async (dispatch) => {
    return await fetch(
      `http://localhost:3001/recipes/sort/?diets=${diets.join()}`
    )
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: GET_RECIPES_SORT,
          payload: data,
        })
      );
  };
};

export const getRecipesById = (id) => {
  return async (dispatch) => {
    return await fetch(`http://localhost:3001/recipes/${id}`)
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: GET_RECIPE_BY_ID,
          payload: data,
        })
      );
  };
};

export const createRecipe = (recipe) => {
  return async (dispatch) => {
    return await fetch('http://localhost:3001/recipes', {
      method: 'POST',
      body: JSON.stringify(recipe),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: CREATE_RECIPE,
          payload: data,
        })
      )
      .catch((error) => console.log(error));
  };
};

export const getDiets = () => {
  return async (dispatch) => {
    return await fetch('http://localhost:3001/diets')
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: GET_DIETS,
          payload: data,
        })
      );
  };
};
