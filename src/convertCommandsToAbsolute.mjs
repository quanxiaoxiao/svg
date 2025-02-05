import commands from './commands.mjs';

const getPointAtLastMoveCommand = (list) => {
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

const getLastPointOfCommandList = (list) => {
  const len = list.length;
  if (len === 0) {
    return [0, 0];
  }
  let x = null;
  let y = null;
  for (let i = len - 1; i >= 0; i--) {
    const [m, ...values] = list[i];
    const ret = commands[m.toLowerCase()].point(values);
    if (x == null && ret.x != null) {
      x = ret.x;
    }
    if (y == null && ret.y != null) {
      y = ret.y;
    }
    if (x != null && y != null) {
      return [x, y];
    }
  }
  if (x == null || y == null) {
    return [0, 0];
  }
  return [x, y];
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
    const handler = commands[name.toLowerCase()];
    if (/^[A-Z]$/.test(name)) {
      result.push([name].concat(values));
    } else if (name === 'm') {
      const point = getPointAtLastMoveCommand(result);
      result.push([name.toUpperCase()].concat(handler.translate(values, point)));
    } else {
      const point = getLastPointOfCommandList(result);
      result.push([name.toUpperCase()].concat(handler.translate(values, point)));
    }
  }
  return result;
};

export default convertCommandsToAbsolute;
