var PI = 3.141592653589793; // 상수
var radius = 2; // 변수
var circleArea = PI * radius * radius;
var cylinderHeight = 5;
var cylinderVolume = circleArea * cylinderHeight;

//

var name; // 선언
name = "Hyeok"; // 할당

var age = 30; // 선언과 할당

var person = "Hyeok",
  address = "Seoul",
  price = 200;

var price = 10;
var tax = 1;
var total = price + tax;

//

var x;
console.log(x); // undefined
console.log(y); // ReferenceError

//

var x = 1;
console.log(x); // 1

// 변수의 중복 선언
var x = 100;
console.log(x); // 100

//

var foo;

console.log(typeof foo); // undefined

foo = null;
console.log(typeof foo); // object

foo = {};
console.log(typeof foo); // object

foo = 3;
console.log(typeof foo); // number

foo = 3.14;
console.log(typeof foo); // number

//

console.log(foo); // ① undefined
var foo = 123;
console.log(foo); // ② 123
{
  var foo = 456;
}
console.log(foo); // ③ 456

//

var x;

// 할당문
x = 5;

// 함수 선언문
function foo() {}

// 조건문
if (x > 5) {
}

// 반복문
for (var i = 0; i < 10; i++) {}

//

5 + 2; // 7
5 - 2; // 3
5 * 2; // 10
5 / 2; // 2.5
5 % 2; // 1

//

var x = 5,
  result;

// 선대입 후증가 (Postfix increment operator)
result = x++;
console.log(result, x); // 5 6

// 선증가 후대입 (Prefix increment operator)
result = ++x;
console.log(result, x); // 7 7

// 선대입 후감소 (Postfix decrement operator)
result = x--;
console.log(result, x); // 7 6

// 선감소 후대입 (Prefix decrement operator)
result = --x;
console.log(result, x); // 5 5

//

+10 + // 10
  "10" + // 10
  true + // 1
  false; // 0

//

-10 - // -10
  "10" - // -10
  true - // -1
  false; // -0

//

// 문자열 연결 연산자
"1" + "2"; // '12'
"1" + 2; // '12'

// 산술 연산자
1 + 2; // 3
1 + true; // 2 (true → 1)
1 + false; // 1 (false → 0)
true + false; // 1 (true → 1 / false → 0)
1 + null; // 1 (null → 0)
1 + undefined; // NaN (undefined → NaN)

//

var x;

x = 10; // 10
x += 5; // 15
x -= 5; // 10
x *= 5; // 50
x /= 5; // 10
x %= 5; // 0

var str = "My name is ";
str += "Hyeok"; // My name is Hyeok

//

"" == "0"; // false
0 == ""; // true
0 == "0"; // true

false == "false"; // false
false == "0"; // true

false == undefined; // false
false == null; // false
null == undefined; // true

//

// 일치 비교
5 === 5; // true
5 === "5"; // false

//

isNaN(NaN); // true

//

var x = 2;

// x가 짝수이면 '짝수'를 홀수이면 '홀수'를 반환한다.
// 2 % 2는 0이고 0은 false로 암묵적 타입 변환된다.
var result = x % 2 ? "홀수" : "짝수";

console.log(result); // 짝수

//

// 논리합(||) 연산자
true || true; // true
true || false; // true
false || true; // true
false || false; // false

// 논리곱(&&) 연산자
true && true; // true
true && false; // false
false && true; // false
false && false; // false

// 논리 부정(!) 연산자
!true; // false
!false; // true

//

// 암묵적 타입 변환
!0; // true

//

var x, y, z;
(x = 1), (y = 2), (z = 3); // 3

//

10 * 2 + 3; // 23
10 * (2 + 3); // 50

//

typeof ""; // "string"
typeof 1; // "number"
typeof NaN; // "number"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof Symbol(); // "symbol"
typeof null; // "object"
typeof []; // "object"
typeof {}; // "object"
typeof new Date(); // "object"
typeof /test/gi; // "object"
typeof function () {}; // "function"

//

typeof undeclared; // "undefined"

//

// 블록문
{
  var foo = 10;
  console.log(foo);
}

//

// 월을 영어로 변환한다. (11 → 'November')
var month = 11;
var monthName;

switch (month) {
  case 1:
    monthName = "January";
  case 2:
    monthName = "February";
  case 3:
    monthName = "March";
  case 4:
    monthName = "April";
  case 5:
    monthName = "May";
  case 6:
    monthName = "June";
  case 7:
    monthName = "July";
  case 8:
    monthName = "August";
  case 9:
    monthName = "September";
  case 10:
    monthName = "October";
  case 11:
    monthName = "November";
  case 12:
    monthName = "December";
  default:
    monthName = "Invalid month";
}

console.log(monthName); // Invalid month

//

for (var i = 0; i < 2; i++) {
  console.log(i);
}

//

for (var i = 1; i <= 6; i++) {
  for (var j = 1; j <= 6; j++) {
    if (i + j === 6) console.log(`[${i}, ${j}]`);
  }
}

//

var count = 0;

// 무한루프
while (true) {
  console.log(count);
  count++;
  // count가 3이면 코드 블록을 탈출한다.
  if (count === 3) break;
} // 0 1 2

//

var count = 0;

// count가 3보다 작을 때까지 코드 블록을 계속 반복 실행한다.
do {
  console.log(count);
  count++;
} while (count < 3); // 0 1 2

//

var string = "Hello World.";
var index;

// 문자열은 유사배열이므로 for 문으로 순회할 수 있다.
for (var i = 0; i < string.length; i++) {
  // 문자열의 개별 문자가 'l'이면
  if (string[i] === "l") {
    index = i;
    break; // 반복문을 탈출한다.
  }
}

console.log(index); // 2

// 참고로 String.prototype.indexOf 메소드를 사용해도 같은 동작을 한다.
console.log(string.indexOf("l")); // 2

//

console.log(2 * "10");

//

console.log("Yun" && "Hyeok"); // output : "Hyeok"

console.log("Yun" || "Hyeok"); // Output : "Yun"
