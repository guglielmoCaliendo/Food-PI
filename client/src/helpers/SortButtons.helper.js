export const changeName = (name, setter) => {
  if (name === 'A-Z') return setter('Z-A');
  setter('A-Z');
};

export const changeOrder = (name, setter) => {
  if (name === 'ASC') return setter('DSC');
  setter('ASC');
};
