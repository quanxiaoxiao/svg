import extractLastPoint from './extractLastPoint.mjs';
import generateArcPoints from './generateArcPoints.mjs';
import generateCubicCurvePoints from './generateCubicCurvePoints.mjs';
import generateQuadraticCurvePoints from './generateQuadraticCurvePoints.mjs';

const computeQuadraticControlPoint = (commandList, offset) => {
  if (commandList.length === 0) {
    throw new Error('commands is empty');
  }
  if (offset === 0) {
    if (commandList[0] !== 'M') {
      throw new Error('commands invalid');
    }
    return [commandList[0][1], commandList[0][2]];
  }
  const [prevCommandName, ...prevCommandValues] = commandList[offset - 1];
  const [commandName] = commandList[offset];
  if (commandName !== 'T') {
    throw new Error('unable get control');
  }
  if (prevCommandName === 'Q') {
    const [x, y] = extractLastPoint(commandList.slice(0, offset));
    return [
      2 * x - prevCommandValues[0],
      2 * y - prevCommandValues[1],
    ];
  }
  const ctrlPre = computeQuadraticControlPoint(commandList, offset - 1);
  const [x, y] = extractLastPoint(commandList.slice(0, offset));
  return [
    2 * x - ctrlPre[0],
    2 * y - ctrlPre[1],
  ];
};

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
    const points = generateArcPoints(
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
  if (start[0] !== 'M') {
    throw new Error('commands invalid start point is not move');
  }
  let currentPosition;
  let rowIndex = -1;
  for (let i = 0; i < commandList.length; i++) {
    const [commandName, ...values] = commandList[i];
    if (commandName === 'M') {
      if (rowIndex === -1) {
        rowIndex ++;
      } else if (points[rowIndex] && points[rowIndex].length > 0) {
        rowIndex++;
      }
      currentPosition = [values[0], values[1]];
      if (!points[rowIndex]) {
        points[rowIndex] = [];
      }
      points[rowIndex].push([currentPosition[0], currentPosition[1]]);
    } else if (commandName === 'Z') {
      if (points[rowIndex]
        || points[rowIndex][0]
        || points[rowIndex][0].length === 2
      ) {
        currentPosition = points[rowIndex][0];
        points[rowIndex].push([
          currentPosition[0],
          currentPosition[1],
        ]);
        rowIndex ++;
      }
    } else {
      const commandValues = [...values];
      if (commandName === 'S' || commandName === 'T') {
        commandValues.unshift(currentPosition[1]);
        commandValues.unshift(currentPosition[0]);
        const [prevCommandName, ...prevCommandValues] = commandList[i - 1];
        if (commandName === 'S' && (prevCommandName === 'S' || prevCommandName === 'C')) {
          const ctrlPre = prevCommandName === 'C' ? [
            prevCommandValues[2],
            prevCommandValues[3],
          ] : [
            prevCommandValues[0],
            prevCommandValues[1],
          ];
          commandValues[0] = 2 * commandValues[0] - ctrlPre[0];
          commandValues[1] = 2 * commandValues[1] - ctrlPre[1];
        }
        if (commandName === 'T' && (prevCommandName === 'T' || prevCommandName === 'Q')) {
          const ctrlPre = computeQuadraticControlPoint(commandList, i);
          commandValues[0] = ctrlPre[0];
          commandValues[1] = ctrlPre[1];
        }
      }
      const handlerItem = handler[commandName];
      if (!handlerItem) {
        throw new Error(`\`${commandName}\` unkown command`);
      }
      if (!points[rowIndex]) {
        points[rowIndex] = [];
      }
      const coordinates = handlerItem(
        commandValues,
        currentPosition,
      );
      currentPosition = coordinates[coordinates.length - 1];
      if (!currentPosition && !currentPosition.length === 2) {
        throw new Error(`\`${JSON.stringify(currentPosition)}\` last point invalid`);
      }
      points[rowIndex].push(...coordinates);
    }
  }
  return points.filter((coordinateList) => coordinateList.length > 1);
};
