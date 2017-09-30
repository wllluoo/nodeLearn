'use strict';
const common = require('../common');
const assert = require('assert');
const zlib = require('zlib');

zlib.gzip('hello', common.mustCall(function(err, out) {
  const unzip = zlib.createGunzip();
  unzip.close(common.mustCall());
  assert.throws(() => unzip.write(out), /^Error: zlib binding closed$/);
}));
