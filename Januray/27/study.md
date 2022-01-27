### String 객체

String 객체는 원시 타입인 문자열을 다룰 때 유용한 프로퍼티와 메소드를 제공하는 래퍼(wrapper)객체이다.

변수 또는 객체 프로퍼티가 문자열을 값으로 가지고 있다면 String 객체의 별도 생성없이 String객체의 프로퍼티와 메소드를 사용할 수 있다.

원시 타입이 wrapper 객체의 메소드를 사용할 수 있는 이유
-> 원시 타입으로 프로퍼티나 메소드를 호출할 때 원시 타입과 연관된 wrapper 객체로 일시적으로 변환되어 프로토 타입 객체를 공유하게 되기 때문이다.

### String Constructor

String 객체는 Sring 생성자 함수를 통해 생성할 수 있다. 이때, 전달된 인자는 모두 문자열로 변환된다.

```
let strObj = new String('Lee');
console.log(strObj); // String {0: 'L', 1: 'e', 2: 'e', length: 3, [[PrimitiveValue]]: 'Lee'}

strObj = new String(1);
console.log(strObj); // String {0: '1', length: 1, [[PrimitiveValue]]: '1'}

strObj = new String(undefined);
console.log(strObj); // String {0: 'u', 1: 'n', 2: 'd', 3: 'e', 4: 'f', 5: 'i', 6: 'n', 7: 'e', 8: 'd', length: 9, [[PrimitiveValue]]: 'undefined'}
```

new 연산자를 사용하지 않고 String 생성자 함수를 호출하면 String 객체가 아닌 _문자열 리터럴을 반환한다._
이 때, 형 변환이 발생할 수 있다.

```
var x = String('Lee');

console.log(typeof x, x); // string Lee
```

**일반적으로 문자열을 사용할 때는 원시 타입 문자열을 사용한다.**

```
const str = 'Lee';
const strObj = new String('Lee');

console.log(str == strObj);  // true
console.log(str === strObj); // false

console.log(typeof str);    // string
console.log(typeof strObj); // object
```

### String Property

#### String.length

문자열 내의 문자 갯수를 반환한다.
String 객체는 length 프로퍼티를 소유하고 있으므로 유사 배열 객체이다.

```
const str1 = 'Hello';
console.log(str1.length); // 5

const str2 = '안녕하세요!';
console.log(str2.length); // 6
```

### String Method

String 객체의 모든 메소드는 _언제나 새로운 문자열을 반환한다._ **문자열은 변경 불가능한 원시 값이기 때문이다.**

#### String.prototype.charAt(pos:number):string

인수로 전달한 index를 사용하여 index에 해당하는 위치의 문자를 반환한다.
index는 0 ~ 문자열 길이 -1 사이의 정수이다.
지정한 index가 문자열의 범위를 벗어난 경우 빈 문자열을 반환한다.

```
const str = 'Hello';

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
```

#### String.prototype.concat(...strings:string[]):string

인수로 전달한 1개 이상의 문자열과 연결하여 새로운 문자열을 반환한다.

concat 메소드를 사용하는 것보다는 **+, += 할당 연산자를 사용하는 것이 성능상 유리하다.**

```
console.log('Hello '.concat('Lee')); // Hello Lee
```

#### String.prototype.indexOf(searchString:string, fromIndex=0):number

인수로 전달한 문자 또는 문자열을 대상 문자열에서 검색하여 _처음_ 발견된 곳의 index를 반환한다.
**발견하지 못한 경우 -1을 반환한다.**

```
const str = 'Hello World';

console.log(str.indexOf('l'));  // 2
console.log(str.indexOf('or')); // 7
// index 8부터 검색시작
console.log(str.indexOf('or' , 8)); // -1

if (str.indexOf('Hello') !== -1) {
  // 문자열 str에 'hello'가 포함되어 있는 경우에 처리할 내용
}

// ES6: String.prototype.includes
if (str.includes('Hello')) {
  // 문자열 str에 'hello'가 포함되어 있는 경우에 처리할 내용
}
```

#### String.prototype.lastIndexOf(searchString:string, fromIndex = this.length-1):number

인수로 전달한 문자 또는 문자열을 대상 문자열에서 검색하여 마지막으로 발견된 곳의 index를 반환한다. 반환하지 못한 경우 -1을 반환한다.

2번째 인수(fromIndex)가 전달되면 검색 시작 위치를 fromIndex로 이동하여 역방향으로 검색을 시작한다.
이 때, 검색 범위는 0 ~ fromIndex이며 반환값은 indexOf메소드와 동일하게 발견된 곳의 index이다.

```
const str = 'Hello World';

console.log(str.lastIndexOf('World')); // 6
console.log(str.lastIndexOf('l'));     // 9
console.log(str.lastIndexOf('o', 5));  // 4
console.log(str.lastIndexOf('o', 8));  // 7
console.log(str.lastIndexOf('l', 10)); // 9

console.log(str.lastIndexOf('H', 0));  // 0
console.log(str.lastIndexOf('W', 5));  // -1
console.log(str.lastIndexOf('x', 8));  // -1
```

#### String.prototype.replace(searchValue, replacer)

searchValue : string || RegExp (검색 대상 문자열 또는 정규 표현식)
replacer : string, Function (치환 문자열 또는 치환 함수)

```
const str = 'Hello world';

// 첫번째로 검색된 문자열만 대체하여 새로운 문자열을 반환한다.
console.log(str.replace('world', 'Lee')); // Hello Lee

// 특수한 교체 패턴을 사용할 수 있다. ($& => 검색된 문자열)
console.log(str.replace('world', '<strong>$&</strong>')); // Hello <strong>world</strong>

/* 정규표현식
g(Global): 문자열 내의 모든 패턴을 검색한다.
i(Ignore case): 대소문자를 구별하지 않고 검색한다.
*/
console.log(str.replace(/hello/gi, 'Lee')); // Lee world

// 두번째 인수로 치환 함수를 전달할 수 있다.
// camelCase => snake_case
const camelCase = 'helloWorld';

// /.[A-Z]/g => 1문자와 대문자의 조합을 문자열 전체에서 검색한다.
console.log(camelCase.replace(/.[A-Z]/g, function (match) {
  // match : oW => match[0] : o, match[1] : W
  return match[0] + '_' + match[1].toLowerCase();
})); // hello_world

// /(.)([A-Z])/g => 1문자와 대문자의 조합
// $1 => (.)
// $2 => ([A-Z])
console.log(camelCase.replace(/(.)([A-Z])/g, '$1_$2').toLowerCase()); // hello_world

// snake_case => camelCase
const snakeCase = 'hello_world';

// /_./g => _와 1문자의 조합을 문자열 전체에서 검색한다.
console.log(snakeCase.replace(/_./g, function (match) {
  // match : _w => match[1] : w
  return match[1].toUpperCase();
})); // helloWorld
```

첫번째 인자에는 문자열 또는 정규표현식이 전달된다. 문자열의 경우 첫번째 검색 결과만이 대체되지만 정규 표현식을 사용하면 다양한 방식으로 검색할 수 있다.

#### String.prototype.split(separator, limit?):string[]

separator : string || RegExp (구분 대상 문자열 또는 정규 표현식)
limit? : number (구분 대상수의 한계를 나타내는 정수)

첫번째 인수로 전달한 문자열 또는 정규표현식을 대상 문자열에서 검색하여 문자열을 구분한수 분리된 각 문자열로 이루어진 _배열을 반환한다._
**원본 문자열은 변경되지 않는다.**

인수가 없는 경우, 대상 문자열 전체를 단일 요소로 하는 배열을 반환한다.

```
const str = 'How are you doing?';

// 공백으로 구분(단어로 구분)하여 배열로 반환한다
console.log(str.split(' ')); // [ 'How', 'are', 'you', 'doing?' ]

// 정규 표현식
console.log(str.split(/\s/)); // [ 'How', 'are', 'you', 'doing?' ]

// 인수가 없는 경우, 대상 문자열 전체를 단일 요소로 하는 배열을 반환한다.
console.log(str.split()); // [ 'How are you doing?' ]

// 각 문자를 모두 분리한다
console.log(str.split('')); // [ 'H','o','w',' ','a','r','e',' ','y','o','u',' ','d','o','i','n','g','?' ]

// 공백으로 구분하여 배열로 반환한다. 단 요소수는 3개까지만 허용한다
console.log(str.split(' ', 3)); // [ 'How', 'are', 'you' ]

// 'o'으로 구분하여 배열로 반환한다.
console.log(str.split('o')); // [ 'H', 'w are y', 'u d', 'ing?' ]
```

#### String.prototype.substring(start:number, end?=this.length):string

첫번째 인수로 전달한 start인덱스에 해당하는 문자부터 두번째 인자에 전달된 _end인덱스에 해당하는 문자의 바로 이전 문자까지_ 를 모두 반환한다.

- 첫번째 인수 > 두번째 인수 : 두 인수는 교환된다.
- 두번째 인수가 생략된 경우 : 해당 문자열의 끝까지 반환한다.
- 인수 < 0또는 NaN인 경우 : 0으로 취급된다.
- 인수 > 문자열의 길이 : 인수는 문자열의 길이로 취급된다.

```
const str = 'Hello World'; // str.length == 11

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
console.log(str.substring(0, str.indexOf(' '))); // 'Hello'
console.log(str.substring(str.indexOf(' ') + 1, str.length)); // 'World'
```

#### String.prototype.slice(start:number, end?:number):string

String.prototype.substring과 동일하다. 단, slice는 음수의 인수를 전달 가능하다.

```
const str = 'hello world';

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
```

#### String.prototype.toLowerCase():string

대상 문자열의 모든 문자를 소문자로 변경한다.

```
console.log('Hello World!'.toLowerCase()); // hello world!
```

#### String.prototype.toUpperCase():string

대상 문자열의 모든 문자를 대문자로 변경한다.

```
console.log('Hello World!'.toUpperCase()); // HELLO WORLD!
```

#### String.prototype.trim():string

대상 문자열 양쪽 끝에 있는 공백 문자를 제거한 문자열을 반환한다.

```
const str = '   foo  ';

console.log(str.trim()); // 'foo'

// String.prototype.replace
// \s : 여러가지 공백 문자 (스페이스, 탭 등)
// ^ : 문자열의 처음
// $ : 문자열의 끝
console.log(str.replace(/\s/g, ''));   // 'foo'
console.log(str.replace(/^\s+/g, '')); // 'foo  '
console.log(str.replace(/\s+$/g, '')); // '   foo'

// String.prototype.{trimStart,trimEnd} : Proposal stage 3
console.log(str.trimStart()); // 'foo  '
console.log(str.trimEnd());   // '   foo'
```

#### String.prototype.repeat(count:number):string

인수로 전달한 숫자만큼 반복해 연결한 새로운 문자열을 반환한다.
count가 0이면 빈 문자열을 반환하고, 음수이면 RangeError를 발생시킨다.

```
console.log('abc'.repeat(0));   // ''
console.log('abc'.repeat(1));   // 'abc'
console.log('abc'.repeat(2));   // 'abcabc'
console.log('abc'.repeat(2.5)); // 'abcabc' (2.5 → 2)
console.log('abc'.repeat(-1));  // RangeError: Invalid count value
```

#### String.prototype.includes(searchString:string, position?:number):boolean

인수로 전달한 문자열이 포함되어 있는지를 검사하고 결과를 불리언 값으로 반환한다.
두번째 인수는 검색할 위치를 나타내는 정수이다.

```
const str = 'hello world';

console.log(str.includes('hello')); // true
console.log(str.includes(' '));     // true
console.log(str.includes('wo'));    // true
console.log(str.includes('wow'));   // false
console.log(str.includes(''));      // true
console.log(str.includes());        // false

// String​.prototype​.indexOf 메소드로 대체할 수 있다.
console.log(str.indexOf('hello')); // 0
```

### 배열의 생성

#### 배열 리터럴

0개 이상의 값을 쉼표로 구분하여 대괄호로 묶는다. 첫번째 값은 인덱스 '0'으로 읽을 수 있다.
존재하지 않는 요소에 접근하면 undefined를 반환한다.

```
const arr = [];
console.log(arr[1]); //undefined

const arr = ['zero', 'one'];
console.log(arr[1]); // 'one'
console.log(typeof arr); //object
```

배열 리터럴은 객체 리터럴과 달리 프로퍼티명이 없고 각 요소의 값만이 존재한다.
객체는 프로퍼티 값에 접근하기 위해 대괄호 표기법 또는 마침표 표기법을 사용하며 프로퍼티명을 키로 사용한다.
배열은 요소에 접근하기 위해 대괄호 표기법만을 사용하며 대괄호 내에 접근하고자 하는 요소의 인덱스를 넣어준다.
두 객체의 근본적 차이는 배열 리터럴 arr의 프로토 타입 객체는 Array.prototype이지만 객체 리터럴 obj의 프로토타입 객체는 Object.prototype이라는 것이다.

```
const emptyArr = [];
const emptyObj = {};

console.dir(emptyArr.__proto__);
console.dir(emptyObj.__proto__);
```

대부분의 프로그래밍 언어에서 배열의 요소들은 모두 같은 데이터 타입이어야 하지만,
**!! 자바스크립트 배열은 어떤 데이터 타입의 조합이라도 포함할 수 있다.**

#### Array() 생성자 함수

배열은 일반적으로 배열 리터럴 방식으로 생성하지만, 배열 리터럴 방식도 결국 내장 함수 Array() 생성자 함수로 배열을 생성하는 것을 단순화 시킨 것이다.

Array()생성자 함수는 Array.prototype.constructor 프로퍼티로 접근할 수 있다.

Array() 생성자 함수는 매개변수의 갯수에 따라 다르게 동작한다.

매개변수가 1개이고 숫자인 경우, 매개변수로 전달된 숫자를 length 값으로 가지는 빈배열을 생성한다.

```
const arr = new Array(2);
console.log(arr); // [ <2 empty items> ]
const arr = new Array(1, 2, 3);
console.log(arr); // [1, 2, 3]
```

### 배열 요소의 추가와 삭제

#### 배열 요소의 추가

객체가 동적으로 프로퍼티를 추가할 수 있는 것처럼 배열도 동적으로 요소를 추가할 수 있다. 이 때 순서에 맞게 값을 할당할 필요는 없고 인덱스를 사용하여 필요한 위치에 값을 할당한다. 배열의 길이는 마지막 인덱스를 기준으로 산정한다.

```
const arr = [];
console.log(arr[0]); // undefined

arr[1] = 1;
arr[3] = 3;

console.log(arr); // [ <1 empty item>, 1, <1 empty item>, 3 ]
console.log(arr.lenth); // 4
```

값이 할당되지 않은 인덱스 위치의 요소는 생성되지 않는다.
단, 존재하지 않는 요소를 참조하면 undefined가 반환된다.

#### 배열 요소의 삭제

배열은 객체이기 때문에 배열의 요소를 삭제하기 위해 _delete_ 연산자를 사용할 수 있다.
이 때, length에는 변함이 없다.
해당 요소를 완전히 삭제하여 lenth에도 반영되게 하기 위해서는 Array.prototype.splice 메소드를 사용한다.

```
const numbersArr = ["zero", "one", "two", "three"];

// 요소의 값만 삭제된다
delete numbersArr[2]; // [ 'zero', 'one', <1 empty item>, 'three' ]
console.log(numbersArr);

// 요소 값만이 아니라 요소를 완전히 삭제한다
// splice(시작 인덱스, 삭제할 요소수)
numbersArr.splice(2, 1); // ["zero", "one", "three"]
console.log(numbersArr);
```

#### 배열의 순회

객체의 프로퍼티를 순회할 때 for...in 문을 사용한다. 배열 역시 객체이므로 for..in문을 사용할 수 있다.
그러나, 배열은 객체이기 때문에 프로퍼티를 가질 수 있다. for..in 문을 사용하면 배열 요소뿐만 아니라 불필요한 프로퍼티까지 출력될수 있고 요소들의 순서를 보장하지 않으므로 배열을 순회하는데 적합하지 않다.

따라서, **배열의 순회에는 forEach 메소드, for문, for...of문을 사용하는 것이 좋다.**

```

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
```

### Array Property

#### Array.length

length 프로퍼티는 요소의 개수(배열의 길이)를 나타낸다.(2^32-1 미만)

```
const arr = [1,2,3,4,5];
console.log(arr.length); //5
```

주의할 것은 배열 요소의 개수와 length 프로퍼티의 값이 반드시 일치하지는 않는다는 것이다.

희소 배열이란 ? 배열 요소의 개수와 length 프로퍼티의 값이 일치하지 않는 배열이다.
희소 배열은 배열의 요소가 연속적이지 않은 배열을 의미한다.
희소 배열은 배열의 요소 개수보다 length 프로퍼티의 값이 언제나 크다. 희소 배열은 일반 배열보다 느리며 메모리를 낭비한다.

length 프로퍼티의 값은 명시적으로 변경할 수 있다.
만약, length 프로퍼티의 값을 현재보다 작게 변경하면 변경된 length 프로퍼티의 값보다 크거나 같은 인덱스에 해당하는 요소는 모두 삭제된다.

```
const arr = [ 1, 2, 3, 4, 5 ];

// 배열 길이의 명시적 변경
arr.length = 3;
console.log(arr); // [1, 2, 3]
```

### Array Method

#### Array.prototype.push(...items):number

인수로 전달받은 모든 값을 원본 배열의 마지막에 요소로 추가하고 변경된 length를 반환한다.
**push 메소드는 원본배열을 직접 변경한다.**

```
const arr = [1, 2];

// 인수로 전달받은 모든 값을 원본 배열의 마지막에 요소로 추가하고 변경된 length 값을 반환한다.
let result = arr.push(3, 4);
console.log(result); // 4

// push 메소드는 원본 배열을 직접 변경한다.
console.log(arr); // [1, 2, 3, 4]
```

push 메소드는 원본 배열을 직접 변경하지만, concat 메소드는 원본 배열을 변경하지 않고 새로운 배열을 반환한다.

**push 메소드는 성능면에서 좋지 않다. push 메소드는 배열의 마지막에 요소를 추가하므로 length 프로퍼티를 사용하여 직접 요소를 추가할 수 있다. 이 방법이 push 메소드보다 빠르다.**

```
const arr = [1, 2];

// arr.push(3)와 동일한 처리를 한다. 이 방법이 push 메소드보다 빠르다.
arr[arr.length] = 3;

console.log(arr); // [1, 2, 3]
```

push 메소드는 원본 배열을 직접 변경하는 부수효과가 있다.
**따라서 push 메소드 보다 spread 문법을 사용하는 편이 좋다.**

```
const arr = [1, 2];

// ES6 spread 문법
const newArr = [...arr, 3];
// arr.push(3);

console.log(newArr); // [1, 2, 3]
```

#### Array.prototype.pop

원본 배열에서 마지막 요소를 제거하고 제거한 요소를 반환한다.
원본 배열이 빈 배열이면 undefined를 반환한다.
**pop 메소드는 원본 배열을 직접 변경한다.**

```
const arr = [1, 2];

// 원본 배열에서 마지막 요소를 제거하고 제거한 요소를 반환한다.
let result = arr.pop();
console.log(result); // 2

// pop 메소드는 원본 배열을 직접 변경한다.
console.log(arr); // [1]
```

Push + Pop -> Stack (LIFO)

```
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
```

#### Array.prototype.reverse()

배열 요소의 순서를 반대로 변경한다. **이 때, 원본 배열이 변경된다.**
반환값은 변경된 배열이다.

```
const a = ['a', 'b', 'c'];
const b = a.reverse();

// 원본 배열이 변경된다
console.log(a); // [ 'c', 'b', 'a' ]
console.log(b); // [ 'c', 'b', 'a' ]
```

#### Array.prototype.shift()

배열에서 첫 요소를 제거하고 제거한 요소를 반환한다.
만약, 빈 배열일 경우 undefined를 반환한다.
**shift 메소드는 대상 배열 자체를 변경한다.**

```
const a = ['a', 'b', 'c'];
const c = a.shift();

// 원본 배열이 변경된다.
console.log(a); // a --> [ 'b', 'c' ]
console.log(c); // c --> 'a'
```

shift + push -> queue(FIFO)

```
const arr = [];

arr.push(1); // [1]
arr.push(2); // [1, 2]
arr.push(3); // [1, 2, 3]

arr.shift(); // [2, 3]
arr.shift(); // [3]
arr.shift(); // []
```

#### Array.isArray(arg:any):boolean

정적 메소드 Array.isArray는 주어진 인수가 배열이면 true, 아니면 false를 반환한다.

```
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
Array.isArray('Array');
Array.isArray(true);
Array.isArray(false);
```

#### Array.from

ES6에 새롭게 도입된 Array.from 메소드는 유사 배열 객체(array-like object) 또는 이터러블 객체(iterable object)를 변환하여 새로운 배열을 생성한다.

```
// 문자열은 이터러블이다.
const arr1 = Array.from('Hello');
console.log(arr1); // [ 'H', 'e', 'l', 'l', 'o' ]

// 유사 배열 객체를 새로운 배열을 변환하여 반환한다.
const arr2 = Array.from({ length: 2, 0: 'a', 1: 'b' });
console.log(arr2); // [ 'a', 'b' ]

// Array.from의 두번째 매개변수에게 배열의 모든 요소에 대해 호출할 함수를 전달할 수 있다.
// 이 함수는 첫번째 매개변수에게 전달된 인수로 생성된 배열의 모든 요소를 인수로 전달받아 호출된다.
const arr3 = Array.from({ length: 5 }, function (v, i) { return i; });
console.log(arr3); // [ 0, 1, 2, 3, 4 ]
```

#### Array.of

ES6에서 새롭게 도입된 Array.of 메소드는 전달된 인수를 요소로 갖는 배열을 생성한다.

Array.of는 Array 생성자 함수와 다르게 전달된 인수가 1개이고 숫자이더라도 인수를 요소로 갖는 배열을 생성한다.

```
const arr = new Array(2);
console.log(arr); // [ <2 empty items> ]
// 전달된 인수가 1개이고 숫자이더라도 인수를 요소로 갖는 배열을 생성한다.
const arr1 = Array.of(1);
console.log(arr1); // // [1]

const arr2 = Array.of(1, 2, 3);
console.log(arr2); // [1, 2, 3]

const arr3 = Array.of('string');
console.log(arr3); // 'string'
```

#### Array.prototype.indexOf(searchElement: T, fromIndex?:number):number

원본 배열에서 인수로 전달된 요소를 검색하여 인덱스를 반환한다.

- 중복된 요소가 있는 경우 : 첫번째 인덱스를 반환한다.
- 해당 요소가 없는 경우 : -1을 반환한다.

```
const arr = [1, 2, 2, 3];

// 배열 arr에서 요소 2를 검색하여 첫번째 인덱스를 반환
arr.indexOf(2);    // -> 1
// 배열 arr에서 요소 4가 없으므로 -1을 반환
arr.indexOf(4);    // -1
// 두번째 인수는 검색을 시작할 인덱스이다. 두번째 인수를 생략하면 처음부터 검색한다.
arr.indexOf(2, 2); // 2
```

indexOf 메소드는 배열에 요소가 존재하는 지 여부를 확인할 때 유용하다.

```
const foods = ['apple', 'banana', 'orange'];

// foods 배열에 'orange' 요소가 존재하는지 확인
if (foods.indexOf('orange') === -1) {
  // foods 배열에 'orange' 요소가 존재하지 않으면 'orange' 요소를 추가
  foods.push('orange');
}

console.log(foods); // ["apple", "banana", "orange"]
```

#### Array.prototype.concat(...items:Array)

인수로 전달된 값들을 원본 배열의 마지막 요소로 추가한 새로운 배열을 반환한다.
**원본 배열은 변경되지 않는다.**

```
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
```

#### Array.prototype.join(separator?:string):string

원본 배열의 모든 요소를 문자열로 변환한 후, 인수로 전달 받은 값. 즉, 구분자로 연결한 문자열을 반환한다.
구분자는 생략가능하며 기본 구분자는 ,이다.
**원본 배열은 변경되지 않는다.**

```
const arr = [1, 2, 3, 4];

// 기본 구분자는 ','이다.
// 원본 배열 arr의 모든 요소를 문자열로 변환한 후, 기본 구분자 ','로 연결한 문자열을 반환
let result = arr.join();
console.log(result); // '1,2,3,4';

// 원본 배열 arr의 모든 요소를 문자열로 변환한 후, 빈문자열로 연결한 문자열을 반환
result = arr.join('');
console.log(result); // '1234'

// 원본 배열 arr의 모든 요소를 문자열로 변환한 후, 구분자 ':'로 연결한 문자열을 반환
result = arr.join(':');
console.log(result); // '1:2:3:4'
console.log(arr); //[1, 2, 3, 4]
```

#### Array.prototype.slice(start?:number, end?:number)

인자로 지정된 배열의 부분을 복사하여 반환한다.
**원본 배열은 변경되지 않는다.**

```
const items = ['a', 'b', 'c'];

// items[0]부터 items[1] 이전(items[1] 미포함)까지 반환
let res = items.slice(0, 1);
console.log(res);  // [ 'a' ]

// items[1]부터 items[2] 이전(items[2] 미포함)까지 반환
res = items.slice(1, 2);
console.log(res);  // [ 'b' ]

// items[1]부터 이후의 모든 요소 반환
res = items.slice(1);
console.log(res);  // [ 'b', 'c' ]

// 인자가 음수인 경우 배열의 끝에서 요소를 반환
res = items.slice(-1);
console.log(res);  // [ 'c' ]

res = items.slice(-2);
console.log(res);  // [ 'b', 'c' ]

// 모든 요소를 반환 (= 복사본(shallow copy) 생성)
res = items.slice();
console.log(res);  // [ 'a', 'b', 'c' ]

// 원본은 변경되지 않는다.
console.log(items); // [ 'a', 'b', 'c' ]
```

slice 메소드에 인자를 전달하지 않으면 원본 배열의 복사본을 생성하여 반환한다.

```
const arr = [1, 2, 3];

// 원본 배열 arr의 새로운 복사본을 생성한다.
const copy = arr.slice();
console.log(copy, copy === arr); // [ 1, 2, 3 ] false
```

#### Array.prototype.splice(start:numbere, deletecount=this.length-start, ...items)

기존의 배열의 요소를 제거하고 그 위치에 새로운 요소를 추가한다.
배열 중간에 새로운 요소를 추가할 때 사용한다.
**원본 배열이 변경된다.**

start : start만 지정하면 start부터 모든 요소를 제거한다.
deleteCount : start부터 제거할 요소의 수다. 0일 경우, 아무런 요소도 제거되지 않는다.
items : 삭제한위치에 추가할 요소이다. 지정하지 않을 경우, 삭제만 한다.

```
const items1 = [1, 2, 3, 4];

// items[1]부터 2개의 요소를 제거하고 제거된 요소를 배열로 반환
const res1 = items1.splice(1, 2);

// 원본 배열이 변경된다.
console.log(items1); // [ 1, 4 ]
// 제거한 요소가 배열로 반환된다.
console.log(res1);   // [ 2, 3 ]

const items2 = [1, 2, 3, 4];

// items[1]부터 모든 요소를 제거하고 제거된 요소를 배열로 반환
const res2 = items2.splice(1);

// 원본 배열이 변경된다.
console.log(items2); // [ 1 ]
// 제거한 요소가 배열로 반환된다.
console.log(res2);   // [ 2, 3, 4 ]
```

다른 요소 빼고 집어 넣기

```
const items = [1, 2, 3, 4];

// items[1]부터 2개의 요소를 제거하고 그자리에 새로운 요소를 추가한다. 제거된 요소가 반환된다.
const res = items.splice(1, 2, 20, 30);

// 원본 배열이 변경된다.
console.log(items); // [ 1, 20, 30, 4 ]
// 제거한 요소가 배열로 반환된다.
console.log(res);   // [ 2, 3 ]
```

중간에 다른 요소 집어 넣기

```
const items = [1, 4];

items.splice(1, 0, ...[2, 3]); //[ 1, 2, 3, 4 ]

console.log(items);
```

**!!slice는 배열의 일부분을 복사해서 반환하며 원본을 훼손하지 않는다.**
**splice는 배열에서 요소를 제거하고 제거한 위치에 다른 요소를 추가하며 원본을 훼손한다.**
