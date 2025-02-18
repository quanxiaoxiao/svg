import fp from 'lodash/fp.js';

import adjustBboxToViewCenter from './adjustBboxToViewCenter.mjs';
import convertCommandsToCoordinates from './convertCommandsToCoordinates.mjs';
import convertCommandsToPath from './convertCommandsToPath.mjs';
import getBbox from './getBbox.mjs';
import parsePathToCommands from './parsePathToCommands.mjs';
import scaleAtCommands from './scaleAtCommands.mjs';
import translateAtCommands from './translateAtCommands.mjs';

export default ({
  pathList,
  viewSize = 1024,
  padding = 0.1,
  viewBox,
}) => {
  const coordinateList = [];
  const commandList = [];
  for (let i = 0; i < pathList.length; i++) {
    const commands = parsePathToCommands(pathList[i].d);
    commandList.push(commands);
    coordinateList.push(...convertCommandsToCoordinates(commands));
  }
  const bbox = getBbox(coordinateList);
  const rect = adjustBboxToViewCenter({
    bbox,
    width: viewBox[0],
    height: viewBox[1],
  });
  const pathListWithOutput = [];
  for (let i = 0; i < commandList.length; i++) {
    const scale = viewSize / rect.viewSize;
    pathListWithOutput.push(fp.compose(
      convertCommandsToPath,
      ...padding && padding > 0 && padding < 0.5 ? [
        (commands) => translateAtCommands(commands, [viewSize * padding, viewSize * padding]),
        (commands) => scaleAtCommands(commands, 1 - padding * 2),
      ] : [],
      (commands) => translateAtCommands(commands, [rect.x * scale, rect.y * scale]),
      (commands) => scaleAtCommands(commands, rect.scale * scale),
    )(commandList[i]));
  }
  return {
    viewBox: [viewSize, viewSize],
    paths: pathListWithOutput.map((str, i) => ({
      ...pathList[i],
      d: str,
    })),
  };
};
