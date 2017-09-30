// const fs = require('fs');

// console.time('async');
// // 使用buffer
// fs.readFile('./../node-v6.11.3/lib/_debug_agent.js', 'utf8', (error, data) => {
//   if (error) throw error;
// });
// console.timeEnd('async');
// var buffer = new Buffer(4);
// buffer.write('12');
// console.log(buffer.toString('utf8', 0, 1));


// const regex = /(\d{2}\:\d{2}\.\d{2})|([\u4e00-\u9fa5]+)/g;
// // const regex = /(\(.*?)\)|([\u4e00-\u9fa5]+)/g;
// const line = '[00:42.35]就算一屋暗灯 照不穿我身';
// // const matches = regex.exec(line);
// const matches = line.match(regex)
// console.log('matches', matches);

// const fs = require('fs');
// fs.readFile('./lrc/陈洁丽&许乐-暗涌.lrc', (error, data) => {
//   let words = data.toString('utf8');
//   words = words.split('\r\n');
//   const regex = /(\d{2}\:\d{2}\.\d{2})|([\u4e00-\u9fa5]+)/g;
//   words.forEach((line) => {
//     const matches = line.match(regex);
//     console.log('matches', matches);
//     if (matches) {
//       setTimeout(console.log(line), matches[0])
//     }
//   });
// });

// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.on('line', (answer) => {
//   console.log(`Thank you for your valuable feedback: ${answer}`);
//   // rl.close();
// });

// const fs = require('fs');
// let data = '';
// const streamReader = fs.createReadStream('./lrc/陈洁丽&许乐-暗涌.lrc');
// streamReader.on('data', (chunk) => {
//   data += chunk.toString();
// });
// streamReader.on('end', () => {
//   console.log(data);
// });
// console.log('streamReader', streamReader.toString());

const fs = require('fs');
const path = require('path');
// fs.writeFile('message.txt', 'Hello Node.js', (err) => {
//   if (err) throw err;
//   console.log('The file has been saved!');
// });
// const target = '../code';
const target = path.join(__dirname, process.argv[2] || './');

function load(target, depth) {
  console.log('target', target);
    const dirs = fs.readdirSync(target);
    const filesList = [];
    const dirList = [];
    // const prefix = new Array(depth + 1).join('┃━');
    // console.log(prefix + 111);
    dirs.forEach(element => {
      const file = fs.statSync(path.join(target, element));
      if (file.isFile) {
        dirList.push(element);
      } else {
        filesList.push(element);
      }
    });
    dirList.forEach(ele => {
      // console.log('┃━' +target+ ele);
        load(path.join(target, ele));
    });
    filesList.forEach(ele => {
      // console.log('┃━' + ele);
    });
}
load(target, 0);
