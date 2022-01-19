2021. 1.  18

### 실행 컨텍스트 (Execution Context)

실행 컨텍스트는 scope, hoisting, this, function, closure 등의 동작원리를 담고 있는 자바스크립트 핵심원리이다.

**실행 가능한 코드를 형상화하고 구분하는 추상적인 개념**
**실행 컨텍스트는 실행 가능한 코드가 실행되기 위해 필요환 환경** 이라고 말할 수 있다.

실행 가능한 코드 종류

- 전역 코드 : 전역 영역에 존재하는 코드
- Eval 코드 : eval함수로 실행되는 코드
- 함수 코드 : 함수 내에 존재하는 코드

자바스크립트 엔진은 코드를 실행하기 위해 실행에 필요한 여러가지 정보를 알아얗한다.

실행에 필요한 여러가지 정보

- 변수 : 전역, 지역, 매개 변수, 객체의 프로퍼티
- 함수 선언
- 변수의 유효범위(Scope)
- this

이와 같이 실행에 필요한 정보를 형상화하고 구분하기 위해 자바스크립트 엔진은 실행 컨텍스트를 물리적 객체의 형태로 관리한다.

```
var x = 'xxx';

function foo () {
  var y = 'yyy';

  function bar () {
    var z = 'zzz';
    console.log(x + y + z);
  }
  bar();
}
foo(); // xxxyyyzzz
```

실행 순서는 스택과 같다 LIFO

| `zzz` |
| ----- |
| `yyy` |
| `xxx` |

### 실행 컨텍스트의 3가지 객체

실행 컨텍스트는 실행 가능한 코드를 형상화하고 구분하는 추상적인 개념이지만 물리적으로는 객체의 형태를 가지며 3가지 프로퍼티를 가진다.

|     프로퍼티      |                    EXAMPLE                    |
| :---------------: | :-------------------------------------------: |
| `Variable Object` | `{vars, function, declaration, arguments...}` |
|   `Scope Chain`   |    `{Variable Object + all parent scopes`     |
|    `thisValue`    |               `Context Object`                |

#### Variable Object (VO/ 변수 객체)

**실행 컨텍스트가 생성되면 자바스크립트 엔진은 실행에 필요한 여러 정보들을 담을 객체를 생성한다.** 이를 VO라 한다.
VO는 코드가 실행될 때 엔진에 의해 참조되며 코드에서는 접근할 수 없다.

VO는 아래의 정보들을 담는 객체이다.

- 변수
- 매개변수와 인수 정보(Parameter & arguments)
- 함수 선언(표현식은 제외)

VO는 실행 컨텍스트의 프로퍼티이기 때문에 값을 갖는데 이 값은 다른 객체를 가리킨다.
전역 코드 실행 시 생성되는 전역 컨텍스트의 경우와 함수를 실행할 때 생성되는 함수 컨텍스트의 경우 _가리키는 객체가 다르다._
이는 전역 코드와 함수의 내용이 다르기 때문이다.
예를 들어 전역 코드에는 매개변수가 없지만 함수에는 있다.

- 전역 컨텍스트의 경우

  - VO는 유일하며 최상위에 위치하고 모든 전역 변수, 전역 함수 등을 포함하는 전역 객체(GO : Global Object)를 가리킨다. 전역 객체는 전역에 선언된 전역 변수와 전역 함수를 프로퍼티로 소유한다.

- 함수 컨텍스트의 경우
  - VO는 활성 객체(AO : Activation Object)를 가리키며 매개변수와 인수들의 정보를 배열의 형태로 담고 있는 객체인 AO가 추가된다.

#### SC (Scope Chain)

스콮프 체인은 일종의 리스트로서 전역 객체와 중첩된 함수의 스코프의 레퍼런스를 차례대로 저장하고 있다.
즉, 해당 전역 또는 함수가 참조할 수 있는 변수, 함수 선언 등의 정보를 담고 있는 GO 또는 AO의 리스트를 가리킨다.

현재 실행 컨텍스트의 AO를 선두로 하여 순차적으로 상위 컨텍스트의 AO를 가리키며 마지막 리스트는 GO를 가리킨다.
즉, Bottom to Top이다.

**!! 스코프 체인은 식별자 중에서 객체(전역 객체 제외)의 프로퍼티가 아닌 식별자, 즉 변수를 검색하는 메커니즘이다.**
**프로토 타입체인이란?** _식별자 중에서 변수가 아닌 객체의 프로퍼티(메소드 포함)를 검색하는 메커니즘이다._

엔진은 스코프 체인을 통해 렉시컬 스코프를 파악한다. 함수가 중첩 상태일 때 함수 내에서 상위 함수의 스코프와 전역 스코프까지 참조할 수 있는데 이것은 스코프 체인 검색을 통해 가능하다.
함수가 중첩되어 있으면 중첩될 때마다 부모함수의 Scope가 자식 함수의 스코프 에인에 포함된다.
함수 실행 중에 변수를 만나면 그 변수를 우선 현재 Scope. 즉, AO에서 검색해보고, 없다면 스코프 체인에 담겨진 순서대로 검색을 이어나간다.
_AO -> GO_

#### this value

this 프로퍼티에는 this 값이 할당된다. this에 할당되는 값은 함수 호출 패턴에 의해 결정된다.

### 실행 컨텍스트의 생성 과정

#### 전역 코드에의 진입

컨트롤이 샐행 컨텍스트에 진입하기 이전에 유일한 GO가 생성된다.
GO는 단일 사본으로 존재하며 _이 객체의 프로퍼티는 코드의 어떠한 곳에서도 접근할 수 있다._ 초기 상태의 전역 객체에는 빌트인 객체(Math, String, Array등)와 BOM, DOM이 설정되어 있다.

전역 객체가 생성된 이후, 전역 코드로 컨트롤이 진입하면 전역 실행 컨텍스트가 생성되고 실행 컨텍스트 스택에 쌓인다.

실행 컨텍스트를 바탕으로 이하의 처리가 실행된다.

1. 스코프 체인의 생성과 초기화
2. Varialbe Instantiation(변수 객체화) 실행
3. this value 결정

##### 스코프 체인의 생성과 초기화

실행 컨텍스트가 생성된 이후 가장 먼저 스코프 체인의 생성과 초기화가 실행된다.
이 때, 스코프 체인은 전역 객체의 레퍼런스를 포함하는 리스트가 된다.

##### Varialbe Instantiation(변수 객체화) 실행

스코프 체인의 생성과 초기화가 종료되면 변수 객체화가 실행된다.

_Variable Instantiation_ 은 **VO에 프로퍼티와 값을 추가하는 것을 의미한다.**
이는 변수, 매개변수와 인수 정보, 함수선언을 VO에 추가하여 객체화한다.

변수 객체화는 아래 순서로 _VO_ 에 프로퍼티와 값을 set한다.

1. (Function Code의 경우) > 프로퍼티 : 매개변수 / 값 : 인수
2. 대상 코드 내의 함수 선언(함수 표현식을 제외)을 대상으로 > 프로퍼티 : 함수명 / 값 : 생성된 함수 객체 (함수 호이스팅)
3. 대상 코드내의 변수 선언을 대상으로 > 프로퍼티 : 변수명 / 값 : undefined (변수 호이스팅) 함수선언식이 여기 포함?

##### this value 결정

변수 선언 처리가 끝나면 다음은 this value가 결정된다.
**this value가 결정되기 이전에 this는 전역 객체를 가리키고 있다가 함수 호출 패턴에 의해 this에 할당되는 값이 결정된다.**
전역 코드의 경우 this는 전역 객체를 가리킨다.

**전역 컨텍스트(코드)의 경우, VO, Scope Chain, this값은 언제나 전역 객체이다.**

### closure (클로저)

클로저는 자바스크립트 고유의 개념이 아니라 함수를 일급 객체로 취급하는 함수형 프로그래밍 언어에서 사용되는 중요한 특성이다.

MDN : "클로저는 함수와 그 함수가 선언됐을 때의 렉시컬 환경과의 조합이다."

```
function outerFunc() {
  var x = 10;
  var innerFunc = function () { console.log(x); };
  innerFunc();
}

outerFunc(); // 10
```

스코프는 함수를 호출할 때가 아니라 함수를 어디에 선언하였는지에 따라 결정된다.
이를 _렉시컬 스코핑(Lexical Scoping)_ 이라한다.

내부함수 innerFunc가 자신을 포함하고 있는 외부함수 outerFunc의 변수 x에 접근할 수 있는 것, 다시 말해 상위 스코프에 접근할 수 있는 것은 렉시컬 스코프의 레퍼런스를 차례대로 저장하고 있는 실행컨텍스트의 스코프 체인을 자바스크립트 엔진이 검색했기 때문에 가능한 것이다.
아래를 보자

1. innerFunc 함수 스코프(함수 자신의 스코프를 가리키는 AO)내에서 변수 x를 검색한다. 검색에 실패
2. innerFunc 함수를 포함하는 외부 함수 outerFunc의 스코프(함수 outerFunc의 스코프를 가리키는 함수 outerFunc의 AO)에서 변수 x를 검색. 검색 성공

```
function outerFunc() {
  var x = 10;
  var innerFunc = function () { console.log(x); };
  return innerFunc;
}

/**
 *  함수 outerFunc를 호출하면 내부 함수 innerFunc가 반환된다.
 *  그리고 함수 outerFunc의 실행 컨텍스트는 소멸한다.
 */
var inner = outerFunc();
inner(); // 10
```

함수 outerFunc은 내부 함수 innerFunc을 반환하고 생을 마감했다.
즉, 함수 outerFunc은 실행된 이후 콜스택에서 제거되었으므로, 함수 outerFunc의 변수 x 또한 더 이상 유효하지 않게 되어 변수 x에 접근할 수 있는 방법은 달리 없어 보인다.
그러나, 위 코드의 실행 결과는 10이다. 이미 life-cycle이 종료되어 실행컨텍스트 스택에서 제거된 함수 outerFunc의 지역변수 x가 다시 부활이라도 한 듯 동작하고 있다.

_이처럼 자신을 포함하고 있는 외부함수보다 내부함수가 더 오래 유지되는 경우,_ 외부 함수 밖에서 내부함수가 호출되더라도 외부함수의 지역 변수에 접근할 수 있는데, 이러한 함수를 클로저라 부른다.

!!! **즉, 클로저는 반환된 내부 함수가 자신이 선언됐을 때의 환경(Lexical enviorment)인 스코프를 기억하여 자신이 선언됐을 때의 환경(스코프) 밖에서 호출되어도 그 환경(스코프)에 접근할 수 있는 함수** 를 말한다.
!!! 즉, **자신이 생성될 때의 환경(Lexical enviorment)를 기억하는 함수다.**

외부함수가 이미 반환되었어도 외부함수 내부의 변수는 이를 필요로 하는 내부함수가 하나 이상 존재하는 경우 계속 유지된다.
이 때, 내부함수가 외부함수에 있는 변수의 복사본이 아니라 실제 변수에 접근한다는 것에 주의해야한다.

### 클로저의 활용

클로저는 자신이 생성될 때의 환경을 기억해야 하므로 메모리 차원에서 손해를 볼 수 있다.
하지만, _클로저는 자바스크립트의 강력한 기능으로 적극적으로 활용해야한다._

#### 상태 유지

클로저가 가장 유용하게 사용되는 상황은 **현재 상태를 기억하고 변경된 최신 상태를 유지** 하는 것이다.

```
<!DOCTYPE html>
<html>
<body>
  <button class="toggle">toggle</button>
  <div class="box" style="width: 100px; height: 100px; background: red;"></div>

  <script>
    var box = document.querySelector('.box');
    var toggleBtn = document.querySelector('.toggle');

    var toggle = (function () {
      var isShow = false;

      // ① 클로저를 반환
      return function () {
        box.style.display = isShow ? 'block' : 'none';
        // ③ 상태 변경
        isShow = !isShow;
      };
    })();

    // ② 이벤트 프로퍼티에 클로저를 할당
    toggleBtn.onclick = toggle;
  </script>
</body>
</html>
```

1. 즉시 실행 함수는 함수를 반환하고 즉시 소멸한다. 즉시 실행 함수가 반환한 함수는 자신이 생성됐을 때의 렉시컬 환경에 속한 변수 isShow를 기억하는 클로저다. 클로저가 기억하는 변수 isShow는 box 요소의 표시 상태를 나타낸다.

2. 클로저를 이벤트 핸들러로서 이벤트 프로퍼티에 할당했다. 이벤트 프로퍼티에서 이벤트 핸들러인 클로저를 제거하지 않는 한, 클로저가 기억하는 렉시컬 환경의 변수 isShow는 소멸하지 않는다. 즉, 현재 상태를 기억한다.

3. 버튼을 클릭하면 이벤트 프로퍼티에 할당한 이벤트 핸들러인 클로저가 호출된다. 이 때, box요소의 표시 상태를 나타내는 변수 isShow의 값이 변경된다. 변수 isShow는 클로저에 의해 참조되고 있기 때문에 유효하며 자신의 변경된 최신 상태를 계속해서 유지한다.

이 처럼, **클로저는 현재상태를 기억하고 상태가 변경돼도 최신 상태를 유지해야하는 상황에서 매우 유용하다.**

#### 전역 변수의 억제

클로저가 없다면 상태를 유지하기 위해 전역 변수를 사용할 수 밖에 없다.
전역 변수는 언제든지 누구나 접근할 수 있고, 변경할 수 있기 때문에, 많은 부작용을 유발해 오류의 원인이 되므로 사용을 억제해야 한다.

```
<!DOCTYPE html>
<html>
  <body>
  <p>클로저를 사용한 Counting</p>
  <button id="increase">+</button>
  <p id="count">0</p>
  <script>
    var incleaseBtn = document.getElementById('increase');
    var count = document.getElementById('count');

    var increase = (function () {
      // 카운트 상태를 유지하기 위한 자유 변수
      var counter = 0;
      // 클로저를 반환
      return function () {
        return ++counter;
      };
    }());

    incleaseBtn.onclick = function () {
      count.innerHTML = increase();
    };
  </script>
</body>
</html>
```

스크립트가 실행되면 즉시실행함수(immediately-invoked function expression)가 호출되고 변수 increase에는 함수 function () { return ++counter; }가 할당된다.
이 함수는 자신이 생성됐을 때의 렉시컬 환경(Lexical environment)을 기억하는 클로저다.
즉시실행함수는 호출된 이후 소멸되지만 즉시실행함수가 반환한 함수는 변수 increase에 할당되어 increase에 버튼을 클릭하면 클릭 이벤트 핸들러 내부에서 호출된다.
이때 클로저인 이 함수는 자신이 선언됐을 때의 렉시컬 환경인 즉시실행함수의 스코프에 속한 지역변수 counter를 기억한다.
따라서, 즉시실행함수의 변수 counter에 접근할 수 있고 변수 counter는 자신을 참조하는 함수가 소멸될 때가지 유지된다.

즉시실행함수는 한번만 실행되므로 increase가 호출될 때마다 변수 counter가 재차 초기화될 일은 없을 것이다.
변수 counter는 외부에서 직접 접근할 수 없는 private 변수이므로 전역 변수를 사용했을 때와 같이 의도되지 않은 변경을 걱정할 필요도 없기 때문이 보다 안정적인 프로그래밍이 가능하다.

**!! 변수의 값은 누군가에 의해 언제든지 변경될 수 있어 오류의 발생의 근본적 원인이 될 수 있다.**
**상태 변경이나 가변 데이터를 피하고 불변성을 지향하는 함수형 프로그래밍에서 부수효과를 최대한 억제하여 오류를 피하고 프로그램의 안정성을 높이기 위해 클로저는 적극적으로 사용된다.**

#### 정보의 은닉

```
function Counter() {
  // 카운트를 유지하기 위한 자유 변수
  var counter = 0;

  // 클로저
  this.increase = function () {
    return ++counter;
  };

  // 클로저
  this.decrease = function () {
    return --counter;
  };
}

const counter = new Counter();

console.log(counter.increase()); // 1
console.log(counter.decrease()); // 0
```

생성자 함수 Counter는 increase, decrease 메소드를 갖는 인스턴스를 생성한다.
이 메소드들은 모두 자신이 생성됐을 때의 렉시컬 환경인 생성자 함수 Counter의 스코프에 속한 변수 counter를 기억하는 클로저이며 렉시컬 환경을 공유한다.
생성자 함수가 함수가 생성한 객체의 메소드는 객체의 프로퍼티에만 접근할 수 있는 것이 아니며 자신이 기억하는 렉시컬 환경의 변수에도 접근할 수 있다.

이때 생성자 함수 Counter의 변수 counter는 _this에 바인딩된 프로퍼티가 아니라 변수_ 다.
counter가 this에 바인딩된 프로퍼티라면 생성자 함수 Counter가 생성한 인스턴스를 통해 외부에서 접근이 가능한 public 프로퍼티가 되지만,
생성자 함수 Counter 내에서 선언된 변수 counter는 생성자 함수 Counter 외부에서 접근할 수 없다.
하지만, 생성자 함수 Counter가 생성한 인스턴스의 메소드인 increase, decrease는 클로저이기 때문에 자신이 생성됐을 때의 렉시컬 환경인 생성자 함수 Counter의 변수 counter에 접근할 수 있다.
이러한 클로저의 특징을 사용해 클래스 기반 언어의 _private_ 키워드를 흉내낼 수 있다.

#### 주의사항

```
var arr = [];

for (var i = 0; i < 5; i++) {
  arr[i] = function () {
    return i;
  };
}

for (var j = 0; j < arr.length; j++) {
  console.log(arr[j]()); // 5 5 5 5 5
}
console.log(i); // 5
```

위의 결과는 5 5 5 5 5가 나온다.
이유는 for문에서 사용한 변수 i는 전역 변수이기 때문이다.
클로저로 고쳐 보자

```
let arr = [];

for (let i = 0; i < 5; i++) {
  arr[i] = (function (id) {
    return function () {
      return id;
    };
  })(i);
}

for (let j = 0; j < arr.length; j++) {
  console.log(arr[j]());
}
```

1. 배열 arr에는 즉시 실행 함수에 의해 함수가 반환된다.
2. 이 때, 즉시 실행 함수 i를 인자로 전달받고 매개변수 id에 할당한 후 내부 함수를 반환하고 life-cycle이 종료된다.
3. 배열 arr에 할당된 함수는 id를 반환한다. 이 때, id는 상위 스코프의 자유변수이므로 그 값이 유지된다.

```

const arr = [];

for (let i = 0; i < 5; i++) {
  arr[i] = function () {
    return i;
  };
}

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]()); // 0 1 2 3 4 5
}
```

위의 문제는 자바스크립트의 함수 레벨 스코프 특성으로 인해 for 루프의 초기문에서 사용된 변수의 스코프가 전역이 되기 때문에 발생하는 현상이다.
ES6 let 키워드를 사용하면 말끔히 해결된다.

### 생성자 함수와 인스턴스의 생성

자바스크립트는 생성자 함수와 new연산자를 통해 인스턴스를 생성할 수 있다.
이 때, 생성자 함수는 클래스이자 생성자의 역할을 한다.

```
// 생성자 함수(Constructor)
function Person(name) {
  // 프로퍼티
  this.name = name;

  // 메소드
  this.setName = function (name) {
    this.name = name;
  };

  // 메소드
  this.getName = function () {
    return this.name;
  };
}

// 인스턴스의 생성
var me = new Person('Lee');
console.log(me.getName()); // Lee

// 메소드 호출
me.setName('Kim');
console.log(me.getName()); // Kim
```

위 코드는 잘 작동하지만 문제가 많다. 아래를 보자

```
var me  = new Person('Lee');
var you = new Person('Kim');
var him = new Person('Choi');

console.log(me);  // Person { name: 'Lee', setName: [Function], getName: [Function] }
console.log(you); // Person { name: 'Kim', setName: [Function], getName: [Function] }
console.log(him); // Person { name: 'Choi', setName: [Function], getName: [Function] }
```

위와 같이 인스턴스를 생성하면 각각의 인스턴스에 메소드 setName, getName이 중복되어 생성된다.
즉, 각 인스턴스가 내용이 동일한 메소드를 각자 소유한다. 이는 메모리 낭비다. 생성되는 인스턴스가 많아지거나 메소드가 크거나 많다면 무시할 수 없는 문제다.

위와 같은 문제를 해결하려면 다른 접근 방식이 필요한데, 그 해답은 프로토 타입이다.

### 프로토타입 체인과 메소드의 정의

모든 객체는 _프로토타입_ 이라는 다른 객체를 가리키는 내부 링크를 가지고 있다.
즉, 프로토타입을 통해 직접 객체를 연결할 수 있는데, 이를 **프로토타입 체인** 이라 한다.

프로토 타입을 이용하여 생성자 함수 내부의 메소드를 생성자 함수의 prototype 프로퍼티가 가리키는 프로토타입 객체로 이동시키면 생성자 함수에 의해 생성되 모든 인스턴스는 프로토타입 체인을 통해 프로토타입 객체의 메소드를 참조할 수 있다.

```
function Person(name) {
  this.name = name;
}

// 프로토타입 객체에 메소드 정의
Person.prototype.setName = function (name) {
  this.name = name;
};

// 프로토타입 객체에 메소드 정의
Person.prototype.getName = function () {
  return this.name;
};

var me  = new Person('Lee');
var you = new Person('Kim');
var him = new Person('choi');

console.log(Person.prototype);
// Person { setName: [Function], getName: [Function] }

console.log(me);  // Person { name: 'Lee' }
console.log(you); // Person { name: 'Kim' }
console.log(him); // Person { name: 'choi' }

//OR 더글라스 크락포드

/**
 * 모든 생성자 함수의 프로토타입은 Function.prototype이다. 따라서 모든 생성자 함수는 Function.prototype.method()에 접근할 수 있다.
 * @method Function.prototype.method
 * @param ({string}) (name) - (메소드 이름)
 * @param ({function}) (func) - (추가할 메소드 본체)
 */
Function.prototype.method = function (name, func) {
  // 생성자함수의 프로토타입에 동일한 이름의 메소드가 없으면 생성자함수의 프로토타입에 메소드를 추가
  // this: 생성자함수
  if (!this.prototype[name]) {
    this.prototype[name] = func;
  }
};

/**
 * 생성자 함수
 */
function Person(name) {
  this.name = name;
}

/**
 * 생성자함수 Person의 프로토타입에 메소드 setName을 추가
 */
Person.method('setName', function (name) {
  this.name = name;
});

/**
 * 생성자함수 Person의 프로토타입에 메소드 getName을 추가
 */
Person.method('getName', function () {
  return this.name;
});

var me  = new Person('Lee');
var you = new Person('Kim');
var him = new Person('choi');

console.log(Person.prototype);
// Person { setName: [Function], getName: [Function] }

console.log(me);  // Person { name: 'Lee' }
console.log(you); // Person { name: 'Kim' }
console.log(him); // Person { name: 'choi' }
```

### 상속 (Inheritance)

클래스 기반 언어에서 객체는 클래스의 인스턴스이며 클래스는 다른 클래스로 상속될 수 있다.
그러나 자바스크립트는 기본적으로 _프로토타입을 통해 상속을 구현한다._
이것은 **프로토타입을 통해 객체가 다른 객체로 직접 상속된다는 의미** 이다.

자바스크립트 상속 구현방식은 크게 두가지로 구분할 수 있다.

1. 의사 클래스 패턴 상속(Pseud-classical Inheritance) : 클래스 기반 언어의 상속 방식을 흉내내는 것
2. 프로토타입 패턴 상속(Prototypal Inheritance) : 프로토타입으로 상속을 구현하는 것

#### 의사클래스 패턴 상속 (Pseud-classical Inheritance)

의사클래스 패턴은 자식 생성자 함수의 prototype 프로퍼티를 부모 생성자 함수의 인스턴스로 교체하여 상속을 구현하는 방법.
부모와 자식 모두 생성자 함수를 정의해야 한다.

```
// 부모 생성자 함수
var Parent = (function () {
  // Constructor
  function Parent(name) {
    this.name = name;
  }

  // method
  Parent.prototype.sayHi = function () {
    console.log('Hi! ' + this.name);
  };

  // return constructor
  return Parent;
}());

// 자식 생성자 함수
var Child = (function () {
  // Constructor
  function Child(name) {
    this.name = name;
  }

  // 자식 생성자 함수의 프로토타입 객체를 부모 생성자 함수의 인스턴스로 교체.
  Child.prototype = new Parent(); // ②

  // 메소드 오버라이드
  Child.prototype.sayHi = function () {
    console.log('안녕하세요! ' + this.name);
  };

  // sayBye 메소드는 Parent 생성자함수의 인스턴스에 위치된다
  Child.prototype.sayBye = function () {
    console.log('안녕히가세요! ' + this.name);
  };

  // return constructor
  return Child;
}());

var child = new Child('child'); // ①
console.log(child);  // Parent { name: 'child' }

console.log(Child.prototype); // Parent { name: undefined, sayHi: [Function], sayBye: [Function] }

child.sayHi();  // 안녕하세요! child
child.sayBye(); // 안녕히가세요! child

console.log(child instanceof Parent); // true
console.log(child instanceof Child);  // true
```

Child 생성자 함수가 생성한 인스턴스 child(①)의 프로토타입 객체는 Parent 생성자 함수가 생성한 인스턴스(②)이다.
그리고 Parent 생성자 함수가 생성한 인스턴스의 프로토타입 객체는 Parent.prototype이다.

이로써 child는 프로토타입 체인에 의해 Parent 생성자 함수가 생성한 인스턴스와 Parent.prototype의 모든 프로퍼티에 접근할 수 있게 되었다. 이름은 의사 클래스 패턴 상속이지만 내부에서는 프로토타입을 사용하는 것은 변함이 없다.

**의사 클래스 패턴의 문제점**

1. **new연산자를 통해 인스턴스를 생성한다.**
   이는 자바스크립트의 프로토타입 본질에 모순되는 것이다. 프로토타입 본성에 맞게 객체에서 다른 객체로 직접 상속하는 방법을 갖는 대신 생성자 함수와 new연산자를 통해 객체를 생성하는 불필요한 간접적인 단계가 있다.
   클래스와 비슷하게 보이는 일부 복잡한 구문은 프로토타입 메커니즘을 명확하게 나타내지 못한다.

2. **생성자 링크 파괴**
   child 객체의 프로토타입 객체는 Parent 생성자 함수가 생성한 new Parent() 객체이다.
   프로토타입 객체는 내부 프로퍼티로 constructor를 가지며 이는 생성자 함수를 가리킨다.
   하지만, 의사 클래스 패턴 상속은 프로토타입 객체를 인스턴스로 교체하는 과정에서 constructor의 연결이 깨지게 된다.
   즉, child 객체를 생성한 것은 Child 생성자 함수이지만 child.constructor의 출력 결과는 Child 생성자 함수가 아닌 Parent 생성자 함수를 나타낸다.
   이는 child 객체의 프로토타입 객체인 new Parent() 객체는 constructor가 없기 때문에 프로토타입 체인에 의해 Parent.prototype의 constructor를 참조했기 때문이다.

3. **객체 리터럴**
   의사 클래스 패턴 상속은 기본적으로 생성자 함수를 사용하기 때문에 객체리터럴 패턴으로 생성한 객체의 상속에는 적합하지 않다.
   이는 객체리터럴 패턴으로 생성한 객체의 생성자 함수는 Object()이고 이를 변경할 방법이 없기 때문이다.

#### 프로토타입 패턴 상속 (Prototype Inheritance)

프로토타입 상속은 Object.create 함수를 사용하여 객체에서 다른 객체로 직접 상속을 구현하는 방식이다.
의사 클래스 패턴의 단점을 모두 해소해준다 !

```
// 부모 생성자 함수
var Parent = (function () {
  // Constructor
  function Parent(name) {
    this.name = name;
  }

  // method
  Parent.prototype.sayHi = function () {
    console.log('Hi! ' + this.name);
  };

  // return constructor
  return Parent;
}());

// create 함수의 인수는 프로토타입이다.
var child = Object.create(Parent.prototype);
child.name = 'child';

child.sayHi();  // Hi! child

console.log(child instanceof Parent); // true
```

### 캡슐화(Encapsulation)와 모듈 패턴(Module Pattern)

캡슐화는 관련있는 멤버 변수와 메소드를 클래스와 같은 하나의 틀 안에 담고 외부에 공개될 필요가 없는 정보는 숨기는 것을 말하며 다른 말로 _정보 은닉_ 이라고 한다.

```
var Person = function(arg) {
  var name = arg ? arg : ''; // ①

  this.getName = function() {
    return name;
  };

  this.setName = function(arg) {
    name = arg;
  };
}

var me = new Person('Lee');

var name = me.getName(); // Lee

console.log(name);

me.setName('Kim');
name = me.getName();

console.log(name); // Kim
```

①의 name 변수는 private 변수가 된다. 자바스크립트는 function-level scope를 제공하므로 함수 내의 변수는 외부에서 참조할 수 없다.
만약에 var 때신 this를 사용하면 public 멤버가 된다.
단, new 키워드로 객체를 생성하지 않으면 this는 생성된 객체에 바인딩되지 않고 전역객체에 연결된다.

그리고 public 메소드 getName, setName은 클로저로서 private 변수(자유 변수)에 접근할 수 있다.
이것이 기본적인 정보 은닉 방법이다.

위 코드르 조금 고치면 아래 코드와 같다.

```
var person = function(arg) {
  var name = arg ? arg : '';

  return {
    getName: function() {
      return name;
    },
    setName: function(arg) {
      name = arg;
    }
  }
}

var me = person('Lee'); /* or var me = new person('Lee'); */

var name = me.getName();

console.log(name); // Lee

me.setName('Kim');
name = me.getName();

console.log(name); // Kim
```

person 함수는 객체를 반환한다. 이 객체 내의 메소드 getName, setName은 클로저로서 private 변수 name에 접근할 수 있다.
이러한 방식을 _모듈 패턴_ 이라 하며 **캡슐화와 정보 은닉를 제공한다.**
많은 라이브러리에서 사용되는 유용한 패턴이다.
