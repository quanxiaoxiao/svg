import assert from 'node:assert';

import generateArcPoints from './generateArcPoints.mjs';
import generateCubicCurvePoints from './generateCubicCurvePoints.mjs';
import generateQuadraticCurvePoints from './generateQuadraticCurvePoints.mjs';

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
  S: (values, startPoint) => {
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
  T: (values, startPoint) => {
    const points = generateQuadraticCurvePoints(
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
    } else if (commandName === 'S') {
      const ctrl0 = [
        moveTo[0],
        moveTo[1],
      ];
      const [prevCommandName, ...prevCommandValues] = commandList[i - 1];
      if (prevCommandName === 'S' || prevCommandName === 'C') {
        const ctrlPre = prevCommandName === 'C' ? [
          prevCommandValues[2],
          prevCommandValues[3],
        ] : [
          prevCommandValues[0],
          prevCommandValues[1],
        ];
        ctrl0[0] = 2 * ctrl0[0] - ctrlPre[0];
        ctrl0[1] = 2 * ctrl0[1] - ctrlPre[1];
      }
      const handlerItem = handler[commandName];
      assert(handlerItem);
      if (!points[rowIndex]) {
        points[rowIndex] = [];
      }
      const coordinates = handlerItem(
        [
          ctrl0[0],
          ctrl0[1],
          values[0],
          values[1],
          values[2],
          values[3],
        ],
        moveTo,
      );
      moveTo = coordinates[coordinates.length - 1];
      points[rowIndex].push(...coordinates);
    } else if (commandName === 'T') {
      const ctrl0 = [
        moveTo[0],
        moveTo[1],
      ];
      const [prevCommandName, ...prevCommandValues] = commandList[i - 1];
      if (prevCommandName === 'T' || prevCommandName === 'Q') {
        const ctrlPre = prevCommandName === 'Q' ? [
          prevCommandValues[0],
          prevCommandValues[1],
        ] : [
          prevCommandValues[0],
          prevCommandValues[1],
        ];
        ctrl0[0] = 2 * ctrl0[0] - ctrlPre[0];
        ctrl0[1] = 2 * ctrl0[1] - ctrlPre[1];
      }
      const handlerItem = handler[commandName];
      assert(handlerItem);
      if (!points[rowIndex]) {
        points[rowIndex] = [];
      }
      const coordinates = handlerItem(
        [
          ctrl0[0],
          ctrl0[1],
          values[0],
          values[1],
          values[2],
          values[3],
        ],
        moveTo,
      );
      moveTo = coordinates[coordinates.length - 1];
      points[rowIndex].push(...coordinates);
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
