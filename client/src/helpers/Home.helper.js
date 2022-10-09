export const customSort = (array, order) => {
  if (order === 'A-Z')
    return array.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
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
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
      return 0;
    });
  }

  if (order === 'ASC') {
    return array.sort((a, b) => b.health_score - a.health_score);
  }

  if (order === 'DSC') {
    return array.sort((a, b) => a.health_score - b.health_score);
  }
};
