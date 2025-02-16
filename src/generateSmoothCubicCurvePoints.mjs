const bezier = (t, p0, p1, p2) => {
  const x = Math.pow(1 - t, 2) * p0[0] + 2 * (1 - t) * t * p1[0] + Math.pow(t, 2) * p2[0];
  const y = Math.pow(1 - t, 2) * p0[1] + 2 * (1 - t) * t * p1[1] + Math.pow(t, 2) * p2[1];
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
  const startPoint = [x0, y0];
  const controlPoint = [x1, y1];
  const endPoint = [x2, y2];
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    points.push(bezier(
      t,
      startPoint,
      controlPoint,
      endPoint,
    ));
  }

  return points;
};
