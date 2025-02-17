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

  if (radianWithStart < 0) {
    radianWithStart += Math.PI * 2;
  }

  if (radianWithEnd < 0) {
    radianWithEnd += Math.PI * 2;
  }

  let delta = radianWithEnd - radianWithStart;

  radianWithStart -= Math.PI * 0.5;
  if (radianWithStart < 0) {
    radianWithStart += 2 * Math.PI;
  }

  const deltaWithAbas = Math.abs(delta);

  if (deltaWithAbas <= Math.PI * 1.03 && deltaWithAbas >= Math.PI * 0.97) {
    if (deltaWithAbas < Math.PI - 0.01) {
      if (largeArcFlag === 1) {
        delta = delta > 0 ? delta - Math.PI * 2 : Math.PI * 2 + delta;
      }
    } else if (deltaWithAbas > Math.PI + 0.01) {
      if (largeArcFlag === 0) {
        delta = delta < 0 ? delta + 2 * Math.PI : delta - Math.PI * 2;
      }
    } else {
      if (sweepFlag === 1) {
        if (delta > 0) {
          delta = delta * -1;
        }
      } else if (delta < 0) {
        delta = delta * -1;
      }
    }
  } else {
    if (largeArcFlag === 0 && deltaWithAbas > Math.PI) {
      delta = delta < 0 ? delta + 2 * Math.PI : delta - Math.PI * 2;
    }

    if (largeArcFlag === 1 && deltaWithAbas < Math.PI) {
      delta = delta > 0 ? delta - Math.PI * 2 : Math.PI * 2 + delta;
    }
  }

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
