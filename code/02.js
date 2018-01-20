const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const proxy = http.createServer((req, res) => {
  // if (req.url == '/01') {
  //   fs.readFile('../html/01.html', (err, data) => {
  //     res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
  //     res.end(data);
  //   })
  // } else if (req.url == '/02') {
  //   fs.readFile('../html/02.html', (err, data) => {
  //     res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
  //     res.end(data);
  //   })
  // } else if (req.url == '/01.png') {
  //   fs.readFile('../img/01.png', (err, data) => {
  //     res.writeHead(200, {'Content-Type': 'image/jpg'});
  //     res.end(data);
  //   })
  // }
  var pathname = url.parse(req.url, true).pathname;
  // console.log(queryObj)
  // var name = queryObj.name;
  if (pathname === '/') {
    pathname = 'index.html';
  }
  var exrName = path.extname(pathname);
  fs.readFile('./static/' + pathname, function(err, data){
    if (err) {
      fs.readFile('./static/404.html', function(err, data){
        res.writeHead(200, {'Content-Type': getType('.html')});
        res.end(data);
      })
    }
    res.writeHead(200, {'Content-Type': getType(exrName)});
    res.end(data);
  });
});

function getType(type) {
  switch(type) {
    case '.html' :
      return 'text/html';
    case '.jpg' :
      return 'image/jpg';
    case '.css' :
      return 'text/css';
    default: break;
  }
}

proxy.listen(3002, '127.0.0.1');