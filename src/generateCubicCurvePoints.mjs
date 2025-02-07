const cubicBezier = (p0, p1, p2, p3, t) => {
  const x = (1 - t) ** 3 * p0[0] + 3 * (1 - t) ** 2 * t * p1[0] + 3 * (1 - t) * t ** 2 * p2[0] + t ** 3 * p3[0];
  const y = (1 - t) ** 3 * p0[1] + 3 * (1 - t) ** 2 * t * p1[1] + 3 * (1 - t) * t ** 2 * p2[1] + t ** 3 * p3[1];
  return [x, y];
};

export default (
  x0,
  y0,
  x1,
  y1,
  x2,
  y2,
  x3,
  y3,
) => {
  const n = 40;
  const p0 = [x0, y0];
  const p1 = [x1, y1];
  const p2 = [x2, y2];
  const p3 = [x3, y3];

  const points = [];
  for (let i = 0; i < n ; i++) {
    const t = i / (n - 1);
    points.push(cubicBezier(p0, p1, p2, p3, t));
  }
  return points;
};
