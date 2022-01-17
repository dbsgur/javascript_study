2021. 1.  16

Immutability(변경 불가능)은 객체가 생성된 이후 그 상태를 변경할 수 없는 디자인 패턴을 의미한다.
Immutability는 함수형 프로그래밍의 핵심 원리이다.

객체는 참조 형태로 전달하고 전달받는다.

객체가 참조를 통해 공유되어 있다면 그 상태가 언제든지 변경될 수 있기 때문에 문제가 될 가능성도 커지게 된다.

불변 객체를 생성하면 복제나 비교를 위한 조작을 단순화할 수 있고 성능 개선에도 도움이 된다.
하지만, 객체가 변경 가능한 데이터를 많이 가지고 있는 경우 오히려 부적절한 경우가 있다.

**ES6** 에서는 불변 데이터 패턴(immutable data pattern)을 쉽게 구현할 수 있는 새로운 기능이 추가되었다.

### Immutable value VS Mutable value

Javascript의 _원시 타입(primitive data type)_ 은 **변경불가능한 값(immutable value)**이다.

**원시타입 : Boolean, null, undefined, Number, Strin, Symbol**

**원시타입 이외의 모든 값**은 객체타입이며, *객체 타입*은 **변경 가능한 값(mutable value)**이다.

즉, 객체는 새로운 값을 다시 만들 필요없이 직접 변경이 가능하다는 것이다.

```
var name = "yun";
name = "hyeok";
```

첫 행이 실행되면 메모리에 문자열 'yun'이 생성되고 식별자 name은 메모리에 생성된 문자열 'yun'의 메모리 주소를 가리킨다.
그리고 두번째 행이 실행되면 이전에 생성된 문자열 'yun'을 수정하는 것이 아니라,
새로운 문자열 'hyeok'을 메모리에 생성하고 식별자 name은 이것을 가리킨다.
이 때, 문자열 'yun', 'hyeok'은 모두 메모리에 존재하고 있다.
변수 name은 문자열 'yun'을 가리키고 있다가 문자열 'hyeok'을 가리키도록 변경되었을 뿐이다.

```
var statement = '영원한건 없어.'; // string은 immutable value

var otherStr = statement.slice(5,8);

console.log(otherStr);   // '없어.'
console.log(statement);  // '영원한건 없어.'
```

2행에서 String 객체의 slice()메소드는 statement 변수에 저장된 문자열을 변경하는 것이 아니라,
사실은 새로운 문자열을 생성하여 반환하는 것이다.
그 이유는, 문자열은 변경할 수 없는 immutable value이기 때문이다.

```
var info = {
  name : 'Yun',
  address : {
    city : 'Busan'
  }
}

var myName = info.name; //변수 myName은 string 타입이다

info.name = 'Hyeok';
console.log(myName); //Output : Yun

myName = info.name;
console.log(myName); // Output : Hyeok
```

info.name의 값을 변경했지만 변수 myName의 값은 변경되지 않는다.
이는 변수 myName에 info.name을 할당했을 때, info.name을 참조하는 것이 아니라, immutable한 값 'Yun'가 메모리에 생성되고 myName은 이것을 참조하기 때문이다.
따라서, **info.name의 값이 변경된다 하더라도 변수 myName이 참조하고 있는 'Yun'은 변함이 없다.**

```
var info1 = {
  name: "Yun",
  address: {
    city: "Busan",
  },
};

var info2 = info1; //변수 info2는 객체타입

info2.name = "Hyeok";

console.log(info1.name); //Output : Hyeok
console.log(info2.name); //Output : Hyeok
```

위의 경우 객체 info2의 name은 프로퍼티에 새로운 값을 할당하면 객체는 변경 불가능한 값이 아니므로, 객체 info2는 변경된다.
그런데, 변경하지도 않은 객체 info1도 동시에 변경된다.
이는 info1과 info2가 같은 어드레스를 참조하고 있기 때문이다.

_이것이 의도한 동작이 아니라면 참조를 가지고 있는 다른 장소에 변경 사실을 통지하고 대처하는 추가 대응이 필요하다._

### 불변 데이터 패턴(immutable daga pattern)

의도하지 않은 객체의 변경이 발생하는 원인의 대다수는 **"레퍼런스를 참조한 다른 객체에서 객체를 변경"** 하기 때문이다.
이 문제의 해결 방법은 비용은 족므 들지만 객체를 불변객체로 만들어 프로퍼티의 변경을 방지하며 객체의 변경이 필요한 경우에는 참조가 아닌 객체의 방어적 복사(defensive copy)를 통해 새로운 객체를 생성한 후 변경한다.

- 객체의 방어적 복사(defensive copy)
  - Object.assign
- 불변객체화를 통한 객체 변경 방지
  - Object.freeze

#### Object.assign

**Object.assign** 은 타깃 객체로 _소스 객체의 프로퍼티를 복사_ 한다.
이 때, 소스 객체의 프로퍼티와 동일한 프로퍼티를 가진 타겟 객체의 프로퍼티들은 소스 객체의 프로퍼티로 덮어쓰기 된다. 리턴 값으로 타깃 객체를 반환한다.

**참고**

```
var test1 = {
  name: "123",
};

var test2 = {
  name: "123",
};

console.log(test1.name);
console.log(test2.name);
console.log(test1 === test2); //false
console.log(test1.name === test2.name); //true
```

객체는 참조형이라서 객체 안이 같아도 false가 나온다.
그러나 객체안의 값을 비교하면 값이 같을 경우 true가 나온다..

```

// Copy
const obj = { a: 1 };
const copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }
console.log(obj); // {a: 1}
console.log(obj == copy); // false

// Merge
const o1 = { a: 1 };
const o2 = { b: 2 };
const o3 = { c: 3 };

const merge1 = Object.assign(o1, o2, o3);

console.log(merge1); // { a: 1, b: 2, c: 3 }
console.log(o1);     // { a: 1, b: 2, c: 3 }, 타겟 객체가 변경된다!
console.log(o1 === merge1 ); // false

// Merge
const o4 = { a: 1 };
const o5 = { b: 2 };
const o6 = { c: 3 };

const merge2 = Object.assign({}, o4, o5, o6);

console.log(merge2); // { a: 1, b: 2, c: 3 }
console.log(o4);     // { a: 1 }
```

Object.assign을 사용하여 기존 객체를 변경하지 않고 객체를 복사하여 사용할 수 있다.
Object.assign은 완전한 deep copy를 지원하지 않는다.
객체 내부의 객체(Nested Object)는 Shallow copy된다.

```
const user1 = {
  name: 'Lee',
  address: {
    city: 'Seoul'
  }
};

// 새로운 빈 객체에 user1을 copy한다.
const user2 = Object.assign({}, user1);
// user1과 user2는 참조값이 다르다.
console.log(user1 === user2); // false

user2.name = 'Kim';
console.log(user1.name); // Lee
console.log(user2.name); // Kim

// 객체 내부의 객체(Nested Object)는 Shallow copy된다.
console.log(user1.address === user2.address); // true

user1.address.city = 'Busan';
console.log(user1.address.city); // Busan
console.log(user2.address.city); // Busan
```

user1 객체를 빈객체에 복사하여 새로운 객체 user2를 생성하였다.
user1과 user2는 어드레스를 공유하지 않으므로 한 객체를 변경하여도 다른 객체에 아무런 영향을 주지 않는다.

주의할 것은 user1객체는 const로 선언되어 재할당 할 수 없지만, 객체의 프로퍼티는 보호되지 않는다.
다시 말하자면, 객체의 내용은 변경할 수 있다.

#### Object.freeze

Object.freesze()를 사용하면 불변한 객체로 만들 수 있따.

```
const user1 = {
  name: 'Lee',
  address: {
    city: 'Seoul'
  }
};

// Object.assign은 완전한 deep copy를 지원하지 않는다.
const user2 = Object.assign({}, user1, {name: 'Kim'});

console.log(user1.name); // Lee
console.log(user2.name); // Kim

Object.freeze(user1);

user1.name = 'Kim'; // 무시된다!

console.log(user1); // { name: 'Lee', address: { city: 'Seoul' } }

console.log(Object.isFrozen(user1)); // true
```

위 처럼 name을 바꾸려고 시도해도 무시된다.

그러나 객체의 내부의 객체(Nested Object)는 변경 가능하다.

```
const user = {
  name: 'Lee',
  address: {
    city: 'Seoul'
  }
};

Object.freeze(user);

user.address.city = 'Busan'; // 변경된다!
console.log(user); // { name: 'Lee', address: { city: 'Busan' } }
```

내부 객체까지 변경 불가능하기 만들려면 Deep freeze를 해야 한다.

```
function deepFreeze(obj) {
  const props = Object.getOwnPropertyNames(obj);

  props.forEach((name) => {
    const prop = obj[name];
    if(typeof prop === 'object' && prop !== null) {
      deepFreeze(prop);
    }
  });
  return Object.freeze(obj);
}

const user = {
  name: 'Lee',
  address: {
    city: 'Seoul'
  }
};

deepFreeze(user);

user.name = 'Kim';           // 무시된다
user.address.city = 'Busan'; // 무시된다

console.log(user); // { name: 'Lee', address: { city: 'Seoul' } }
```

#### Immutable.js

Object.assign과 Object.freeze을 사용하여 불변 객체를 만드는 방법은 번거러울 뿐더러, **성능상 이슈가 있어서 큰 객체에는 사용하지 않는 것이 좋다.**

또 다른 대안으로, **Immutable.js** 를 사용하는 방법이 있다.

Immutable.js는 List, Stack, Map, OrderMap, Set, OrderSet, Record와 같은 영구 불변(Permit Immutable) 데이터 구조를 제공한다.

사용법

1. npm응 사용하여 Immutable을 설치한다.
   `npm install immutable`

2. 모듈을 임포트하여 사용한다.

```
const { Map } = require('immutable')
const map1 = Map({a:1, b:2, c:3})
const map2 = map1.set('b', 50)
map1.get('b') // Output : 2
map2.get('b') // Output : 50
```

3행의 실행에도 불구하고 map1은 불변했다. map1.set()은 결과를 반영한 새로운 객체를 반환한다.

### 함수 Function

함수란 어떤 작업을 수행하기 위해 필요한 문(statement)들의 집합을 정의한 코드 블록이다.
함수는 이름과 매개변수를 가지며 필요한 때에 호출하여 코드 블록에 담긴 문들을 일괄적으로 실행할 수 있따.

```
function example(number) {
  return number * number;
}
```

함수는 _코드의 재사용_ 이라는 측면에서 매우 유용하다.

코드의 재사용 이외에 객체 생성, 객체의 행위 정의(메소드), 정보 은닉, 클로저, 모듈화 등의 기능을 수행할 수 있따.

자바스크립트의 함수는 객체(일급 객체, First-class object)이다.
다른 객체와 구분될 수 있는 특징은 호출할 수 있따는 것이다.
함수도 객체이므로 다른 값들처럼 사용할 수 있다.
즉, 변수난 객체, 배열 등에 저장할 수 있고 다른 함수에 전달되는 인수로도 사용할 수 있으며 함수의 반환값이 될 수 도 있따.

### 함수 정의

함수 정의 방식

- 함수 선언문
- 함수 표현식
- function 생성자 함수

#### 함수 선언문 (Function declaration)

구성 요소

- 함수명 : 함수 선언문의 경우, 함수명은 생략할 수 없다. 함수명은 함수 몸체에서 자신을 재귀적(recursive)호출하거나 자바스크립트 디버거가 해당 함수를 구분할 수 있는 식별자이다.

- 매개변수 목록 : 0개 이상의 목록으로 괄호로 감싸고 콤마로 분리한다. 다른 언어와의 차이점은 매개변수의 타입을 기술하지 않는다는 것이다. 이 때문에 함수 몸체 내에서 매개변수의 타입체크를 필요할 수 있다.

- 함수 몸체 : 함수가 호출되었을 때 실행되는 문들의 집합이다. 중괄호로 문들을 감싸고 return 문으로 결과값으로 반환할 수 있다. 이를 반환값(return value)라 한다.

```
//함수 선언문
function example(number) {
  return number * number;
}
```

example : 함수명, number : 매개변수 목록, {}안 : 함수 몸체 이다.

#### 함수 표현식

자바스크립트의 함수는 _일급 객체_ 이므로 아래와 같은 특징을 가진다.

1. 무명의 리터럴로 표현이 가능하다.
2. 변수나 자료구조(객체, 배열... )에 저장할 수 있다.
3. 함수의 파라미터로 전달할 수 있따.
4. 반환값(return value)로 사용할 수 있다.

```
//함수 표현식
var example = function(number){
  return number * number
}
```

함수 표현 방식으로 정의한 함수는 함수명을 생략할 수 있다.
이러한 함수를 _익명 함수(anonymous function)_ 이라한다.
함수 표현식에는 함수명을 생략하는 것이 일반적이다.

```
// 기명 함수 표현식(named function expression)
var foo = function multiply(a, b) {
  return a * b;
};

// 익명 함수 표현식(anonymous function expression)
var bar = function(a, b) {
  return a * b;
};

console.log(foo(10, 5)); // 50
console.log(multiply(10, 5)); // Uncaught ReferenceError: multiply is not defined
```

함수는 일급 객체이기 때문에 변수에 할당할 수 있는데, 이 변수는 함수명이 아니라 할당된 함수를 가리키는 참조값을 저장하게 된다.
함수 호출 시 함수명이 아니라 함수를 가리키는 변수명을 사용하여야 한다.

```
var foo = function(a, b) {
  return a * b;
};

var bar = foo;

console.log(foo(10, 10)); // 100
console.log(bar(10, 10)); // 100
```

위 코드를 보면 알겠지만, 변수 bar와 변수foo는 **동일한 익명 함수의 참조값을 갖는다.**

**함수가 할당된 변수를 사용해 함수를 호출하지 않고 기명 함수의 함수명을 사용해 호출하게 되면 에러가 발생한다.**
_이는 함수 표현식에서 사용한 함수명은 외부코드에서 접근 불가능하기 때문이다._

#### Function 생성자 함수

함수 표현식으로 함수를 정의할 때 함수 리터럴 방식을 사용한다.
함수 선언문도 내부적으로 자바스크립트 엔진이 기명 함수 표현식으로 변환되므로 결국 함수 리터럴 방식을 사용한다.

따라서, **함수 선언문과 함수 표현식은 모두 함수 리터럴 방식으로 함수를 정의하는데 이것은 결국 내장 함수 Fucntion 생성자 함수로 함수를 생성하는 것을 단순화 시킨 축약법(short-hand)이다.**

Function 생성자 함수는 Function.prototype.constructor 프로퍼티로 접근할 수 있다.

```
var example = new Function('number', 'return number * number');
console.log(example(10)); // 100
```

Function 생성하 함수로 함수를 생성하는 방식은 일반적으로 사용하지 않는다.

### 함수 호이스팅

위의 3가지 함수 정의 방식은 동작 방식에 약간 차이가 있다.

```
var res = example(5);

function example(number) {
  return number * number;
}
```

'함수 선언문'으로 함수가 정의되기 이전에 함수 호출이 가능하다.
함수 선언문의 경우, _함수 선언문의 위치와는 상관없이_ 코드 내 어느 곳에서든 호출이 가능한데 이것을 **함수 호이스팅(Function Hoisting)이라 한다.**

**자바스크립트는 ES6의 let, const를 포함하여 모든 선언(var, let, const, function, function\*, class)을 호이스팅한다.**

함수선언문으로 정의된 함수는 자바스크립트 엔진이 스크립트가 로딩되는 시점에 바로 초기화하고 이를 VO(variable object)에 저장한다.
**즉, 함수 선언, 초기화, 할당이 한번에 이루어진다.** 그렇기 때문에 함수 선언의 위치와는 상관없이 소스 내 어느 곳에서든지 호출이 가능하다.

```
var res = example(5); // TypeError: square is not a function

var example = function(number) {
  return number * number;
}
```

'함수 표현식'의 경우 TypeError가 발생하였따. 함수 호이스팅이 아니라 변수 호이스팅이 발생한다.

!! 변수 호이스팅은 변수 생성 및 초기화와 할당이 분리되어 진행된다. 호이스팅된 변수는 undefined로 초기화되고 실제값의 할당은 할당문에서 이루어진다.

!! 함수 표현식은 함수선언문과 달리 스크립트 로딩 시점에 변수 객체(VO)에 함수를 할당하지 않고 runtime에 해석되고 실행되므로 이 두가지를 구분하는 것이 중요하다.

!! _자바스크립트 권위자는 '함쑤 표현식'만을 사용할 것을 권고하고 있따. 함수 호이스팅이 함수 호출 전 반드시 함수를 선언하야여 한다는 규칙을 무시하므로 코드의 구조를 엉성하게 만들 수 있다고 지적한다._

또한, '함수 선언문'으로 함수를 정의하면 사용하기에는 쉽지만 대규모 어플리케이션을 개발하는 경우 인터프리터가 너무 많은 코드를 변수 객체(VO)에
저장하므로 애플리케이션의 응답속도는 현저히 떨어질 수 있으므로 주의해야할 필요가 있다.

### First-class object(일급 객체)

일급 객체란? 생성, 대입, 연산, 인자 또는 반환값으로서의 전달 등 프로그래밍 언어의 기본적 조작을 제한없이 사용할 수 있는 대상을 의미한다.

다음 조건을 만족하면 일급 객체로 간주한다.

1. 무명의 리터럴로 표현이 가능하다.
2. 변수나 자료 구조(객체, 배열 등)에 저장할 수 있다.
3. 함수의 매개변수에 전달할 수 있다.
4. 반환값으로 사용할 수 있다.

javascript의 함수는 위의 조건을 모두 만족하므로 **Javascript의 함수는 일급객체이다.**
따라서, Javascript의 함수는 흡사 변수와 같이 사용할 수 있으며, **코드의 어디에서든지 정의할 수 있다.**

함수와 다른 객체를 구분짓는 특징은 **호출할 수 있다는 것이다.**

### 매개변수(Parameter, 인자)

함수의 작업 실행을 위해 추가적인 정보가 필요할 경우, 매개변수를 지정한다. 매개변수는 **함수 내에서 변수와 동일하게 동작한다.**

#### 매개변수(Parameter, 인자) vs 인수(argument)

매개변수는 함수 내에서 변수와 동일하게 메모리 공간을 확보하며 함수에 전달한 인수는 매개변수에 할당된다. 만약 인수를 전달하지 않으면 매개변수는 undefined로 초기화 된다.

```
var example = function(p1, p2){
  console.log(p1, p2)
}

example(1); //Output : 1 undefined
```

#### Call-by-value

원시 타입 인수는 _Call-by-value(값에 의한 호출)_ 로 동작한다.
이는 함수 호출 시, 원시 타입 인수를 함수에 매개변수로 전달할 떄 매개변수에 값을 복사하여 함수로 전달하는 방식이다.
이 때, 함수 내에서 매개변수를 통해 값이 변경되어도 전달이 완료된 원시 타입 값은 변경되지 않는다.

```
function foo(primitive) {
  primitive += 1;
  return primitive;
}

var x = 0;

console.log(foo(x)); // 1
console.log(x);      // 0
```

#### Call-by-reference

객체형(참조형) 인수는 _Call-by-reference(참조에 의한 호출)_ 로 동작한다.
이는 함수 호출 시 참조 차입 인수를 함수에 매개변수로 전달할 때 매개변수에 값이 복사되지 않고 객체의 참조값이 매개변수에 저장되어 함수로 전달되는 방식이다.
이 때, 함수 내에서 매개변수의 참조 값을 이용하여 객체의 값을 변경했을 떄 전달되어진 참조형의 인수값도 같이 변경된다.

```
function changeVal(primitive, obj) {
  primitive += 100;
  obj.name = 'Kim';
  obj.gender = 'female';
}

var num = 100;
var obj = {
  name: 'Lee',
  gender: 'male'
};

console.log(num); // 100
console.log(obj); // Object {name: 'Lee', gender: 'male'}

changeVal(num, obj);

console.log(num); // 100
console.log(obj); // Object {name: 'Kim', gender: 'female'}
```

changeVal 함수는 원시타입과 객체 타입 인수를 전달 받아 함수 몸체에서 매개변수의 값을 변경하였다.
이 때, 원시 타입 인수는 값을 복사하여 매개변수에 전달하기 때문에 함수 몸체에서 그 값을 변경하여도 어떠한 부수효과도 발생시키지 않는다.

하지만, 객체형 인수는 참조값을 매개변수에 전달하기 때문에 함수 몸체에서 그 값을 변경할 경우, 원본 객체가 변경되는 부수효과가 발생한다.
이와 같이 부수효과를 발생시키는 비순수 함수(Impure function)는 복잡성을 증가시킨다.
비 순수 함수를 최대한 줄이는 것은 부수 효과를 최대한 억제하는 것과 같다. 이것은 디버깅을 쉽게 만든다.

어떠한 외부 상태도 변경하지 않는 함수를 순수함수(Pure function), 외부상태도 변경시키는 부수 효과가 발생키는 함수를 비순수 함수라 한다.

### 반환값 (Return Value)

함수는 자신을 호출한 코드에게 수행한 결과를 반환할 수 있다. 이때 반환된 값을 반환값이라 한다.

- return 키워드는 함수를 호출한 코드(caller)에게 값을 반환할 때 사용한다.
- 함수는 배열 등을 이용하여 한번에 여러 개의 값을 리턴할 수 있다.
- 함수는 반환을 생략할 수 있다. 이 때 함수는 암묵적으로 _undefined_ 를 반환한다.
- 자바스크립트 인터프리터는 return 키워드를 만나면 함수의 실행을 중단한 후, 함수를 호출한 코드로 되돌아간다. 만일 return 키워드 이후에 다른 구문이 존재한다면 그 구문은 실행되지 않는다.

### 함수 객체의 프로퍼티

함수는 객체이다. 따라서 함수도 프로퍼티를 가질 수 있다.

```
function square(number) {
  return number * number;
}

square.x = 10;
square.y = 20;

console.log(square.x, square.y);
```

함수는 일반 객체와는 다른 함수만의 프로퍼티를 갖는다.

```
function square(number) {
  return number * number;
}
console.dir(square);
```

Output

```
argument: null
caller: null
length: 1
name: "square"
prototype: Object
__proto__: function()
```

??리터럴 방식
