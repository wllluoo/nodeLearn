'use strict';
const common = require('../common');
if (!common.hasCrypto)
  common.skip('missing crypto');

const assert = require('assert');
const tls = require('tls');
const fs = require('fs');
const path = require('path');

const cert = fs.readFileSync(path.join(common.fixturesDir, 'test_cert.pem'));
const key = fs.readFileSync(path.join(common.fixturesDir, 'test_key.pem'));

const conn = tls.connect({cert, key, port: 0}, common.mustNotCall());
conn.on('error', function() {
});
assert.doesNotThrow(function() {
  conn.destroy();
});
