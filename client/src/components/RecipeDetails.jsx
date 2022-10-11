import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { capitalize } from '../helpers/components.helper';
import { getRecipesById } from '../state/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function RecipeDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector((store) => store.recipe);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getRecipesById(id));
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [dispatch, id]);

  if (Object.keys(recipe).length) {
    return (
      <Overlay>
        {loading ? (
          <LoadingOverlay>
            <Loading>Loading</Loading>
          </LoadingOverlay>
        ) : (
          <Container>
            <StyledAside>
              <img src={recipe.image} alt={recipe.title} />
              <DietsContainer>
                {recipe.diets?.map((diet) => {
                  return <Diet key={diet}>{capitalize(diet)}</Diet>;
                })}
              </DietsContainer>
            </StyledAside>
            <StyledSection>
              <TitleContainer>
                <Title>{recipe.title}</Title>
                <Score>
                  <h4>Health Score</h4>
                  <p>{recipe.healthScore}</p>
                </Score>
              </TitleContainer>
              <h3>Summary</h3>
              <Para dangerouslySetInnerHTML={{ __html: recipe.summary }}></Para>
              {recipe.instructions && <h3>Steps</h3>}
              <div>
                {recipe.instructions &&
                  recipe.instructions.map((step) => {
                    return (
                      <div key={step.number}>
                        <Para>
                          {step.number}. {step.step}
                        </Para>
                      </div>
                    );
                  })}
              </div>
            </StyledSection>
          </Container>
        )}
      </Overlay>
    );
  }
  return (
    <LoadingOverlay>
      <Loading>Sorry, we cant find any diet with the id {id}</Loading>
    </LoadingOverlay>
  );
}

const Overlay = styled.div`
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  min-height: 50vh;
  width: 75vw;
  padding: 20px;
  justify-content: center;
  align-items: flex-start;
  border-radius: 25px;
  background: #fefffb;
  box-shadow: 15px 15px 20px rgba(0, 0, 0, 0.15);
  gap: 20px;
  margin: 20px;

  @media (max-width: 820px) {
    flex-direction: column;
  }

  @media (max-width: 415px) {
    width: 85vw;
    padding: 10px;
  }
`;

const Title = styled.h2`
  font-size: 30px;
  color: #00503d;
  max-width: 70%;
  margin: 0;
  @media (max-width: 415px) {
    max-width: none;
    text-align: center;
    margin-bottom: 10px;
  }
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

const Para = styled.p`
  font-size: 12px;
  & a {
    color: #218a71;
    text-decoration: none;
  }
`;

const StyledAside = styled.aside`
  & img {
    width: 312px;
    height: 231px;
    border-radius: 15px;
    box-shadow: 3px 10px 18px rgb(0 0 0 / 20%);
    @media (max-width: 415px) {
      width: 250px;
      height: 185px;
    }
  }
  @media (max-width: 820px) {
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
  }
`;

const DietsContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
`;

const Diet = styled.p`
  background: #fefffb;
  border: 2px solid #acacac;
  padding: 0 5px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 12px;
  color: #00503d;
  margin: 0;
`;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 0 15px;

  & h3 {
    color: #00503d;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 415px) {
    flex-direction: column;
  }
`;

const LoadingOverlay = styled(Overlay)`
  width: 100vw;
  height: 100vh;
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
