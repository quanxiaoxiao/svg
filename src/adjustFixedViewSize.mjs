import fp from 'lodash/fp.js';

import calcCoverRect from './calcCoverRect.mjs';
import convertCommandsToCoordinates from './convertCommandsToCoordinates.mjs';
import convertCommandsToPath from './convertCommandsToPath.mjs';
import getBbox from './getBbox.mjs';
import parsePathToCommands from './parsePathToCommands.mjs';
import scaleAtCommands from './scaleAtCommands.mjs';
import translateAtCommands from './translateAtCommands.mjs';

export default ({
  pathList,
  width = 1024,
  height = 1024,
  padding = 0.1,
}) => {
  const coordinateList = [];
  const commandList = [];
  for (let i = 0; i < pathList.length; i++) {
    const commands = parsePathToCommands(pathList[i].d);
    commandList.push(commands);
    coordinateList.push(...convertCommandsToCoordinates(commands));
  }
  const bbox = getBbox(coordinateList);
  const rect = calcCoverRect({
    width,
    height,
    bbox,
  });
  const pathListWithOutput = [];
  for (let i = 0; i < commandList.length; i++) {
    pathListWithOutput.push(fp.compose(
      convertCommandsToPath,
      ...padding && padding > 0 && padding < 0.5 ? [
        (commands) => translateAtCommands(commands, [width * padding, height * padding]),
        (commands) => scaleAtCommands(commands, 1 - padding * 2),
      ] : [],
      (commands) => translateAtCommands(commands, [rect.x, rect.y]),
      (commands) => scaleAtCommands(commands, rect.scale),
    )(commandList[i]));
  }
  return {
    viewBox: [width, height],
    paths: pathListWithOutput.map((str, i) => ({
      ...pathList[i],
      d: str,
    })),
  };
};
