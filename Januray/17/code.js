//================================
//            01. 17
//================================

function multiply(x, y) {
  console.log(arguments);
  return x * y;
}

multiply(); // {}
multiply(1); // { '0': 1 }
multiply(1, 2); // { '0': 1, '1': 2 }
multiply(1, 2, 3); // { '0': 1, '1': 2, '2': 3 }

//

//합의 함수
function sum() {
  var res = 0;

  for (var i = 0; i < arguments.length; i++) {
    res += arguments[i];
  }

  return res;
}

console.log(sum()); // 0
console.log(sum(1, 2)); // 3
console.log(sum(1, 2, 3)); // 6

//

function sum() {
  if (!arguments.length) return 0;

  // arguments 객체를 배열로 변환
  var array = Array.prototype.slice.call(arguments);
  return array.reduce(function (pre, cur) {
    return pre + cur;
  });
}

// ES6
function sum(...args) {
  if (!args.length) return 0;
  return args.reduce((pre, cur) => pre + cur);
}

console.log(sum(1, 2, 3, 4, 5)); // 15

//

function foo(func) {
  var res = func();
  return res;
}

function bar() {
  return "caller : " + bar.caller;
}

console.log("foo", foo(bar)); // caller : function foo(func) {...}
console.log("bar", bar()); // null (browser에서의 실행 결과)

//

function foo() {}
console.log(foo.length); // 0

function bar(x) {
  return x;
}
console.log(bar.length); // 1

function baz(x, y) {
  return x * y;
}
console.log(baz.length); // 2

//

// 기명 함수 표현식(named function expression)
var namedFunc = function multiply(a, b) {
  return a * b;
};
// 익명 함수 표현식(anonymous function expression)
var anonymousFunc = function (a, b) {
  return a * b;
};

console.log(namedFunc.name); // multiply
console.log(anonymousFunc.name); // ''

//

// 객체는 __proto__ 프로퍼티를 소유하지 않는다.
console.log(Object.getOwnPropertyDescriptor({}, "__proto__"));
// undefined

// __proto__ 프로퍼티는 모든 객체의 프로토타입 객체인 Object.prototype의 접근자 프로퍼티이다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__"));
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}

// 모든 객체는 Object.prototype의 접근자 프로퍼티 __proto__를 상속받아 사용할 수 있다.
// __proto__ 접근자 프로퍼티를 통해 자신의 프로토타입 객체에 접근할 수 있다.
// 객체 리터럴로 셍성한 객체의 프로토타입 객체는 Object.prototype이다.
console.log({}.__proto__ === Object.prototype); // true

//

// 함수 객체는 prototype 프로퍼티를 소유한다.
console.log(Object.getOwnPropertyDescriptor(function () {}, "prototype"));
// {value: {…}, writable: true, enumerable: false, configurable: false}

// 일반 객체는 prototype 프로퍼티를 소유하지 않는다.
console.log(Object.getOwnPropertyDescriptor({}, "prototype"));
// undefined

//

// 함수선언문은 자바스크립트 엔진에 의해 함수 몸체를 닫는 중괄호 뒤에 ;가 자동 추가된다.
function () {
  // ...
}(); // => };();

// 따라서 즉시 실행 함수는 소괄호로 감싸준다.
(function () {
  // ...
}());

(function () {
  // ...
})();

//

(function () {
  var foo = 1;
  console.log(foo); //output : 1
}());

var foo = 100;
console.log(foo); //output : 100

//

function parent(param) {
  var parentVar = param;
  function child() {
    var childVar = 'lee';
    console.log(parentVar + ' ' + childVar); // Hello lee
  }
  child();
  console.log(parentVar + ' ' + childVar);
  // Uncaught ReferenceError: childVar is not defined
}
parent('Hello');

//

//피보나치
const fibonacci = function(n){
  if(n < 2) return n;
  return fibonacci(n-1) + fibonacci(n-2);
}

//factorial
const factorial = function(n){
  if (n<2) return 1;
  return factorial(n-1) * n;
}

//

function doSomething() {
  var name = 'Lee';

  setTimeout(function () {
    console.log('My name is ' + name);
  }, 100);
}

doSomething(); // My name is Lee

//

typeof '';              // string
typeof 1;               // number
typeof NaN;             // number
typeof true;            // boolean
typeof [];              // object
typeof {};              // object
typeof new String();    // object
typeof new Date();      // object
typeof /test/gi;        // object
typeof function () {};  // function
typeof undefined;       // undefined
typeof null;            // object (설계적 결함)
typeof undeclared;      // undefined (설계적 결함)

//

console.log(undefined == null)
const isArrayLike = function (collection) {
  // 배열 인덱스: 32bit 정수(2의 32제곱 - 1)
  // 유사 배열 인덱스: 자바스크립트로 표현할 수 있는 양의 정수(2의 53제곱 - 1)
  const MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  // 빈문자열은 유사배열이다. undefined == null => true
  const length = collection == null ? undefined : collection.length;
  return typeof length === 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
};
    // true
    console.log(isArrayLike([]));
    console.log(isArrayLike('abc'));
    console.log(isArrayLike(''));
    // console.log(isArrayLike(querySelectorAll('li')));
    // console.log(isArrayLike(document.getElementsByName('li')));
    console.log(isArrayLike({ length: 0 }));
    (function () {
      console.log(isArrayLike(arguments));
    }());

    // false
    console.log(isArrayLike(123));
    // console.log(isArrayLike(document.querySelector('li')));
    console.log(isArrayLike({ foo: 1 }));
    console.log(isArrayLike());
    console.log(isArrayLike(null));

//

var student = {
  name : 'hyeok',
  score : 95
};

// student에는 hasOwnProperty 메소드가 없지만 아래 구문은 동작한다.
console.log(student.hasOwnProperty('name'));
// true

console.dir(student);
//{ name: 'hyeok', score: 95 }

//

function Person(name) {
  this.name = name;
}

var foo = new Person('Lee');

console.dir(Person); // prototype 프로퍼티가 있다.
console.dir(foo);    // prototype 프로퍼티가 없다.

console.log(Person.__proto__ === Function.prototype); //true

console.log(Person.prototype === foo.__proto__); // true

//

function Person(name) {
  this.name = name;
}

var foo = new Person('Lee');

// Person() 생성자 함수에 의해 생성된 객체를 생성한 객체는 Person() 생성자 함수이다.
console.log(Person.prototype.constructor === Person);

// foo 객체를 생성한 객체는 Person() 생성자 함수이다.
console.log(foo.constructor === Person);

// Person() 생성자 함수를 생성한 객체는 Function() 생성자 함수이다.
console.log(Person.constructor === Function);

//

var student = {
  name: 'Lee',
  score: 90
}

// Object.prototype.hasOwnProperty()
console.log(student.hasOwnProperty('name')); // true

//

function Person(name) {
  this.name = name;
}

var foo = new Person('Lee');

Person.prototype.sayHello = function(){
  console.log('Hi! my name is ' + this.name);
};

foo.sayHello();

//
var str = 'test';
console.log(typeof str);                 // string
console.log(str.constructor === String); // true
console.dir(str);                        // test

var strObj = new String('test');
console.log(typeof strObj);                 // object
console.log(strObj.constructor === String); // true
console.dir(strObj);
// {0: "t", 1: "e", 2: "s", 3: "t", length: 4, __proto__: String, [[PrimitiveValue]]: "test" }

console.log(str.toUpperCase());    // TEST
console.log(strObj.toUpperCase()); // TEST

//

var str = 'test';

String.prototype.myMethod = function () {
  return 'myMethod';
};

console.log(str.myMethod());      // myMethod
console.log('string'.myMethod()); // myMethod
console.dir(String.prototype); // { myMethod: [Function (anonymous)] }

//

function Person(name) {
  this.name = name;
}

var foo = new Person('Lee');

// 프로토타입 객체의 변경
Person.prototype = { gender: 'male' };

var bar = new Person('Kim');

console.log(foo.gender); // undefined
console.log(bar.gender); // 'male'

console.log(foo.constructor); // ① Person(name)
console.log(bar.constructor); // ② Object()

//

function Person(name) {
  this.name = name;
}

Person.prototype.gender = 'male'; // ①

var foo = new Person('Lee');
var bar = new Person('Kim');

// 1. foo 객체에 gender 프로퍼티가 없으면 프로퍼티 동적 추가
console.log(foo.gender); // ① 'male'
console.log(bar.gender); // ① 'male'

// 2. foo 객체에 gender 프로퍼티가 있으면 해당 프로퍼티에 값 할당
foo.gender = 'female';   // ②

console.log(foo.gender); // ② 'female'
console.log(bar.gender); // ① 'male'

//

var x = 'global';

function foo () {
  var x = 'function scope';
  console.log(x);
}

foo(); // function scope
console.log(x); // global

//

var x = 0;
{
  var x = 1;
  console.log(x); // 1
}
console.log(x);   // 1

let y = 0;
{
  let y = 1;
  console.log(y); // 1
}
console.log(y);   // 0

//

var x = 'global';

function foo() {
  var x = 'local';
  console.log(x);
}

foo();          // local
console.log(x); // global

//

var x = 'global';

function foo() {
  var x = 'local';
  console.log(x); //local

  function bar() {  // 내부함수
    console.log(x); // local
  }

  bar();
}
foo();
console.log(x); // global

//

var x = 10;

function foo() {
  x = 100;
  console.log(x); // 100
}
foo();
console.log(x); // 100

//

var x = 10;

function foo(){
  var x = 100;
  console.log(x);

  function bar(){   // 내부함수
    x = 1000;
    console.log(x); // 1000
  }

  bar();
}
foo();
console.log(x); // 10

//

var x = 1;

function foo() {
  var x = 10;
  bar();
}

function bar() {
  console.log(x);
}

foo(); // 1
bar(); // 1

//

// 전역 변수 x는 호이스팅이 발생한다.
console.log(x); // undefined
// 전역 변수가 아니라 단지 전역 프로퍼티인 y는 호이스팅이 발생하지 않는다.
console.log(y); // ReferenceError: y is not defined

var x = 10; // 전역 변수

function foo () {
  // 선언하지 않은 변수
  y = 20;
  console.log(x + y);
}

foo(); // 30

//

var x = 10; // 전역 변수

function foo () {
  // 선언하지 않은 변수
  y = 20;
  console.log(x + y);
}

foo(); // 30

console.log(window.x); // 10
console.log(window.y); // 20

delete x; // 전역 변수는 삭제되지 않는다.
delete y; // 프로퍼티는 삭제된다.

console.log(window.x); // 10
console.log(window.y); // undefined

//

(function () {
  var MYAPP = {};

  MYAPP.student = {
    name: 'hyeok',
    gender: 'male'
  };

  console.log(MYAPP.student.name); // hyeok
}());

console.log(MYAPP.student.name); // MYAPP is not defined

//

function foo() {
  x = 10;
}

console.log(x); // 10

//

function square(number) {

  console.log(arguments); //[Arguments] { '0': 2 }
  console.log(this); //<ref *1> Object [global] {...

  return number * number;
}

square(2);

//

var foo = function () {
  console.dir(this);
};

// 1. 함수 호출
foo(); // = window.foo();

// 2. 메소드 호출
var obj = { foo: foo };
obj.foo(); // obj

// 3. 생성자 함수 호출
var instance = new foo(); // instance

// 4. apply/call/bind 호출
var bar = { name: 'bar' };
foo.call(bar);   // bar
foo.apply(bar);  // bar
foo.bind(bar)(); // bar

//

var value = 1;

var obj = {
  value: 100,
  foo: function() {
    setTimeout(function() {
      console.log("callback's this: ",  this);  // window
      console.log("callback's this.value: ",  this.value); // 1
    }, 100);
  }
};

obj.foo();

//

var obj1 = {
  name: 'Lee',
  sayName: function() {
    console.log(this.name);
  }
}

var obj2 = {
  name: 'Kim'
}

obj2.sayName = obj1.sayName;

obj1.sayName(); // Lee
obj2.sayName(); // Kim

//

// 생성자 함수
function Person(name) {
  this.name = name;
}

var me = new Person('Lee');
console.log(me); // Person { name: 'Lee' }

// new 연산자와 함께 생성자 함수를 호출하지 않으면 생성자 함수로 동작하지 않는다.
var you = Person('Kim');
console.log(you); // undefined

//

function Person(name) {
  // 생성자 함수 코드 실행 전 -------- 1
  this.name = name;  // --------- 2
  // 생성된 함수 반환 -------------- 3
}

var me = new Person('Lee');
console.log(me.name); //Lee

//

// 객체 리터럴 방식
var foo = {
  name: 'foo',
  gender: 'male'
}

console.dir(foo); // { name: 'foo', gender: 'male' }

// 생성자 함수 방식
function Person(name, gender) {
  this.name = name;
  this.gender = gender;
}

var me  = new Person('Lee', 'male');
console.dir(me); // Person { name: 'Lee', gender: 'male' }

var you = new Person('Kim', 'female');
console.dir(you); // Person { name: 'Kim', gender: 'female' }

//

function Person(name) {
  // new없이 호출하는 경우, 전역객체에 name 프로퍼티를 추가
  this.name = name;
};

// 일반 함수로서 호출되었기 때문에 객체를 암묵적으로 생성하여 반환하지 않는다.
// 일반 함수의 this는 전역객체를 가리킨다.
var me = Person('Lee');

console.log(me); // undefined
console.log(window.name); // Lee

//

// Scope-Safe Constructor Pattern
function A(arg) {
  // 생성자 함수가 new 연산자와 함께 호출되면 함수의 선두에서 빈객체를 생성하고 this에 바인딩한다.

  /*
  this가 호출된 함수(arguments.callee, 본 예제의 경우 A)의 인스턴스가 아니면 new 연산자를 사용하지 않은 것이므로 이 경우 new와 함께 생성자 함수를 호출하여 인스턴스를 반환한다.
  arguments.callee는 호출된 함수의 이름을 나타낸다. 이 예제의 경우 A로 표기하여도 문제없이 동작하지만 특정함수의 이름과 의존성을 없애기 위해서 arguments.callee를 사용하는 것이 좋다.
  */
  if (!(this instanceof arguments.callee)) {
    return new arguments.callee(arg);
  }

  // 프로퍼티 생성과 값의 할당
  this.value = arg ? arg : 0;
}

var a = new A(100);
var b = A(10);

console.log(a.value); // 100
console.log(b.value); // 10

//

var Person = function (name) {
  this.name = name;
};

var foo = {};

// apply 메소드는 생성자함수 Person을 호출한다. 이때 this에 객체 foo를 바인딩한다.
Person.apply(foo, ['name']);

console.log(foo); // { name: 'name' }

//

var Person = function (name) {
  this.name = name;
};

var foo = {};

// apply 메소드는 생성자함수 Person을 호출한다. 이때 this에 객체 foo를 바인딩한다.
Person.apply(foo, ['name']);

console.log(foo); // { name: 'name' }

//

function convertArgsToArray() {
  console.log(arguments); //[Arguments] { '0': 1, '1': 2, '2': 3 }

  // arguments 객체를 배열로 변환
  // slice: 배열의 특정 부분에 대한 복사본을 생성한다.
  var arr = Array.prototype.slice.apply(arguments); // arguments.slice
  // var arr = [].slice.apply(arguments);

  console.log(arr); //[ 1, 2, 3 ]
  return arr;
}

convertArgsToArray(1, 2, 3);

//

Person.apply(foo, [1, 2, 3]);

Person.call(foo, 1, 2, 3);