### 자바스크립트 배열은 배열이 아니다.

일반적으로 배열이라는 자료 구조의 개념은 동일한 크기의 메모리 공간이 빈틈없이 연속적으로 나열된 자료 구조를 말한다.
즉, 배열의 요소는 하나의 타입으로 통일되어 있으며 서로 연속적으로 인접해 있다.
이러한 배열을 **밀집 배열(dense array)** 이라 한다.

배열은 인덱스를 통해 효율적으로 요소에 접근할 수 있다.
하지만, 정렬되지 않은 배열에서 특정한 값을 탐색하는 경우, 모든 배열 요소를 처음부터 값을 발견할 때까지 차례대로 탐색(선형 탐색)해야한다. 이 때, 시간 복잡도는 O(n)이다.

자바스크립트는 일반적인 배열과 다르다.
즉, 배열의 요소를 위한 각각의 메모리 공간은 동일한 크기를 갖지 않아도 되며 연속적으로 이어져 있지 않을 수도 있다.
배열의 요소가 연속적으로 이어져 있지 않는 배열을 **희소 배열(sparse array)** 이라 한다.

자바스크립트의 배열은 일반적인 배열의 동작을 흉내낸 특수한 객체이다.

```
console.log(Object.getOwnPropertyDescriptors([1, 2, 3]));
/*
{
  '0': { value: 1, writable: true, enumerable: true, configurable: true },
  '1': { value: 2, writable: true, enumerable: true, configurable: true },
  '2': { value: 3, writable: true, enumerable: true, configurable: true },
  length: { value: 3, writable: true, enumerable: false, configurable: false }
}
*/
```

위처럼 자바스크립트 배열은 인덱스를 프로퍼티 키로 가지며 length 프로퍼티를 갖는 특수한 객체이다.
자바스크립트 배열의 요소는 사실 프로퍼티 값이다.
자바스크립트에서 사용할 수 있는 모든 값은 객체의 프로퍼티 값이 될 수 있으므로 어떤 타입의 값이라도 배열의 요소가 될 수 있다.

#### 일반적인 배열과 자바스크립트의 장단점

- 일반적인 배열은 인덱스로 배열 요소에 빠르게 접근할 수 있다. 하지만 특정 요소를 탐색하거나 요소를 사입 또는 삭제하는 경우에는 비효율 적이다.
- 자바스크립트 배열은 해시 테이블로 구현된 객체이므로 인덱스로 배열 요소에 접근하는 경우, 일반적인 배열보다 성능적인 면에서 느릴 수 밖에 없는 구조적인 단점을 가진다. 하지만, 특정 요소를 탐색하거나 요소를 삽입 또는 삭제하는 경우에는 일반적인 배열보다 빠른 성능을 기대할 수 있다.

즉, 자바스크립트 배열은 인덱스로 배열 요소에 접근하는 경우에는 일반적인 배열보다 느리지만 특정 요소를 탐색하거나 요소를 삽입 또는 삭제하는 경우에는 일반적인 배열보다 빠르다.
자바스크립트 배열은 인덱스로 접근하는 경우의 성능 대신 특정 요소를 탐색하거나 배열 요소를 삽입 또는 삭제하는 경우의 성능을 선택한 것이다.

이처럼, 인덱스로 배열 요소에 접근할 때 일반적인 배열보다 느릴 수 밖에 없는 구조적인 단점을 보완하기 위해 대부분의 모던 자바스크립트 엔진은 배열을 일반 객체와 구별하여 보다 배열처럼 동작하도록 최적화하여 구현했다.

아래 코드와 같이 배열과 일반 객체의 성능을 테스트해보면 배열이 일반 객체보다 약 1.5배 빠른 것을 볼 수 있다.

```
const arr = [];

console.time('Array Performance Test');

for (let i = 0; i < 10000000; i++) {
  arr[i] = i;
}
console.timeEnd('Array Performance Test');
// 약 290ms

const obj = {};

console.time('Object Performance Test');

for (let i = 0; i < 10000000; i++) {
  obj[i] = i;
}

console.timeEnd('Object Performance Test');
// 약 380ms
```

### 배열 고차 함수 (Array Higher order Function)

고차 함수는 함수를 인자로 전달받거나 함수를 결과로 반환하는 함수를 말한다.
즉, 고차함수는 인자로 받은 함수를 필요한 시점에 호출하거나 클로저를 생성하여 반환한다.

자바스크립트의 함수는 일급 객체이므로 값처럼 인자로 전달할 수 있으며 반환할 수 있다.

```
// 함수를 인자로 전달받고 함수를 반환하는 고차 함수
function makeCounter(predicate) {
  // 자유 변수. num의 상태는 유지되어야 한다.
  let num = 0;
  // 클로저. num의 상태를 유지한다.
  return function () {
    // predicate는 자유 변수 num의 상태를 변화시킨다.
    num = predicate(num);
    return num;
  };
}

// 보조 함수
function increase(n) {
  return ++n;
}

// 보조 함수
function decrease(n) {
  return --n;
}

// makeCounter는 함수를 인수로 전달받는다. 그리고 클로저를 반환한다.
const increaser = makeCounter(increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

// makeCounter는 함수를 인수로 전달받는다. 그리고 클로저를 반환한다.
const decreaser = makeCounter(decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2
```

고차 함수는 외부 상태 변경이나 가변 데이터를 피하고 불변성(Immutability)을 지향하는 함수형 프로그래밍에 기반을 두고 있다.
함수형 프로그래밍은 순수 함수와 보조함수의 조합을 통해 로직 내에 존재하는 조건문과 반복문을 제거하여 복잡성을 해결하고 변수의 사용을 억제하여 상태 변경을 피하려는 프로그래밍 패러다임이다.
조건문이나 반복문은 로직의 흐름을 이해하기 어렵게 하여 가독성을 해치고, 변수의 값은 누군가에 의해 언제든지 변경될 수 있어 오류 발생의 근본적 원인이 될 수 있기 때문이다.

함수형 프로그래밍은 결국 순수 함수를 통해 부수효과를 최대한 억제하여 오류를 피하고 프로그램의 안정성을 높이려는 노력의 한방법이라고 할 수 있다.

자바스크립트는 고차함수를 다수 지원하고 있다.
특히, Array 객체는 매우 유용한 고차함수를 제공한다.

#### Array.prototype.sort()

**원본 배열을 변경한다.**
배열의 요소를 적절하게 정렬한다.

```
const fruits = ['Banana', 'Orange', 'Apple'];

// ascending(오름차순)
fruits.sort();
console.log(fruits); // [ 'Apple', 'Banana', 'Orange' ]

// descending(내림차순)
fruits.reverse();
console.log(fruits); // [ 'Orange', 'Banana', 'Apple' ]

const points = [40, 100, 1, 5, 2, 25, 10];

points.sort();
console.log(points); // [ 1, 10, 100, 2, 25, 40, 5 ]
```

숫자는 유니코드 순으로 정렬을 한다 그러니, 숫자 정렬은 주의하자 !

오름 차순 정렬을 제대로 하려면 아래와 같이 쓰자!

```
const points = [40, 100, 1, 5, 2, 25, 10];

// 숫자 배열 오름차순 정렬
// 비교 함수의 반환값이 0보다 작은 경우, a를 우선하여 정렬한다.
points.sort(function (a, b) { return a - b; });
// ES6 화살표 함수
// points.sort((a, b) => a - b);
console.log(points); // [ 1, 2, 5, 10, 25, 40, 100 ]

// 숫자 배열에서 최소값 취득
console.log(points[0]); // 1

// 숫자 배열 내림차순 정렬
// 비교 함수의 반환값이 0보다 큰 경우, b를 우선하여 정렬한다.
points.sort(function (a, b) { return b - a; });
// ES6 화살표 함수
// points.sort((a, b) => b - a);
console.log(points); // [ 100, 40, 25, 10, 5, 2, 1 ]

// 숫자 배열에서 최대값 취득
console.log(points[0]); // 100
```

#### Array.prototype.forEach()

**원본 배열을 변경하지 않는다.**
forEach 메소드는 for 문 대신 사용할 수 있다.
forEach 메소드는 break문을 사용할 수 없다. + for문에 비해 성능이 좋지 않다. 하지만 for문보다 가독성이 좋아서 적극 사용을 권장한다.

```
const numbers = [1, 2, 3];
let pows = [];

// for 문으로 순회
for (let i = 0; i < numbers.length; i++) {
  pows.push(numbers[i] ** 2);
}

console.log(pows); // [ 1, 4, 9 ]

pows = [];

// forEach 메소드로 순회
numbers.forEach(function (item) {
  pows.push(item ** 2);
});

// ES6 화살표 함수
// numbers.forEach(item => pows.push(item ** 2));

console.log(pows); // [ 1, 4, 9 ]
```

```
const numbers = [1, 3, 5, 7, 9];
let total = 0;

// forEach 메소드는 인수로 전달한 보조 함수를 호출하면서
// 3개(배열 요소의 값, 요소 인덱스, this)의 인수를 전달한다.
// 배열의 모든 요소를 순회하며 합산한다.
numbers.forEach(function (item, index, self) {
  console.log(`numbers[${index}] = ${item}`);
  total += item;
});

// Array#reduce를 사용해도 위와 동일한 결과를 얻을 수 있다
// total = numbers.reduce(function (pre, cur) {
//   return pre + cur;
// });

console.log(total); // 25
console.log(numbers); // [ 1, 3, 5, 7, 9 ]
```

forEach 메소드에 두번째 인자로 this를 전달할 수 있다.

```
function Square() {
  this.array = [];
}

Square.prototype.multiply = function (arr) {
  arr.forEach(function (item) {
    // this를 인수로 전달하지 않으면 this === window
    this.array.push(item * item);
  }, this);
};

const square = new Square();
square.multiply([1, 2, 3]);
console.log(square.array); // [ 1, 4, 9 ]
```

ES6의 화살표 함수를 사용하면 this를 생략할 수 있다.

```
Square.prototype.multiply = function (arr) {
  arr.forEach(item => this.array.push(item * item));
};
```

forEach의 동작을 흉내낸 myForEach 메소드를 작성해보자

```
Array.prototype.myForEach = function (f) {
  // 첫번재 매개변수에 함수가 전달되었는지 확인
  // console.log((function(){}).toString()); // function(){}
  // console.log(Object.prototype.toString.call(function(){})); // [object Function]
  // poiemaweb.com/js-type-check 참고
  if (!f || {}.toString.call(f) !== '[object Function]') {
    throw new TypeError(f + ' is not a function.');
  }

  for (let i = 0; i < this.length; i++) {
    // 배열 요소의 값, 요소 인덱스, forEach 메소드를 호출한 배열, 즉 this를 매개변수에 전달하고 콜백 함수 호출
    f(this[i], i, this);
  }
};

let total = 0;

[0, 1, 2, 3].myForEach(function (item, index, array) {
  console.log(`[${index}]: ${item} of [${array}]`);
  total += item;
});

console.log('Total: ', total);
```

#### Array.prototype.map()

**원본 배열을 변경하지 않는다.**
배열을 순회하며 각 요소에 대해 인자로 주어진 _콜백 함수의 반환값으로 새로운 배열을 생성하여 반환한다._

forEach 메소드는 배열을 순회하며 요소 값을 참조하여 무언가를 하기 위한 함수이고,
map 메소드는 배열을 순회하며 요소 값을 다른 값으로 매핑하기 위한 함수이다.

콜백함수의 매개변수를 통해 배열 요소의 값, 요소 인덱스, map 메소드를 호출한 배열. 즉 this를 전달 받을 수 있다.

```
const numbers = [1, 4, 9];

// 배열을 순회하며 각 요소에 대하여 인자로 주어진 콜백함수를 실행
const roots = numbers.map(function (item) {
  // 반환값이 새로운 배열의 요소가 된다. 반환값이 없으면 새로운 배열은 비어 있다.
  return Math.sqrt(item);
});

// 위 코드의 축약표현은 아래와 같다.
// const roots = numbers.map(Math.sqrt);

// map 메소드는 새로운 배열을 반환한다
console.log(roots);   // [ 1, 2, 3 ]
// map 메소드는 원본 배열은 변경하지 않는다
console.log(numbers); // [ 1, 4, 9 ]
```

map 메소드에 두번째 인자로 this를 전달할 수 있따.

map 메소드의 이해를 돕기 위해 map의 동작을 흉내낸 myMap 메소드를 작성해보자

```
Array.prototype.myMap = function (iteratee) {
  // 첫번재 매개변수에 함수가 전달되었는지 확인
  if (!iteratee || {}.toString.call(iteratee) !== '[object Function]') {
    throw new TypeError(iteratee + ' is not a function.');
  }

  const result = [];
  for (let i = 0, len = this.length; i < len; i++) {
    /**
     * 배열 요소의 값, 요소 인덱스, 메소드를 호출한 배열, 즉 this를 매개변수를 통해 iteratee에 전달하고
     * iteratee를 호출하여 그 결과를 반환용 배열에 푸시하여 반환한다.
     */
    result.push(iteratee(this[i], i, this));
  }
  return result;
};

const result = [1, 4, 9].myMap(function (item, index, self) {
  console.log(`[${index}]: ${item} of [${self}]`);
  return Math.sqrt(item);
});

console.log(result); // [ 1, 2, 3 ]
```

#### Array.prototype.filter

**원본 배열을 변경하지 않는다.**
filter메소드를 사용하면 if문을 대체할 수 있다.
배열을 순회하며 각 요소에 대하여 인자로 주어진 **콜백함수의 실행결과가 ture인 배열 요소의 값만을 추출한 새로운 배열을 반환한다.**
배열에서 특정 케이스만 필터링 조건으로 추출하여 새로운 배열을 만들고 싶을 때 사용한다.
콜백 함수의 매개변수를 통해 배열 요소의 값, 요소 인덱스, filter 메소드를 호출한 배열. 즉 this를 전달 받을 수 있다.

```
const result = [1, 2, 3, 4, 5].filter(function (item, index, self) {
  console.log(`[${index}] = ${item}`);
  return item % 2; // 홀수만을 필터링한다 (1은 true로 평가된다)
});

console.log(result); // [ 1, 3, 5 ]
```

filter도 map, forEach와 같이 두번째 인자로 this를 전달할 수 있다.

filter 메소드의 이해를 돕기 위해 filter의 동작을 흉내낸 myFilter 메소드를 작성해보자

```
Array.prototype.myFilter = function (predicate) {
  // 첫번재 매개변수에 함수가 전달되었는지 확인
  if (!predicate || {}.toString.call(predicate) !== '[object Function]') {
    throw new TypeError(predicate + ' is not a function.');
  }

  const result = [];
  for (let i = 0, len = this.length; i < len; i++) {
    /**
     * 배열 요소의 값, 요소 인덱스, 메소드를 호출한 배열, 즉 this를 매개변수를 통해 predicate에 전달하고
     * predicate를 호출하여 그 결과가 참인 요소만을 반환용 배열에 푸시하여 반환한다.
     */
    if (predicate(this[i], i, this)) result.push(this[i]);
  }
  return result;
};

const result = [1, 2, 3, 4, 5].myFilter(function (item, index, self) {
  console.log(`[${index}]: ${item} of [${self}]`);
  return item % 2; // 홀수만을 필터링한다 (1은 true로 평가된다)
});

console.log(result); // [ 1, 3, 5 ]
```

#### Array.prototype.reduce()

**원본 배열을 변경하지 않는다.**
배열을 순회하며 각 요소에 대하여 이전의 콜백함수 실행 반환값을 전달하여 콜백함수를 실행하고 그 결과를 반환한다.

```
const arr = [1, 2, 3, 4, 5];

/*
previousValue: 이전 콜백의 반환값
currentValue : 배열 요소의 값
currentIndex : 인덱스
array        : 메소드를 호출한 배열, 즉 this
*/
// 합산
const sum = arr.reduce(function (previousValue, currentValue, currentIndex, self) {
  console.log(previousValue + '+' + currentValue + '=' + (previousValue + currentValue));
  return previousValue + currentValue; // 결과는 다음 콜백의 첫번째 인자로 전달된다
});

console.log(sum); // 15: 1~5까지의 합
/*
1: 1+2=3
2: 3+3=6
3: 6+4=10
4: 10+5=15
15
*/

// 최대값 취득
const max = arr.reduce(function (pre, cur) {
  return pre > cur ? pre : cur;
});

console.log(max); // 5: 최대값
```

Array.prototype.reduce의 두번째 인수로 초기값을 전달할 수 있다. 이 값은 함수에 최초로 전달된다.

```
const sum = [1, 2, 3, 4, 5].reduce(function (pre, cur) {
  return pre + cur;
}, 5);

console.log(sum); // 20
// 5 + 1 => 6 + 2 => 8 + 3 => 11 + 4 => 15 + 5
```

#### Array.prototype.some()

**원본 배열을 변경하지 않는다.**
배열 내 일부 요소가 콜백 함수의 테스트를 통과하는지 확인하여 그 결과를 boolean으로 반환한다.
콜백함수의 매개변수를 통해 배열 요소의 값, 요소 인덱스, 메소드를 호출한 배열. 즉, this를 전달 받을 수 있다.

```
// 배열 내 요소 중 10보다 큰 값이 1개 이상 존재하는지 확인
let res = [2, 5, 8, 1, 4].some(function (item) {
  return item > 10;
});
console.log(res); // false

res = [12, 5, 8, 1, 4].some(function (item) {
  return item > 10;
});
console.log(res); // true

// 배열 내 요소 중 특정 값이 1개 이상 존재하는지 확인
res = ['apple', 'banana', 'mango'].some(function (item) {
  return item === 'banana';
});
console.log(res); // true
```

#### Array.prototype.every()

**원본 배열을 변경하지 않는다.**
배열 내 모든 요소가 콜백함수의 테스트를 통과하는지 확인하고 그 결과를 boolean으로 반환한다.

콜백함수의 매개변수를 통해 배열 요소의 값, 요소 인덱스, 메소드를 호출한 배열. 즉, this를 전달받을 수 있다.

```
// 배열 내 모든 요소가 10보다 큰 값인지 확인
let res = [21, 15, 89, 1, 44].every(function (item) {
  return item > 10;
});
console.log(res); // false

res = [21, 15, 89, 100, 44].every(function (item) {
  return item > 10;
});
console.log(res); // true
```

#### Array.prototpye.find()

**원본 배열을 변경하지 않는다.**

배열을 순회하며 각 요소에 대해 인자로 주어진 _콜백함수를 실행하여 그 결과가 참인 첫번째 요소를 반환한다._ 참인 요소가 존재하지 않으면 _undefined_ 를 반환한다.

콜백함수의 매개변수를 통해 배열 요소의 값, 요소 인덱스, 메소드를 호출한 배열. 즉, this를 전달받을 수 있다.

```
const users = [
  { id: 1, name: 'Lee' },
  { id: 2, name: 'Kim' },
  { id: 2, name: 'Choi' },
  { id: 3, name: 'Park' }
];

// 콜백함수를 실행하여 그 결과가 참인 첫번째 요소를 반환한다.
let result = users.find(function (item) {
  return item.id === 2;
});

// ES6
// const result = users.find(item => item.id === 2;);
```

#### Array.prototype.findIndex()

**원본 배열을 변경하지 않는다.**

배열을 순회하며 각 요소에 대하여 인자로 주어진 _콜백함수를 실행하여 그 결과가 참인 첫번째 요소의 인덱스를 반환한다._ 참인 요소가 존재하지 않으면 -1을 반환한다.

콜백함수의 매개변수를 통해 배열 요소의 값, 요소 인덱스, 메소드를 호출한 배열. 즉, this를 전달받을 수 있다.

```
const users = [
  { id: 1, name: 'Lee' },
  { id: 2, name: 'Kim' },
  { id: 2, name: 'Choi' },
  { id: 3, name: 'Park' }
];

// 콜백함수를 실행하여 그 결과가 참인 첫번째 요소의 인덱스를 반환한다.
function predicate(key, value) {
  return function (item) {
    return item[key] === value;
  };
}

// id가 2인 요소의 인덱스
let index = users.findIndex(predicate('id', 2));
console.log(index); // 1

// name이 'Park'인 요소의 인덱스
index = users.findIndex(predicate('name', 'Park'));
console.log(index); // 3
```
