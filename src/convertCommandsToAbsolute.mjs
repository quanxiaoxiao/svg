import commands from './commands.mjs';
import getLastPointOfCommands from './getLastPointOfCommands.mjs';

const getPointFromLastMoveCommand = (list) => {
  const len = list.length;
  if (len === 0) {
    return [0, 0];
  }
  for (let i = len - 1; i >= 0; i--) {
    const d = list[i];
    if (d[0] === 'M') {
      return [d[1], d[2]];
    }
  }
  return [0, 0];
};

const convertCommandsToAbsolute = (commandList) => {
  const [start, ...other] = commandList;
  if (!start) {
    return [];
  }
  if (start[0] !== 'M') {
    throw new Error(`start point \`${start.join(' ')}\` invalid`);
  }
  const result = [['M', start[1], start[2]]];
  for (let i = 0; i < other.length; i++) {
    const [name, ...values] = other[i];
    const commandName = name.toLowerCase();
    const commandNameWithUpperCase = name.toUpperCase();
    const handler = commands[commandName];
    if (/^[A-Z]$/.test(name)) {
      result.push([name].concat(values));
    } else if (name === 'm') {
      const point = getPointFromLastMoveCommand(result);
      result.push([commandNameWithUpperCase].concat(handler.translate(values, point)));
    } else {
      const point = getLastPointOfCommands(result);
      result.push([commandNameWithUpperCase].concat(handler.translate(values, point)));
    }
  }
  return result;
};

export default convertCommandsToAbsolute;
