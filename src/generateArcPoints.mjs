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
  const radianWithEnd = Math.atan2(
    x1 - center[0],
    y1 - center[1],
  );

  let delta = radianWithEnd - radianWithStart;

  if (Math.abs(delta) > Math.PI * 1.01) {
    delta = delta < 0 ? delta + 2 * Math.PI : delta - Math.PI * 2;
  }

  if (largeArcFlag === 1) {
    delta = delta > 0 ? Math.PI * 2 - delta : Math.PI * 2 + delta;
  }

  if (radianWithEnd > radianWithStart) {
    if (radianWithStart < 0) {
      radianWithStart += 2 * Math.PI;
    }
  }
  radianWithStart -= Math.PI * 0.5;
  const radianWithPer = delta / (n - 1);

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
