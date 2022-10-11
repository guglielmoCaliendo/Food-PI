import { v4 as uuid } from 'uuid';

export const errorsInitialState = {
  title: false,
  titleCoinsidence: false,
  summary: false,
  healthScore: false,
  image: false,
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
  const titleRegEx = new RegExp(/^[a-zA-Z0-9_ ]{3,20}$/);
  const urlRegEx = new RegExp(
    // eslint-disable-next-line no-useless-escape
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi
  );

  if (target.name === 'title') {
    if (!target.value.match(titleRegEx)) {
      return setter({ ...state, [target.name]: true });
    } else if (
      recipes.some(
        (recipe) => recipe.title.toLowerCase() === target.value.toLowerCase()
      )
    ) {
      return setter({ ...state, titleCoinsidence: true });
    } else {
      if (state.titleCoinsidence) {
        return setter({ ...state, titleCoinsidence: false });
      } else {
        return setter({ ...state, [target.name]: false });
      }
    }
  }

  if (target.name === 'summary') {
    if (target.value.length < 150)
      return setter({ ...state, [target.name]: true });
    return setter({ ...state, [target.name]: false });
  }

  if (target.name === 'healthScore') {
    if (target.value > 100) return setter({ ...state, [target.name]: true });
    return setter({ ...state, [target.name]: false });
  }

  if (target.name === 'image') {
    if (!target.value.match(urlRegEx))
      return setter({ ...state, [target.name]: true });
    return setter({ ...state, [target.name]: false });
  }
};
