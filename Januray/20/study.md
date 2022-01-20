2022. 1. 20

### 네이티브 객체(Native objects or Built-in objects or Global Objects)

네이티브 객체는 ECMAScript 명세에 정의된 객체를 말하며 애플리케이션 전역의 공통 기능을 제공한다.
네이티브 객체는 애플리케이션의 환경과 관계없이 언제나 사용할 수 있다.

Object, String, Number, Function, Array, RegExp, Date, Math와 같은 객체 생성에 관계가 있는 함수 객체와 메소드로 구성된다.

네이티브 객체를 Global Object라고 부르기도 하는데, 이것은 전역 객체(Global Object)와 다른 의미로 사용되므로 혼동에 주의해야한다.

전역 객체(Global Object)는 모든 객체의 최상위 객체를 의미하며 일반적으로 Browser-side에서는 _window_, Server-side(Nodejs)에서는 _global_ 객체를 의미한다.

#### Object

Object() 생성자 함수는 객체를 생성한다. 만약 생성자 인수값이 null이거나 undefined이면 빈객체를 반환한다.

```

// 변수 o에 빈 객체를 저장한다
var o = new Object();
console.log(typeof o + ": ", o); // Output : object:  {}

o = new Object(undefined);
console.log(typeof o + ": ", o); // Output : object:  {}

o = new Object(null);
console.log(typeof o + ": ", o); // Output : object:  {}
```

그 이외의 경우 생성자 함수의 인수값에 따라 강제 형변환된 객체가 반환된다.
이 때, 반환된 객체의 [[Prototype]] 프로퍼티에 바인딩된 객체가 Object.prototype이 아니다.

```

// String 객체를 반환한다
// var obj = new String('String');과 동치이다
var obj = new Object('String');
console.log(typeof obj + ': ', obj); //object:  [String: 'String']
console.dir(obj); //[String: 'String']

var strObj = new String('String');
console.log(typeof strObj + ': ', strObj); //object:  [String: 'String']

// Number 객체를 반환한다
// var obj = new Number(123);과 동치이다
var obj = new Object(123);
console.log(typeof obj + ': ', obj); //object:  [Number: 123]

var numObj = new Number(123);
console.log(typeof numObj + ': ', numObj); //object:  [Number: 123]

// Boolean 객체를 반환한다.
// var obj = new Boolean(true);과 동치이다
var obj = new Object(true);
console.log(typeof obj + ': ', obj); //object:  [Boolean: true]

var boolObj = new Boolean(123);
console.log(typeof boolObj + ': ', boolObj); //object:  [Boolean: true]
```

**객체를 생성할 경우 특수한 상황이 아니라면 객체리터럴 방식을 사용하는 것이 일반적이다.**

```
var o = {};
```

#### Function

자바스크립트의 모든 함수는 Function 객체이다. 다른 모든 객체들 처럼 Function 객체는 new 연산자를 사용해 생성할 수 있다.

```
var adder = new Function('a', 'b', 'return a + b');

adder(2, 6);  // 8
```

#### Boolean

Boolean 객체는 원시타입 Boolean을 위한 래퍼(wrapper)객체이다.
Boolean 생성자 함수로 Boolean객체를 생성할 수 있다.

```
var foo = new Boolean(true);    // [Boolean: true]
var foo = new Boolean('false'); // [Boolean: true]

var foo = new Boolean(false); // [Boolean: false]
var foo = new Boolean();      // [Boolean: false]
var foo = new Boolean('');    // [Boolean: false]
var foo = new Boolean(0);     // [Boolean: false]
var foo = new Boolean(null);  // [Boolean: false]
```

Boolean 객체와 원시 타입 boolean을 혼동하기 쉽다. Boolean 객체는 true/false를 포함하고 있는 객체이다.

```
var x = new Boolean(false);
if (x) { // x는 객체로서 존재한다. 따라서 참으로 간주된다.
  // . . . 이 코드는 실행된다.
}
```

#### Number, Math, Date, String, RegExp, Array

다음에 알아보자

#### Error

Error 생성자는 error 객체를 생성한다. error 객체의 인스턴스는 런타임 에러가 발생했을 때 throw 된다.

```
try {
  // foo();
  throw new Error('Whoops!');
} catch (e) {
  console.log(e.name + ': ' + e.message); //Error: Whoops!
}
```

Error 이외에 Error에 관련한 객체는 아래와 같다.

- EvalError
- InternalError
- RangeError
- ReferenceError
- SyntaxError
- TypeError
- URIError

#### Symbol

Symbol은 ECMAScript6에서 추가된 유일하고 변경 불가능한 원시타입으로 Symbol 객체는 원시타입 Symbol값을 생성한다.

#### 원시타입과 래퍼 객체(Wrraper Object)

각 네이티브 객체는 각자의 프로퍼티와 메소드를 가진다.
정적 프로퍼티, 메소드는 해당 인스턴스를 생성하지 않아도 사용할 수 있고 prototype에 속해있는 메소드는 해당 prototype을 상속받을 인스턴스가 있어야만 사용할 수 있따.

그런데 원시타입 값에 대해 표준 빌트인 객체의 메소드를 호출하면 정상적으로 작동한다.

```
var str = 'Hello world!';
var res = str.toUpperCase();
console.log(res); // 'HELLO WORLD!'

var num = 1.5;
console.log(num.toFixed()); // 2
```

이는 원시 타입 값에 대해 표준 빌트인 객체의 메소드를 호출할 때, **원시 타입 값은 연관된 객체(Wrapper 객체)로 일시 변환** 되기 때문에 가능한 것이다.
그리고 메소드는 호출이 종료되면 객체로 변환된 원시타입 값은 다시 원시 타입 값으로 복귀한다.

Wrapper 객체는 String, Number, Boolean이 있다.

### 호스트 객체(Host Object)

호스트 객체는 브라우저 환경에서 제공하는 window, XmlHttpRequest, HTMLElement 등의 DOM 노드 객체와 같이 호스트 환경에 정의된 객체를 말한다.
예를 들어, 브라우저에서 동작하는 환경과 브라우저 외부에서 동작하는 환경의 자바스크립트(Node.js)는 다른 호스틑 객체를 사용할 수 있다.

브라우저에서 동작하는 환경의 호스트 객체는 전역 객체인 window, BOM(Browser Object Model)과 DOM(Document Object Model) 및 XMLHttpRequest 객체 등을 제공한다.

#### 전역 객체 (Global Object)

전역 객체는 모든 객체의 유일한 최상위 객체를 의미하며 일반적으로 Browser-side에서는 _window_ , Server-side에서는 _global_ 객체를 의미한다.

#### BOM(Browser Object Model)

브라우저 객체 모델은 브라우저 탭 또는 브라우저 창의 모델을 생성한다.
최상위 객체는 _window_ 객체로 현재 브라우저 창 또는 탭을 표현하는 객체이다. 또한, 이 객체의 자식 객체들은 브라우저의 다른 기능들을 표현한다.
이 객체들은 Standard Bulilt-in Objects가 구성된 후에 구성된다.

window아래 자식 객체

- document : 현재 로드된 웹페이지
- history : 브라우저 히스토리에 기록된 웹페이지들
- location : 현재 페이지 URL
- navigator : 브라우저 관련 정보
- screen : 장치의 디스플레이 정보

#### DOM(Document Object Model)

문서 객체 모델은 현재 웹페이지의 모델을 생성한다. 최상위 객체는 _document_ 객체로 전체 문서를 표현한다. 또한 이 객체의 자식 객체들은 문서의 다른 요소들을 표현한다. 이 객체들은 Standard Built-in Object가 구성된 후에 구성된다.

documnet 자식 객체

- html
  - <head>
    - <title>
  - <body>
    - <div> - attribute
      - <p>
        - text

```
// in browser console
this === window // true

// in Terminal
node
this === global // true
```

전역 객체는 실행 컨텍스트에 컨트롤이 들어가기 이전에 생성이 되며 constructor가 없기 때문에 new 연산자를 이용하여 새롭게 생성할 수 없다.
즉, 개발자가 전역 객체를 생성하는 것은 불가능하다.

전역 객체는 전역 스코프를 갖게 된다.

전역 객체의 자식 객체를 사용할 때 전역 객체의 기술은 생략할 수 있따.
예를 들어, document 객체는 전역 객체 window의 자식 객체 window.document...와 같이 기술할 수 있으나 일반적으로 전역객체는 생략한다.

```
//example
document.querySelector("#id")
```

그러나 사용자가 정의한 변수와 전역 개겣의 자식객체의 이름이 충돌하는 경우, 명확히 전역 객체를 기술하여 혼동을 방지할 수 있다.

전역 객체는 전역 변수를 프로퍼티로 갖게 된다. 다시 말해 전역 변수는 전역 변수의 프로퍼티이다.

```
var ga = "Global variable";
console.log(ga); // Global variable
console.log(window.ga); // Global variable
```

글로벌 영역에서 선언한 함수도 전역 객체의 프로퍼티로 접근할 수 있다. 다시 말해 전역 함수는 전역 객체의 메소드이다.

```
function foo() {
    console.log('invoked!');
    }
    window.foo(); //invoked
```

Standard Built-in Object도 역시 전역 객체의 자식 객체이다. 전역 객체의 자식 객체를 사용할 때 전역 객체의 기술은 생략할 수 있으므로 표준 빌트인 객체도 전역 객체의 기술을 생략할 수 있따.

```
// window.alert('Hello world!');
alert('Hello world!');
```

### 전역 프로퍼티(Global property)

전역 프로퍼티는 **전역 객체의 프로퍼티를 의미한다.** 애플리케이션 전역에서 사용하는 값들을 나타내기 위해 사용한다. 전역 프로퍼티는 간단한 값이 대부분이며 다른 프로퍼티나 메소드를 가지고 있다.

#### Infinity

Infinity 프로퍼티는 음/양의 무한대를 나타내는 숫자값 Infinity를 갖는다.

```
console.log(window.Infinity); // Infinity

console.log(3/0);  // Infinity
console.log(-3/0); // -Infinity
console.log(Number.MAX_VALUE * 2); // 1.7976931348623157e+308 * 2
console.log(typeof Infinity); // number
```

#### NaN

**Not-a-Number라는 뜻이다.** 숫자가 아님을 나타내는 프로퍼티이다.

```
//NaN = Number.NaN
console.log(window.NaN); // NaN

console.log(Number('xyz')); // NaN
console.log(1 * 'string');  // NaN
console.log(typeof NaN);    // number
```

#### undefined

undefined 프로퍼티는 원시타입 undefined를 값으로 갖는다.

```
console.log(window.undefined); // undefined

var foo;
console.log(foo); // undefined
console.log(typeof undefined); // undefined
```

### 전역 함수 (Global Function)

전역 함수는 애플리케이션 전역에서 호출할 수 있는 함수로서 전역 객체의 메소드이다.

#### eval()

매개 변수에 전달된 문자열 구문 또는 표현식을 평가 또는 실행한다.
**사용자로부터 입력받은 콘텐츠(untrusted data)를 eval()로 실행하는 것은 보안에 매우 취약하다.**
eval()의 사용은 가급적 금지되어야 한다.

```
var foo = eval('2 + 2');
console.log(foo); // 4

var x = 5;
var y = 4;
console.log(eval('x * y')); // 20
```

#### isFinite()

매개변수에 전달된 값이 정상적인 유한수인지 검사하여 그 결과를 Boolean으로 반환한다.
매개변수에 전달된 값이 숫자가 아닌 경우, 숫자로 변환한 후 검사를 실행한다.

```
console.log(isFinite(Infinity));  // false
console.log(isFinite(NaN));       // false
console.log(isFinite('Hello'));   // false
console.log(isFinite('2005/12/12'));   // false

console.log(isFinite(0));         // true
console.log(isFinite(2e64));      // true
console.log(isFinite('10'));      // true: '10' → 10
console.log(isFinite(null));      // true: null → 0
```

isFinite(null)은 true를 반환하는데 이것은 null을 숫자로 변환하여 검사를 수행했기 때문이다.

```
// null이 숫자로 암묵적 강제 형변환이 일어난 경우
Number(null)  // 0
// null이 불리언로 암묵적 강제 형변환이 일어난 경우
Boolean(null) // false
```

#### isNaN()

매개변수에 전달된 값이 NaN인지 검사하여 그 결과를 Boolean으로 반환한다.
매개변수에 전달된 값이 숫자가 아닌 경우, 숫자로 변환 후 검사를 수행한다.

```
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
```

#### parseFloat()

매개 변수에 전달된 문자열을 부동소수점 숫자로 변환하여 반환한다.
문자열의 첫 숫자만 반환되며 전후 공백은 무시된다. 그리고 첫문자를 숫자로 변환할 수 없다면 NaN을 반환한다.

```
parseFloat('3.14');     // 3.14
parseFloat('10.00');    // 10
parseFloat('34 45 66'); // 34
parseFloat(' 60 ');     // 60
parseFloat('40 years'); // 40
parseFloat('He was 40') // NaN
```

#### parseInt()

매개 변수에 전달된 문자열을 정수형 숫자(Integer)로 해석(parsing)하여 반환된다.
반환값은 언제나 10진수다.

두번째 매개변수에 진법을 나타내는 기수를 지정하면 첫번째 매개변수에 전달된 문자열을 해당 기수의 숫자로 해석하여 반환한다.
이 때, 반환값은 항상 10진수이다.

```
parseInt('10', 2);  // 2진수 10 → 10진수 2
parseInt('10', 8);  // 8진수 10 → 10진수 8
parseInt('10', 16); // 16진수 10 → 10진수 16
```

첫번째 매개변수에 전달된 문자열의 두번째 문자부터 해당 진수를 나타내는 숫자가 아닌 문자(2진수의 경우, 2)와 마주치면 이 문자와 계속되는 문자들은 전부 무시되며
해석된 정수 값만을 반환한다.

```
parseInt('1A0'));    // 1
parseInt('102', 2)); // 2
parseInt('58', 8);   // 5
parseInt('FG', 16);  // 15
```

첫번째 매개변수에 전달된 문자열에 공백이 있다면 첫번째 문자열만 해석하여 반환하며 전후 공백은 무시된다. 만일 첫번째 문자열을 숫자로 파싱할 수 없는 경우, NaN을 반환한다.

```
parseInt('34 45 66'); // 34
parseInt(' 60 ');     // 60
parseInt('40 years'); // 40
parseInt('He was 40') // NaN
```

#### encodeURI() / decodeURI()

encodeURI()는 매개변수로 전달된 URI(Uniform Resource Identifier)를 인코딩한다.

여기서 인코딩이란 URI의 문자들을 이스케이프 처리하는 것을 의미한다.

- 이스케이프 처리
  네트워크를 통해 정보를 공유할 때 어떤 시스템에서도 읽을 수 있는 ASCII Character-set로 변환하는 것이다.
- 이스케이프 처리 이유
  URL은 ASCII Character-set으로만 구성되어야 하며 한글을 포함한 대부분의 외국어나 ASCII에 정의되지 않은 특수문자의 경우 URL에 포함될 수 없다.
  그래서, URL내에서 의미를 갖고 있는 문자나 올 수 없는 문자 또는 시스템에 의해 해석될 수 있는 문자를 이스케이프 처리하여 야기될 수 있는 문제를 예방하기 위함이다.

이스케이프 처리에서 제외되는 문자 : 알파벳 숫자 - \_ . ! ~ \* ' ()

ecodeURI(URI) : URI: 완전한 URI (only ASCII)
decodeURI(URI) : encodedURI: 인코딩된 완전한 URI

#### encodeURIComponent() / decodeURIComponent()

encodeURIComponent()은 매개변 수로 전달된 URI component(구성요소)를 인코딩한다.

decodeURIComponent()은 매개변수로 전달된 URI component를 디코딩한다.

encodeURIComponent()는 인수를 쿼리스트링의 일부라고 간주한다.
따라서 = ? &를 인코딩한다.

반면, encodeURI()는 인수를 URI전체라고 간주하며 파라미터 구분자인 = ? &를 인코딩하지 않는다.
