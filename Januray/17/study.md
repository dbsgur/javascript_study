2021. 1.  17

#### argument 프로퍼티

arguments 객체는 함수 호출 시 전달된 인수(argument)들의 정보를 담고 있는 순회가능한(iterable) 유사 배열 객체(array-like object)이며 함수 내부에서 지역 변수처럼 사용된다.
즉, 함수 외부에서는 사용할 수 없다.

_자바스크립트는 함수 호출 시 함수 정의에 따라 인수를 전달하지 않아도 에러가 발생하지 않는다._

```
function multiply(x, y) {
  console.log(arguments);
  return x * y;
}

multiply();        // {}
multiply(1);       // { '0': 1 }
multiply(1, 2);    // { '0': 1, '1': 2 }
multiply(1, 2, 3); // { '0': 1, '1': 2, '2': 3 }
```

매개변수(parameter)는 인수(argument)로 초기화된다.

- 매개변수의 갯수보다 인수를 적게 전달했을때, 인수가 전달되지 않은 매개변수는 undefined로 초기화된다.
- 매개변수의 갯수보다 인수를 더 많이 전달한 경우, 초과된 인수는 무시된다.

이러한 자바스크립트의 특성때문에 런타임 시에 호출된 함수의 인자 갯수를 확인하고 이에 따라 동작을 달리 정의할 필요가 있다.
이 때, 유용하게 사용하는 것이 arguments 객체이다.

arguments 객체는 매개변수 갯수가 확정되지 않은 _가변 인자 함수_ 를 구현할 때 유용하게 사용된다.

```
//합의 함수
function sum() {
  var res = 0;

  for (var i = 0; i < arguments.length; i++) {
    res += arguments[i];
  }

  return res;
}

console.log(sum());        // 0
console.log(sum(1, 2));    // 3
console.log(sum(1, 2, 3)); // 6
```

자바스크립트는 함수를 호출할 때 인수들과 함께 암묵적으로 arguments 객체가 함수 내부로 전달된다.
arguments 객체는 배열의 형태로 인자값 정보를 담고 있지만, 실제 배열이 아닌 \_유사배열객체(array-like object)이다.

_유사배열객체란?_ length 프로퍼티를 가진 객체를 말한다. 유사배열객체는 배열이 아니므로 메소드를 사용하는 경우 에러가 발생한다.
따라서 배열 메소드를 사용하려면 **Function.prototype.call, Function.prototype.apply** 을 사용해야하는 번거로움이 있다.

```
function sum() {
  if (!arguments.length) return 0;

  // arguments 객체를 배열로 변환
  var array = Array.prototype.slice.call(arguments);
  return array.reduce(function (pre, cur) {
    return pre + cur;
  });
}

// ES6
// function sum(...args) {
//   if (!args.length) return 0;
//   return args.reduce((pre, cur) => pre + cur);
// }

console.log(sum(1, 2, 3, 4, 5)); // 15
```

#### caller 프로퍼티

caller 프로퍼티는 _자신을 호출한 함수를 의미한다._

```
function foo(func) {
  var res = func();
  return res;
}

function bar() {
  return 'caller : ' + bar.caller;
}

console.log(foo(bar)); // caller : function foo(func) {...}
console.log(bar());    // null (browser에서의 실행 결과)
```

#### length 프로퍼티

length 프로퍼티는 함수 정의 시 작성된 매개변수 갯수를 의미한다.

```
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
```

arguments.length의 값과는 다를 수 있으므로 주의하여야 한다. arguments.length는 함수 호출 시 인자의 갯수이다.

#### name 프로퍼티

함수명을 나타낸다. 기명함수의 경우 함수명을 값으로 갖고 익명함수의 빈문자열을 값으로 갖는다.

```
// 기명 함수 표현식(named function expression)
var namedFunc = function multiply(a, b) {
  return a * b;
};
// 익명 함수 표현식(anonymous function expression)
var anonymousFunc = function(a, b) {
  return a * b;
};

console.log(namedFunc.name);     // multiply
console.log(anonymousFunc.name); // ''
```

#### '(underbarx2)proto(underbarx2)' 접근자 프로퍼티

**모든 객체는 [[Prototype]]이라는 내부 슬롯이 있다.**
[[Prototype]] 내부 슬롯은 프로토타입 객체를 가리킨다.
프로토타입 객체란 프로토타입 기반 객체 지향 프로그래밍의 근간을 이루는 객체로서 객체간의 상속을 구현하기 위해 사용된다.
즉, 프로토타입 객체는 다른 객체에 공유 프로퍼티를 제공하는 객체를 말한다.

(underbarx2)proto(underbarx2)프로퍼티는 [[Prototype]]내부 슬롯이 가리키는 프로토타입 객체에 접근하기 위해 사용하는 접근자 프로퍼티이다.
[[Prototype]] 내부 슬롯에도 직접 접근할 수 없으며 (underbarx2)proto(underbarx2) 접근자 프로퍼티를 통해 간접적으로 프로토타입 객체에 접근할 수 있다.

(underbarx2)proto(underbarx2) 프로퍼티는 객체가 직접 소유하는 프로퍼티가 아니라 모든 객체의 프로토타입 객체인 Object.prototype 객체의 프로퍼티이다. 모든 객체는 상속을 통해 (underbarx2)proto(underbarx2) 접근자 프로퍼티는 사용할 수 있다.

```

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
```

함수도 객체이므로 proto 접근자 프로퍼티를 통해 프로토타입 객체에 접근할 수 있다.

```
// 함수 객체의 프로토타입 객체는 Function.prototype이다.
console.log((function() {}).__proto__ === Function.prototype); // true
```

#### prototype 프로퍼티

prototype _프로퍼티는 함수 객체만이 소유하는 프로퍼티이다._ 즉, 일반 객체에는 prototype 프로퍼티가 없다.

prototype 프로퍼티는 함수가 객체를 생성하는 생성자 함수로 사용될 때, 생성자 함수가 생성한 인스턴스의 프로토타입 객체를 가리킨다.

```
// 함수 객체는 prototype 프로퍼티를 소유한다.
console.log(Object.getOwnPropertyDescriptor(function() {}, 'prototype'));
// {value: {…}, writable: true, enumerable: false, configurable: false}

// 일반 객체는 prototype 프로퍼티를 소유하지 않는다.
console.log(Object.getOwnPropertyDescriptor({}, 'prototype'));
// undefined
```

### 함수의 다양한 형태

#### 즉시 실행 함수

함수의 정의와 동시에 실행되는 함수를 _즉시 실행함수(IIFE, Immediately Invoke Function Expression)_ 라고 한다.
**최초 한번만 호출되며 다시 호출할 수 없다.**
이러한 특징을 이용하여 최초 한번만 실행이 필요한 초기화 처리등에 사용할 수 있따.

```
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
```

자바스크립트에서 가장 큰 문제점 중의 하나는 **파일이 분리되어 있다하여도 글로벌 스코프가 하나이며 글로벌 스코프에 선언된 변수나 함수는 코드 내의 어디서든지 접근이 가능하다는 것이다.**
따라서 _다른 스크립트 파일 내에서 동일한 이름으로 명명된 변수나 함수가 같은 스코프 내에 존재할 경우 원치 않는 결과를 가져올 수 있다._
즉시 실행 함수 내에 처리 로직을 모아 두면 혹시 있을 수도 있는 변수명 또는 함수명의 충돌을 방지할 수 있어 이를 위한 목적으로 즉시실행함수를 사용하기도 한다.

```
(function () {
  var foo = 1;
  console.log(foo); //output : 1
}());

var foo = 100;
console.log(foo); //output : 100
```

#### 내부 함수(Inner funciton)

함수 내부에 정의된 함수를 내부함수라 한다.
아래 예제의 내부함수 child는 자신을 포함하고 있는 부모함수 parent의 변수에 접근할 수 있따. 하지만 부모함수는 자식함수(내부함수)의 변수에 접근할 수 없다.

#### 재귀 함수(Recursive function)

재귀함수는 자기 자신을 호출하는 함수를 말한다.
유명한 예제로 피보나치 수열과 팩토리얼이 있다.

```
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
```

재귀 함수는 자신을 무한히 연쇄 호출하므로 호출을 멈출 수 있는 탈출 조건을 반드시 만들어야 한다.
탈출 조건이 없을 경우, 함수가 무한 호출되어 stackoverflow가 발생한다.

**재귀 함수는 반복 연산을 간단히 구현할 수 있다는 장점이 있지만, 무한 반복에 빠질 수 있고 stackoverflow를 발생시킬 수 있으므로 주의해야한다.**

대부분의 재귀 함수는 for나 while문으로 구현이 가능하다.
반복문보다 재귀함수를 통해 _보다 직관적으로 이해하기 쉬운 구현이 가능한 경우에만 사용하는 것이 바람직하다._

#### 콜백 함수(Callback function)

콜백 함수는 함수를 명시적으로 호출하는 방식이 아니라 특정 이벤트가 발생했을 때 시스템에 의해 호출되는 함수를 말한다.

ex) button, setTimeout

콜백함수는 주로 _비동기식 처리 모델(Asynchronous processing model)_ 에 사용된다.
비동기식 처리 모델이란? 처리가 종료하면 호출될 함수(콜백 함수)를 미리 매개변수에 전달하고 처리가 종료되면 콜백함수를 호출하는 것이다.

콜백함수는 콜백 큐에 들어가 있다가 해당 이벤트가 발생하면 호출된다.
콜백 함수는 클로저이므로 콜백 큐에 단독으로 존재하다가 호출되어도 콜백함수를 전달받은 함수의 변수에 접근할 수 있다.

```
function doSomething() {
  var name = 'Lee';

  setTimeout(function () {
    console.log('My name is ' + name);
  }, 100);
}

doSomething(); // My name is Lee
```

======================================================================================================

```
function sum(a, b) {
  //a와 b가 number 타입인지 체크
  return a + b;
}

sum('x', 'y'); // 'xy'
```

두 수의 합을 구하는 함수를 짯지만 위 코드 처럼 문자열 또한 합칠 수 있다.
이러한 상황이 발생한 이유는 변수나 반환값의 타입을 사전에 지정하지 않는 자바스크립트의 동적 타이핑에 의한 것이다.
**이와 같은 이유로 자바스크립트는 타입 체크가 필요하다.**

### typeof

타입 연산자 typeof는 피연산자의 데이터 타입을 문자열로 반환한다.

```
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
```

### Object.prototype.toString

```
function getType(target) {
  return Object.prototype.toString.call(target).slice(8, -1);
}
```

### instance of

위의 방법으로는 객체의 종류(일반객체, 배열, Date, RegExp, Function, DOM 등)까지 식별할 수 있는 타입 체크 기능을 만들 수 있따.
Object.prototype.toString 방법으로는 객체의 상속 관계까지는 체크할 수 없다.

### 유사 배열 객체(array-like object)

배열인지 체크하기 위해서는 Array.isArray 메소드를 사용한다.
유사 배열 객체는 length 프로퍼티를 갖는 객체로 문자열, arguments, HTMLCollection, NodeList 등은 유사 배열이다.
유사 배열 객체는 length 프로퍼티가 있으므로 순회할 수 있으며 call, apply 함수를 사용하여 배열의 메소드를 사용할 수도 있다.

```
console.log(undefined == null)
const isArrayLike = function (collection) {
  // 배열 인덱스: 32bit 정수(2의 32제곱 - 1)
  // 유사 배열 인덱스: 자바스크립트로 표현할 수 있는 양의 정수(2의 53제곱 - 1)
  const MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  // 빈문자열은 유사배열이다. undefined == null => true
  const length = collection == null ? undefined : collection.length;
  return typeof length === 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
};
```

==============================================================================================================

### 프로토타입 객체

Java, C++과 같은 클래스 기반 객체 지향 프로그래밍 언어와 달리,
자바스크립트는 _프로토타입 기반 객체 지향 프로그래밍 언어_ 이다.

클래스 기반 객체 지향 프로그래밍 언어는 객체 생성 이전에 클래스를 정의하고 이를 통해 객체(인스턴스)를 생성한다.
하지만, 프로토타입 기반 객체지향 프로그래밍 언어는 클래서 없이도 객체를 생성할 수 있따.

자바스크립트의 모든 객체는 자신의 부모 역할을 담당하는 객체와 연결되어 있다.
그리고 이것은 마치 객체 지향의 상속 개념과 같이 부모 객체의 프로퍼티 또는 메소드를 상속받아 사용할 수 있게 한다.
이러한 부모 객체를 **Prototype 객체** 또는 **Prototype** 이라 한다.

Prototype 객체는 생성자 함수에 의해 생성된 각각의 객체에 공유 프로퍼티를 제공하기 위해 사용한다.

```

var student = {
  name : 'hyeok',
  score : 95
};

// student에는 hasOwnProperty 메소드가 없지만 아래 구문은 동작한다.
console.log(student.hasOwnProperty('name'));
// true

console.dir(student);
//{ name: 'hyeok', score: 95 }
```

객체를 생성할 때 프로토타입은 결정된다. 결정된 프로토타입 객체는 다른 임의의 객체로 변경할 수 있다.
이것은 부모 객체인 프로토타입을 동적으로 변경할 수 있다는 것을 의미한다.
이러한 특징을 활용하여 객체의 상속을 구현할 수 있다.

### [[Prototype]] vs prototype 프로퍼티

모든 객체는 자신의 프로토타입 객체를 가리키는 [[Prototype]] 인터널 슬롯(internal slot) 을 갖으며 상속을 위해 사용된다.

함수도 객체이므로 [[Prototype]] 인터널 슬롯을 갖는다. 그런데 함수 객체는 일반 객체와는 달리 prototype 프로퍼티도 소유하게 된다.

!! prototype 프로퍼티는 프로토타입 객체를 가리키는 [[Prototype]]인터널 슬롯은 다르다는 것이다.
!!prototype프로퍼티와 [[Prototype]]은 모두 프로토타입 객체를 가리키지만 관점의 차이가 있다.

```
function Person(name) {
  this.name = name;
}

var foo = new Person('Lee');

console.dir(Person); // prototype 프로퍼티가 있다.
console.dir(foo);    // prototype 프로퍼티가 없다.
```

- [[Prototype]]
  - 함수를 포함한 모든 객체가 가지고 있는 인터널 슬롯이다.
  - 객체의 입장에서 자신의 부모 역할을 하는 프로토타입 객체를 가리키며 함수객체의 경우 Function.prototype을 가리킨다.

```
console.log(Person.__proto__ === Function.prototype); //true
```

- prototype 프로퍼티
  - 함수 객체만 가지고 있는 프로퍼티이다.
  - 함수 객체가 생성자로 사용될 때, 이 함수를 통해 생성될 객체의 부모 역할을 하는 객체(프로토타입 객체)를 가리킨다.

```
console.log(Person.prototype === foo.__proto__); // true
```

### constructor 프로퍼티

프로토타입 객체는 constructor 프로퍼티를 갖는다.
이 constructor 프로퍼티는 객체의 입장에서 자신을 생성한 객체를 가리킨다.

```
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
```

### Prototype chain

자바스크립트는 특정 객체의 프로퍼티나 메소드에 접근하려고 할 때, 해당 객체에 접근하려는 프로퍼티 또는 메소드가 없다면 [[Prototype]]이 가리키는 링크를 따라 자신의 부모 역할을 하는 프로토타입 객체의 프로퍼티나 메소드를 차례대로 검색한다.
이것을 프로토타입 체인이라 한다.

```
var student = {
  name: 'Lee',
  score: 90
}

// Object.prototype.hasOwnProperty()
console.log(student.hasOwnProperty('name')); // true
```

student 객체는 hasOwnProperty 메소드를 가지고 있지 않으므로 에러가 발생해야 정상이나 정상적으로 출력이 된다.
이는 student 객체의 [[Prototype]]이 가리키는 링크를 따라가서 student객체의 부모 역할을 하는 프로토타입 객체(Object.prototype)의 메소드 hasOwnProperty를 호출했기 때문이다.

| 객체 생성 방식 | 엔진의 객체 생성 | 인스턴스의 prototype 객체 |
|!---!|!---!|!---!|
|`객체 리터럴`|`Object() 생성자 함수`|`Object.prototype`|
|`Object() 생성자 함수`|`Object() 생성자 함수`|`Object.prototype`|
|`생성자 함수`|`생성자 함수`|`생성자 함수 이름.prototype`|

### 프로토타입 객체의 확장

프로토타입 객체도 객체이므로 일반 객체와 같이 프로퍼티를 추가/삭제할 수 있다.

```
function Person(name) {
  this.name = name;
}

var foo = new Person('Lee');

Person.prototype.sayHello = function(){
  console.log('Hi! my name is ' + this.name);
};

foo.sayHello();
```

### 원시타입(Primitive data type)의 확장

!! 자바스크립트에서 원시타입(숫자, 문자열, boolean, null, undefined)을 제외한 모든 것은 객체이다.
그런데 아래 코드를 보면 원시타입인 문자열은 객체와 유사하게 동작한다.

```
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
```

원시 타입 문자열과 String()생성자 함수로 생성한 문자열 객체의 타입은 분명히 다르다.
원시 타입은 객체가 아니므로 프로퍼티나 메소드를 가질 수 없다.
하지만!! **원시 타입으로 프로퍼티나 메소드를 호출할 때 원시타입과 연관된 객체로 일시적으로 변환되어 프로토타입 객체를 공유하게 된다.**

원시타입은 객체가 아니므로 프로퍼티나 메소드를 직접 추가할 수 없다.

하지만 String 객체의 프로토타입 객체 String.prototype에 메소드를 추가하면 원시타입, 객체 모두 메소드를 사용할 수 있다.

```
var str = 'test';

String.prototype.myMethod = function () {
  return 'myMethod';
};

console.log(str.myMethod());      // myMethod
console.log('string'.myMethod()); // myMethod
console.dir(String.prototype); // { myMethod: [Function (anonymous)] }
```

모든 객체는 프로토타입 체인에 의해 Object.prototype 객체의 메소드를 사용할 수 있다.
Object.prototype 객체는 프로토타입 체인의 종점으로 모든 객체가 사용할 수 있는 메소드를 가진다.

자바스크립트는 표준 내장 객체의 프로토타입 객체에 개발자가 정의한 메소드의 추가를 허용한다.

### 프로토타입 객체의 변경

객체를 생성할 때, 프로토타입은 결정된다. 결정된 프로토타입 객체는 다른 임의의 객체로 변경할 수 있다.
**이것은 부모 객체인 프로토타입을 동적으로 변경할 수 있다는 것이다.**
이러한 특징을 활용해 객체의 상속을 구현할 수 있다.

프로토타입 객체를 변경하면

- 프로토타입 객체 변경 시점 이전에 생성된 객체
  - 기존 프로토 타입 객체를 [[Prototype]]에 바인딩한다.
- 프로토타입 객체 변경 시점 이후에 생성된 객체
  - 변경된 프로토 타입 객체를 [[Prototype]]에 바인딩한다.

```
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
```

### 프로토타입 체인 동작 조건

객체의 프로퍼티를 참조하는 경우, 해당 객체에 프로퍼티가 없는 경우, 프로토타입 체인이 동작한다.

객체의 프로퍼티에 값을 할당하는 경우, 프로토타입 체인이 동작하지 않는다.
이는 객체에 해당 프로퍼티가 있는 경우, 값을 재할당하고
해당 프로퍼티가 없는 경우, 해당 객체에 프로퍼티를 동적으로 추가하기 때문이다.

```
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
```

======================================================================================================

### 스코프(Scope, 유효범위)

```
var x = 'global';

function foo () {
  var x = 'function scope';
  console.log(x);
}

foo(); // function scope
console.log(x); // global
```

스코프는 참조 대상 식별자(identifier, 변수)를 찾아내기 위한 규칙이다.
자바스크립트는 이 규칙대로 식별자를 찾는다.

위 코드에서 전역에 선언된 변수 x는 어디에서든 참조할 수 있다. 하지만, 함수 foo내에서 선언된 변수 x는 함수 foo내부에서만 참조할 수 있고, 함수 외부에서는 참조할 수 없다. 이러한 규칙을 스코프라한다.

### 스코프의 구분

- 전역 스코프(Global scope)
  - 코드 어디에서든지 참조할 수 있다.
- Local scope or Function-level scope
  - 함수 코드 블록이 만든 스코프로 함수 자신과 하위 함수에서만 참조할 수 있다.

### 자바스크립트 스코프 특징

자바스크립트의 스코프는 타 언어와는 다른 특징을 가지고 있다.

대부분의 C-family language는 블록 레벨 스코프다.
블록 레벨 스코프란 코드 블록 내에서만 참조할 수 있는 스코프를 의미한다.

자바스크립트는 **함수 레벨 스코프(function-level scope)** 를 따른다.
함수 코드 블록 내에서 선언된 변수는 함수 코드 블록내에서만 유효하고 함수 외부에서는 유효하지 않다.

단, ES6에서 도입된 _let_ keyword를 사용하면 블록레벨 스코프를 사용할 수 있다.

```
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
```

### 전역 스코프(Global scope)

전역에 변수를 선언하면 이 변수는 어디서든지 참조할 수 있는 전역 스코프를 갖는 전역 변수가 된다.
var키워드로 선언한 전역 변수는 전역 객체 window의 프로퍼티이다.

자바스크립트는 다른 C-family language와는 달리 특별한 시작점이 없으며 코드가 나타나는 즉시 해석되고 실행된다.
따라서, 전역 변수를 선언하기 쉬우며 이것은 전역 변수를 남발하게 하는 문제를 야기시킨다.

전역 변수의 사용은 변수 이름이 중복될 수 있고, **의도치 않은 재할당에 의한 상태 변화롤 코드를 예측하기 어렵게 만드므로 사용을 억제해야한다.**

### 비 블록 스코프(Non block-level scope)

```
if (true) {
  var x = 5;
}
console.log(x);
```

변수 x는 코드 블록 내에서 선언되었다. 하지만 자바스크립트는 블록 레벨 스코프를 사용하지 않으므로 함수 밖에서 선언된 변수는 코드 블록 내에서 선언되었다할지라도 모두 전역 스코프을 갖게된다. 따라서 변수 x는 전역 변수이다.

### 함수 레벨 스코프(Function-level scope)

다시 한번 말하지만, 자바스크립트는 **함수 레벨 스코프** 를 사용한다.

```
var x = 'global';

function foo() {
  var x = 'local';
  console.log(x);
}

foo();          // local
console.log(x); // global
```

전역변수 x와 지역변수 x가 중복 선언되었다. 전역 영역에서는 전역변수만이 참조 가능하고 함수 내 지역 영역에서는 전역과 지역 변수 모두 참조 가능하나 위 예제와 같이 변수명이 중복된 경우, 지역변수를 우선하여 참조한다.

```
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
```

내부함수는 자신을 포함하고 있는 외부함수의 변수에 접근할 수 있다. 이는 매우 유용하다. 클로저에서와 같이 내부함수가 더 오래 생존하는 경우, 타 언어와는 다른 움직임을 보인다.

함수 bar에서 참조하는 변수 x는 함수 foo에서 선언된 지역변수이다. 이는 실행 컨텍스트의 스코프 체인에 의해 참조 순위에서 전역변수 x가 뒤로 밀렸기 때문이다.

```
var x = 10;

function foo() {
  x = 100;
  console.log(x); // 100
}
foo();
console.log(x); // 100
```

함수(지역) 영역에서 전역변수를 참조할 수 있으므로 전역변수의 값도 변경할 수 있다. 내부 함수의 경우, 전역변수는 물론 상위 함수에서 선언한 변수에 접근/변경이 가능하다.

```

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
```

**중첩 스코프는 가장 인접한 지역을 우선 참조한다.**

### 렉시컬 스코프

```
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
```

위 예제의 실행 결과는 함수 bar의 상위 스코프가 무엇인지에 따라 결정된다.
두가지 패턴을 예측할 수 있는데 첫번째는 함수를 어디서 호출하였는지에 따라 상위 스코프를 결정하는 것이고 두번째는 함수를 어디서 선언하였는지에 따라 상위 스코프를 결정하는 것이다.
첫번째 방식으로 함수의 상위 스코프를 결정한다면 함수 bar의 상위 스코프는 함수 foo와 전역일 것이고, 두번째 방식으로 함수의 스코프를 결정한다면 함수 bar의 스코프는 전역일 것이다.

프로그래밍 언어는 이 두가지 방식 중 하나의 방식으로 함수의 상위 스코프를 결정한다.
첫번째 방식을 동적 스코프(Dynamic scope)라 하고,
두번째 방식을 렉시컬 스코프(Lexical scope) 또는 정적 스코프(Static scope)라 한다.
자바스크립트를 비롯한 대부분의 프로그래밍 언어는 렉시컬 스코프를 따른다.

렉시컬 스코프는 함수를 어디서 호출하는지가 아니라 _어디에 선언하였는지_ 에 따라 결정된다.
자바스크립트는 렉시컬 스코프를 따르므로 함수를 선언한 시점에 상위 스코프가 결정된다.
**함수를 어디에서 호출하였는지는 스코프 결정에 아무런 의미를 주지 않는다.**
위 예제의 함수 bar는 전역에 선언되었다. 따라서 함수 bar의 상위 스코프는 **전역 스코프** 이고 위 예제는 전역 변수 x의 값 1을 두번 출력한다.

### 암묵적 전역

```
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
```

위 예제의 y는 선언하지 않은 식별자이다. 따라서 y = 20이 실행되면 참조 에러가 발생할 것처럼 보인다.
하지만 선언하지 않은 식별자 y는 마치 선언된 변수처럼 동작한다.
**이는 선언하지 않은 식별자에 값을 할당하면 전역 객체의 프로퍼티가 되기 때문이다.**

foo 함수가 호출되면 자바스크립트 엔진은 변수 y에 값을 할당하기 위해 먼저 스코프 체인을 통해 선언된 변수인지 확인한다.
이때 foo 함수의 스코프와 전역 스코프 어디에서도 변수 y의 선언을 찾을 수 없으므로 참조 에러가 발생해야 하지만, 자바스크립트 엔진은 y = 20을 window.y = 20으로 해석하여 프로퍼티를 동적 생성한다.
결국 y는 전역 객체의 프로퍼티가 되어 마치 전역 변수처럼 동작한다.
이러한 현상을 **암묵적 전역(implicit global)**이라 한다.

하지만 y는 변수 선언없이 _단지 전역 객체의 프로퍼티로 추가되었을 뿐이다._
**따라서 y는 변수가 아니다. 따라서 변수가 아닌 y는 변수 호이스팅이 발생하지 않는다.**

또한, 변수가 아니라 단지 프로퍼티인 y는 delete 연산자로 삭제할 수 있다.
그러나, 전역 변수는 프로퍼티이지만 delete 연산자로 삭제할 수 없다.

```
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
```

### 최소한의 전역변수 사용

전역변수 사용을 최소화하는 방법 중 하나는 애플리케이션에서 전역변수 사용을 위해 아래와 같이 전역 변수 객체 하나를 만들어 사용하는 것이다.(from 더 글라스 크락포드)

```
var MYAPP ={};
MYAPP.student = {
  name : 'hyeok',
  gender : 'male'
}
```

### 즉시 실행함수를 이용한 전역변수 사용 억제

전역변수 사용을 억제하기 위해 즉시 실행 함수(IIFE)를 사용할 수 있다.
이 방법을 사용하면 전역변수를 만들지 않으므로 _라이브러리 등에 자주 사용된다._
즉시 실행 함수는 즉시 실행되고 그 후 전역에서 바로 사라진다.

```
(function () {
  var MYAPP = {};

  MYAPP.student = {
    name: 'hyeok',
    gender: 'male'
  };

  console.log(MYAPP.student.name); // hyeok
}());

console.log(MYAPP.student.name); // MYAPP is not defined
```

======================================================================================================

### strict mode

```
function foo() {
  x = 10;
}

console.log(x); // 10
```

foo 함수 내에서 선언하지 않은 변수 x에 값 10을 할당하였다.
이 때, 변수 x를 찾아야 x에 값을 할당할 수 있기 때문에 자바스크립트 엔진은 변수 x가 어디에서 선언되었는지 스코프 체인을 통해 검색하기 시작한다.

자바스크립트 엔진은 먼저 foo 함수의 스코프에서 변수 x의 선언을 검색한다.
foo 함수의 스코프에는 변수 x의 선언이 없으므로 검색에 실패할 것이고,
자바스크립트 엔진은 변수 x를 검색하기 위해 foo 함수 컨텍스트의 상위 스코프(위 예제의 경우, 전역 스코프)에서 변수 x의 선언을 검색한다.

전역 스코프에도 변수 x의 선언이 존재하지 않기 때문에 ReferenceError를 throw할 것 같지만,
자바스크립트 엔진은 암묵적으로 전역 객체에 프로퍼티 x를 동적 생성한다.
결국 식별자 x는 전역 변수가 된다. 이렇게 전역 변수가 된 변수를 **암묵적 전역 변수(implicit global)** 라 한다.

개발자의 의도와는 상관없이 자바스크립트 엔진이 생성한 암묵적 전역 변수는 오류를 발생시키는 원인이 될 가능성이 크다.
**따라서 반드시 var, let, const 키워드를 사용하여 변수를 선언한 다음 변수를 사용해야 한다.**

하지만, 오타나 문법 지식의 미비로 인한 실수는 언제나 발생하는 것이다.
따라서 오류를 줄여 안정적인 코드를 생산하기 위해서는 보다 근본적인 접근이 필요하다.
다시 말해, 잠재적인 오류를 발생시키기 어려운 개발 환경을 만들고 그 환경에서 개발을 하는 것이 보다 근본적인 해결책이라고 할 수 있다.

이를 지원하기 위해 ES5부터 strict mode가 추가되었다.
strict mode는 자바스크립트 언어의 문법을 보다 엄격히 적용하여 기존에는 무시되던 오류를 발생시킬 가능성이 높거나 자바스크립트 엔진의 최적화 작업에 문제를 일으킬 수 있는 코드에 대해 명시적인 에러를 발생시킨다.

ESLint와 같은 린트 도구를 사용하여도 strict mode와 유사한 효과를 얻을 수 있다. 린트 도구는 정적 분석(static analysis) 기능을 통해 소스 코드를 실행하기 전에 소스 코드를 스캔하여 문법적 오류만이 아니라 잠재적 오류까지 찾아내고 오류의 이유를 리포팅해주는 유용한 도구이다.

======================================================================================================

### this

자바스크립트의 함수는 호출될 때, 매개변수로 전달되는 인자값 이외에 arguments 객체와 this를 암묵적으로 전달받는다.

this가 객체 자신에 대한 참조 값을 가지고 있다는 뜻이다.
주로 _매개변수와 객체 자신이 가지고 있는 멤버변수명이 같을 경우 이를 구분하기 위해서_ 사용된다.

```
function square(number) {

  console.log(arguments); //[Arguments] { '0': 2 }
  console.log(this); //<ref *1> Object [global] {...

  return number * number;
}

square(2);
```

자바스크립트의 경우 Java와 같이 **this에 바인딩되는 객체는 한가지가 아니라 함수 호출 방식에 따라 this에 바인딩되는 객체가 달라진다.**

### 함수 호출 방식과 this 바인딩

자바스크립트의 경우 함수 호출 방식에 의해 this에 바인딩할 어떤 객체가 동적으로 결정된다.
함수를 선언할 때, this에 바인딩할 객체가 정적으로 결정되는 것이 아니고, **함수를 호출할 때 함수가 어떻게 호출되었는지에 따라 this에 바인딩할 객체가 동적으로 결정된다.**

함수를 호출하는 방식

1. 함수 호출
2. 메소드 호출
3. 생성자 함수 호출
4. apply/call/bind 호출

```
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
```

### 함수 호출

전역 객체(Global Object)는 모든 객체의 유일한 최상위 객체를 의미하며 일반적으로 Browser-side에서는 window, Server-side(Nodejs)에서는 global 객체를 의미한다.

기본적으로 this는 **전역객체에 바인딩된다.** 전역함수는 물론이고 심지어 내부함수의 경우도 this는 외부함수가 아닌 전역객체에 바인딩된다.

내부함수는 일반 함수, 메소드, 콜백함수 어디에서 선언되었든 관계없이 this는 전역객체를 바인딩한다.

```
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
```

### 메소드 호출

함수가 객체의 프로퍼티 값이면 메소드로서 호출된다.
이 때, 내부의 this는 해당 메소드를 소유한 객체. 즉, 해당 메소드를 호출한 객체에 바인딩된다.

```
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
```

### 생성자 함수 호출

자바스크립트의 생성자 함수는 말 그대로 객체를 생성하는 역할을 한다.
하지만, 자바와 같은 객체지향 언어의 생성자 함수와는 다르게 그 형식이 정해져 있는 것이 아니라 **기존 함수에 new 연산자를 붙여서 호출하면 해당 함수는 생성자 함수로 동작한다.**

이는 반대로 생각하면 생성자 함수가 아닌 일반 함수에 new연산자를 붙여 호출하면 생성자 함수처럼 동작할 수 있다.
따라서, 일반적으로 생성자 함수명은 **첫문자를 대문자로 기술하여 혼란을 방지하려는 노력을한다.**

```
// 생성자 함수
function Person(name) {
  this.name = name;
}

var me = new Person('Lee');
console.log(me); // Person&nbsp;{name: "Lee"}

// new 연산자와 함께 생성자 함수를 호출하지 않으면 생성자 함수로 동작하지 않는다.
var you = Person('Kim');
console.log(you); // undefined
```

#### 생성자 함수 동작 방식

new 연산자와 함께 생성자 함수를 호출하면 다음과 같은 수순으로 동작한다.

1. 빈 객체 생성 및 this 바인딩

- 생성자 함수의 코드가 실행되기 전 빈 객체가 생성된다.
- 이 빈 객체가 생성자 함수가 새로 생성하는 객체이다.
- 이 후, 생성자 함수 내에서 사용하는 this는 이 빈 객체를 가리킨다.
- 그리고, 생성된 빈 객체는 생성자 함수의 prototype 프로퍼티가 가리키는 객체를 자신의 프로토타입 객체로 설정한다.

2. this를 통한 프로퍼티 생성

- 생성된 빈 객체에 this를 사용하여 동적으로 프로퍼티나 메소드를 생성할 수 있다.
- this는 새로 생성된 객체를 가리키므로 this를 통해 생성한 프로퍼티와 메소드는 새로 생성된 객체에 추가된다.

3. 생성된 객체 반환

- 반환문이 없는 경우, this에 바인딩된 새로 생성한 객체가 반환된다. 명시적으로 this를 반환하여도 결과는 같다.
- 반환문이 this가 아닌 다른 객체를 명시적으로 반환하는 경우, this가 아닌 해당 객체가 반환된다. 이 때, this를 반환하지 않은 함수는 생성자 함수로서의 역할을 수행하지 못한다. 따라서 생성자 함수는 반환문을 명시적으로 사용하지 않는다.

```
function Person(name) {
  // 생성자 함수 코드 실행 전 -------- 1
  this.name = name;  // --------- 2
  // 생성된 함수 반환 -------------- 3
}

var me = new Person('Lee');
console.log(me.name);  // Lee
```

#### 객체 리터럴 방식과 생성자 함수 방식의 차이

둘의 차이는 프로토타입 객체 [[Prototype]]에 있다.

```
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
```

- 객체 리터럴 방식의 경우, 생성된 객체의 프로토타입 객체는 Object.prototype이다.(전역 객체)
- 생성자 함수 방식의 경우, 생성된 객체의 프로토타입 객체는 Person.prototype이다.(함수가 생성한 빈 객체)
  즉, 바로 위를 가리킨다.

#### 생성자 함수에 new 연산자를 붙이지 않고 호출할 경우

**일반함수와 생성자 함수에 특별한 형식적 차이는 없으며 함수에 new 연산자를 붙여서 호출하면 해당 함수는 생성자 함수로 동작한다.**

_그러나_ 객체 생성 목적으로 작성한 생성자 함수를 new 없이 호출하거나 일반함수에 new를 붙여 호출하면 오류가 발생할 수 있따.
**일반함수와 생성자 함수의 호출 시 this 바인딩 방식이 다르기 때문이다.**

일반 함수를 호출하면 this는 전역객체에 바인딩되지만 new 연산자와 함께 생성자 함수를 호출하면 this는 생성자함수가 암묵적으로 생성한 빈 객체에 바인딩된다.

```
function Person(name) {
  // new없이 호출하는 경우, 전역객체에 name 프로퍼티를 추가
  this.name = name;
};

// 일반 함수로서 호출되었기 때문에 객체를 암묵적으로 생성하여 반환하지 않는다.
// 일반 함수의 this는 전역객체를 가리킨다.
var me = Person('Lee');

console.log(me); // undefined
console.log(window.name); // Lee
```

_생성자 함수를 new없이 호출한 경우_ **함수 Person 내부의 this는 전역객체를 가리키므로 name은 전역 변수(window)에 바인딩된다.**
또한 new와 함께 생성자 함수를 호출하는 경우에 암묵적으로 반환하던 this도 반환하지 않으며, 반환문이 없으므로 undefined를 반환하게 된다.

#### apply/call/bind 호출

this에 바인딩될 객체는 함수 호출 패턴에 의해 결정된다. 이는 자바스크립트 엔진이 수행하는 것이다.
이러한 자바스크립트 엔진의 암묵적 this 바인딩 이외에 this를 특정 객체에 명시적으로 바인딩하는 방법도 제공된다.
이것을 가능하게 하는 것이 Function.prototype.apply, Function.prototype.call 메소드이다.

```
func.apply(thisArg, [argsArray])

// thisArg: 함수 내부의 this에 바인딩할 객체
// argsArray: 함수에 전달할 argument의 배열
```

apply() 메소드를 호출하는 주체는 함수이며, apply()메소드는 this를 특정 객체에 바인딩할 뿐, 본질적인 기능은 함수 호출이다.

```
var Person = function (name) {
  this.name = name;
};

var foo = {};

// apply 메소드는 생성자함수 Person을 호출한다. 이때 this에 객체 foo를 바인딩한다.
Person.apply(foo, ['name']);

console.log(foo); // { name: 'name' }
```

빈 객체 foo를 apply()메소드의 첫번째 매개변수에 주고, argument의 배열을 두번째 매개변수에 전달하면서 Person 함수를 호출했다.
이 때, Person 함수의 this는 foo객체가 된다.
Person 함수는 this의 name 프로퍼티에 매개변수 name에 할당된 인수를 할당하는데 this에 바인딩된 _foo객체에는 name프로퍼티가 없으므로 name 프로퍼티가 동적으로 추가되고 값이 할당된다._

apply()메소드의 대표적인 용도는 arguments 객체와 같은 유사 배열 객체에 배열 메소드를 사용하는 경우이다.
arguments 객체는 배열이 아니기 때문에 slice() 같은 배열의 메소드를 사용할 수 없지만, apply()메소드를 사용하면 가능하다.

```

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
```

call()메소드의 경우 apply()와 기능은 같지만 apply()의 두번째 인자에서 배열 형태로 넘긴 것을 각각 하나의 인자로 넘긴다.

```
Person.apply(foo, [1, 2, 3]);

Person.call(foo, 1, 2, 3);
```

apply()와 call()메소드는 콜백함수의 this를 위해서 사용하기도 한다.
