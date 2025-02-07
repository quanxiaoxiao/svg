import calculateEllipseCenter from './calculateEllipseCenter.mjs';

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

  const center = calculateEllipseCenter(
    x0,
    y0,
    rx,
    ry,
    xAxisRotation,
    largeArcFlag,
    sweepFlag,
    x1,
    y1,
  );

  const n = 80;

  const radianWithStart = Math.atan2(
    x0 - center[0],
    y0 - center[1],
  );
  const radianWithEnd = Math.atan2(
    x1 - center[0],
    y1 - center[1],
  );
  const deltaRadian = radianWithEnd - radianWithStart;
  const perRadian = deltaRadian / (n - 1);
  const points = [];
  for (let i = 0; i < n ; i++) {
    const radian = radianWithStart + perRadian * i;
    points.push([
      center[0] + Math.cos(radian) * rx,
      center[1] + Math.sin(radian) * ry,
    ]);
  }

  return points;
};
