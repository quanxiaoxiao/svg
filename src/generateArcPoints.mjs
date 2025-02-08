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
  const points = [];

  let radianWithStart = Math.atan2(
    x0 - center[0],
    y0 - center[1],
  );
  let radianWithEnd = Math.atan2(
    x1 - center[0],
    y1 - center[1],
  );

  radianWithStart -= Math.PI * 0.5;
  radianWithEnd -= Math.PI * 0.5;
  if (radianWithEnd > radianWithStart) {
    if (radianWithStart < 0) {
      radianWithStart += 2 * Math.PI;
    }
    if (radianWithEnd < 0) {
      radianWithEnd += 2 * Math.PI;
    }
  }
  const radianWithPer = (radianWithEnd - radianWithStart) / (n - 1);

  for (let j = 0; j < n ; j++) {
    const radian = (radianWithStart +  radianWithPer * j);
    const x = Math.cos(radian) * rx;
    const y = Math.sin(radian) * ry;
    points.push([
      center[0] + x,
      center[1] - y,
    ]);
  }

  return points;
};
