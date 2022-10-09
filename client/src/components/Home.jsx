import React, { useEffect } from 'react';
import RecipeCard from './RecipeCard';
import SortButtons from './SortButtons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRecipes,
  getDiets,
  setCurrentPage,
  getRecipesSort,
} from '../state/actions/index';
import { customSort } from '../helpers/Home.helper';

export default function Home() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const diets = useSelector((store) => store.diets);
  const search = useSelector((store) => store.search);
  const currentPage = useSelector((store) => store.currentPage);
  const sort = useSelector((store) => store.sort);
  const order = useSelector((store) => store.order);

  console.log(recipes);

  useEffect(() => {
    sort.length ? dispatch(getRecipesSort(sort)) : dispatch(getRecipes());
    dispatch(getDiets());
  }, [dispatch, currentPage, sort]);

  const filteredRecipes = recipes.filter((recipe) => {
    if (search) {
      return recipe.name.includes(search);
    }
    return recipes;
  });

  const nextPage = () => {
    if (filteredRecipes.length > currentPage + 9) {
      dispatch(setCurrentPage(currentPage + 9));
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      dispatch(setCurrentPage(currentPage - 9));
    }
  };

  const paginatedRecipes = () => {
    if (order) {
      return customSort(filteredRecipes, order).slice(
        currentPage,
        currentPage + 9
      );
    }
    return filteredRecipes.slice(currentPage, currentPage + 9);
  };

  const recipesRender = paginatedRecipes().map((recipe) => {
    return (
      <RecipeCard
        key={recipe.name}
        id={recipe.id}
        image={recipe.img_url}
        title={recipe.name}
        diets={recipe.diets}
        score={recipe.health_score}
      />
    );
  });

  return (
    <div>
      <SortButtons diets={diets} />
      <Conatiner>{recipesRender}</Conatiner>
      <NextButton onClick={() => nextPage()}>{`>`}</NextButton>
      <PrevButton onClick={() => prevPage()}>{`<`}</PrevButton>
    </div>
  );
}

const Conatiner = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-evenly;
  align-items: center;
  width: 90vw;
  margin: 35px auto;
`;

const NextButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fefffb;
  border: 1px solid #acacac;
  cursor: pointer;
  width: 47px;
  height: 45px;
  border-radius: 50px;
  font-size: 37px;
  position: fixed;
  top: 50%;
  right: 10px;
  color: #00000080;
  box-shadow: -1px 2px 4px rgb(0 0 0 / 30%);

  &: hover {
    transform: scale(1.05);
    transition: transform 350ms cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

const PrevButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fefffb;
  border: 1px solid #acacac;
  cursor: pointer;
  width: 47px;
  height: 45px;
  border-radius: 50px;
  font-size: 37px;
  position: fixed;
  top: 50%;
  left: 10px;
  color: #00000080;
  box-shadow: 2px 3px 4px rgb(0 0 0 / 30%);

  &: hover {
    transform: scale(1.05);
    transition: transform 350ms cubic-bezier(0.4, 0, 0.2, 1);
  }
`;
