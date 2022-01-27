let strObj = new String("Lee");
console.log(strObj); // String {0: 'L', 1: 'e', 2: 'e', length: 3, [[PrimitiveValue]]: 'Lee'}

strObj = new String(1);
console.log(strObj); // String {0: '1', length: 1, [[PrimitiveValue]]: '1'}

strObj = new String(undefined);
console.log(strObj); // String {0: 'u', 1: 'n', 2: 'd', 3: 'e', 4: 'f', 5: 'i', 6: 'n', 7: 'e', 8: 'd', length: 9, [[PrimitiveValue]]: 'undefined'}

//

var x = String("Lee");

console.log(typeof x, x); // string Lee

//

const str = "Lee";
const strObj = new String("Lee");

console.log(str == strObj); // true
console.log(str === strObj); // false

console.log(typeof str); // string
console.log(typeof strObj); // object

//

const str1 = "Hello";
console.log(str1.length); // 5

const str2 = "안녕하세요!";
console.log(str2.length); // 6

//

const str = "Hello";

console.log(str.charAt(0)); // H
console.log(str.charAt(1)); // e
console.log(str.charAt(2)); // l
console.log(str.charAt(3)); // l
console.log(str.charAt(4)); // o
// 지정한 index가 범위(0 ~ str.length-1)를 벗어난 경우 빈문자열을 반환한다.
console.log(str.charAt(5)); // ''

// 문자열 순회. 문자열은 length 프로퍼티를 갖는다.
for (let i = 0; i < str.length; i++) {
  console.log(str.charAt(i));
}

// String 객체는 유사 배열 객체이므로 배열과 유사하게 접근할 수 있다.
for (let i = 0; i < str.length; i++) {
  console.log(str[i]); // str['0']
}

//

console.log("Hello ".concat("Lee")); // Hello Lee

//

const str = "Hello World";

console.log(str.indexOf("l")); // 2
console.log(str.indexOf("or")); // 7
console.log(str.indexOf("or", 8)); // -1

if (str.indexOf("Hello") !== -1) {
  // 문자열 str에 'hello'가 포함되어 있는 경우에 처리할 내용
}

// ES6: String.prototype.includes
if (str.includes("Hello")) {
  // 문자열 str에 'hello'가 포함되어 있는 경우에 처리할 내용
}

//

const str = "Hello World";

console.log(str.lastIndexOf("World")); // 6
console.log(str.lastIndexOf("l")); // 9
console.log(str.lastIndexOf("o", 5)); // 4
console.log(str.lastIndexOf("o", 8)); // 7
console.log(str.lastIndexOf("l", 10)); // 9

console.log(str.lastIndexOf("H", 0)); // 0
console.log(str.lastIndexOf("W", 5)); // -1
console.log(str.lastIndexOf("x", 8)); // -1

//

const str = "Hello world";

// 첫번째로 검색된 문자열만 대체하여 새로운 문자열을 반환한다.
console.log(str.replace("world", "Lee")); // Hello Lee

// 특수한 교체 패턴을 사용할 수 있다. ($& => 검색된 문자열)
console.log(str.replace("world", "<strong>$&</strong>")); // Hello <strong>world</strong>

/* 정규표현식
g(Global): 문자열 내의 모든 패턴을 검색한다.
i(Ignore case): 대소문자를 구별하지 않고 검색한다.
*/
console.log(str.replace(/hello/gi, "Lee")); // Lee world

// 두번째 인수로 치환 함수를 전달할 수 있다.
// camelCase => snake_case
const camelCase = "helloWorld";

// /.[A-Z]/g => 1문자와 대문자의 조합을 문자열 전체에서 검색한다.
console.log(
  camelCase.replace(/.[A-Z]/g, function (match) {
    // match : oW => match[0] : o, match[1] : W
    return match[0] + "_" + match[1].toLowerCase();
  })
); // hello_world

// /(.)([A-Z])/g => 1문자와 대문자의 조합
// $1 => (.)
// $2 => ([A-Z])
console.log(camelCase.replace(/(.)([A-Z])/g, "$1_$2").toLowerCase()); // hello_world

// snake_case => camelCase
const snakeCase = "hello_world";

// /_./g => _와 1문자의 조합을 문자열 전체에서 검색한다.
console.log(
  snakeCase.replace(/_./g, function (match) {
    // match : _w => match[1] : w
    return match[1].toUpperCase();
  })
); // helloWorld

//

const str = "How are you doing?";

// 공백으로 구분(단어로 구분)하여 배열로 반환한다
console.log(str.split(" ")); // [ 'How', 'are', 'you', 'doing?' ]

// 정규 표현식
console.log(str.split(/\s/)); // [ 'How', 'are', 'you', 'doing?' ]

// 인수가 없는 경우, 대상 문자열 전체를 단일 요소로 하는 배열을 반환한다.
console.log(str.split()); // [ 'How are you doing?' ]

// 각 문자를 모두 분리한다
console.log(str.split("")); // [ 'H','o','w',' ','a','r','e',' ','y','o','u',' ','d','o','i','n','g','?' ]

// 공백으로 구분하여 배열로 반환한다. 단 요소수는 3개까지만 허용한다
console.log(str.split(" ", 3)); // [ 'How', 'are', 'you' ]

// 'o'으로 구분하여 배열로 반환한다.
console.log(str.split("o")); // [ 'H', 'w are y', 'u d', 'ing?' ]

//

const str = "Hello World"; // str.length == 11

console.log(str.substring(1, 4)); // ell

// 첫번째 인수 > 두번째 인수 : 두 인수는 교환된다.
console.log(str.substring(4, 1)); // ell

// 두번째 인수가 생략된 경우 : 해당 문자열의 끝까지 반환한다.
console.log(str.substring(4)); // o World

// 인수 < 0 또는 NaN인 경우 : 0으로 취급된다.
console.log(str.substring(-2)); // Hello World

// 인수 > 문자열의 길이(str.length) : 인수는 문자열의 길이(str.length)으로 취급된다.
console.log(str.substring(1, 10)); // ello Worl
console.log(str.substring(1, 11)); // ello World
console.log(str.substring(11)); // ''
console.log(str.substring(20)); // ''
console.log(str.substring(0, str.indexOf(" "))); // 'Hello'
console.log(str.substring(str.indexOf(" ") + 1, str.length)); // 'World'

//

const str = "hello world";

// 인수 < 0 또는 NaN인 경우 : 0으로 취급된다.
console.log(str.substring(-5)); // 'hello world'
// 뒤에서 5자리를 잘라내어 반환한다.
console.log(str.slice(-5)); // 'world'

// 2번째부터 마지막 문자까지 잘라내어 반환
console.log(str.substring(2)); // llo world
console.log(str.slice(2)); // llo world

// 0번째부터 5번째 이전 문자까지 잘라내어 반환
console.log(str.substring(0, 5)); // hello
console.log(str.slice(0, 5)); // hello

//

console.log("Hello World!".toLowerCase()); // hello world!
onsole.log("Hello World!".toUpperCase()); // HELLO WORLD!

//

const str = "   foo  ";

console.log(str.trim()); // 'foo'

// String.prototype.replace
// \s : 여러가지 공백 문자 (스페이스, 탭 등)
// ^ : 문자열의 처음
// $ : 문자열의 끝
console.log(str.replace(/\s/g, "")); // 'foo'
console.log(str.replace(/^\s+/g, "")); // 'foo  '
console.log(str.replace(/\s+$/g, "")); // '   foo'

// String.prototype.{trimStart,trimEnd} : Proposal stage 3
console.log(str.trimStart()); // 'foo  '
console.log(str.trimEnd()); // '   foo'

//

console.log("abc".repeat(0)); // ''
console.log("abc".repeat(1)); // 'abc'
console.log("abc".repeat(2)); // 'abcabc'
console.log("abc".repeat(2.5)); // 'abcabc' (2.5 → 2)
console.log("abc".repeat(-1)); // RangeError: Invalid count value

//

const str = "hello world";

console.log(str.includes("hello")); // true
console.log(str.includes(" ")); // true
console.log(str.includes("wo")); // true
console.log(str.includes("wow")); // false
console.log(str.includes("")); // true
console.log(str.includes()); // false

// String​.prototype​.indexOf 메소드로 대체할 수 있다.
console.log(str.indexOf("hello")); // 0

//

const arr = [];
console.log(arr[1]); //undefined

const arr = ["zero", "one"];
console.log(arr[1]); // 'one'
console.log(typeof arr); //object

//

const emptyArr = [];
const emptyObj = {};

console.dir(emptyArr.__proto__);
console.dir(emptyObj.__proto__);

//

const arr = new Array(2);
console.log(arr); // [ <2 empty items> ]
const arr = new Array(1, 2, 3);
console.log(arr); // [1, 2, 3]

//

const arr = [];
console.log(arr[0]); // undefined

arr[1] = 1;
arr[3] = 3;

console.log(arr); // [ <1 empty item>, 1, <1 empty item>, 3 ]
console.log(arr.lenth); // 4

//

const numbersArr = ["zero", "one", "two", "three"];

// 요소의 값만 삭제된다
delete numbersArr[2]; // [ 'zero', 'one', <1 empty item>, 'three' ]
console.log(numbersArr);

// 요소 값만이 아니라 요소를 완전히 삭제한다
// splice(시작 인덱스, 삭제할 요소수)
numbersArr.splice(2, 1); // ["zero", "one", "three"]
console.log(numbersArr);

//

const arr = [0, 1, 2, 3];
arr.foo = 10;

for (const key in arr) {
  console.log("key: " + key, "value: " + arr[key]);
}
// key: 0 value: 0
// key: 1 value: 1
// key: 2 value: 2
// key: 3 value: 3
// key: foo value: 10 => 불필요한 프로퍼티까지 출력

arr.forEach((item, index) => console.log(index, item));
// 0 0 1 1 2 2 3 3
for (let i = 0; i < arr.length; i++) {
  console.log(i, arr[i]); // 0 0 1 1 2 2 3 3
}

for (const item of arr) {
  console.log(item); // 0 1 2 3
}

//

const arr = [1, 2, 3, 4, 5];

// 배열 길이의 명시적 변경
arr.length = 3;
console.log(arr); // [1, 2, 3]

//

// true
Array.isArray([]);
Array.isArray([1, 2]);
Array.isArray(new Array());

// false
Array.isArray();
Array.isArray({});
Array.isArray(null);
Array.isArray(undefined);
Array.isArray(1);
Array.isArray("Array");
Array.isArray(true);
Array.isArray(false);

//

// 문자열은 이터러블이다.
const arr1 = Array.from("Hello");
console.log(arr1); // [ 'H', 'e', 'l', 'l', 'o' ]

// 유사 배열 객체를 새로운 배열을 변환하여 반환한다.
const arr2 = Array.from({ length: 2, 0: "a", 1: "b" });
console.log(arr2); // [ 'a', 'b' ]

// Array.from의 두번째 매개변수에게 배열의 모든 요소에 대해 호출할 함수를 전달할 수 있다.
// 이 함수는 첫번째 매개변수에게 전달된 인수로 생성된 배열의 모든 요소를 인수로 전달받아 호출된다.
const arr3 = Array.from({ length: 5 }, function (v, i) {
  return i;
});
console.log(arr3); // [ 0, 1, 2, 3, 4 ]

//

const arr = new Array(2);
console.log(arr); // [ <2 empty items> ]
// 전달된 인수가 1개이고 숫자이더라도 인수를 요소로 갖는 배열을 생성한다.
const arr1 = Array.of(1);
console.log(arr1); // // [1]

const arr2 = Array.of(1, 2, 3);
console.log(arr2); // [1, 2, 3]

const arr3 = Array.of("string");
console.log(arr3); // 'string'

//

const arr = [1, 2, 2, 3];

// 배열 arr에서 요소 2를 검색하여 첫번째 인덱스를 반환
arr.indexOf(2); // -> 1
// 배열 arr에서 요소 4가 없으므로 -1을 반환
arr.indexOf(4); // -1
// 두번째 인수는 검색을 시작할 인덱스이다. 두번째 인수를 생략하면 처음부터 검색한다.
arr.indexOf(2, 2); // 2

//

const foods = ["apple", "banana", "orange"];

// foods 배열에 'orange' 요소가 존재하는지 확인
if (foods.indexOf("orange") === -1) {
  // foods 배열에 'orange' 요소가 존재하지 않으면 'orange' 요소를 추가
  foods.push("orange");
}

console.log(foods); // ["apple", "banana", "orange"]

//

const arr1 = [1, 2];
const arr2 = [3, 4];

// 배열 arr2를 원본 배열 arr1의 마지막 요소로 추가한 새로운 배열을 반환
// 인수로 전달한 값이 배열인 경우, 배열을 해체하여 새로운 배열의 요소로 추가한다.
let result = arr1.concat(arr2);
console.log(result); // [1, 2, 3, 4]

// 숫자를 원본 배열 arr1의 마지막 요소로 추가한 새로운 배열을 반환
result = arr1.concat(3);
console.log(result); // ["1, 2, 3]

//  배열 arr2와 숫자를 원본 배열 arr1의 마지막 요소로 추가한 새로운 배열을 반환
result = arr1.concat(arr2, 5);
console.log(result); // [1, 2, 3, 4, 5]

// 원본 배열은 변경되지 않는다.
console.log(arr1); // [1, 2]

//

const arr = [1, 2, 3, 4];

// 기본 구분자는 ','이다.
// 원본 배열 arr의 모든 요소를 문자열로 변환한 후, 기본 구분자 ','로 연결한 문자열을 반환
let result = arr.join();
console.log(result); // '1,2,3,4';

// 원본 배열 arr의 모든 요소를 문자열로 변환한 후, 빈문자열로 연결한 문자열을 반환
result = arr.join("");
console.log(result); // '1234'

// 원본 배열 arr의 모든 요소를 문자열로 변환한 후, 구분자 ':'로 연결한 문자열을 반환
result = arr.join(":");
console.log(result); // '1:2:3:4'
console.log(arr); //[1, 2, 3, 4]

//

const arr = [1, 2];

// 인수로 전달받은 모든 값을 원본 배열의 마지막에 요소로 추가하고 변경된 length 값을 반환한다.
let result = arr.push(3, 4);
console.log(result); // 4

// push 메소드는 원본 배열을 직접 변경한다.
console.log(arr); // [1, 2, 3, 4]

//

const arr = [1, 2];

// arr.push(3)와 동일한 처리를 한다. 이 방법이 push 메소드보다 빠르다.
arr[arr.length] = 3;

console.log(arr); // [1, 2, 3]

//

const arr = [1, 2];

// ES6 spread 문법
const newArr = [...arr, 3];
// arr.push(3);

console.log(newArr); // [1, 2, 3]

//

const arr = [1, 2];

// 원본 배열에서 마지막 요소를 제거하고 제거한 요소를 반환한다.
let result = arr.pop();
console.log(result); // 2

// pop 메소드는 원본 배열을 직접 변경한다.
console.log(arr); // [1]

//

// 스택 자료 구조를 구현하기 위한 배열
const stack = [];

// 스택의 가장 마지막에 데이터를 밀어 넣는다.
stack.push(1);
console.log(stack); // [1]

// 스택의 가장 마지막에 데이터를 밀어 넣는다.
stack.push(2);
console.log(stack); // [1, 2]

// 스택의 가장 마지막 데이터, 즉 가장 나중에 밀어 넣은 최신 데이터를 꺼낸다.
let value = stack.pop();
console.log(value, stack); // 2 [1]

// 스택의 가장 마지막 데이터, 즉 가장 나중에 밀어 넣은 최신 데이터를 꺼낸다.
value = stack.pop();
console.log(value, stack); // 1 []

//

const a = ["a", "b", "c"];
const b = a.reverse();

// 원본 배열이 변경된다
console.log(a); // [ 'c', 'b', 'a' ]
console.log(b); // [ 'c', 'b', 'a' ]

//

const a = ["a", "b", "c"];
const c = a.shift();

// 원본 배열이 변경된다.
console.log(a); // a --> [ 'b', 'c' ]
console.log(c); // c --> 'a'

//

const arr = [];

arr.push(1); // [1]
arr.push(2); // [1, 2]
arr.push(3); // [1, 2, 3]

arr.shift(); // [2, 3]
arr.shift(); // [3]
arr.shift(); // []

//

const items = ["a", "b", "c"];

// items[0]부터 items[1] 이전(items[1] 미포함)까지 반환
let res = items.slice(0, 1);
console.log(res); // [ 'a' ]

// items[1]부터 items[2] 이전(items[2] 미포함)까지 반환
res = items.slice(1, 2);
console.log(res); // [ 'b' ]

// items[1]부터 이후의 모든 요소 반환
res = items.slice(1);
console.log(res); // [ 'b', 'c' ]

// 인자가 음수인 경우 배열의 끝에서 요소를 반환
res = items.slice(-1);
console.log(res); // [ 'c' ]

res = items.slice(-2);
console.log(res); // [ 'b', 'c' ]

// 모든 요소를 반환 (= 복사본(shallow copy) 생성)
res = items.slice();
console.log(res); // [ 'a', 'b', 'c' ]

// 원본은 변경되지 않는다.
console.log(items); // [ 'a', 'b', 'c' ]

//

const arr = [1, 2, 3];

// 원본 배열 arr의 새로운 복사본을 생성한다.
const copy = arr.slice();
console.log(copy, copy === arr); // [ 1, 2, 3 ] false

//

const items1 = [1, 2, 3, 4];

// items[1]부터 2개의 요소를 제거하고 제거된 요소를 배열로 반환
const res1 = items1.splice(1, 2);

// 원본 배열이 변경된다.
console.log(items1); // [ 1, 4 ]
// 제거한 요소가 배열로 반환된다.
console.log(res1); // [ 2, 3 ]

const items2 = [1, 2, 3, 4];

// items[1]부터 모든 요소를 제거하고 제거된 요소를 배열로 반환
const res2 = items2.splice(1);

// 원본 배열이 변경된다.
console.log(items2); // [ 1 ]
// 제거한 요소가 배열로 반환된다.
console.log(res2); // [ 2, 3, 4 ]

//

const items = [1, 2, 3, 4];

// items[1]부터 2개의 요소를 제거하고 그자리에 새로운 요소를 추가한다. 제거된 요소가 반환된다.
const res = items.splice(1, 2, 20, 30);

// 원본 배열이 변경된다.
console.log(items); // [ 1, 20, 30, 4 ]
// 제거한 요소가 배열로 반환된다.
console.log(res); // [ 2, 3 ]

//

const items = [1, 4];

items.splice(1, 0, ...[2, 3]); //[ 1, 2, 3, 4 ]

console.log(items);
