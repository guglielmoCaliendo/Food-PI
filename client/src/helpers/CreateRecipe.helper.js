import { v4 as uuid } from 'uuid';

export const errorsInitialState = {
  name: false,
  nameCoinsidence: false,
  abstract: false,
  health_score: false,
  img_url: false,
  diets: false,
  steps: false,
};

export const dietsInitialState = {
  'dairy free': false,
  'gluten free': false,
  ketogenic: false,
  vegetarian: false,
  'lacto ovo vegetarian': false,
  vegan: false,
  pescatarian: false,
  paleolithic: false,
  primal: false,
  'fodmap friendly': false,
  'whole 30': false,
};

export const formatData = (data) => {
  let formatedSteps = data.steps.map((step, i) => ({
    number: i + 1,
    step: step.step,
  }));
  const formatedData = { ...data, steps: formatedSteps };
  return formatedData;
};

export const addStep = (e, data, setter) => {
  e.preventDefault();

  let updatedFormData = {
    ...data,
    steps: [...data.steps, { id: uuid(), step: '' }],
  };
  if (data.steps.length > 5) return;
  setter(updatedFormData);
};

export const removeStep = (e, id, data, setter) => {
  e.preventDefault();
  let updatedFormData = {
    ...data,
    steps: data.steps.filter((step) => step.id !== id),
  };
  setter(updatedFormData);
};

export const errorSetter = (recipes, target, state, setter) => {
  const nameRegEx = new RegExp(/^[a-zA-Z0-9_ ]{3,20}$/);
  const urlRegEx = new RegExp(
    // eslint-disable-next-line no-useless-escape
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi
  );

  if (target.name === 'name') {
    if (!target.value.match(nameRegEx)) {
      return setter({ ...state, [target.name]: true });
    } else if (recipes.some((recipe) => recipe.name === target.value)) {
      return setter({ ...state, nameCoinsidence: true });
    } else {
      if (state.nameCoinsidence) {
        return setter({ ...state, nameCoinsidence: false });
      } else {
        return setter({ ...state, [target.name]: false });
      }
    }
  }

  if (target.name === 'abstract') {
    if (target.value.length < 150)
      return setter({ ...state, [target.name]: true });
    return setter({ ...state, [target.name]: false });
  }

  if (target.name === 'health_score') {
    if (target.value > 100) return setter({ ...state, [target.name]: true });
    return setter({ ...state, [target.name]: false });
  }

  if (target.name === 'img_url') {
    if (!target.value.match(urlRegEx))
      return setter({ ...state, [target.name]: true });
    return setter({ ...state, [target.name]: false });
  }
};
