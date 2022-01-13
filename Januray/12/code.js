//================================
//            01. 12
//================================

//산술 연산자
var area = 5 * 4; // 20

//문자열 연산자
var str = "My Name is" + "Hyeok"; //"My name is Hyeok"

//할당 연산자
var color = "red"; //"red"   ??

//비교 연산자
var foo = 3 > 5; //false

//논리 연산자
var bar = 5 > 3 && 2 < 4; //true

//타입 연산자
var type = typeof "Hi"; //"string"

//인스턴스 생성 연산자
var today = new Date(); // ~~

// !! 피연산자의 타입은 반드시 일치할 필요는 없다.
// !! 자바스크립트는 '암묵적 타입 강제 변환을 통해 연산을 수행한다.
var foo = 1 + "10"; // '110'
var bar = 1 * "10"; // 10

// 변수의 선언
var x = 5 + 6;

// 함수의 선언
function foo(arg) {
  // 함수 종료 및 값의 반환
  return ++arg;
}

var i = 0;
// 반복문
while (1) {
  if (i > 5) {
    // 반복문 탈출
    break;
  }
  console.log(i);
  i++;
}
//Output : 0 1 2 3 4 5

//문(statement)과 표현식의 비교
//표현식은 그 자체로 하나의 statement가 될 수 있다.

// 선언문(Declaration statement)
var x = 5 * 10; // 표현식 x = 5 * 10를 포함하는 문이다.
// 할당문(Assignment statement)
x = 100; // 이 자체가 표현식이지만 완전한 문이기도 하다.

//

var person = {
  name: "Hyeok",
  gender: "male",
  sayHello: function () {
    console.log("Hi! My name is " + this.name);
  },
};

console.log(typeof person); // object
console.log(person); // { name: 'Hyeok', gender: 'male', sayHello: [Function: sayHello] }

person.sayHello(); // Hi! My name is Hyeok

//

var arr = [1, 2, 3, 4, 5];

console.log(arr[1]); // Out

//

var foo = "string";
console.log(typeof foo); // string
foo = 1;
console.log(typeof foo); // number

//

console.log(binary); // 65
console.log(octal); // 65
console.log(hex); // 65

// 표기법만 다를뿐 같은 값이다.
console.log(binary === octal); // true
console.log(octal === hex); // true

//

var str = "Hello";
str = "world";
console.log(str); //output : world

//

var str = "string";
// 문자열은 유사배열이다.
for (var i = 0; i < str.length; i++) {
  console.log(str[i]);
  // Output : s t r i n g
}

// 문자열을 변경할 수 없다.
str[0] = "S";
console.log(str); // Output : string

//

var foo = "Hyeok";
foo = null;
console.log(foo);

//

var foo = null;
console.log(typeof foo); // Output : object

//

// 심볼 key는 이름의 충돌 위험이 없는 유일한 객체의 프로퍼티 키
var key = Symbol("key");
console.log(typeof key); // symbol
