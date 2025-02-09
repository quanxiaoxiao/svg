import assert from 'node:assert';

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

  const deltaWithAbas = Math.abs(delta);

  if (deltaWithAbas <= Math.PI * 1.03 && deltaWithAbas >= Math.PI * 0.97) {
    if (deltaWithAbas < Math.PI) {
      if (largeArcFlag === 1) {
        delta = delta > 0 ? delta - Math.PI * 2 : Math.PI * 2 + delta;
        assert(Math.abs(delta) > Math.PI);
      }
    } else if (deltaWithAbas > Math.PI) {
      if (largeArcFlag === 0) {
        delta = delta < 0 ? delta + 2 * Math.PI : delta - Math.PI * 2;
        assert(Math.abs(delta) < Math.PI);
      }
    } else {
      if (largeArcFlag === 0) {
        // delta = delta * -1;
      }
    }
  } else {
    if (largeArcFlag === 0 && deltaWithAbas > Math.PI) {
      delta = delta < 0 ? delta + 2 * Math.PI : delta - Math.PI * 2;
      assert(Math.abs(delta) < Math.PI);
    }

    if (largeArcFlag === 1 && deltaWithAbas < Math.PI) {
      delta = delta > 0 ? delta - Math.PI * 2 : Math.PI * 2 + delta;
      assert(Math.abs(delta) > Math.PI);
    }
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
