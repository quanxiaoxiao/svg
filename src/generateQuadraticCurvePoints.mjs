export default (
  x0,
  y0,
  cx,
  cy,
  x1,
  y1,
) => {
  const n = 120;
  const points = [];
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const x = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * cx + t * t * x1;
    const y = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * cy + t * t * y1;
    points.push([x, y]);
  }
  return points;
};
