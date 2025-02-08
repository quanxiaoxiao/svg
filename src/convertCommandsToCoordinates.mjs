import assert from 'node:assert';

import generateArcPoints from './generateArcPoints.mjs';
import generateCubicCurvePoints from './generateCubicCurvePoints.mjs';
import generateQuadraticCurvePoints from './generateQuadraticCurvePoints.mjs';
import generateSmoothCubicCurvePoints from './generateSmoothCubicCurvePoints.mjs';
import generateSmoothQuadraticCurvePoints from './generateSmoothQuadraticCurvePoints.mjs';

const handler = {
  L: (values) => [[values[0], values[1]]],
  H: (values, startPoint) => [[values[0], startPoint[1]]],
  V: (values, startPoint) => [[startPoint[0], values[0]]],
  C: (values, startPoint) => {
    const points = generateCubicCurvePoints(
      startPoint[0],
      startPoint[1],
      ...values,
    );
    return points;
  },
  Q: (values, startPoint) => {
    const points = generateQuadraticCurvePoints(
      startPoint[0],
      startPoint[1],
      ...values,
    );
    return points;
  },
  S: (values, startPoint) => {
    const points = generateSmoothCubicCurvePoints(
      startPoint[0],
      startPoint[1],
      ...values,
    );
    return points;
  },
  T: (values, startPoint) => {
    const points = generateSmoothQuadraticCurvePoints(
      startPoint[0],
      startPoint[1],
      ...values,
    );
    return points;
  },
  A: (values, startPoint) => {
    const points =  generateArcPoints(
      startPoint[0],
      startPoint[1],
      ...values,
    );
    return points;
  },
};

export default (commandList) => {
  const start = commandList[0];
  const points = [];
  assert(start[0] === 'M');
  let moveTo;
  let rowIndex = 0;
  for (let i = 0; i < commandList.length; i++) {
    const [commandName, ...values] = commandList[i];
    if (commandName === 'M') {
      moveTo = [values[0], values[1]];
      if (!points[rowIndex]) {
        points[rowIndex] = [];
      }
      points[rowIndex].push([moveTo[0], moveTo[1]]);
    } else if (commandName === 'Z') {
      moveTo = points[rowIndex][0];
      points[rowIndex].push([
        moveTo[0],
        moveTo[1],
      ]);
      rowIndex ++;
    } else {
      const handlerItem = handler[commandName];
      assert(handlerItem);
      if (!points[rowIndex]) {
        points[rowIndex] = [];
      }
      const coordinates = handlerItem(values, moveTo);
      moveTo = coordinates[coordinates.length - 1];
      points[rowIndex].push(...coordinates);
    }
  }
  return points
    .filter((coordinateList) => coordinateList.length > 1);
};
