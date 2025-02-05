import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import test from 'node:test';

import parsePathToCommands from './parsePathToCommands.mjs';
import parseSvg from './parseSvg.mjs';

const list = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'dist', 'icons.json')));

test('parsePathToCommands', () => {
  assert(list.length > 0);
  for (let i = 0; i < list.length; i++) {
    const svg = list[i];
    const { paths } = parseSvg(svg);
    assert(paths.length > 0);
    for (let j = 0; j < paths.length; j++) {
      const pathItem = paths[j];
      const ret = parsePathToCommands(pathItem.d);
      assert(ret.length > 0);
      assert.equal(ret[0][0], 'M');
      assert.equal(ret[0].length, 3);
      assert.equal(typeof ret[0][1], 'number');
      assert.equal(typeof ret[0][2], 'number');
      for (let k = 0; k < ret.length; k++) {
        assert(/^[A-Z]/.test(ret[k][0]));
      }
    }
  }
});
