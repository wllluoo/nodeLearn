'use strict';
// Check that having a worker bind to a port that's already taken doesn't
// leave the master process in a confused state. Releasing the port and
// trying again should Just Work[TM].

const common = require('../common');
const assert = require('assert');
const fork = require('child_process').fork;
const net = require('net');

const id = String(process.argv[2]);
const port = String(process.argv[3]);

if (id === 'undefined') {
  const server = net.createServer(common.mustNotCall());
  server.listen(0, function() {
    const worker = fork(__filename, ['worker', server.address().port]);
    worker.on('message', function(msg) {
      if (msg !== 'stop-listening') return;
      server.close(function() {
        worker.send('stopped-listening');
      });
    });
  });
} else if (id === 'worker') {
  let server = net.createServer(common.mustNotCall());
  server.listen(port, common.mustNotCall());
  server.on('error', common.mustCall(function(e) {
    assert(e.code, 'EADDRINUSE');
    process.send('stop-listening');
    process.once('message', function(msg) {
      if (msg !== 'stopped-listening') return;
      server = net.createServer(common.mustNotCall());
      server.listen(port, common.mustCall(function() {
        server.close();
      }));
    });
  }));
} else {
  assert(0);  // Bad argument.
}
