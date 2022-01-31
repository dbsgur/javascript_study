### 프로미스란 ?

자바스크립트는 비동기 처리를 위한 하나의 패턴으로 콜백 함수를 사용한다.

하지만, 전통적인 콜백 패턴은 콜백 헬로 인해 가독성이 나쁘고 비동기 처리 중 발생한 에러의 처리가 곤란하며 여러 개의 비동기 처리를 한번에 처리하는데도 한계가 있다.

ES6에서는 비동기 처리를 위한 또 다른 패턴으로 프로미스를 도입했다.

프로미스는 전통적인 콜백 패턴이 가진 단점을 보완하며 비동기 처리 시점을 명확하게 표현할 수 있다는 장점이 있다.

### 콜백 패턴의 단점

#### 콜백 헬

자바스크립트에서 빈번하게 사용되는 비동기식 처리 모델은 요청을 병렬로 처리하여 다른 요청이 블로킹(작업 중단)이 되지 않는 장점이 있다.

하지만, 비동기 처리를 위해 콜백 패턴을 사용하면 처리 순서를 보장하기 위해 여러개의 콜백 함수가 네스팅(nesting : 중첩)되어 복잡도가 높아지는 콜백 헬(Callback Hell)이 발생하는 단점이 있다.
콜백 헬은 가독성을 나쁘게 하며 실수를 유발하는 원인이 된다.

```
step1(function(value1) {
  step2(value1, function(value2) {
    step3(value2, function(value3) {
      step4(value3, function(value4) {
        step5(value4, function(value5) {
            // value5를 사용하는 처리
        });
      });
    });
  });
});
```

콜백 헬이 발생하는 이유는 비동기 처리 모델은 실행 완료를 기다리지 않고 즉시 다음 태스크를 실행한다. 따라서 비동기 함수 내에서 처리 결과를 반환(또는 전역 변수의 할당)하면 기대한 대로 작동하지 않는다.

아래 코드를 보자

```
<!DOCTYPE html>
<html>
<body>
  <script>
    // 비동기 함수
    function get(url) {
      // XMLHttpRequest 객체 생성
      const xhr = new XMLHttpRequest();

      // 서버 응답 시 호출될 이벤트 핸들러
      xhr.onreadystatechange = function () {
        // 서버 응답 완료가 아니면 무시
        if (xhr.readyState !== XMLHttpRequest.DONE) return;

        if (xhr.status === 200) { // 정상 응답
          console.log(xhr.response);
          // 비동기 함수의 결과에 대한 처리는 반환할 수 없다.
          return xhr.response; // ①
        } else { // 비정상 응답
          console.log('Error: ' + xhr.status);
        }
      };

      // 비동기 방식으로 Request 오픈
      xhr.open('GET', url);
      // Request 전송
      xhr.send();
    }

    // 비동기 함수 내의 readystatechange 이벤트 핸들러에서 처리 결과를 반환(①)하면 순서가 보장되지 않는다.
    const res = get('http://jsonplaceholder.typicode.com/posts/1');
    console.log(res); // ② undefined
  </script>
</body>
</html>
```

비동기 함수 내의 readystatechange 이벤트 핸들러에서 처리 결과를 반환(①)하면 순서가 보장되지 않는다.
즉, ②에서 get 함수가 반환한 값을 참조할 수 없다. 그 이유에 대해 살펴보자.

get 함수가 호출되면 get 함수의 실행 컨텍스트가 생성되고 호출 스택(실행 컨텍스트 스택)에서 실행된다.
get 함수가 반환하는 xhr.response는 readystatechange 이벤트 핸들러가 반환한다.
readystatechange 이벤트는 발생하는 시점을 명확히 알 수 없지만 반드시 get 함수가 종료한 이후 발생한다.
get 함수의 마지막 문인 xhr.send();가 실행되어야 request를 전송하고 request를 전송해야 readystatechange 이벤트가 발생할 수 있기 때문이다.

get 함수가 종료하면 곧바로 console.log(②)가 호출되어 호출 스택에 들어가 실행된다.
console.log가 호출되기 직전에 readystatechange 이벤트가 이미 발생했다하더라도 이벤트 핸들러는 console.log보다 먼저 실행되지 않는다.

readystatechange 이벤트의 이벤트 핸들러는 이벤트가 발생하면 즉시 실행되는 것이 아니다.
이벤트가 발생하면 일단 태스크 큐로 들어가고 호출 스택이 비면 그때 이벤트 루프에 의해 호출 스택으로 들어가 실행된다.
console.log 호출 시점 이전에 readystatechange 이벤트가 이미 발생했다하더라도 get 함수가 종료하면 곧바로 console.log가 호출되어 호출 스택에 들어가기 때문에 readystatechange 이벤트의 이벤트 핸들러는 console.log가 종료되어 호출 스택에서 빠진 이후 실행된다.
만약 get 함수 이후에 console.log가 100번 호출된다면 readystatechange 이벤트의 이벤트 핸들러는 모든 console.log가 종료한 이후에나 실행된다.

때문에 get 함수의 반환 결과를 가지고 후속 처리를 할 수 없다.

즉, 비동기 함수의 처리 결과를 반환하는 경우, 순서가 보장되지 않기 때문에 그 반환 결과를 가지고 후속 처리를 할 수 없다.

즉, 비동기 함수의 처리 결과에 대한 처리는 비동기 함수의 콜백 함수 내에서 처리해야 한다. 이로 인해 콜백 헬이 발생한다.

**만일 비동기 함수의 처리 결과를 가지고 다른 비동기 함수를 호출해야 하는 경우, 함수의 호출이 중첩(nesting)이 되어 복잡도가 높아지는 현상이 발생하는데 이를 Callback Hell이라 한다.**

**Callback Hell은 코드의 가독성을 나쁘게 하고 복잡도를 증가시켜 실수를 유발하는 원인이 되며 에러 처리가 곤란하다.**

#### 에러처리의 한계

콜백 방식의 비동기 처리가 갖는 문제점 중 **가장 심각한 것은 에러 처리가 곤란하다는 것이다.**

```
try {
  setTimeout(() => { throw new Error('Error!'); }, 1000);
} catch (e) {
  console.log('에러를 캐치하지 못한다..');
  console.log(e);
} // Error : Error!
```

try 블록 내에서 setTimeout 함수가 실행되면 1초 후에 콜백 함수가 실행되고 이 콜백 함수는 예외를 발생시킨다.
하지만, 이 예외는 catch 블록에서 캐치되지 않는다. 그 이유에 대해 알아보자.

비동기 처리 함수의 콜백 함수는 해당 이벤트(timer 함수의 tick 이벤트, XMLHttpRequest의 readystatechange 이벤트 등)가 발생하면 태스트 큐(Task queue)로 이동한 후 호출 스택이 비어졌을 때, 호출 스택으로 이동되어 실행된다.
setTimeout 함수는 비동기 함수이므로 콜백 함수가 실행될 때까지 기다리지 않고 즉시 종료되어 호출 스택에서 제거된다.
이후 tick 이벤트가 발생하면 setTimeout 함수의 콜백 함수는 태스트 큐로 이동한 후 호출 스택이 비어졌을 때 호출 스택으로 이동되어 실행된다.
이 때, setTimeout 함수는 이미 호출 스택에서 제거된 상태이다. 이것은 setTimeout 함수의 콜백 함수를 호출한 것은 setTimeout 함수가 아니다라는 것을 의미한다.
setTimeout 함수의 콜백 함수의 호출자(caller)가 setTimeout 함수라면 호출 스택에 setTimeout 함수가 존재해야 하기 때문이다.

예외(exception)는 호출자(caller) 방향으로 전파된다.
하지만, 위에서 살펴본 바와 같이 setTimeout 함수의 콜백 함수를 호출한 것은 setTimeout 함수가 아니다.
따라서, **setTimeout 함수의 콜백 함수 내에서 발생시킨 에러는 catch 블록에서 캐치되지 않아 프로세스는 종료된다.**

이러한 문제를 극복하기 위해 Promise가 제안되었다. Promise는 ES6에 정식 채택되어 IE를 제외한 대부분의 브라우저가 지원하고 있다.

### 프로미스의 생성

프로미스는 Promise 생성자 함수를 통해 인스턴스화한다.

Promise 생성자 함수는 비동기 작업을 수행할 콜백 함수를 인자로 전달받는데
이 콜백 함수는 resolve와 reject 함수를 인자로 전달받는다.

```
// Promise 객체의 생성
const promise = new Promise((resolve, reject) => {
  // 비동기 작업을 수행한다.

  if (/* 비동기 작업 수행 성공 */) {
    resolve('result');
  }
  else { /* 비동기 작업 수행 실패 */
    reject('failure reason');
  }
});
```

Promise는 비동기 처리가 성공했는지 또는 실패했는지 등의 상태 정보를 갖는다.

|    상태     |                    의미                     |                         구현                         |
| :---------: | :-----------------------------------------: | :--------------------------------------------------: |
|  `pending`  |   `비동기 처리가 아직 수행되지 않은 상태`   | `resolve 또는 reject 함수가 아직 호출되지 않은 상태` |
| `fulfilled` |      `비동기 처리가 수행된 상태(성공)`      |             `resolve 함수가 호출된 상태`             |
| `rejected`  |      `비동기 처리가 수행된 상태(실패)`      |             `reject 함수가 호출된 상태`              |
|  `settled`  | `비동기 처리가 수행된 상태(성공 또는 실패)` |       `resolve 또는 reject 함수가 호출된 상태`       |

Promise 생성자 함수가 인자로 전달받은 콜백 함수는 내부에서 비동기 처리 작업을 수행한다.
이 때, 비동기 처리가 성공하면 콜백 함수의 인자로 전달받은 resolve 함수를 호출한다.
이 때, 프로미스는 'fulfilled' 상태가 된다.
비동기 처리가 실패하면 reject 함수를 호출한다.
이 때, 프로미스는 'rejected'상태가 된다.

```
const promiseAjax = (method, url, payload) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(payload));

    xhr.onreadystatechange = function () {
      // 서버 응답 완료가 아니면 무시
      if (xhr.readyState !== XMLHttpRequest.DONE) return;

      if (xhr.status >= 200 && xhr.status < 400) {
        // resolve 메소드를 호출하면서 처리 결과를 전달
        resolve(xhr.response); // Success!
      } else {
        // reject 메소드를 호출하면서 에러 메시지를 전달
        reject(new Error(xhr.status)); // Failed...
      }
    };
  });
};
```

위 코드처럼 비동기 함수 내에서 Promise 객체를 생성하고, 그 내부에서 비동기 처리를 구현한다.
이 때, 비동기 처리에 성공하면 resolve 메소드를 호출한다.
이 때, resolve 메소드의 인자로 비동기 처리 결과를 전달한다.
이 처리 결과는 Promise 객체의 후속 처리 메소드로 전달된다.
만약, 비동기 처리에 실패하면 reject 메소드를 호출한다.
이 때, reject 메소드의 인자로 에러 메시지를 전달한다.
이 에러 메시지는 Promise 객체의 후속 처리 메소드로 전달된다.

### 프로미스의 후속 처리 메소드

Promise로 구현된 비동기 함수는 Promise 객체를 반환해야 한다.
Promise로 구현된 비동기 함수를 호출하는 측에서는 Promise 객체의 후속 처리 메소드(then, catch)를 통해 비동기 처리 결과 또는 에러 메시지를 전달받아 처리한다.
Promise 객체는 상태를 갖는다.
이 상태에 따라 후속 처리 메소드를 체이닝 방식으로 호출한다.

- Promise의 후속 처리 메소드

1. then

- then 메소드는 두 개의 콜백 함수를 인자로 전달받는다. 첫 번째 콜백함수는 성공(fulfilled, resolve 함수가 호출된 상태)시 호출되고 두번째 함수는 실패(rejected, reject 함수가 호출된 상태)시 호출된다. then 메소드는 Promise를 반환한다.

2. catch

- 예외(비동기 처리에서 발생한 에러와 then 메소드에서 발생한 에러)가 발생하면 호출된다. catch 메소드는 Promise를 반환한다.

위의 get함수는 아래처럼 고쳐야한다.

```
<!DOCTYPE html>
<html>
<body>
<!DOCTYPE html>
<html>
<body>
  <pre class="result"></pre>
  <script>
    const $result = document.querySelector('.result');
    const render = content => { $result.textContent = JSON.stringify(content, null, 2); };

    const promiseAjax = (method, url, payload) => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(payload));

        xhr.onreadystatechange = function () {
          if (xhr.readyState !== XMLHttpRequest.DONE) return;

          if (xhr.status >= 200 && xhr.status < 400) {
            resolve(xhr.response); // Success!
          } else {
            reject(new Error(xhr.status)); // Failed...
          }
        };
      });
    };

    /*
      비동기 함수 promiseAjax은 Promise 객체를 반환한다.
      Promise 객체의 후속 메소드를 사용하여 비동기 처리 결과에 대한 후속 처리를 수행한다.
    */
    promiseAjax('GET', 'http://jsonplaceholder.typicode.com/posts/1')
      .then(JSON.parse)
      .then(
        // 첫 번째 콜백 함수는 성공(fulfilled, resolve 함수가 호출된 상태) 시 호출된다.
        render,
        // 두 번째 함수는 실패(rejected, reject 함수가 호출된 상태) 시 호출된다.
        console.error
      );
  </script>
</body>
</html>
```

### 프로미스의 에러 처리

위 예제의 비동기 함수 get은 Promise 객체를 반환한다.
**비동기 처리 결과에 대한 후속 처리는 Promise 객체가 제공하는 후속 처리 메소드 then, catch, finally를 사용하여 수행한다.**
비동기 처리 시에 발생한 에러는 then 메소드의 두번째 콜백함수로 처리할 수 있다.

```
const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';

// 부적절한 URL이 지정되었기 때문에 에러가 발생한다.
promiseAjax(wrongUrl)
  .then(res => console.log(res), err => console.error(err)); // Error: 404
```

비동기 처리에서 발생한 에러는 Promise 객체의 후속 처리 메소드 catch를 사용해서 처리할 수 있다.

```
const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';

// 부적절한 URL이 지정되었기 때문에 에러가 발생한다.
promiseAjax(wrongUrl)
  .then(res => console.log(res))
  .catch(err => console.error(err)); // Error: 404
```

catch 메소드를 호출하면 내부적으로 then(undefined, onRejected)을 호출한다.
또한, then 메소드의 두번째 콜백함수는 첫번째 콜백 함수에서 발생한 에러를 캐치하지 못한다.

그러나 catch 메소드는 모든 then 메소드를 호출한 이후에 호출하면 비동기 처리에서 발생한 에러(reject 함수가 호출된 상태)뿐만 아니라 then 메소드 내부에서 발생한 에러 까지 모두 캐치할 수 있다.

```
promiseAjax('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => console.xxx(res), err => console.error(err));
  // 두 번째 콜백 함수는 첫 번째 콜백 함수에서 발생한 에러를 캐치하지 못한다.
//VS
promiseAjax('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => console.xxx(res))
  .catch(err => console.error(err)); // TypeError: console.xxx is not a function
```

또한 then 메소드에서 두 번째 콜백함수로 error를 전달하는 것보다 catch 메소드를 사용하는 것이 가독성도 좋고 명확하다.
따라서, **에러 처리는 then 메소드에서 하지말고 catch메소드를 사용하는 것을 권장한다.**

### 프로미스 체이닝

비동기 함수의 처리 결과를 가지고 다른 비동기 함수를 호출해야하는 경우, 함수의 호출이 중첩(nesting)이 되어 복잡도가 높아지는 콜백 헬이 발생한다.
프로미스는 후속 처리 메소드를 체이닝하여 여러개의 프로미스를 연결하여 사용할 수 있다. 이렇게 콜백 헬을 해결할 수 있다.

Promise 객체를 반환한 비동기 함수는 프로미스 후속 처리 메소드인 then이난 catch 메소드를 사용할 수 있다.
따라서 then메소드가 Promise 객체를 반환하다록 하면 (then 메소드는 기본적으로 Promise를 반환한다.) 여러개의 프로미스를 연결하여 사용할 수 있다.

아래는 서버로 부터 특정 포스트를 취득한 후, 그 포스트를 작성한 사용자의 아이디로 작성된 모든 포스트를 검색하는 예제이다.

```
<!DOCTYPE html>
<html>
<body>
  <pre class="result"></pre>
  <script>
    const $result = document.querySelector('.result');
    const render = content => { $result.textContent = JSON.stringify(content, null, 2); };

    const promiseAjax = (method, url, payload) => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(payload));

        xhr.onreadystatechange = function () {
          if (xhr.readyState !== XMLHttpRequest.DONE) return;

          if (xhr.status >= 200 && xhr.status < 400) {
            resolve(xhr.response); // Success!
          } else {
            reject(new Error(xhr.status)); // Failed...
          }
        };
      });
    };

    const url = 'http://jsonplaceholder.typicode.com/posts';

    // 포스트 id가 1인 포스트를 검색하고 프로미스를 반환한다.
    promiseAjax('GET', `${url}/1`)
      // 포스트 id가 1인 포스트를 작성한 사용자의 아이디로 작성된 모든 포스트를 검색하고 프로미스를 반환한다.
      .then(res => promiseAjax('GET', `${url}?userId=${JSON.parse(res).userId}`))
      .then(JSON.parse)
      .then(render)
      .catch(console.error);
  </script>
</body>
</html>
```
