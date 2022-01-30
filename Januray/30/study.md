### 이벤트 루프(Event loop)와 동시성 (Concurrency)

브라우저는 단일 쓰레드(single-thread)에서 이벤트 드리븐(event-driven) 방식으로 동작한다

단일 쓰레드란 ? 쓰레드가 하나뿐이라는 의미이다. 즉, 곧 하나의 테스크(작업)만을 처리할 수 있다는 뜻이다.

쓰레드란 ? 어떠한 프로그램 내에서, 특히 프로세스 내에서 실행되는 흐름의 단위를 말한다.

브라우저는 실제로 동작하는 많은 웹 애플리케이션은 많은 테스크가 동시에 처리되는 것처럼 느껴진다.
이 처럼, 자바스크립트의 동시성을 지원하는 것이 바로 **이벤트 루프** 이다.

구글의 V8을 비롯한 대부분의 자바스크립트 엔진은 크게 두가지로 나뉜다.

- Call Stack (호출 스택)

  - 작업이 요청되면 (함수가 호출되면) 요청된 작업은 순차적으로 Call Stack에 쌓이게 되고 순차적으로 실행된다. \_\_자바스크립트는 단 하나의 Call Stack을 사용하기 때문에, 해당 태스크가 종료하기 전까지는 다른 어떤 태스크도 수행할 수 없다.

- Heap
  - 동적으로 생성된 객체 인스턴스가 할당되는 영역이다.

이와 같이 자바스크립트 엔진은 단순히 작업이 요청되면 Call Stack을 사용하여 요청된 작업을 순차적으로 실행할 뿐이다.
동시성을 지원하기 위해 필요한 비동기 요청 처리는 자바스크립트 엔진을 구동하는 환경 즉, 브라우저(OR Nods.js)가 담당한다.

- Event Queue (Task Queue)

  - 비동기 처리 함수의 콜백 함수, 비동기식 이벤트 핸들러, timer 함수의 콜백 함수가 보관되는 영역으로 \_\_이벤트 루프에 의해 특정 시점(Call Stack이 비어 졌을 떄)에 순차적으로 Call Stack으로 이동되어 실행된다.

- 이벤트 루프 (Event Loop)
  - Call Stack 내에서 현재 실행중인 테스크가 있는지 그리고, Event queue에 테스크가 있는지 반복하여 확인한다. 만약, Call Stack이 비어 있다면, Event Queue내의 태스크가 Call Stack으로 이동하고 실행한다.

### 이벤트의 종류

#### UI Event

|  Event   |                                Description                                 |
| :------: | :------------------------------------------------------------------------: |
|  `load`  |                     `웹페이지의 로드가 완료되었을 때`                      |
| `unload` |           `웹페이지가 언로드 될 떄(새로운 페이지를 요청한경우)`            |
| `error`  | `브라우저가 자바스크립트 오류를 만났거나 요청한 자원이 존재하지 않는 경우` |
| `resize` |                     `브라우저 창의 크기를 조절했을 때`                     |
| `scroll` |                 `사용자가 페이지를 위아래로 스크롤 할 때`                  |
| `select` |                           `텍스트를 선택했을 때`                           |

#### Keyboard Event

|   Event    |       Description        |
| :--------: | :----------------------: |
| `keydown`  |  `키를 누르고 있을 떄`   |
|  `keyup`   | `누르고 있던 키를 땔 떄` |
| `keypress` |  `키를 누르고 땠을 때`   |

#### Mouse Event

|    Event    |                         Description                          |
| :---------: | :----------------------------------------------------------: |
|   `click`   |                 `마우스 버튼을 클릭했을 때`                  |
|  `dbclick`  |               `마우스 버튼을 더블 클릭했을 때`               |
| `mousedown` |                `마우스 버튼을 누르고 있을 때`                |
|  `mouseup`  |              `누르고 있던 마우스 버튼을 뗄 때`               |
| `mousemove` |        `마우스를 움직일 때(터치스크린에서는 안된다.)`        |
| `mouseover` |  `마우스를 요소 위로 움직였을 때(터치스크린에서는 안된다.)`  |
| `mouseout`  | `마우스를 요소 밖으로 움직였을 떄(터치스크린에서는 안된다.)` |

#### Focus Event

|      Event      |         Description         |
| :-------------: | :-------------------------: |
| `focus/focusin` | `요소가 포커스를 얻었을 때` |
| `blur/focusout` | `요소가 포커스를 잃었을 때` |

#### Form Event

|  Event   |                          Description                          |
| :------: | :-----------------------------------------------------------: |
| `input`  |        `input 또는 textarea 요소의 값이 변경되었을 때`        |
| `input`  | `contenteditable 어트리뷰트를 가진 요소의 값이 변경되었을 때` |
| `change` |  `select box, checkbox, radio button의 상태가 변경되었을 때`  |
| `submit` |               `form submit할 때(버튼 또는 키)`                |
| `reset`  |         `reset 버튼을 클릭할 때 (최근에는 사용안함)`          |

#### Clipboard Event

|  Event  |        Description        |
| :-----: | :-----------------------: |
|  `cut`  | `콘텐츠를 잘라내기 할 때` |
| `copy`  |   `콘텐츠를 복사할 때`    |
| `paste` | `콘텐츠를 붙여넣기 할 때` |

### 이벤트 핸들러 등록

이벤트가 발생했을 때 동작할 이벤트 핸들러를 이벤트에 등록하는 방법은 3가지가 있다.

#### 인라인 이벤트 핸들러 방식

```
<!DOCTYPE html>
<html>
<body>
  <button onclick="myHandler()">Click me</button>
  <script>
    function myHandler() {
      alert('Button clicked!');
    }
  </script>
</body>
</html>
```

이 방식은 더 이상 사용되지 않으며, 사용해서도 안된다.

주의할 것은 onclick과 같이 on으로 시작하는 이벤트 어트리뷰트의 값으로 함수 호출을 전달하는 것이다.

이것의 장점은 여러개의 함수를 전달할 수 있다는 것이다.
그러나 익명함수의 사용이나 클로저를 사용하지 못하는 옛날 방식이므로, 사용을 자제하자.

#### 이벤트 핸들러 프로퍼티 방식

```
<!DOCTYPE html>
<html>
<body>
  <button class="btn">Click me</button>
  <script>
    const btn = document.querySelector('.btn');

    // 이벤트 핸들러 프로퍼티 방식은 이벤트에 하나의 이벤트 핸들러만을 바인딩할 수 있다
    // 첫번째 바인딩된 이벤트 핸들러 => 실행되지 않는다.
    btn.onclick = function () {
      alert('① Button clicked 1');
    };

    // 두번째 바인딩된 이벤트 핸들러
    btn.onclick = function () {
      alert('① Button clicked 2');
    };
  </script>
</body>
</html>
```

인라인 이벤트 핸들러 방식처럼 HTML과 Javascript가 뒤섞이는 문제는 해결할 수 있는 방식이다.
하지만, **이벤트 핸들러 프로퍼티에 하나의 이벤트 핸들러만 바인딩할 수 있다는 단점이 있다.**

#### addEventListener 메소드 방식

addEventListener 메소드를 이용하여 대상 DOM 요소에 이벤트를 바인딩하고 해당 이벤트가 발생했을 때, 실행될 콜백 함수(이벤트 핸들러)를 지정한다.

addEventListener 함수 방식은 위 두개의 방식에 비해 아래와 같은 장점을 가진다.

- 하나의 이벤트에 대해 하나 이상의 이벤트 핸들러를 추가할 수 있다.
- 캡처링과 버블링을 지원한다.
- HTML 요소 뿐만아니라 모든 DOM 요소(HTML, XML, SVG)에 대해 동작한다. 브라우저는 웹 문서(HTML, XML, SVG)를 로드한 후, 파싱하여 DOM을 생성한다.
- 클로저와 익명함수를 사용할수 있다.

addEventListener 메소드는 IE 9이상에서 동작한다.
IE 8이하에서는 attachEvent 메소드를 사용한다.

```
if (elem.addEventListener) {    // IE 9 ~
  elem.addEventListener('click', func);
} else if (elem.attachEvent) {  // ~ IE 8
  elem.attachEvent('onclick', func);
}
```

만약 addEventListener의 대상을 지정하지 않으면 전역 객체 window
즉, DOM 문서를 포함한 브라우저의 윈도우에서 발생하는 click 이벤트에 이벤트 핸들러르 바인딩한다.
따라서, 브라우저 윈도우 어디를 클릭하여도 이벤트 핸들러가 동작한다.

```
<!DOCTYPE html>
<html>
<body>
  <button class="btn">Click me</button>
  <script>
    const btn = document.querySelector('.btn');

    // addEventListener 메소드 방식
    // 첫번째 바인딩된 이벤트 핸들러
    btn.addEventListener('click', function () {
      alert('② Button clicked 1');
    });

    // 두번째 바인딩된 이벤트 핸들러
    btn.addEventListener('click', function () {
      alert('② Button clicked 2');
    });
  </script>
</body>
</html>
```

위 코드는 2번 방식과 달리 이벤트 두개 다 동작한다.

### 이벤트 핸들러 함수 내부의 this

#### 인라인 이벤트 핸들러 방식

**인라인 이벤트 핸들러 방식의 경우, 이벤트 핸들러는 일반 함수로서 호출되므로 이벤트 핸들러 내부의 this는 전역 객체 window를 가리킨다.**

```
<!DOCTYPE html>
<html>
<body>
  <button onclick="foo()">Button</button>
  <script>
    function foo () {
      console.log(this); // window
    }
  </script>
</body>
</html>
```

#### 이벤트 핸들러 프로퍼티 방식

이벤트 핸들러 프로퍼티 방식에서 이벤트 핸들러는 메소드이므로 이벤트 핸들러 내부의 **this는 이벤트에 바인딩 된 요소를 가리킨다.**

이것은 객체의 currentTarget 프로퍼티와 같다.

```
<!DOCTYPE html>
<html>
<body>
  <button class="btn">Button</button>
  <script>
    const btn = document.querySelector('.btn');

    btn.onclick = function (e) {
      console.log(this); // <button id="btn">Button</button>
      console.log(e.currentTarget); // <button id="btn">Button</button>
      console.log(this === e.currentTarget); // true
    };
  </script>
</body>
</html>
```

#### addEventListener 메소드 방식

addEventListener 메소드에서 지정한 이벤트 핸들러는 콜백함수이지만, 이벤트 핸들러 내부의 **this는 이벤트 리스너에 바인딩된 요소 (currentTarget)를 가리킨다.**

이것은 이벤트 객체의 currnetTarget 프로퍼티와 같다.
즉, 이벤트 핸들러 프로퍼티와 같다.

```
<!DOCTYPE html>
<html>
<body>
  <button class="btn">Button</button>
  <script>
    const btn = document.querySelector('.btn');

    btn.addEventListener('click', function (e) {
      console.log(this); // <button id="btn">Button</button>
      console.log(e.currentTarget); // <button id="btn">Button</button>
      console.log(this === e.currentTarget); // true
    });
  </script>
</body>
</html>
```

### 이벤트의 흐름

계층적 구조에 포함되어 있는 HTML 요소에 이벤트가 발생할 경우 연쇄적 반응이 일어난다.
즉, 이벤트가 전파(Event Propagation)되는데 전파 방향에 따라 버블링(Event Bubbling)과 캡처링(Event Capturing)으로 구분할 수 있다.

버블링이란 ? 자식 요소에 발생한 이벤트가 부모 요소로 전파되는 것

캡처링이란 ? 자식요소에서 발생한 이벤트가 부모 요소부터 시작하여 이벤트를 발생시킨 자식 요소 까지 도달하는 것

**버블링과 캡처링은 둘 중에 하남나 발생하는 것이 아니라 캡처링부터 시작해서 버블링으로 종료된다.**

! 캡처링은 IE8이하에서는 지원되지 않는다.

addEventListener 메소드의 세번째 매개변수에 true를 설정하면 캡처링으로 전파되는 이벤트를 캐치하고 false 또는 미설정하면 버블링으로 전파되는 이벤트를 캐치한다.

! eventPhase : 이벤트 흐름 상에서 어느 phase에 있는지 반환한다.
0 : 이벤트 없음
1 : 캡처링 단계
2 : 타깃
3 : 버블링 단계

```
const handler = function (e) {
    const phases = ['capturing', 'target', 'bubbling'];
    const node = this.nodeName + (this.className ? '.' + this.className : '');
    // eventPhase: 이벤트 흐름 상에서 어느 phase에 있는지를 반환한다.
    // 0 : 이벤트 없음 / 1 : 캡처링 단계 / 2 : 타깃 / 3 : 버블링 단계
    console.log(node, phases[e.eventPhase - 1]);
    alert(node + ' : ' + phases[e.eventPhase - 1]);
  };
```

이벤트 캡처링은 되도록이면 막으면 안된다고 한다.
그럼 이것들은 어디에 쓰고 왜 알아야 하냐 ? 궁금증이 생긴다.

이것들은 나중에 이벤트 위임을 이해하기 위한 선수지식이라고 해도 과언이 아니라고한다.

그러니 이벤트 위임을 기다려 보도록 하자.

### Event 객체

event 객체는 이벤트를 발생시킨 요소와 발생한 이벤트에 대한 유용한 정보를 제공한다.
이벤트가 발생하면 event 객체는 동적으로 생성되며 이벤트를 처리할 수 있는 이벤트 핸들러에 인자로 전달된다.

```
function showCoords(e) { // e: event object
    const msg = document.querySelector('.message');
    msg.innerHTML =
      'clientX value: ' + e.clientX + '<br>' +
      'clientY value: ' + e.clientY;
  }
```

위와 같이 event 객체는 이벤트 핸들러에 암묵적으로 전달된다.
그러나 객체를 전달받을 첫번째 매개변수를 명시적으로 선언해야 한다.
위 코드에서는 e라고 했지만 다른 변수명을 지정해도 아무 상관없다.
그러나, 변수명을 다른 사람이 봐도 이해가 잘 가도록 잘 지정하는 것도 실력이니 event, e를 쓰도록 하자.

#### Event Property

##### Event.target

실제로 이벤트를 발생시킨 요소를 가리킨다.

```
<!DOCTYPE html>
<html>
<body>
  <div class="container">
    <button id="btn1">Hide me 1</button>
    <button id="btn2">Hide me 2</button>
  </div>

  <script>
    function hide(e) {
      e.target.style.visibility = 'hidden';
      // 동일하게 동작한다.
      // this.style.visibility = 'hidden';
    }

    document.getElementById('btn1').addEventListener('click', hide);
    document.getElementById('btn2').addEventListener('click', hide);
  </script>
</body>
</html>
```

hide 함수를 특정 노드에 한정하여 사용하지 않고 범용적으로 사용하기 위해 event 객체의 target 프로퍼티를 사용한다.
hide 함수 내부의 e.target은 언제나 이벤트가 바인딩된 요소를 가리키는 this와 일치한다.
**하지만, 버튼별로 이벤트를 바인딩하고 있기 때문에 버튼이 많은 경우 위 방법은 바람직하지 않다.**

**이벤트 위임** 을 사용하여 아래처럼 사용하는 것이 바람직하다.

```
<!DOCTYPE html>
<html>
<body>
  <div class="container">
    <button id="btn1">Hide me 1</button>
    <button id="btn2">Hide me 2</button>
  </div>

  <script>
    const container = document.querySelector('.container');

    function hide(e) {
      // e.target은 실제로 이벤트를 발생시킨 DOM 요소를 가리킨다.
      e.target.style.visibility = 'hidden';
      // this는 이벤트에 바인딩된 DOM 요소(.container)를 가리킨다. 따라서 .container 요소를 감춘다.
      // this.style.visibility = 'hidden';
    }

    container.addEventListener('click', hide);
  </script>
</body>
</html>
```

위 코드의 경우, this는 이벤트에 바인딩된 요소(.container)를 가리킨다.
따라서, container 요소를 감춘다.
e.target은 실제로 이벤트를 발생시킨 DOM 요소(button or .container)를 가리킨다.
**Event.target은 this와 반드시 일치하지는 않는다.**

##### Event.currentTarget

이벤트에 바인딩된 DOM 요소를 가리킨다. 즉, addEventListener 앞에 기술된 객체를 가리킨다.

addEventListener 메소드에서 지정한 이벤트 핸들러 내부의 this는 이벤트에 바인딩된 DOM 요소를 가리키며 이것은 이벤트 객체의 currentTarget프로퍼티와 같다.
따라서, **이벤트 핸들러 함수내에서 currentTarget과 this는 언제나 일치한다.**

```
<!DOCTYPE html>
<html>
<head>
  <style>
    html, body { height: 100%; }
    div { height: 100%; }
  </style>
</head>
<body>
  <div>
    <button>배경색 변경</button>
  </div>
  <script>
    function bluify(e) {
      // this: 이벤트에 바인딩된 DOM 요소(div 요소)
      console.log('this: ', this);
      // target: 실제로 이벤트를 발생시킨 요소(button 요소 또는 div 요소)
      console.log('e.target:', e.target);
      // currentTarget: 이벤트에 바인딩된 DOM 요소(div 요소)
      console.log('e.currentTarget: ', e.currentTarget);

      // 언제나 true
      console.log(this === e.currentTarget);
      // currentTarget과 target이 같은 객체일 때 true
      console.log(this === e.target);

      // click 이벤트가 발생하면 이벤트를 발생시킨 요소(target)과는 상관없이 this(이벤트에 바인딩된 div 요소)의 배경색이 변경된다.
      this.style.backgroundColor = '#A5D9F3';
    }

    // div 요소에 이벤트 핸들러가 바인딩되어 있다.
    // 자식 요소인 button이 발생시킨 이벤트가 버블링되어 div 요소에도 전파된다.
    // 따라서 div 요소에 이벤트 핸들러가 바인딩되어 있으면 자식 요소인 button이 발생시킨 이벤트를 div 요소에서도 핸들링할 수 있다.
    document.querySelector('div').addEventListener('click', bluify);
  </script>
</body>
</html>
```

##### Event.type

발생한 이벤트의 종류를 나타낸다.

```
<!DOCTYPE html>
<html>
<body>
  <p>키를 입력하세요</p>
  <em class="message"></em>
  <script>
  const body = document.querySelector('body');

  function getEventType(e) {
    console.log(e);
    document.querySelector('.message').innerHTML = `${e.type} : ${e.keyCode}`;
  }

  body.addEventListener('keydown', getEventType);
  body.addEventListener('keyup', getEventType);
  </script>
</body>
</html>
```

##### Event.cancelable

요소의 기본 동작을 취소시킬 수 있는 지 여부(true/false)를 나타낸다.

```
!DOCTYPE html>
<html>
<body>
  <a href="poiemaweb.com">Go to poiemaweb.com</a>
  <script>
  const elem = document.querySelector('a');

  elem.addEventListener('click', function (e) {
    console.log(e.cancelable); // true

    // 기본 동작을 중단시킨다.
    e.preventDefault();
  });
  </script>
</body>
</html>
```

##### Event.eventPhase

이벤트 흐름 상에서 어느 단계에 있는 지를 반환한다.

| 반환 값 |     의미      |
| :-----: | :-----------: |
|   `0`   | `이벤트 없음` |
|   `1`   | `캡처링 단계` |
|   `2`   |    `타깃`     |
|   `3`   | `버블링 단계` |

### Event Delegation (이벤트 위임)

```
<ul id="post-list">
  <li id="post-1">Item 1</li>
  <li id="post-2">Item 2</li>
  <li id="post-3">Item 3</li>
  <li id="post-4">Item 4</li>
  <li id="post-5">Item 5</li>
  <li id="post-6">Item 6</li>
</ul>
function printId() {
  console.log(this.id);
}

document.querySelector('#post-1').addEventListener('click', printId);
document.querySelector('#post-2').addEventListener('click', printId);
document.querySelector('#post-3').addEventListener('click', printId);
document.querySelector('#post-4').addEventListener('click', printId);
document.querySelector('#post-5').addEventListener('click', printId);
document.querySelector('#post-6').addEventListener('click', printId);
```

li요소가 클릭 이벤트에 반응하는 처리를 구현하고 싶은 경우 위처럼하면 실행 속도의 저하의 원인이 될 수 있고, 코드의 가독성 또한 매우 떨어진다.

또한, **동적으로 li 요소가 추가되는 경우, 아직 추가되지 않은 요소는 DOM에 존재하지 않으므로 이벤트 핸들러에 바인딩될 수 없다.**
이러한 경우, 이벤트 위임을 사용한다.

이벤트 위임은 **다수의 자식 요소에 각각 이벤트 핸들러를 바인딩하는 대신 하나의 부모 요소에 이벤트 핸들러를 바인딩하는 방법이다.**

이것은 이벤트가 이벤트 흐름에 의해 이벤트를 발생시킨 요소의 부모 요소에도 영향을 미치기 때문이다. (버블링)

```
<!DOCTYPE html>
<html>
<body>
  <ul class="post-list">
    <li id="post-1">Item 1</li>
    <li id="post-2">Item 2</li>
    <li id="post-3">Item 3</li>
    <li id="post-4">Item 4</li>
    <li id="post-5">Item 5</li>
    <li id="post-6">Item 6</li>
  </ul>
  <div class="msg">
  <script>
    const msg = document.querySelector('.msg');
    const list = document.querySelector('.post-list')

    list.addEventListener('click', function (e) {
      // 이벤트를 발생시킨 요소
      console.log('[target]: ' + e.target);
      // 이벤트를 발생시킨 요소의 nodeName
      console.log('[target.nodeName]: ' + e.target.nodeName);

      // li 요소 이외의 요소에서 발생한 이벤트는 대응하지 않는다.
      if (e.target && e.target.nodeName === 'LI') {
        msg.innerHTML = 'li#' + e.target.id + ' was clicked!';
      }
    });
  </script>
</body>
</html>
```

### 기본 동작의 변경

이벤트 객체는 요소의 기본동작과 요소의 부모 요소들이 이벤트에 대응하는 방법을 변경하기 위한 메소드는 가지고 있다.

#### Event.preventDefault()

폼을 submit하거나 링크를 클릭하면 다른 페이지로 이동하게 된다.
이와 같이 요소가 가지고 있는 기본동작을 중단시키는 메소드다.

#### Event.stopPropagation()

어느 한 요소를 이용하여 이벤트를 처리한 후 이벤트가 부모 요소로 이벤트가 전파되는 것을 중단시키기 위한 메소드이다.
부모 요소에 동일한 이벤트에 대한 다른 핸들러가 지정되어 잇을 경우 사용한다.

```
<!DOCTYPE html>
<html>
<head>
  <style>
    html, body { height: 100%;}
  </style>
</head>
<body>
  <p>버튼을 클릭하면 이벤트 전파를 중단한다. <button>버튼</button></p>
  <script>
    const body = document.querySelector('body');
    const para = document.querySelector('p');
    const button = document.querySelector('button');

    // 버블링
    body.addEventListener('click', function () {
      console.log('Handler for body.');
    });

    // 버블링
    para.addEventListener('click', function () {
      console.log('Handler for paragraph.');
    });

    // 버블링
    button.addEventListener('click', function (event) {
      console.log('Handler for button.');

      // 이벤트 전파를 중단한다.
      event.stopPropagation();
    });
  </script>
</body>
</html>
```

#### preventDefault & stopPropagation 동시 사용

기본 동작의 중단과 버블링 또는 캡처링의 중단을 동시에 실시하는 방법은 아래와 같다.

```
<!DOCTYPE html>
<html>
<body>
  <a href="http://www.google.com" onclick='return handleEvent()'>go</a>
  <script>
  function handleEvent() {
    return false;
  }
  </script>
</body>
</html>
```

### 화살표 함수 (Arrow Function) 의 선언

화살표 함수는 function 키워드 대신 화살표를 사용하여 보다 간략한 방법으로 함수를 선언할 수 있따.
하지만, 모든 경우 화살표 함수를 사용할 수 있는 것은 아니다.
화살표 함수의 기본 문법은 아래오 같다.

```
// 매개변수 지정 방법
    () => { ... } // 매개변수가 없을 경우
     x => { ... } // 매개변수가 한 개인 경우, 소괄호를 생략할 수 있다.
(x, y) => { ... } // 매개변수가 여러 개인 경우, 소괄호를 생략할 수 없다.

// 함수 몸체 지정 방법
x => { return x * x }  // single line block
x => x * x             // 함수 몸체가 한줄의 구문이라면 중괄호를 생략할 수 있으며 암묵적으로 return된다. 위 표현과 동일하다.

() => { return { a: 1 }; }
() => ({ a: 1 })  // 위 표현과 동일하다. 객체 반환시 소괄호를 사용한다.

() => {           // multi line block.
  const x = 10;
  return x * x;
};
```

### 화살표 함수의 호출

화살표 함수는 익명함수로만 사용할 수 있다. 따라서, 화살표 함수를 호출하기 위해서는 **함수 표현식** 을 사용해야 한다.

```
var pow = function (x) { return x * x; };
console.log(pow(10)); // 100
//OR
const pow = x => x * x;
console.log(pow(10)); // 100
```

또는, 콜백 함수로도 사용할 수 있다. 이 경우, 일반적인 함수 표현식보다 간결하다.

```
var arr = [1, 2, 3];
var pow = arr.map(function (x) { // x는 요소값
  return x * x;
});

console.log(pow); // [ 1, 4, 9 ]
//OR
const arr = [1, 2, 3];
const pow = arr.map(x => x * x);

console.log(pow); // [ 1, 4, 9 ]
```

### this

**function 키워드로 생성한 일반 함수와 화살표 함수의 가장 큰 차이는 this이다.**

#### 일반 함수의 this

자바스크립트의 경우 함수 호출 방식에 의해 this에 바인딩할 어떤 객체가 동적으로 결정된다.
**즉, 함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정되는 것이 아니고, 함수를 호출할 때 함수가 어떻게 호출되었는지에 따라 this에 바인딩할 객체가 동적으로 결정된다.**

콜백 함수 내부의 this는 전역 객체 window를 가리킨다.

```
function Prefixer(prefix) {
  this.prefix = prefix;
}

Prefixer.prototype.prefixArray = function (arr) {
  // (A)
  return arr.map(function (x) {
    return this.prefix + ' ' + x; // (B)
  });
};

var pre = new Prefixer('Hi');
console.log(pre.prefixArray(['Lee', 'Kim']));
```

A 지점에서의 this는 생성자 함수 Prefixer가 생성한 객체, 즉, 생성자 함수의 인스턴스(pre)이다.

B 지점에서 사용한 this는 아마도 생성자 함수 Prefixer가 생성한 객체(pre)일 것이라고 기대했겟지만, B의 this는 전역 객체 window를 가리킨다.
**이는 생성자 함수와 객체의 메소드를 제외한 모든 함수 내부의 this는 전역 객체를 가리키기 때문이다.**

#### 화살표 함수의 this

화살표 함수는 일반 함수와 달리 선언할 때 this에 바인딩할 객체가 정적으로 결정된다.
화살표 함수의 this는 언제나 상위 스코프의 this를 가리킨다.
이를 Lexical this라 한다.

```
function Prefixer(prefix) {
  this.prefix = prefix;
}

Prefixer.prototype.prefixArray = function (arr) {
  // this는 상위 스코프인 prefixArray 메소드 내의 this를 가리킨다.
  return arr.map(x => `${this.prefix}  ${x}`);
};

const pre = new Prefixer('Hi');
console.log(pre.prefixArray(['Lee', 'Kim']));
```

화살표 함수는 call, apply, bind 메소드를 사용하여 this를 변경할 수 없다.

### 화살표 함수를 사용해서는 안되는 경우

화살표 함수는 Lexical this를 지원하므로 콜백 함수로 사용하기 편리하다.
하지만, 화살표 함수를 사용하는 것이 오히려 혼란을 불러오는 경우도 있으므로 주의하자.

#### 메소드

화살표 함수로 메소드를 정의하는 것은 피해야한다.

```
// Bad
const person = {
  name: 'Lee',
  sayHi: () => console.log(`Hi ${this.name}`)
};

person.sayHi(); // Hi undefined
```

메소드로 정의한 화살표 함수 내부의 this는 메소드를 소유한 객체, 즉 메소드를 호출한 객체를 가리키지 않고 상위 컨텍스트인 전역 객체 window를 가리킨다.

따라서, 화살표 함수로 메소드를 정의하는 것은 바람직하지 않다.

이와 같은 경우 메소드를 위한 단축 표기법을 사용하는 것이 좋다.

```
// Good
const person = {
  name: 'Lee',
  sayHi() { // === sayHi: function() {
    console.log(`Hi ${this.name}`);
  }
};

person.sayHi(); // Hi Lee
```

#### prototype

화살표 함수로 정의된 메소드를 prototype에 할당하는 경우도 동일한 문제를 발생한다.

```
// Bad
const person = {
  name: 'Lee',
};

Object.prototype.sayHi = () => console.log(`Hi ${this.name}`);

person.sayHi(); // Hi undefined
```

화살표 함수로 객체의 메소드를 정의했을 때랑 같은 문제가 발생한다.
따라서, prototype 메소드를 할당하는 경우, 일반함수를 사용하자.

```
// Good
const person = {
  name: 'Lee',
};

Object.prototype.sayHi = function() {
  console.log(`Hi ${this.name}`);
};

person.sayHi(); // Hi Lee
```

#### 생성자 함수

생성자 함수는 prototype 프로퍼티를 가지며 prototype 프로퍼티가 가리키는 프로토 타입 객체의 constructor를 사용한다.
하지만 화살표 함수는 prototype 프로퍼티를 가지고 있지 않다.
그래서, **화살표 함수는 생성자 함수로 사용할 수 없다.**

#### addEventListener 함수의 콜백 함수

addEventListener 함수의 콜백 함수를 화살표 함수로 정의하면 this가 상위 컨텍스트인 전역 객체 window를 가리킨다.

따라서 addEventListener 함수의 콜백 함수 내에서 this를 사용하는 경우, function 키워드로 정의한 일반 함수를 사용해야 한다.
일반 함수로 정의된 addEventListener 함수의 콜백 함수 내부의 this는 이벤트 리스너에 바인딩 된 요소(currentTarget)을 가리킨다.

```
// Bad
var button = document.getElementById('myButton');

button.addEventListener('click', () => {
  console.log(this === window); // => true
  this.innerHTML = 'Clicked button';
});

// Good
var button = document.getElementById('myButton');

button.addEventListener('click', function() {
  console.log(this === button); // => true
  this.innerHTML = 'Clicked button';
});
```

### 모듈 (Module)

모듈이란 애플리케이션을 구성하는 개별적 요소로서 재사용 가능한 코드 조각을 말한다.
모듈은 세부 사항을 캡슐화하고 공개가 필요한 API만을 외부에 노출한다.

**일반적으로 모듈은 파일 단위로 분리되어 있으며 애플리케이션은 필요에 따라 명시적으로 모듈을 로드하여 재사용한다.**

**모듈은 기능별로 분리되어 작성되므로 코등의 단위를 명확히 분리하여 애플리케이션을 구성할 수 있으며 재사용성이 좋아서 개발 효율성과 유지보수성을 높일 수 있다.**

**자바스크립트는 파일을 여러개의 파일로 분리하여 script 태그로 로드해도 분리된 파일들이 결국 하나의 자바스크립트 파일 내에 있는 것처럼 하나의 전역 객체를 공유한다.**

따라서, 자바스크립트는 모듈화를 구현할 수 없다.

걱정마라, 이것을 해결하기 위해 나온 것들이 있따!

바로!!

script 태그에 type="module" 어트리뷰트를 추가하는 것이다.

위를 추가하면 로드된 자바스크립트 파일은 모듈로서 동작한다.

**ES6 모듈의 파일 확장자는 모듈임을 명확히 하기위해 mjs를 사용하도록 권장한다.**

단, 아래와 같은 이유로 아직까지는 브라우저가 지원하는 ES6모듈 기능보다 Webpack 등의 모듈 번들러를 사용하는 것이 일반적이다.

- IE를 포함한 구형 브라우저는 ES6 모듈을 지원하지 않는다.
- 브라우저의 ES6 모듈 기능을 사용하더라도 트랜스파일링이나 번들링이 필요하다.
- 아직 지원하지 않는 기능이 있다.
- 몇가지 문제가 있다.

그래서 mjs를 사용하는 것보다 Babel과 Webpack을 이용하도록 하자.

### Babel

Babel은 최신 사양의 자바스크립트 코드를 떠나 IE나 구형 브라우저에서도 동작하는 코드로 변환(트랜스 파일링)할 수 있다.

### Webpack

webpack은 의존 관계에 있는 모듈들을 하나의 자바스크립트 파일로 번들링하는 모듈 번들러이다.
webpack을 사용하면 의존 모듈이 하나의 파일로 번들링되므로 별도의 모듈 로더가 필요없다.
그리고, 다수의 자바스크립트 파일을 하나의 파일로 번들링하므로 html 파일에서 script 태그롤 다수의 자바스크립트 파일을 로드해야하는 번거로움도 사라진다.

#### Install

```
npm install --save-dev webpack webpack-cli
```
