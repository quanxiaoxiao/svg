import assert from 'node:assert';
import test from 'node:test';

import parseViewBox from './parseViewBox.mjs';

test('parseViewBox', () => {
  assert.deepEqual(parseViewBox(), [1024, 1024]);
  assert.deepEqual(parseViewBox(''), [1024, 1024]);
  assert.deepEqual(parseViewBox(null, [900, 600]), [900, 600]);
  assert.deepEqual(parseViewBox('0 0 300', [900, 600]), [900, 600]);
  assert.deepEqual(parseViewBox('0 0 300 -200', [900, 600]), [900, 600]);
  assert.deepEqual(parseViewBox('0 0 300 200', [900, 600]), [300, 200]);
  assert.deepEqual(parseViewBox('0 0 300.3 200.6', [900, 600]), [300, 200]);
});
