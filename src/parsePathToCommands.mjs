import parse from 'parse-svg-path';

import convertCommandsToAbsolute from './convertCommandsToAbsolute.mjs';

export default (path) => convertCommandsToAbsolute(parse(path));
