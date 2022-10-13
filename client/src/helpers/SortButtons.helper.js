export const changeOrder = (name, setter) => {
  if (name === 'A-Z') return setter('Z-A');
  if (name === 'Z-A') return setter('Health Score >');
  if (name === 'Health Score >') return setter('Health Score <');
  if (name === 'Health Score <') return setter('A-Z');
};
