2021. 1.  13

### Variable 변수

프로그램에서 사용되는 데이터를 일정 기간 동안 기억하여 필요한 때에 다시 사용하기
위해 고유의 이름인 식별자(identifier)를 명시한 것이다.
변수에 명시한 고유한 식별자를 *변수 명*이라고 하고, 변수로 참조할 수 있는 데이터를 *변수 값*이라고 한다.

변수는 _var, let, const_ 키워드를 시용하여 **선언**하고 *할당 연산자*를 사용해 값을 **할당**한다.
그리고 식별자인 *변수명*을 사용해 변수에 저장된 값을 **참조**한다.

?할당 연산자

#### 변수의 선언

```
var PI = 3.141592653589793; // 상수
var radius = 2; // 변수
var circleArea = PI * radius * radius;
var cylinderHeight = 5;
var cylinderVolume = circleArea * cylinderHeight;
```

이처럼 변수는 애플리케이션에서 한번 쓰고 버리는 값이 아닌 값이 일정 기간 유지할 필요가 있는 값에 사용한다.

변수의 존재 목적을 쉽게 이해할 수 있도록 의미있는 변수명을 지정해야한다.

```
var x = 3;        // NG
var score = 100;  // OK
```

변수명은 식별자(identifier)로 불리기도 하며 명명 규칙이 존재한다.

- 반드시 영문자(특수문자 제외), underscore(\_), 또는 달러 기호($)로 시작해야한다. 이어지는 문자에는 숫자도 사용할 수 있다.
- 자바스크립트는 대/소문자를 구별한다.

변수를 선언할 때는 **var** 키워드를 사용한다. 등호(=)는 변수에 값을 할당하는 *할당 연산자*에 해당한다.

```
var name;     // 선언
name = 'Hyeok'; // 할당

var age = 30; // 선언과 할당

var person = 'Hyeok',
    address = 'Seoul',
    price = 200;

var price = 10;
var tax   = 1;
var total = price + tax;
```

```
var x;
console.log(x); // undefined
console.log(y); // ReferenceError
```

**값을 할당하지 않은 변수**. 즉, **선언만 되어 있는 변수**는 *undefined*로 초기값을 갖는다.
**선언하지 않은 변수**에 접근하면 *ReferenceError*가 발생한다.

#### 변수의 중복 선언

var키워드로 선언한 변수는 중복 선언이 가능하다.
다시 말해 변수명이 같은 변수를 중복해 선언해도 에러가 발생하지 않는다.

```
var x = 1;
console.log(x); // 1

// 변수의 중복 선언
var x = 100;
console.log(x); // 100
```

위 코드의 변수 x는 중복 선언되었다. 이처럼 변수를 중복 선언하면 에러없이 이전 변수의 값을 덮어쓴다.
만약, 동일한 변수명이 선언되어 있는 것을 모르고 변수를 중복 선언했다면 의도치 않게 변수의 값을 변경하는 부작용을 발생시킨다.
따라서, **변수의 중복 선언은 문법적으로 허용되지만 사용하지 않는 것이 좋다.**

#### 동적 타이핑 (Dynamic Typing)

자바스크립트는 **동적 타입 언어**이다.
이것은 변수의 타입 지정(Type annotation)없이 할당되는 과정에서 값의 타입에 의해
자동으로 타입이 결정(Type Inference)될 것이라는 뜻이다.
따라서, **같은 변수에 여러 타입의 값을 할당할 수 있다.** 이를 *동적 타이핑(Dynamic Typing)*이라한다.

```
var foo;

console.log(typeof foo);  // undefined

foo = null;
console.log(typeof foo);  // object

foo = {};
console.log(typeof foo);  // object

foo = 3;
console.log(typeof foo);  // number

foo = 3.14;
console.log(typeof foo);  // number
```

#### 변수 호이스팅 (Variable Hoisting)

```
console.log(foo); // ① undefined
var foo = 123;
console.log(foo); // ② 123
{
  var foo = 456;
}
console.log(foo); // ③② 456
```

var 키워드를 사용하면 선언한 변수는 중복 선언이 가능하기 때문에 위의 코드는 문법적으로 문제가 없다.

①에서 변수 foo는 아직 선언되지 않았으므로 'ReferenceError : foo is not defined'가 발생할 것을 기대했겠지만 콘솔에는 undefined가 출력된다.

이것은 다른 C-family언어와는 차별되는 자바스크립트의 특징으로 모든 선언문은 **호이스팅(Hoisting)**되기 때문이다.

*호이스팅*이란 ? var선언문이나 function 선언문 등 모든 선언문이 해당 Scope의 선두로 옮겨진 것처럼 동작하는 특성을 말한다.
즉, 자바스크립트는 모든 선언문(var, let, const, function, function\*, class)이 선언되기 이전에 참조 가능하다.

변수는 3단계에 걸쳐 생성된다.

1. 선언 단계(Declaration phase)

- 변수 객체(Variable Object)에 변수를 등록한다. 이 변수 객체는 스코프가 참조하는 대상이 된다.

2. 초기화 단계(Initialization phase)

- 변수 객체에 등록된 변수를 메모리에 할당한다. 이 단계에서 변수는 undefined로 초기화한다.

3. 할당 단계(Assignment phase)

- undefined로 초기화된 변수에 실제값을 할당한다.

var 키워드로 선언되는 변수는 선언 단계와 초기화 단계가 한번에 이루어 진다.
즉, 스코프에 변수가 등록되고 변수는 메모리에 공간을 확보한 후 undefined로 초기화된다.
따라서 변수 선언문 이전에 변수에 접근하여도 Variable Object에 변수가 존재하기 때문에 에러가 발생하지 않는다. 다만, undefined를 반환한다.
이러한 현상을 *호이스팅*이라한다.

이후 변수 할당문에 도달하면 비로소 값의 할당이 이루어진다.

앞의 예제를 통해 호이스팅에 더 알아보자.

①이 실행되기 이전에 _var foo = 123;_ 이 호이스팅되어 ①구문 앞에 _var foo;_ 가 옮겨진다. (실제로 변수 선언이 코드 레벨로 옮겨진 것은 아니고 변수 객체가 등록되고 undefined로 초기화된 것이다.)
하지만, 변수 선언 단계와 초기화 단계가 할당 단계와 분리되어 진행뙤기 때문에 이 단계에서는 foo에는 undefined가 할당되어 있다. 변수 foo에 값이 할당되는 것은 2행에서 실시된다.

②에서는 변수에 깞이 할당되었기 때문에 *123*이 출려된다.

자바스크립트의 변수는 다른 C-family와는 달리 **블록 레벨 스코프(block-level scope)**를 가지지 않고 **함수레벨 스코프(function-level scope)**를 갖는다.
단, _let, const_ 키워드를 사용하면 블록레벨 스코프를 사용할 수 있다.

따라서 코드 블록 내의 변수 foo는 전역변수이므로 전역에 선언된 변수 foo에 할당된 값을 재할당하기 때문에 ③의 결과는 456이다.

##### 함수 레벨 스코프

- 함수 내에서 선언된 변수는 함수 내에서만 유효하며 함수 외부에서는 참조할 수 없다.
  즉, 함수 내부에서 선언한 변수는 지역 변수이며 함수 외부에서 선언한 변수는 모두 전역 변수이다.

##### 블록 레벨 스코프

- 코드 블록 내에서 선언된 변수는 코드 블록 내에서만 유효하며 코드 블록 외부에서는 참조할 수 없다.

#### var 키워드로 선언된 변수의 문제점

ES5에서 변수를 선언할 수 있는 유일한 방법은 var을 사용하는 것이었다.
var 키워드로 선언된 변수는 아래와 같은 특징을 가진다.
이는 C-family 언어와는 차별되는 특징(설계상 오류)으로 주의를 기울이지 않으면 심각한 문제를 발생시킨다.

1. 함수 레벨 스코프

- 전역 변수의 남발
- for loop 초기화식에서 사용한 변수를 for loop 외부 또는 전역에서 참조할 수 있다.

2. var 키워드 생략 허용

- 의도하지 않은 변수의 전역화

3. 중복 선언 허용

- 의도하지 않은 변수값의 변경

4. 변수 호이스팅

- 변수를 선언하기 전에 참조가 가능하다.

**대부분의 문제는 전역 변수로 인해 발생한다.** 전역 변수는 간단한 애플리케이션의 경우, 사용이 편리한 면이 있지만 불가피한 상황을 제외하고 사용을 억제해야 한다.
전역 변수는 유효 범위(scope)가 넓어서 어디에서 어떻게 사용될 지 파악하기 어렵다.
이는 의도치 않은 변수의 변경이 발생할 수 있는 가능성이 증가한다.
또한, 여러 함수와 상호 의존하는 등, 부수 효과(side effect)가 있을 수 있어서 복잡성이 증가한다.

**변수의 유효 범위는 좁을 수록 좋다.**

ES6은 이러한 var단점을 보완하기 위해 *let*과 *const*를 도입했다.

부수 효과란 ? 함수 내의 실행으로 인해 함수 외부가 영향을 받는 것을 의미한다.

자바스크립트는 객체가 생성되었을 때, 자동으로 메모리를 할당하고 쓸모 없어졌을 때(더 이상 사용되지 않을 때), '자동으로' 메모리가 반환되는데 이런 과정을 \_\_가비지 컬렉션(garbage collection)이라 한다.

==============================================================================================================

### 표현식과 연산자

표현식(expression)은 리터럴, 식별자, 연산자, 함수 호출 등의 조합을 말한다.
표현식은 평가(표현식을 실행하여 하나의 값을 만드는 과정)되어 하나의 값을 만든다.
즉, 표현식은 하나의 값으로 평가될 수 있는 문(statement)이다.

표현식은 평가되어 결국 하나의 값이 되므로, 표현식은 값처럼 사용할 수 있다.

### 문(statement)과 표현식

문은 자바스크립트 엔진에게 내리는 명령이다. 문이 실행되면 무슨 일인가가 일어나게 된다.

```
// 변수 선언문
var x;

// 할당문
x = 5;

// 함수 선언문
function foo () {}

// 조건문
if (x > 5) { … }

// 반복문
for (var i = 0; i < 10; i++) { … }
```

문은 리터럴, 연산자, 표현식, 키워드 등으로 구성되며 세미콜론으로 끝나야한다.
코드 블록{...} 제외

ESLint란 ? ES + Lint이다. ES = EcmaScript = Javascript
Lint = 보푸라기 = (programming :)에러가 있는 코드에 표시를 달아 놓는 것
즉, ESLint = 자바스크립트 문법 중 에러가 있는 곳에 표시를 달아놓는 도구

### 연산자(Operator)

연산자는 하나 이상의 표현식을 대상으로 산술, 할당, 비교, 논리, 타입 연산 등을 수생해 하나의 값을 만든다.

### 산술연산자

산술 연산을 할 수 없는 경우에는 **NaN**을 반환한다.

산술 연산자는 이항 산술 연산자와 단항 산술 연산자로 구분할 수 있다.

#### 이항 산술 연산자

이항 산술 연산자는 2개의 피연산자를 대상으로 연산하여 *숫자 타입*의 값을 만든다.

모든 이항 산술 연산자는 피연산자의 값을 변경하는 부수 효과가 없다.
즉, 어떤 산술 연산을 해도 피연산자의 값이 바뀌는 경우는 없고, 새로운 값을 만들 뿐이다.

| 이항 산술 연산자 |  의미  |
| :--------------: | :----: |
|       `+`        |  덧셈  |
|       `-`        |  뺄셈  |
|       `*`        |  곱셈  |
|       `/`        | 나눗셈 |
|       `%`        | 나머지 |

```
5 + 2  // 7
5 - 2  // 3
5 * 2  // 10
5 / 2  // 2.5
5 % 2  // 1
```

#### 단항 산술 연산자

1개의 피연산자를 대상으로 연산한다.

증가/감소 연산자는 피연산자의 값을 변경하는 부수 효과가 있다.
즉, 증가/감소 연산을 하면 피연산자의 값이 바뀐다.

| 단항 산술 연산자 |                         의미                         |
| :--------------: | :--------------------------------------------------: |
|       `++`       |                         증가                         |
|       `--`       |                         감소                         |
|       `+`        | 어떠한 효과도 없다. 음수를 양수로 반전하지도 않는다. |
|       `-`        |  양수를 음수로, 음수를 양수로 반전한 값을 반환한다.  |

증가/감소(++/--) 연산자는 위치에 의미가 있다.
앞에 위치하면 전위 증가/감소 : 먼저 증가/감소 시킨 후, 다른 연산을 수행한다.
뒤에 위치하면 후위 증가/감소 : 먼저 다른 연산을 수행한 후, 피연산자의 값을 증가/감소시킨다.

```
var x = 5, result;

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
```

'+' 단항 연산자는 피연산자에 어떠한 효과도 없다.
그런데 숫자 타입이 아닌 피연산자에 사용하면 피연산자를 숫자 타입으로 변환하여 반환한다.
이 때, 피연산자를 변경하는 것은 아니고 숫자 타입으로 변환한 값을 생성해서 반환한다.
따라서, **부수효과는 없다.**

```
+10 // 10
+'10' // 10
+true // 1
+false // 0
```

'-' 단항 연산자는 피연산자의 부호를 반전한 값을 반환한다. '+'와 마찬가지로 숫자 타입이 아닌 피연산자에 사용하면 피연산자를 숫자타입으로 변환하여 반환한다.
이 때, 피연산자를 변경하는 것은 아니고 부호를 반전한 값을 생성해서 반환한다.
따라서, **부수효과는 없다.**

```
-10 // -10
-'10' // -10
-true // -1
-false // -0
```

#### 문자열 연결 연산자

'+'연산자는 피연산자 중 *하나 이상이 문자열*인 경우 문자열 연결 연산자로 동작한다.
그 외의 경우 덧셈 연산자로 동작한다.

```
// 문자열 연결 연산자
'1' + '2'      // '12'
'1' + 2       // '12'

// 산술 연산자
1 + 2          // 3
1 + true       // 2 (true → 1)
1 + false      // 1 (false → 0)
true + false    // 1 (true → 1 / false → 0)
1 + null       // 1 (null → 0)
1 + undefined // NaN (undefined → NaN)
```

이것을 보면 **개발자의 의도와는 상관없이 자바스크립트 엔진에 의해 암묵적으로 타입이 자동으로 변환되기도 한다는 것이다.**

### 할당 연산자(Assignment Operator)

할당 연산자는 우항에 있는 피연산자의 평가 결과를 좌항에 있는 변수에 할당한다.
할당 연산자는 좌항의 변수에 값을 할당하므로 부수효과가 있다.

| 할당 연산자 |   사례   |  동일 표현  |
| :---------: | :------: | :---------: |
|     `=`     | `x = y`  |   `x = y`   |
|    `+=`     | `x += y` | `x = x + y` |
|    `-=`     | `x -= y` | `x = x - y` |
|    `*=`     | `x *= y` | `x = x * y` |
|    `/=`     | `x /= y` | `x = x / y` |
|    `%=`     |   `%=`   | `x = x % y` |

```
var x;

x = 10;   // 10
x += 5;   // 15
x -= 5;   // 10
x *= 5;   // 50
x /= 5;   // 10
x %= 5;   // 0

var str = 'My name is ';
str += 'Hyeok'; // My name is Hyeok
```

### 비교 연산자(Comparison Operator)

비교 연산자는 좌항과 우항의 피연산자를 비교하여 불리언 값을 반환한다.
if나 for문에서 주로 사용한다.

#### 동등 / 일치 비교 연산자

| 비교 연산자 |     의미      |    사례    |            설명            |
| :---------: | :-----------: | :--------: | :------------------------: |
|    `==`     |  `동등 비교`  |  `x == y`  |     ` x와 y값이 같음`      |
|    `===`    |  `일치 비교`  | `x === y`  | `x와 y의 값과 타입이 같음` |
|    `!=`     |  `부등 비교`  |  `x != y`  |    `x와 y의 값이 다름`     |
|    `!==`    | `불일치 비교` | `x !=== y` | `x와 y의 값과 타입이 다름` |

개발자의 의도와는 상관 없이 자바스크립트 엔진에 의해 암묵적으로 타입이 자동 변환되기도 한다. 이를 '암묵적 타입 변환'이라 부른다고 했다.

동등 비교(==)연산자는 좌항과 우항의 피연산자를 비교할 때 암묵적 타입 변환을 통해 타입을 잋리시킨 후 같은 값을 갖는 지 비교한다.
따라서, 비교 연산자는 좌항과 우항의 피연산자가 타입은 다르더라도 암묵적 타입 변환 후에 같은 값을 가지고 있으면 true를 반환한다.

```
// 동등 비교
5 == 5    // true
// 타입은 다르지만 암묵적 타입 변환을 통해 타입을 일치시키면 같은 값을 같는다.
5 == '5'   //true
5 == 8    // false
```

동등 비교 연산자는 편리한 경우도 있지만, 수많은 부작용을 일으키므로 사용하지 않는 편이 좋다.

```
'' == '0'           // false
0 == ''             // true
0 == '0'            // true

false == 'false'    // false
false == '0'        // true

false == undefined  // false
false == null       // false
null == undefined   // true
```

위 예제처럼 '=='연산자는 개발자가 예측하기 어려운 결과를 만들어 낸다.
그러니 동등 비교 연산자를 사용하지말고 **일치 비교 연산자(===)**를 사용하자.

```
// 일치 비교
5 === 5   // true
5 === '5' // false
```

일치 비교 연산자는 예측하기 쉽다. 주의할 것은 NaN이다.

```
NaN === NaN // false
```

NaN은 자신과 일치하지 않는 유일한 값이다.
따라서 숫자가 NaN인지 조사하려면 빌트인 함수 isNaN을 사용한다.

```
isNaN(NaN) // true
```

숫자 0도 주의하자

```
0 === -0 //true
```

부동등 비교 연산자(!=)와 불일치 비교 연산자(!==)는 '=='와 '==='의 반대 개념이다.

```
// 부동등 비교
5 != 8    // true
5 != 5    // false
5 != '5'  // false

// 불일치 비교
5 !== 8   // true
5 !== 5   // false
5 !== '5' // true
```

#### 대소 관계 비교 연산자

피연산자의 크기를 비교하여 불리언 값을 반환한다.

| 대소 관계 비교 연산자 |  예제  |          설명           |
| :-------------------: | :----: | :---------------------: |
|          `>`          | `x>y`  |    `x가 y보다 크다`     |
|          `<`          | `x<y`  |    `x가 y보다 작다`     |
|         `>=`          | `x>=y` | `x가 y보다 같거나 크다` |
|         `<=`          | `x<=y` | `x가 y보다 같거나 작다` |

```
// 대소 관계 비교
5 > 0    // true
5 > 5    // false
5 > 8    // false

5 < 0    // false
5 < 5    // false
5 < 8    // true

5 >= 0   // true
5 >= 5   // true
5 >= 8   // false

5 <= 0   // false
5 <= 5   // true
5 <= 8   // true
```

#### 삼항 조건 연산자 (ternary operator)

조건식의 평가 결과에 따라 반환할 값을 결정한다.

조건식 ? 조건식이 true일 때 반환할 값 : 조건식이 false일때 반환할 값

```
var x = 2;

// x가 짝수이면 '짝수'를 홀수이면 '홀수'를 반환한다.
// 2 % 2는 0이고 0은 false로 암묵적 타입 변환된다.
var result = x % 2 ? '홀수' : '짝수';

console.log(result); // 짝수
```

### 논리 연산자 (Logical Operator)

우항과 좌항의 피연산자를 논리 연산한다.

| 논리 연산자 |     의미      |
| :---------: | :-----------: |
| `안들가ㅠ`  | `논리합(OR)`  |
|    ` &&`    | `논리곱(AND)` |
|     `!`     |  `부정(NOT)`  |

```
// 논리합(||) 연산자
true || true   // true
true || false  // true
false || true  // true
false || false // false

// 논리곱(&&) 연산자
true && true   // true
true && false  // false
false && true  // false
false && false // false

// 논리 부정(!) 연산자
!true  // false
!false // true
```

```
// 암묵적 타입 변환
!0 // true
```

### 쉼표 연산자 (,)

```
var x, y, z;
x = 1, y = 2, z = 3; // 3
```

### 그룹 연산자 (...)

그룹 내의 표현식을 최우선으로 한다.

```
10 * 2 + 3   // 23
10 * (2 + 3) // 50
```

### typeof 연산자

자신의 뒤에 위치한 피연산자의 데이터 타입을 문자열로 반환한다.
string, number, boolean, undefined, symbol, object, function 중 하나를 반환한다.

null을 반환하는 경우는 없으며 함수의 경우 function을 반환한다.

```
typeof ''              // "string"
typeof 1               // "number"
typeof NaN             // "number"
typeof true            // "boolean"
typeof undefined       // "undefined"
typeof Symbol()        // "symbol"
typeof null            // "object"
typeof []              // "object"
typeof {}              // "object"
typeof new Date()      // "object"
typeof /test/gi        // "object"
typeof function () {}  // "function"
```

!! typeof null은 object를 반환한다.
그러니 null타입을 확인할 때는 일치 연산자(===)를 사용하자.

!! 선언하지 않은 식별자를 typeof 연산자로 연산해 보면 ReferenceError가 발생하지 않고 undefined를 반환한다.

```
typeof undeclared  // "undefined"
```

==============================================================================================================

### 블록문 (Block statement / Compound statement)

자바스크립트는 블록문을 하나의 단위로 취급한다.

문의 끝에 세미콜론을 붙이는 것이 일반적이지만, 블록은 붙이지 않는다.

```
// 블록문
{
  var foo = 10;
  console.log(foo);
}
```

### 조건문 (conditional statement)

자바스크립트는 2가지 조건문 if ...else문과 switch문을 제공한다.

#### if...else문

```
if (조건식1) {
  // 조건식1이 참이면 이 코드 블록이 실행된다.
} else if (조건식2) {
  // 조건식2이 참이면 이 코드 블록이 실행된다.
} else {
  // 조건식1과 조건식2가 모두 거짓이면 이 코드 블록이 실행된다.
}
```

else if문과 else문은 사용안해도 된다.

#### switch 문

일치하는 case문이 없다면 default문으로 이동한다.
default는 옵션이다.

```
switch (표현식) {
  case 표현식1:
    switch 문의 표현식과 표현식1이 일치하면 실행될 문;
    break;
  case 표현식2:
    switch 문의 표현식과 표현식2가 일치하면 실행될 문;
    break;
  default:
    switch 문의 표현식과 일치하는 표현식을 갖는 case 문이 없을 때 실행될 문;
}
```

주의 사항)

```
// 월을 영어로 변환한다. (11 → 'November')
var month = 11;
var monthName;

switch (month) {
  case 1:
    monthName = 'January';
  case 2:
    monthName = 'February';
  case 3:
    monthName = 'March';
  case 4:
    monthName = 'April';
  case 5:
    monthName = 'May';
  case 6:
    monthName = 'June';
  case 7:
    monthName = 'July';
  case 8:
    monthName = 'August';
  case 9:
    monthName = 'September';
  case 10:
    monthName = 'October';
  case 11:
    monthName = 'November';
  case 12:
    monthName = 'December';
  default:
    monthName = 'Invalid month';
}

console.log(monthName); // Invalid month
```

위 코드를 실행해 보면 'November'가 출력되지 않고 'Invalid month'가 출력된다.
이유는 switch문의 표현식의 평가 결과와 일치하는 case문으로 실행 순서가 이동하여
문을 실행한 것은 맞지만, 문을 실행한 후, switch문을 탈출하지 않고 switch문이 끝날 때까지 모든 case문과 default문을 실행했기 때문이다.
이를 _풀 스루(fall through)_ 라 한다. 다시 말해, 변수 mounthName에 'November'가 할당된 후 switch문을 탈출하지 않고 'Invalid mounth'가 재할당 된 것이다.

결과가 이러한 이유는 break 문을 사용하지 않았기 때문이다.
break문은 코드 블록에서 탈출하는 역할을 수행한다.
**braek문이 없다면 case문의 표현식과 일치하지 않더라도 실행 순서는 다음 case문으로 연이어 이동한다.**

```
// 월을 영어로 변환한다. (11 → 'November')
var month = 11;
var monthName;

switch (month) {
  case 1:
    monthName = 'January';
    break;
  case 2:
    monthName = 'February';
    break;
  case 3:
    monthName = 'March';
    break;
  case 4:
    monthName = 'April';
    break;
  case 5:
    monthName = 'May';
    break;
  case 6:
    monthName = 'June';
    break;
  case 7:
    monthName = 'July';
    break;
  case 8:
    monthName = 'August';
    break;
  case 9:
    monthName = 'September';
    break;
  case 10:
    monthName = 'October';
    break;
  case 11:
    monthName = 'November';
    break;
  case 12:
    monthName = 'December';
    break;
  default:
    monthName = 'Invalid month';
}

console.log(monthName); // November
```

default문에는 break문을 생략하는 것이 일반적이다.

### 반복문 (Loop statement)

주어진 조건식(conditional expression)의 평가 결과가 참인 경우 코드 블럭을 실행한다.
그 후 조건식을 다시 검사하여 여전히 참인 경우 다시 실행한다. 이는 조건식이 거짓일 때 까지 반복한다.

자바스크립트는 for, while, do...while, for...of, for...in문이 있다.

#### for 문

```
for (초기화식; 조건식; 증감식) {
  조건식이 참인 경우 반복 실행될 문;
}
```

```
for (var i = 0; i < 2; i++) {
  console.log(i);
}
//output : 0 1
```

중첩 사용 가능

주사위를 던졌을 때, 두 눈의 합이 6이 되는 모든 경우의 수

```
for (var i = 1; i <= 6; i++) {
  for (var j = 1; j <= 6; j++) {
    if (i + j === 6) console.log(`[${i}, ${j}]`);
  }
}
```

#### while 문

주어진 조건식의 평가 결과가 참이면 코드 블록을 계속 반복 실행한다.
거짓이면 실행을 종료한다.

```
var count = 0;

// count가 3보다 작을 때까지 코드 블록을 계속 반복 실행한다.
while (count < 3) {
  console.log(count);
  count++;
} // 0 1 2
```

당연하게도 조건이 항상 참이면 무한루프가 된다.

무한 루프를 탈출하기 위해서는 코드 블록 탈출 조건을 if 문에 부여하고 break문으로 코드 블록을 탈출한다.

```
var count = 0;

// 무한루프
while (true) {
  console.log(count);
  count++;
  // count가 3이면 코드 블록을 탈출한다.
  if (count === 3) break;
} // 0 1 2
```

#### do ... while문

코드 블록을 실행하고 조건식을 평가한다. 따라서 코드 블록은 무조건 한번 이상 실행된다.

```
var count = 0;

// count가 3보다 작을 때까지 코드 블록을 계속 반복 실행한다.
do {
  console.log(count);
  count++;
} while (count < 3); // 0 1 2
```

#### break 문

문자열에서 특정 문자의 인덱스를 검색하는 예제

```
var string = 'Hello World.';
var index;

// 문자열은 유사배열이므로 for 문으로 순회할 수 있다.
for (var i = 0; i < string.length; i++) {
  // 문자열의 개별 문자가 'l'이면
  if (string[i] === 'l') {
    index = i;
    break; // 반복문을 탈출한다.
  }
}

console.log(index); // 2

// 참고로 String.prototype.indexOf 메소드를 사용해도 같은 동작을 한다.
console.log(string.indexOf('l')); // 2
```

#### continue 문

반복문의 코드 블록 실행을 현 지점에서 중단하고 반복문의 증감식으로 이동한다.

문자열에서 특정 문자의 갯수를 카운트하는 예제이다.

```
var string = 'Hello World.';
var count = 0;

// 문자열은 유사배열이므로 for 문으로 순회할 수 있다.
for (var i = 0; i < string.length; i++) {
  // 'l'이 아니면 현 지점에서 실행을 중단하고 반복문의 증감식으로 이동한다.
  if (string[i] !== 'l') continue;
  count++; // continue 문이 실행되면 이 문은 실행되지 않는다.
}

console.log(count); // 3

// 참고로 String.prototype.match 메소드를 사용해도 같은 동작을 한다.
console.log(string.match(/l/g).length); // 3
```

==============================================================================================================

### 타입

Falsy : 불리언 값으로 false로 평가되는 값

**false, undefined, null, 0, -0, NaN, ""(빈 문자열)**

나머지 다 참

anyting.toString() 문자열로 변환
String(anyting) 문자열로 변환

Number(anyting) 숫자타입으로 변환

Boolean(anyting) 불리언 값으로 변환

isFalsy(anyting) Falsy한지 판별 > 결과값 true/false

isTruthy(anyting) Truthy한지 판별 > 결과값 true/false

### 단축 평가

`'Yun' && 'Hyeok' // output : "Hyeok"`
논리곱 연산자는 논리연산의 결과를 결정한 _두번째_ 피연산자의 평가 결과를 반환한다.

`"Yun" || "Hyeok" // output : "Yun"`
논리합 연산자는 논리연산의 결과를 결정한 _첫번째_ 피연산자의 평가 결과를 반환한다.

```
// 단축 평가를 사용한 매개변수의 기본값 설정
function getStringLength(str) {
  str = str || '';
  return str.length;
}

getStringLength();     // 0
getStringLength('hi'); // 2

// ES6의 매개변수의 기본값 설정
function getStringLength(str = '') {
  return str.length;
}

getStringLength();     // 0
```

함수를 호출할 때 인수를 전달하지 않으면 매개변수는 undefined를 갖는다.
이 때, 단축 평가를 사용해 매개변수의 기본 값을 설정하면 undefined로 인해 발생할 에러를 방지할 수 있따.
