step1(function (value1) {
  step2(value1, function (value2) {
    step3(value2, function (value3) {
      step4(value3, function (value4) {
        step5(value4, function (value5) {
          // value5를 사용하는 처리
        });
      });
    });
  });
});

//

try {
  setTimeout(() => {
    throw new Error("Error!");
  }, 1000);
} catch (e) {
  console.log("에러를 캐치하지 못한다..");
  console.log(e);
}

//

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

//

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

//

const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';

// 부적절한 URL이 지정되었기 때문에 에러가 발생한다.
promiseAjax(wrongUrl)
  .then(res => console.log(res), err => console.error(err)); // Error: 404

//

const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';

// 부적절한 URL이 지정되었기 때문에 에러가 발생한다.
promiseAjax(wrongUrl)
  .then(res => console.log(res))
  .catch(err => console.error(err)); // Error: 404

//

promiseAjax('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => console.xxx(res), err => console.error(err));
  // 두 번째 콜백 함수는 첫 번째 콜백 함수에서 발생한 에러를 캐치하지 못한다.
//VS
promiseAjax('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => console.xxx(res))
  .catch(err => console.error(err)); // TypeError: console.xxx is not a function

//

// 이터레이션 프로토콜을 구현하여 무한 이터러블을 생성하는 함수
const createInfinityByIteration = function () {
  let i = 0; // 자유 변수
  return {
    [Symbol.iterator]() { return this; },
    next() {
      return { value: ++i };
    }
  };
};

for (const n of createInfinityByIteration()) {
  if (n > 5) break;
  console.log(n); // 1 2 3 4 5
}

// 무한 이터러블을 생성하는 제너레이터 함수
function* createInfinityByGenerator() {
  let i = 0;
  while (true) { yield ++i; }
}

for (const n of createInfinityByGenerator()) {
  if (n > 5) break;
  console.log(n); // 1 2 3 4 5
}

//

function* counter() {
  console.log('첫번째 호출');
  yield 1;                  // 첫번째 호출 시에 이 지점까지 실행된다.
  console.log('두번째 호출');
  yield 2;                  // 두번째 호출 시에 이 지점까지 실행된다.
  console.log('세번째 호출');  // 세번째 호출 시에 이 지점까지 실행된다.
}

const generatorObj = counter();

console.log(generatorObj.next()); // 첫번째 호출 {value: 1, done: false}
console.log(generatorObj.next()); // 두번째 호출 {value: 2, done: false}
console.log(generatorObj.next()); // 세번째 호출 {value: undefined, done: true}

//


// 제너레이터 함수 정의
function* counter() {
  for (const v of [1, 2, 3]) yield v;
  // => yield* [1, 2, 3];
}

// 제너레이터 함수를 호출하면 제너레이터를 반환한다.
let generatorObj = counter();

// 제너레이터는 이터러블이다.
console.log(Symbol.iterator in generatorObj); // true

for (const i of generatorObj) {
  console.log(i); // 1 2 3
}

generatorObj = counter();

// 제너레이터는 이터레이터이다.
console.log('next' in generatorObj); // true

console.log(generatorObj.next()); // {value: 1, done: false}
console.log(generatorObj.next()); // {value: 2, done: false}
console.log(generatorObj.next()); // {value: 3, done: false}
console.log(generatorObj.next()); // {value: undefined, done: true}

//

// 제너레이터 함수 선언문
function* genDecFunc() {
  yield 1;
}

let generatorObj = genDecFunc();

// 제너레이터 함수 표현식
const genExpFunc = function* () {
  yield 1;
};

generatorObj = genExpFunc();

// 제너레이터 메소드
const obj = {
  * generatorObjMethod() {
    yield 1;
  }
};

generatorObj = obj.generatorObjMethod();

// 제너레이터 클래스 메소드
class MyClass {
  * generatorClsMethod() {
    yield 1;
  }
}

const myClass = new MyClass();
generatorObj = myClass.generatorClsMethod();