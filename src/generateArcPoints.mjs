export default (
  x0,
  y0,
  rx,
  ry,
  xAxisRotation,
  largeArcFlag,
  sweepFlag,
  x1,
  y1,
) => {
  const n = 80;

  let points = [];

  for (let i = 0; i < n; i++) {
    let t = i / (n - 1);
    let x = (1 - t) * x0 + t * x1;
    let y = (1 - t) * y0 + t * y1;
    points.push([x, y]);
  }

  return points;
};
