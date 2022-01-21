//================================
//            01. 20
//================================

// 변수 o에 빈 객체를 저장한다
var o = new Object();
console.log(typeof o + ": ", o); // Output : object:  {}

o = new Object(undefined);
console.log(typeof o + ": ", o); // Output : object:  {}

o = new Object(null);
console.log(typeof o + ": ", o); // Output : object:  {}

//

// String 객체를 반환한다
// var obj = new String('String');과 동치이다
var obj = new Object("String");
console.log(typeof obj + ": ", obj); //object:  [String: 'String']
console.dir(obj); //[String: 'String']

var strObj = new String("String");
console.log(typeof strObj + ": ", strObj); //object:  [String: 'String']

// Number 객체를 반환한다
// var obj = new Number(123);과 동치이다
var obj = new Object(123);
console.log(typeof obj + ": ", obj); //object:  [Number: 123]

var numObj = new Number(123);
console.log(typeof numObj + ": ", numObj); //object:  [Number: 123]

// Boolean 객체를 반환한다.
// var obj = new Boolean(true);과 동치이다
var obj = new Object(true);
console.log(typeof obj + ": ", obj); //object:  [Boolean: true]

var boolObj = new Boolean(123);
console.log(typeof boolObj + ": ", boolObj); //object:  [Boolean: true]

//

var adder = new Function("a", "b", "return a + b");

adder(2, 6); // 8

//

var foo = new Boolean(true); // [Boolean: true]
var foo = new Boolean("false"); // [Boolean: true]

var foo = new Boolean(false); // [Boolean: false]
var foo = new Boolean(); // [Boolean: false]
var foo = new Boolean(""); // [Boolean: false]
var foo = new Boolean(0); // [Boolean: false]
var foo = new Boolean(null); // [Boolean: false]

//

var x = new Boolean(false);
if (x) {
  // x는 객체로서 존재한다. 따라서 참으로 간주된다.
  // . . . 이 코드는 실행된다.
}

//

try {
  // foo();
  throw new Error("Whoops!");
} catch (e) {
  console.log(e.name + ": " + e.message); //Error: Whoops!
}

//

var str = "Hello world!";
var res = str.toUpperCase();
console.log(res); // 'HELLO WORLD!'

var num = 1.5;
console.log(num.toFixed()); // 2

//

// in browser console
this === window; // true

// in Terminal
node;
this === global; // true

//

var ga = "Global variable";
console.log(ga); // Global variable
console.log(window.ga); // Global variable

//

function foo() {
  console.log("invoked!");
}
window.foo();

//

console.log(window.Infinity); // Infinity

console.log(3 / 0); // Infinity
console.log(-3 / 0); // -Infinity
console.log(Number.MAX_VALUE * 2); // 1.7976931348623157e+308 * 2
console.log(typeof Infinity); // number

//

console.log(window.NaN); // NaN

console.log(Number("xyz")); // NaN
console.log(1 * "string"); // NaN
console.log(typeof NaN); // number

//

console.log(window.undefined); // undefined

var foo;
console.log(foo); // undefined
console.log(typeof undefined); // undefined

//

var foo = eval("2 + 2");
console.log(foo); // 4

var x = 5;
var y = 4;
console.log(eval("x * y")); // 20

//

console.log(isFinite(Infinity)); // false
console.log(isFinite(NaN)); // false
console.log(isFinite("Hello")); // false
console.log(isFinite("2005/12/12")); // false

console.log(isFinite(0)); // true
console.log(isFinite(2e64)); // true
console.log(isFinite("10")); // true: '10' → 10
console.log(isFinite(null)); // true: null → 0

//

// null이 숫자로 암묵적 강제 형변환이 일어난 경우
Number(null); // 0
// null이 불리언로 암묵적 강제 형변환이 일어난 경우
Boolean(null); // false

//

isNaN(NaN); // true
isNaN(undefined); // true: undefined → NaN
isNaN({}); // true: {} → NaN
isNaN("blabla"); // true: 'blabla' → NaN

isNaN(true); // false: true → 1
isNaN(null); // false: null → 0
isNaN(37); // false

// strings
isNaN("37"); // false: '37' → 37
isNaN("37.37"); // false: '37.37' → 37.37
isNaN(""); // false: '' → 0
isNaN(" "); // false: ' ' → 0

// dates
isNaN(new Date()); // false: new Date() → Number
isNaN(new Date().toString()); // true:  String → NaN

//

parseFloat("3.14"); // 3.14
parseFloat("10.00"); // 10
parseFloat("34 45 66"); // 34
parseFloat(" 60 "); // 60
parseFloat("40 years"); // 40
parseFloat("He was 40"); // NaN

//

parseInt("10", 2); // 2진수 10 → 10진수 2
parseInt("10", 8); // 8진수 10 → 10진수 8
parseInt("10", 16); // 16진수 10 → 10진수 16

//

parseInt("1A0"); // 1
parseInt("102", 2); // 2
parseInt("58", 8); // 5
parseInt("FG", 16); // 15

//

parseInt("34 45 66"); // 34
parseInt(" 60 "); // 60
parseInt("40 years"); // 40
parseInt("He was 40"); // NaN1

//

var x = new Number(123);
var y = new Number("123");
var z = new Number("str");

console.log(x); // 123
console.log(y); // 123
console.log(z); // NaN

//

var x = Number("123");

console.log(typeof x, x); // number 123
var x = 123;
var y = new Number(123);

console.log(x == y); // true
console.log(x === y); // false

console.log(typeof x); // number
console.log(typeof y); // object

console.log(0.1 + 0.2 == 0.3); //false
console.log(0.1 + 0.2 === 0.3); // false

//

let num = Number.MIN_VALUE;
let num2 = Number.EPSILON;
console.log(num > num2); // false

//

console.log(Math.PI); // 3.141592653589793

//

Math.abs(-1); // 1
Math.abs("-1"); // 1
Math.abs(""); // 0
Math.abs([]); // 0
Math.abs(null); // 0
Math.abs(undefined); // NaN
Math.abs({}); // NaN
Math.abs("string"); // NaN
Math.abs(); // NaN

//

Math.round(1.4); // 1
Math.round(1.6); // 2
Math.round(-1.4); // -1
Math.round(-1.6); // -2
Math.round(1); // 1
Math.round(); // NaN

//

Math.ceil(1.4); // 2
Math.ceil(1.6); // 2
Math.ceil(-1.4); // -1
Math.ceil(-1.6); // -1
Math.ceil(1); // 1
Math.ceil(); // NaN

//

Math.floor(1.9); // 1
Math.floor(9.1); // 9
Math.floor(-1.9); // -2
Math.floor(-9.1); // -10
Math.floor(1); // 1
Math.floor(); // NaN

//

Math.sqrt(9); // 3
Math.sqrt(-9); // NaN
Math.sqrt(2); // 1.414213562373095
Math.sqrt(1); // 1
Math.sqrt(0); // 0
Math.sqrt(); // NaN

//

console.log(Math.random()); //0.8783158693612994
console.log(Math.random()); //0.5035764564166014
console.log(Math.random()); //0.5401335854352005
console.log(Math.random()); //0.20211878096296343

//

Math.pow(2, 8); // 256
Math.pow(2, -1); // 0.5
Math.pow(2); // NaN

// ES7(ECMAScript 2016) Exponentiation operator(거듭 제곱 연산자)
2 ** 8; // 256

//

Math.max(1, 2, 3); // 3

// 배열 요소 중에서 최대값 취득
const arr = [1, 2, 3];
const max = Math.max.apply(null, arr); // 3

// ES6 Spread operator
Math.max(...arr); // 3

//

Math.min(1, 2, 3); // 1

// 배열 요소 중에서 최소값 취득
const arr = [1, 2, 3];
const min = Math.min.apply(null, arr); // 1

// ES6 Spread operator
Math.min(...arr); // 1

//

//약수의 합
