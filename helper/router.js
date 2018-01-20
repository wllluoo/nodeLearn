const path = require('path');
const fs = require('fs');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const Handlebars = require('Handlebars');
const mime = require('./mime');

const tplPath = path.join(__dirname, '../template/dir.tpl');
console.log('tplPath', tplPath);
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString());
const config = require('../defaultConfig');

module.exports = async function (req, res, filePath) {
    try {
        const stats = await stat(filePath);
        if (stats.isFile()) {
          res.statusCode = 200;
          const contentType = mime(filePath);
          res.setHeader('Content-Type', contentType);
          fs.createReadStream(filePath).pipe(res);
        } else if (stats.isDirectory()) {
          fs.readdir(filePath, (err, files) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            const dir = path.relative(config.root, filePath);
            console.log('dir', dir);
            const data = {
              title: path.basename(filePath),
              dir: dir ? `/${dir}` : '',
              files,
            }
            res.end(template(data));
          });
        }
      } catch(ex) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/plain');
        res.end('wrong!');
      } 
}