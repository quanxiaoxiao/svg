const bezier = (t, p0, p1, p2) => {
  const x = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
  const y = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;
  return [x, y];
};

export default (
  x0,
  y0,
  x1,
  y1,
  x2,
  y2,
) => {
  const n = 120;

  const points = [];
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const x = Math.pow(1 - t, 2) * x0 + 2 * (1 - t) * t * x1 + Math.pow(t, 2) * x2;
    const y = Math.pow(1 - t, 2) * y0 + 2 * (1 - t) * t * y1 + Math.pow(t, 2) * y2;
    points.push([x, y]);
    // points.push(bezier(t, [x0, y0], [x1, y1], [x2, y2]));
  }

  return points;
};
