const http = require('http');
const promisify = require('util').promisify;
const fs = require('fs');
const conf = require('./defaultConfig');
const router = require('./helper/router');
const path = require('path');
const handlebars = require('handlebars');
const openUrl = require('./helper/openUrl');

class Server {
  constructor(config) {
    this.conf = Object.assign({}, conf, config);
  }
  start() {
    const server = http.createServer((req, res) => {
      const filePath = path.join(this.conf.root, req.url);
      router(req, res, filePath, this.conf);
    });
    
    
    server.listen(this.conf.port, this.conf.hostname, () => {
      // const addr = `http://baidu.com`;
      // openUrl(addr);
      console.log('yes!');
    });
  }
}
module.exports = Server;
