import React, { useState, useEffect } from 'react';
import { getDiets, createRecipe } from '../state/actions';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import styled from 'styled-components';
import { capitalize } from '../helpers/components.helper';
import {
  dietsInitialState,
  formatData,
  addStep,
  removeStep,
  errorSetter,
  errorsInitialState,
} from '../helpers/CreateRecipe.helper';

export default function CreateRecipe() {
  // #################################################### Logic #######################################################################
  const formIninitialState = {
    name: '',
    abstract: '',
    health_score: '',
    img_url: '',
    steps: [{ id: uuid(), step: '' }],
    diets: [],
  };

  const diets = useSelector((store) => store.diets);
  const dispatch = useDispatch();
  const recipes = useSelector((store) => store.recipes);
  const [selectedDiet, setSelectedDiet] = useState(dietsInitialState);
  const [formData, setFormData] = useState(formIninitialState);
  const [errors, setErrors] = useState(errorsInitialState);

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const setDiet = (e) => {
    e.preventDefault();
    let updatedFormData = {};

    if (!formData.diets.length > 0) {
      setErrors({ ...errors, diets: false });
    }

    if (formData.diets.includes(e.target.name)) {
      updatedFormData = {
        ...formData,
        diets: formData.diets.filter((diet) => diet !== e.target.name),
      };
      setSelectedDiet({ ...selectedDiet, [e.target.name]: false });
      setErrors({ ...errors, diets: true });
      return setFormData(updatedFormData);
    }

    updatedFormData = {
      ...formData,
      diets: [...formData.diets, e.target.name],
    };
    setSelectedDiet({ ...selectedDiet, [e.target.name]: true });
    setFormData(updatedFormData);
  };

  const handleChange = (id, e) => {
    const index = formData.steps.findIndex((step) => step.id === id);

    if (formData.steps[0].step.length < 4) {
      setErrors({ ...errors, steps: true });
    } else {
      setErrors({ ...errors, steps: false });
    }

    let updatedFormData = { ...formData };
    if (id) {
      updatedFormData.steps[index][e.target.name] = e.target.value;
    }
    updatedFormData[e.target.name] = e.target.value;

    errorSetter(recipes, e.target, errors, setErrors);

    setFormData(updatedFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      JSON.stringify({ ...formIninitialState, steps: [] }) ===
      JSON.stringify({ ...formData, steps: [] })
    ) {
      return setErrors({
        name: true,
        abstract: true,
        health_score: true,
        img_url: true,
        diets: true,
        steps: true,
      });
    }
    if (!formData.name) return setErrors({ ...errors, name: true });
    if (!formData.abstract) return setErrors({ ...errors, abstract: true });
    if (!formData.health_score)
      return setErrors({ ...errors, health_score: true });
    if (!formData.img_url) return setErrors({ ...errors, img_url: true });
    if (formData.steps[0].step.length === 0)
      return setErrors({ ...errors, steps: true });
    if (formData.diets.length === 0)
      return setErrors({ ...errors, diets: true });

    dispatch(createRecipe(formatData(formData)));
    setFormData(formIninitialState);
  };

  // #################################################### End of Logic #######################################################################

  return (
    <Overlay>
      <StyledForm onSubmit={(e) => handleSubmit(e)}>
        <h1>Create new recipe</h1>
        <Container>
          <InputContainer>
            <StyledLabel htmlFor='name'>Name</StyledLabel>
            <StyledInput
              onChange={(e) => handleChange(null, e)}
              type='text'
              id='name'
              name='name'
              value={formData.name}
            />
            {errors.nameCoinsidence && (
              <ErrorMessage>
                Sorry, we already have a recipe whit this name.
              </ErrorMessage>
            )}
            {errors.name && (
              <ErrorMessage>
                The name of the recipe shouldn't have any special character and
                at least 3 - 20 characters.
              </ErrorMessage>
            )}
          </InputContainer>

          <InputContainer>
            <StyledLabel htmlFor='abstract'>Abstract</StyledLabel>
            <StyledInput
              type='text'
              id='abstract'
              name='abstract'
              value={formData.abstract}
              onChange={(e) => handleChange(null, e)}
            />
            {errors.abstract && (
              <ErrorMessage>
                The abstract should have at least 150 characters.
              </ErrorMessage>
            )}
          </InputContainer>

          <InputContainer>
            <StyledLabel htmlFor='score'>Health Score</StyledLabel>
            <StyledInput
              type='number'
              id='score'
              name='health_score'
              value={formData.health_score}
              min={0}
              max={100}
              onChange={(e) => handleChange(null, e)}
            />

            {errors.health_score && (
              <ErrorMessage>
                Please add any health score to the recipe between 1 - 100.
              </ErrorMessage>
            )}
          </InputContainer>

          <InputContainer>
            <StyledLabel htmlFor='image'>Image Url</StyledLabel>
            <StyledInput
              type='text'
              id='image'
              name='img_url'
              value={formData.img_url}
              onChange={(e) => handleChange(null, e)}
            />
            {errors.img_url && (
              <ErrorMessage>Please add a correct URL.</ErrorMessage>
            )}
          </InputContainer>

          <InputContainer>
            <StyledLabel>Steps</StyledLabel>
            {formData.steps.map((step) => (
              <StepsContainer key={step.id}>
                <StepInput
                  key={step.id}
                  name='step'
                  value={step.step}
                  onChange={(e) => handleChange(step.id, e)}
                />

                <AddButton onClick={(e) => addStep(e, formData, setFormData)}>
                  +
                </AddButton>

                {formData.steps.length > 1 && (
                  <SubButton
                    onClick={(e) => {
                      removeStep(e, step.id, formData, setFormData);
                    }}
                  >
                    -
                  </SubButton>
                )}
              </StepsContainer>
            ))}
            {errors.steps && (
              <ErrorMessage>
                There must be at least 1 step and at least 5 characters.
              </ErrorMessage>
            )}
          </InputContainer>
        </Container>

        <DietContainer>
          {diets.map((diet) => {
            return (
              <button
                onClick={(e) => setDiet(e)}
                key={diet.id}
                name={diet.name}
                className={selectedDiet[diet.name] ? 'selected' : null}
              >
                {capitalize(diet.name)}
              </button>
            );
          })}
        </DietContainer>
        {errors.diets && !formData.diets.length && (
          <ErrorMessage>
            There must be at least 1 type of diet selected.
          </ErrorMessage>
        )}

        <SubmitButton>Create</SubmitButton>
      </StyledForm>
    </Overlay>
  );
}

// #################################################### styles #######################################################################

const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const Container = styled.div`
  margin: 0 auto;
  display: flex
  flex-direction: column;
  width: 80%;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 50%;
  border-radius: 25px;
  background: #fefffb;
  box-shadow: 15px 15px 20px rgba(0, 0, 0, 0.15);
  padding: 25px;

  & h1 {
    font-size: 30px;
    color: #00503d;
    margin: 0;
    align-self: center;
  }
  @media (max-width: 820px) {
    width: 80%;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 5px;
`;

const StyledLabel = styled.label`
  color: #218a71;
  font-weight: 600;
`;

const StyledInput = styled.input`
  border-radius: 6px;
  border: 2px solid #acacac;
`;

const StepsContainer = styled.div`
  display: flex;
  justify-content: none;
  s & StyledInput {
    width: 80%;
  }
`;

const StepInput = styled(StyledInput)`
  width: 100%;
  margin-bottom: 4px;
`;

const SubmitButton = styled.button`
  align-self: center;
  margin-top: 20px;
  background: #fefffb;
  border: 2px solid #acacac;
  cursor: pointer;
  width: 200px;
  height: 50px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 20px;
  color: #00503d;

  &:hover {
    border-color: #4a5754;
  }

  &:disabled {
    color: #acacac;
    cursor: not-allowed;
    &:hover {
      border-color: #acacac;
    }
  }
`;

const AddButton = styled.button`
  margin-left: 5px;
  margin-bottom: 4px;
  background: #fefffb;
  border: 2px solid #acacac;
  cursor: pointer;
  border-radius: 6px;
  font-weight: 600;
  font-size: 12px;
  color: #00503d;

  &:hover {
    border-color: #4a5754;
  }
`;

const SubButton = styled(AddButton)`
  margin-left: 1px;
`;

const DietContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
  margin-top: 20px;
  & button {
    background: #fefffb;
    border: 2px solid #acacac;
    cursor: pointer;
    width: 120px;
    height: 45px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 12px;
    color: #00503d;

    &:hover {
      border-color: #4a5754;
    }
  }
  & .selected {
    background: #9d9f9e36;
  }
`;

const ErrorMessage = styled.p`
  color: #218a71;
  margin: 0;
  margin-top: 7px;
  font-size: 15px;
  align-self: center;
`;
