const Server = require('./app');

const yargs = require('yargs');
const argv = yargs
.usage('anywhere [opyions]')
.option('p', {
  alias: 'port',
  describe: '端口号',
  default: 9527,
})
.option('h', {
  alias: 'hostname',
  describe: 'host',
  default: '127.0.0.1',
})
.version()
.alias('v', 'version')
.help()
.argv;

const server = new Server(argv);
server.start();