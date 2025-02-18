import commands from './commands.mjs';

export default (commandList) => {
  const len = commandList.length;
  if (len === 0) {
    return [0, 0];
  }
  let x = null;
  let y = null;
  for (let i = len - 1; i >= 0; i--) {
    const [m, ...values] = commandList[i];
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
