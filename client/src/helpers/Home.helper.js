export const customSort = (array, order) => {
  if (order === 'A-Z')
    return array.sort((a, b) => {
      const nameA = a.title.toUpperCase();
      const nameB = b.title.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

  if (order === 'Z-A') {
    return array.sort((a, b) => {
      const nameA = a.title.toUpperCase();
      const nameB = b.title.toUpperCase();
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
      return 0;
    });
  }

  if (order === 'Health Score <') {
    return array.sort((a, b) => b.healthScore - a.healthScore);
  }

  if (order === 'Health Score >') {
    return array.sort((a, b) => a.healthScore - b.healthScore);
  }
  return array;
};

export const dietSorter = (arr, target) =>
  target.every((value) => arr.includes(value));
