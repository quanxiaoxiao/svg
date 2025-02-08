export default (
  x0,
  y0,
  x1,
  y1,
) => {
  const n = 120;
  const cx = 2 * x0 - x1;
  const cy = 2 * y0 - y1;

  const points = [];
  for (let t = 0; t < n ; t++) {
    const tNorm = (t + 1) / n;
    const xt = (1 - tNorm) * (1 - tNorm) * x0 + 2 * (1 - tNorm) * tNorm * cx + tNorm * tNorm * x1;
    const yt = (1 - tNorm) * (1 - tNorm) * y0 + 2 * (1 - tNorm) * tNorm * cy + tNorm * tNorm * y1;
    points.push([xt, yt]);
  }
  return points;
};
