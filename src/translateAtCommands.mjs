import commands from './commands.mjs';

export default (commandList, point) => {
  const [x, y] = point;
  if (x === 0 && y === 0) {
    return commandList;
  }
  return commandList.map((d) => {
    const [m, ...values] = d;
    const handler = commands[m] || commands[m.toLowerCase()];
    return [m].concat(handler.translate(values, [x, y]));
  });
};
