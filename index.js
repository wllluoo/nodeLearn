// function test () {
//     (function() {
//         for(var i =0;i<5;i++) {
//
//         }
//     })()
//
// }
// test();
//
//
// console.log(i);


// var name = 2222;
// var obj = {
//     name: 'sdsd',
//     getName: function(num) {
//         return function(aa) {
//             return aa + num;
//         }
//     }
// }
// console.log(obj.getName(50)(5));
// console.log(test(5));

// console.log(obj.getName()())

// function createName(name) {
//     var obj = new Object();
//     obj.name = name;
//     return obj;
// }
//
// var p1 = createName('pppp'); // {name: 'pppp'}

// function Person(name) {
// }
// var obj = Person.prototype;   // obj 即为Person function
// obj.name = 'ppp';
// var p1 = new Person();
// var p2 = new Person();
// p1.name = 1111;
//
// console.log(p1.name, p2.name);

// function Person() {
//
// }
//
// Person.prototype.name = 1111;
//
// var p1 = new Person();
// p1.name = 222;
// console.log(p1.name);

// // 封装一个建议的遍历数组的方法
// const list = [1,2,3,[4,5,[6,7]]];
// Array.prototype.each = function(fn, index) {
//     try {
//         this.i || (this.i = 0); // 记录每一项的下标
//         if ((this.length > 0) && (fn.constructor === Function)){ // 第一步永远是类型检查及错误排查
//             while(this.i < this.length) {
//                 const e = this[this.i];
//                 if (e.constructor === Array) {
//                     e.each(fn); // 对类型为数组的元素，做递归
//                 } else {
//                     fn.call(e, e); // 将fn绑定在每一项中，并传值，使外部调用时获得每一项元素。
//                 }
//
//                 this.i++;
//             }
//             this.i = null;
//         }
//     } catch(e) {
//         console.log(e);
//     }
//     return this;
// }
//
// list.each(function(item){
//     console.log(item);// 1 2 3 4 5 6 7
// })


// function LazyMan(name) {
// 	var task = [];
// 	var next = function() {
// 		var fn = task.shift();
// 		fn && setTimeout(fn);;
// 	};
// 	var print = function(msg) {
// 		document.write(msg + "<br>");
// 	};
// 	var man = {
// 		hi: (name) => {
// 			task.push(() => {
// 				print('hi ' + name);
// 				next();
// 			});
// 			return this;
// 		},
// 		eat: function(thing) {
// 			task.push(function() {
// 				print("eat " + thing + "~");
// 				next();
// 			});
// 			return this;
// 		},
// 		sleepFirst: function(time) {
// 			task.unshift(function() {
// 				setTimeout(function() {
// 					print("Wake up after " + time);
// 					next();
// 				}, time * 1000);
// 			});
// 			return this;
// 		}
// 	}
// 	man.hi(name);  
// 	setTimeout(next)
// 	return man; // 返回一个包含三个方法的man对象，供链式使用
// }
// function LazyMan(name) {
// 	if (!(this instanceof LazyMan)) return new LazyMan(name);
// 	this.tasks = [];
// 	this.hi(name);
// 	setTimeout(this.next.bind(this));
// }
// LazyMan.prototype = {
// 	print: function(msg) {
// 		document.write(msg + "<br>");
// 	},
// 	next: function() {
// 		var fn = this.tasks.shift();
// 		fn && setTimeout(fn.bind(this));
// 	},
// 	hi: function(name) {
// 		this.tasks.push(function() {
// 			this.print("Hi! This is " + name + "!");
// 			this.next();
// 		});
// 		return this;
// 	},
// 	eat: function(thing) {
// 		this.tasks.push(function() {
// 			this.print("eat " + thing + "~");
// 			this.next();
// 		});
// 		return this;
// 	},
// 	sleep: function(time) {
// 		this.tasks.push(function() {
// 			setTimeout(function() {
// 				this.print("Wake up after " + time);
// 				this.next();
// 			}.bind(this), time * 1000);
// 		});
// 		return this;
// 	},
// 	sleepFirst: function(time) {
// 		this.tasks.unshift(function() {
// 			setTimeout(function() {
// 				this.print("Wake up after " + time);
// 				this.next();
// 			}.bind(this), time * 1000);
// 		});
// 		return this;
// 	}
// };
// LazyMan("Hank").sleepFirst(3).eat("supper")

function LazyMan(name) {
	if (!(this instanceof LazyMan)) return new LazyMan(name);
	this.task = [];
	this.hi(name);
	setTimeout(this.next.bind(this));
}
LazyMan.prototype = {
	next: function(name) {
		var fn = this.task.shift();
		fn && setTimeout(fn.bind(this));
	},
	hi: function (name) {
		this.task.push(() => {
			this.print('hi ' + name);
			this.next();
		});
		return this;
	},
	print: function(msg) {
		document.write(msg + "<br>");
	},
	eat: function(thing) {
		this.task.push(function() {
			this.print("eat " + thing + "~");
			this.next();
		});
		return this;
	},
	sleepFirst: function(time) {
		this.task.unshift(function() {
			setTimeout(function() {
				this.print("Wake up after " + time);
				this.next();
			}.bind(this), time * 1000);
		});
		return this;
	}
};


class LazyMan {
	constructor(name) {
		this.task = [];
		this.hi(name);
		setTimeout(this.next.bind(this));
	}
	

}

function LazyMan(name) {

	return new LazyMan(name);
}

LazyMan("Hank").sleepFirst(3).eat('supper')


