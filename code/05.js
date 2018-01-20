// function test() {
//         var i = 0;
//     // for(var i = 0;i< 10;i++) {
//         (function iterator(i){
//             if (i == 10) return ;
//             console.log(i);
//             iterator(i+1);
//         })(0)
//     // }
// }
// test();

const EventEmitter = require('events');
const myEE = new EventEmitter();
myEE.on('test', (data, time) => {
    console.log(data);
    console.log(time);
});
setInterval(() => {
    myEE.emit('test', '1111', Date.now());
}, 500);