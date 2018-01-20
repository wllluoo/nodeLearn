/* 方法1 ：数组去重， 只能去掉相同类型的相同元素
*  思路 ： 对数组进行排序，则相似的元素将排在一起，再对每一项进行判断是否与相邻的一项相同
*/
// var data = [1, 45, 2, 5, 45, 'aa', 'zxz', 'aa', '45'];

// function unique(array) {
//   if (!Array.isArray(array)) throw new TypeError('这是个数组排序，亲');
//   return data.sort().filter((ele, index) => {
//     return !index || ele !== data[index - 1]
//   })
// }

// console.log(unique(data));


/*
*  方法1 ：数组去重， 只能去掉相同类型的相同元素
*  思路 ： 利用Set去重
*/
// var data2 = [1, 45, 2, 5, 45, 'aa', 'zxz', 'aa', '45'];
// function unique2(array) {
//   if (!Array.isArray(array)) throw new TypeError('这是个数组排序，亲');
//   return Array.from(new Set(array));
// }
// console.log(unique2(data2));

/*
* 手动实现一个深拷贝
* 只考虑数组及对象
*/
// var data = [{ name: 111 }, { name: 222 }, 333];

// function copy(obj) {
//   if (!obj || typeof obj !== 'object') return ;
//   var newObj = obj instanceof Array ? [] : {};
//   for(var key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       newObj[key] = typeof obj[key] === 'object' ? copy(obj[key]) : obj[key];
//     }
//   }
//   return newObj;
// }
// var new_data = copy(data);

// 数组扁平化, 
// reduce API: arr.reduce(callback[, initialValue])
// callback API: 累加器累加回调的返回值, 数组中正在处理的元素, 数组中正在处理的当前元素的索引, 调用reduce的数组
var arr = [1, [2, [3, 4]]];

function flatten(arr) {
  return arr.reduce(function(prev, next){
    return prev.concat(Array.isArray(next) ? flatten(next) : next )
  }, [])
}
console.log(flatten(arr));