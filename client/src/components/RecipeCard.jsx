import React from 'react';
import styled from 'styled-components';
import { capitalize } from '../helpers/components.helper';
import { useNavigate } from 'react-router-dom';

export default function RecipeCard({ title, image, score, diets, id }) {
  const navigate = useNavigate();

  return (
    <CardContainer onClick={() => navigate(`/app/recipes/${id}`)}>
      <img src={image} alt={title} />
      <Info>
        <Title>{capitalize(title)}</Title>
        <Score>
          <h4>Health Score</h4>
          <p>{score}</p>
        </Score>
        <div>
          {diets?.map((diet) => (
            <Diet key={diet.id}>{capitalize(diet.name)}</Diet>
          ))}
        </div>
      </Info>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  margin: 20px 0;
  display: flex;
  width: 350px;
  height: 390px;
  padding: 15px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 25px;
  background: #fefffb;
  box-shadow: 0px 12px 30px rgb(0 0 0 / 30%);
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    transition: transform 350ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  & img {
    position: relative;
    top: -40px;
    width: 280px;
    height: 186.66px;
    border-radius: 15px;
    box-shadow: 0px 12px 30px rgb(0 0 0 / 15%);
  }
`;

const Info = styled.div`
  position: relative;
  top: -15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }
`;

const Diet = styled.p`
  background: #fefffb;
  border: 2px solid #acacac;
  padding: 0 5px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 12px;
  color: #00503d;
  margin: 3px;
`;

const Title = styled.h1`
  font-family: Poppins;
  font-weight: 600;
  text-align: center;
  font-size: 20px;
  margin: 0;
`;

const Score = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15px;

  & h4 {
    color: #00503d;
    margin: 0;
  }
  & p {
    margin: 0;
  }
`;
