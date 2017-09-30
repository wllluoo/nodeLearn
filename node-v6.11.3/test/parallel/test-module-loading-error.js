'use strict';
const common = require('../common');
const assert = require('assert');

console.error('load test-module-loading-error.js');

const error_desc = {
  win32: ['%1 is not a valid Win32 application'],
  linux: ['file too short', 'Exec format error'],
  sunos: ['unknown file type', 'not an ELF file'],
  darwin: ['file too short']
};
const dlerror_msg = error_desc[process.platform];

if (!dlerror_msg)
  common.skip('platform not supported.');

try {
  require('../fixtures/module-loading-error.node');
} catch (e) {
  assert.strictEqual(dlerror_msg.some((errMsgCase) => {
    return e.toString().indexOf(errMsgCase) !== -1;
  }), true);
}

try {
  require();
} catch (e) {
  assert.notStrictEqual(e.toString().indexOf('missing path'), -1);
}

try {
  require({});
} catch (e) {
  assert.notStrictEqual(e.toString().indexOf('path must be a string'), -1);
}
