import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import SortButtons from './SortButtons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, getDiets, setCurrentPage } from '../state/actions/index';
import { customSort } from '../helpers/Home.helper';

export default function Home() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const diets = useSelector((store) => store.diets);
  const search = useSelector((store) => store.search);
  const currentPage = useSelector((store) => store.currentPage);
  const sort = useSelector((store) => store.sort);
  const order = useSelector((store) => store.order);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getRecipes());
    dispatch(getDiets());
    setLoading(false);
  }, [dispatch]);

  const dietSorter = (arr, target) =>
    target.every((value) => arr.includes(value));

  const filteredRecipes = customSort(recipes, order).filter((recipe) => {
    if (search && sort) {
      return (
        recipe.title.toLowerCase().includes(search) &&
        dietSorter(recipe.diets, sort)
      );
    }

    if (sort) {
      return dietSorter(recipe.diets, sort);
    }

    if (search) {
      return recipe.title.toLowerCase().includes(search);
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
    return filteredRecipes.slice(currentPage, currentPage + 9);
  };

  const recipesRender = paginatedRecipes().map((recipe) => {
    return (
      <RecipeCard
        key={recipe.id}
        id={recipe.id}
        image={recipe.image}
        title={recipe.title}
        diets={recipe.diets}
        score={recipe.healthScore}
      />
    );
  });

  return (
    <div>
      {loading ? (
        <LoadingOverlay>
          <Loading>Loading</Loading>
        </LoadingOverlay>
      ) : (
        <div>
          <SortButtons diets={diets} />
          <Conatiner>{recipesRender}</Conatiner>
          <NextButton onClick={() => nextPage()}>{`>`}</NextButton>
          <PrevButton onClick={() => prevPage()}>{`<`}</PrevButton>
        </div>
      )}
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

const LoadingOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loading = styled.div`
  display: flex;
  width: 450px;
  max-height: 400px;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  background: #fefffb;
  box-shadow: 15px 15px 20px rgba(0, 0, 0, 0.15);

  @media (max-width: 820px) {
    width: 350px;
  }
`;
