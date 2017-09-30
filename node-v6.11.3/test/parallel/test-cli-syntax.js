'use strict';

const common = require('../common');
const assert = require('assert');
const spawnSync = require('child_process').spawnSync;
const path = require('path');

const node = process.execPath;

// test both sets of arguments that check syntax
const syntaxArgs = [
  ['-c'],
  ['--check']
];

const syntaxErrorRE = /^SyntaxError: Unexpected identifier$/m;
const notFoundRE = /^Error: Cannot find module/m;

// test good syntax with and without shebang
[
  'syntax/good_syntax.js',
  'syntax/good_syntax',
  'syntax/good_syntax_shebang.js',
  'syntax/good_syntax_shebang',
  'syntax/illegal_if_not_wrapped.js'
].forEach(function(file) {
  file = path.join(common.fixturesDir, file);

  // loop each possible option, `-c` or `--check`
  syntaxArgs.forEach(function(args) {
    const _args = args.concat(file);
    const c = spawnSync(node, _args, {encoding: 'utf8'});

    // no output should be produced
    assert.strictEqual(c.stdout, '', 'stdout produced');
    assert.strictEqual(c.stderr, '', 'stderr produced');
    assert.strictEqual(c.status, 0, `code == ${c.status}`);
  });
});

// test bad syntax with and without shebang
[
  'syntax/bad_syntax.js',
  'syntax/bad_syntax',
  'syntax/bad_syntax_shebang.js',
  'syntax/bad_syntax_shebang'
].forEach(function(file) {
  file = path.join(common.fixturesDir, file);

  // loop each possible option, `-c` or `--check`
  syntaxArgs.forEach(function(args) {
    const _args = args.concat(file);
    const c = spawnSync(node, _args, {encoding: 'utf8'});

    // no stdout should be produced
    assert.strictEqual(c.stdout, '', 'stdout produced');

    // stderr should have a syntax error message
    assert(syntaxErrorRE.test(c.stderr), 'stderr incorrect');

    assert.strictEqual(c.status, 1, `code == ${c.status}`);
  });
});

// test file not found
[
  'syntax/file_not_found.js',
  'syntax/file_not_found'
].forEach(function(file) {
  file = path.join(common.fixturesDir, file);

  // loop each possible option, `-c` or `--check`
  syntaxArgs.forEach(function(args) {
    const _args = args.concat(file);
    const c = spawnSync(node, _args, {encoding: 'utf8'});

    // no stdout should be produced
    assert.strictEqual(c.stdout, '', 'stdout produced');

    // stderr should have a module not found error message
    assert(notFoundRE.test(c.stderr), 'stderr incorrect');

    assert.strictEqual(c.status, 1, `code == ${c.status}`);
  });
});
