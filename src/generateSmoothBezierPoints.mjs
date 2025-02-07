export default (
  x0,
  y0,
  x1,
  y1,
  x2,
  y2,
) => {

  const numPoints = 80;

  const points = [];
  for (let i = 0; i < numPoints; i++) {
    const t = i / (numPoints - 1);
    const x = Math.pow(1 - t, 2) * x0 + 2 * (1 - t) * t * x1 + Math.pow(t, 2) * x2;
    const y = Math.pow(1 - t, 2) * y0 + 2 * (1 - t) * t * y1 + Math.pow(t, 2) * y2;
    points.push([x, y]);
  }

  return points;
};
