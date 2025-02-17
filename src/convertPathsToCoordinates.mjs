import convertCommandsToCoordinates from './convertCommandsToCoordinates.mjs';
import parsePathToCommands from './parsePathToCommands.mjs';

export default (pathList) => {
  const coordinateList = [];
  for (let i = 0; i < pathList.length; i++) {
    const commandList = parsePathToCommands(pathList[i].d);
    coordinateList.push(...convertCommandsToCoordinates(commandList));
  }
  return coordinateList;
};
