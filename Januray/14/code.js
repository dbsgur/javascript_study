var hyeok = {
  age: 28,
  home: "busan",
  sayHello: function () {
    console.log("Hi, My home in " + this.home);
  },
};

console.log(hyeok);
// output :  { age: 28, home: 'busan', sayHello: [Function: sayHello] }

hyeok.sayHello();
// output : Hi, My home in busan

//

//빈객체의 생성
var hyeok = new Object();
// 프로퍼티 추가
hyeok.age = 28;
hyeok.home = "busan";
hyeok.sayHello = function () {
  console.log("Hi, My home in " + this.home);
};

console.log(hyeok);
// output : { age: 28, home: 'busan', sayHello: [Function (anonymous)] }

hyeok.sayHello();
// output : Hi, My home in busan

//

//생성자 함수
function Person(name, gender) {
  this.name = name;
  this.gender = gender;
  this.sayHello = function () {
    console.log("Hi, My name is " + this.name);
  };
}

//인스턴스 생성
var yun = new Person('yun', 'male');
var hyeok = new Person('hyeok', 'male');

console.log('yun : ', yun);
//output
//yun :  Person {
//  name: 'yun',
//  gender: 'male',
//  sayHello: [Function (anonymous)]
//}
console.log('hyeok : ', hyeok);
//output
//hyeok :  Person {
//  name: 'hyeok',
//  gender: 'male',
//  sayHello: [Function (anonymous)]
//}

yun.sayHello();
//output : Hi, My name is yun
hyeok.sayHello();
//output : Hi, My name is hyeok

//

var hyeok = {
  "first-name" : 'yun',
}
//good

var hyeok = {
  first-name : yun
}
//SyntaxError: Unexpected token '-'

var hyeok = {
  [first-name] : yun,
}
//ReferenceError: first is not defined

//

var hyeok = {
  first_name : "yun",
}

console.log(hyeok.first_name);
//output : yun
console.log(hyeok['first_name']);
//output : yun

var hyeok = {
  "first-name" : "yun",
}

console.log(hyeok['first-name']);
//output : yun

console.log(hyeok.age);
//output : undefined

//

var hyeok = {
  first_name : 'yun'
}

hyeok['first_name'] = 'kim';
console.log(hyeok['first_name']);
//output : kim

//

var hyeok = {
  first_name : 'yun'
}

hyeok['age'] = 28;
console.log(hyeok['age']);
//output : 28

//

var hyeok = {
  age : 28,
  first_name : "yun",
  home : 'busan'
}

delete hyeok.age;
console.log(hyeok.age);
//output : undefined

delete hyeok['first_name'];
console.log(hyeok);
//output : { home: 'busan' }

//
var person = {
  "first-name" : 'hyeok',
  'last-name' : 'yun',
  age : 28,
}

// prop에 객체의 프로퍼티 이름이 반환된다. 단, 순서는 보장하지 않는다.
for (var prop in person){
  console.log(prop + ' : ' + person[prop]);
}
// first-name : hyeok
// last-name : yun
// age : 28

var array = ['apple', 'banana'];

for (var index in array){
  console.log(index + ' : ' + array[index]);
}
//0 :  apple
//1 :  banana

//

var array = ['apple', 'banana'];
array.fruit = 'straw';

for (var index in array) console.log(index + ' : ' + array[index]);
var person = {
  "first-name" : 'hyeok',
  'last-name' : 'yun',
  age : 28,
}

// prop에 객체의 프로퍼티 이름이 반환된다. 단, 순서는 보장하지 않는다.
for (var prop in person){
  console.log(prop + ' : ' + person[prop]);
}
// first-name : hyeok
// last-name : yun
// age : 28

//

var array = ['apple', 'banana'];

for (var index in array){
  console.log(index + ' : ', array[index]);
}
// 0 : apple
// 1 : banana
// fruit : straw

//

var array = [1, 2, 3];
array.plus = 'test';

for (var value of array){
  console.log(value);
}
// 1 2 3
for (const [index, value] of array.entries())console.log(index, value);
// 0 1
// 1 2
// 2 3

//

var foo = {
  val: 10
}

var bar = foo;
console.log(foo.val, bar.val); // 10 10
console.log(foo === bar);      // true

bar.val = 20;
console.log(foo.val, bar.val); // 20 20
console.log(foo === bar);      // true

//

var foo = { val: 10 };
var bar = { val: 10 };

console.log(foo.val, bar.val); // 10 10
console.log(foo === bar);      // false

var baz = bar;

console.log(baz.val, bar.val); // 10 10
console.log(baz === bar);      // true

//

var a = {}, b = {}, c = {}; // a, b, c는 각각 다른 빈 객체를 참조
console.log(a === b, a === c, b === c); // false false false

a = b = c = {}; // a, b, c는 모두 같은 빈 객체를 참조
console.log(a === b, a === c, b === c); // true true true

//

// Pass-by-value
var a = 1;
var b = a;

console.log(a, b);    // 1  1
console.log(a === b); // true

a = 10;
console.log(a, b);    // 1  10
console.log(a === b); // false




