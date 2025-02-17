export default (coordinateList) => {
  if (coordinateList.length === 0) {
    return [0, 0, 0, 0];
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (let i = 0; i < coordinateList.length; i++) {
    const coordinates = coordinateList[i];
    for (let j = 0; j < coordinates.length; j++) {
      const [x, y] = coordinates[j];
      if (x < minX) {
        minX = x;
      }
      if (y < minY) {
        minY = y;
      }
      if (x > maxX) {
        maxX = x;
      }
      if (y > maxY) {
        maxY = y;
      }
    }
  }

  return [minX, minY, maxX, maxY];
};
