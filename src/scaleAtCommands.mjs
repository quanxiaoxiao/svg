import commands from './commands.mjs';

export default (commandList, scale) => {
  if (scale === 1) {
    return commandList;
  }
  return commandList.map((d) => {
    const [m, ...values] = d;
    const handler = commands[m] || commands[m.toLowerCase()];
    return [m].concat(handler.scale(values, scale));
  });
};
