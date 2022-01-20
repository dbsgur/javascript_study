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

var foo = eval('2 + 2');
console.log(foo); // 4

var x = 5;
var y = 4;
console.log(eval('x * y')); // 20

//

console.log(isFinite(Infinity));  // false
console.log(isFinite(NaN));       // false
console.log(isFinite('Hello'));   // false
console.log(isFinite('2005/12/12'));   // false

console.log(isFinite(0));         // true
console.log(isFinite(2e64));      // true
console.log(isFinite('10'));      // true: '10' → 10
console.log(isFinite(null));      // true: null → 0

//

// null이 숫자로 암묵적 강제 형변환이 일어난 경우
Number(null)  // 0
// null이 불리언로 암묵적 강제 형변환이 일어난 경우
Boolean(null) // false

//

isNaN(NaN)       // true
isNaN(undefined) // true: undefined → NaN
isNaN({})        // true: {} → NaN
isNaN('blabla')  // true: 'blabla' → NaN

isNaN(true)      // false: true → 1
isNaN(null)      // false: null → 0
isNaN(37)        // false

// strings
isNaN('37')      // false: '37' → 37
isNaN('37.37')   // false: '37.37' → 37.37
isNaN('')        // false: '' → 0
isNaN(' ')       // false: ' ' → 0

// dates
isNaN(new Date())             // false: new Date() → Number
isNaN(new Date().toString())  // true:  String → NaN

//

parseFloat('3.14');     // 3.14
parseFloat('10.00');    // 10
parseFloat('34 45 66'); // 34
parseFloat(' 60 ');     // 60
parseFloat('40 years'); // 40
parseFloat('He was 40') // NaN

//

parseInt('10', 2);  // 2진수 10 → 10진수 2
parseInt('10', 8);  // 8진수 10 → 10진수 8
parseInt('10', 16); // 16진수 10 → 10진수 16

//

parseInt('1A0'));    // 1
parseInt('102', 2)); // 2
parseInt('58', 8);   // 5
parseInt('FG', 16);  // 15

//

parseInt('34 45 66'); // 34
parseInt(' 60 ');     // 60
parseInt('40 years'); // 40
parseInt('He was 40') // NaN1