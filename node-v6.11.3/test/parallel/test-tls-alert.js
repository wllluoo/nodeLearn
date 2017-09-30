'use strict';
const common = require('../common');
if (!common.hasCrypto)
  common.skip('missing crypto');

if (!common.opensslCli)
  common.skip('node compiled without OpenSSL CLI.');

const assert = require('assert');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const tls = require('tls');

let success = false;

function filenamePEM(n) {
  return path.join(common.fixturesDir, 'keys', `${n}.pem`);
}

function loadPEM(n) {
  return fs.readFileSync(filenamePEM(n));
}

const server = tls.Server({
  secureProtocol: 'TLSv1_2_server_method',
  key: loadPEM('agent2-key'),
  cert: loadPEM('agent2-cert')
}, null).listen(0, function() {
  const args = ['s_client', '-quiet', '-tls1_1',
                '-connect', `127.0.0.1:${this.address().port}`];

  // for the performance and stability issue in s_client on Windows
  if (common.isWindows)
    args.push('-no_rand_screen');

  const client = spawn(common.opensslCli, args);
  let out = '';
  client.stderr.setEncoding('utf8');
  client.stderr.on('data', function(d) {
    out += d;
    if (/SSL alert number 70/.test(out)) {
      success = true;
      server.close();
    }
  });
});
process.on('exit', function() {
  assert(success);
});
