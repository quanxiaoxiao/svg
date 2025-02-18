import assert from 'node:assert';
import test from 'node:test';

import parseViewBox from './parseViewBox.mjs';

test('parseViewBox', () => {
  assert.equal(parseViewBox(), null);
  assert.equal(parseViewBox(''), null);
  assert.equal(parseViewBox(null), null);
  assert.equal(parseViewBox('0 0 300'), null);
  assert.equal(parseViewBox('0 0 300 -200'), null);
  assert.deepEqual(parseViewBox('0 0 300 200'), [300, 200]);
  assert.deepEqual(parseViewBox('0 0 300.3 200.6'), [300, 200]);
});
