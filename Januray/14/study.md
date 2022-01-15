### 객체 (Object)

자바스크립트는 객체 기반의 스크립트 언어이며 자바스크립트를 이루고 있는 거의 **"모든 것"**이 객체이다.
원시타입을 제외한 나머지 값들은 모두 객체이다.

자바스크립트의 객체는 키와 값으로 구성된 프로퍼티들의 집합이다.

### 객체 생성 방법

#### 객체 리터럴

가장 일반적인 방법. 중괄호를 사용한다.

```
var hyeok = {
  age : 28,
  home : 'busan',
  sayHello : function (){
    console.log('Hi, My home in ' + this.home);
  }
};

console.log(hyeok);
// output :  { age: 28, home: 'busan', sayHello: [Function: sayHello] }

hyeok.sayHello();
// output : Hi, My home in busan
```

#### Object 생성자 함수

new 연산자와 Object 생성자 함수를 호출하여 빈 객체를 생성할 수 있다.
빈 객체 생성 이후 프로퍼티 또는 메소드를 추가하여 객체를 완성하는 방법이다.

생성자(constructor) 함수란 new 키워드와 함께 객체를 생성하고 초기화하는 함수다.
생성자 함수를 통해 생성된 객체를 인스턴스(instance)라 한다.

생성자 함수의 이름은 파스칼케이스를 사용하는 것이 일반적이다.

```
//빈객체의 생성
var hyeok = new Object();
// 프로퍼티 추가
hyeok.age = 28;
hyeok.home = 'busan';
hyeok.sayHello = function(){
  console.log('Hi, My home in '+ this.home);
}

console.log(hyeok);
// output : { age: 28, home: 'busan', sayHello: [Function (anonymous)] }

hyeok.sayHello();
// output : Hi, My home in busan
```

**객체 리터럴 방식으로 생성된 객체는 결국 빌트인 함수인 Object 생성자 함수로 객체를 생성하는 것을 단축화시킨 축약 표현이다.**

#### 생성자 함수

생성자 함수를 사용하면 마치 객체를 생성하기 위한 템플릿(클래스)처럼 사용하여 프로퍼티가 동일한 객체 여러개를 간편하게 생성할 수 있다.

```
function Person(name, gender) {
  this.name = name;
  this.gender = gender;
  this.sayHello = function () {
    console.log("Hi, My name is " + this.name);
  };
}

//인스턴스 생성
var yun = new Person('yun', 'male');
var hyeok = new Person('hyeok', 'male');

console.log('yun : ', yun);
//output
//yun :  Person {
//  name: 'yun',
//  gender: 'male',
//  sayHello: [Function (anonymous)]
//}
console.log('hyeok : ', hyeok);
//output
//hyeok :  Person {
//  name: 'hyeok',
//  gender: 'male',
//  sayHello: [Function (anonymous)]
//}

yun.sayHello();
//output : Hi, My name is yun
hyeok.sayHello();
//output : Hi, My name is hyeok
```

생성자 함수 이름은 일반적으로 대문자로 시작한다. 이것은 생성자 함수임을 인식하도록 도움을 준다.

프로퍼티 또는 메소드명 앞에 기술한 this는 생성자 함수가 생성할 인스턴스를 가르킨다.

this에 연결(바인딩)되어 있는 프로퍼티와 메소드는 외부에서 참조 가능(public)하다.

생성자 함수 내에서 선언된 일반 변수는 외부에서 참조 불가능(public)하다.
즉, 생성자 함수 내부에서는 자유롭게 접근이 가능하나 외부에서 접근할 수 없다.

### 객체 프로퍼티 접근

#### 프로퍼티 키

프로퍼티 키는 문자열이므로 따옴표(', ")를 사용한다. 하지만, 자바스크립트에서 사용 가능한 유효한 이름인 경우 따옴표를 생략 가능하다.

```

var hyeok = {
  "first-name" : 'yun',
}
//good

var hyeok = {
  first-name : yun
}
//SyntaxError: Unexpected token '-'

var hyeok = {
  [first-name] : yun,
}
//ReferenceError: first is not defined
```

#### 프로퍼티 값 읽기

프로퍼티에 접근하는 방법은 마침표(.)와 대괄호([])가 있다.

```
var hyeok = {
  first_name : "yun",
}

console.log(hyeok.first_name);
//output : yun
console.log(hyeok['first_name']);
//output : yun

var hyeok = {
  "first-name" : "yun",
}

console.log(hyeok['first-name']);
//output : yun

console.log(hyeok.age);
//output : undefined
```

프로퍼티 키가 유효한 자바스크립트 이름이고 예약어가 아닌 경우 프로퍼티 값은 마침표, 대괄호 모두 사용할 수 있다.

프로퍼티 이름이 유효한 자바스크립트 이름이 아니거나 예약어인 경우 프로퍼티 값은 대괄호 표기법으로만 읽어야한다.
대괄호 표기법을 사용하는 경우, 대괄호 내에 들어가는 프로퍼티 이름은 반드시 문자열이어야 한다.

객체에 존재하지 않는 프로퍼티를 참조하면 undefined를 반환한다.

#### 프로퍼티 값 갱신

```
var hyeok = {
  first_name : 'yun'
}

hyeok['first_name'] = 'kim';
console.log(hyeok['first_name']);
//output : kim
```

#### 프로퍼티 동적 생성

```
var hyeok = {
  first_name : 'yun'
}

hyeok['age'] = 28;
console.log(hyeok['age']);
//output : 28
```

#### 프로퍼티 삭제

delete 연산자

```
var hyeok = {
  age : 28,
  first_name : "yun",
  home : 'busan'
}

delete hyeok.age;
console.log(hyeok.age);
//output : undefined

delete hyeok['first_name'];
console.log(hyeok);
//output : { home: 'busan' }
```

#### for-in 문

for-in 문을 사용하면 객체(배열 포함)에 포함된 모든 프로퍼티에 대해 루프를 수행할 수 있다.

```
var person = {
  "first-name" : 'hyeok',
  'last-name' : 'yun',
  age : 28,
}

// prop에 객체의 프로퍼티 이름이 반환된다. 단, 순서는 보장하지 않는다.
for (var prop in person){
  console.log(prop + ' : ' + person[prop]);
}
// first-name : hyeok
// last-name : yun
// age : 28

var array = ['apple', 'banana'];

for (var index in array){
  console.log(index + ' : ', array[index]);
}
//0 :  apple
//1 :  banana
```

for-in문의 경우 배열에는 사용하지 않는 것이 좋다.
이유는 아래와 같다.

1. 객체의 경우, 프로퍼티의 순서가 보장되지 않는다. 그 이유는 원래 객체의 프로퍼티에는 순서가 없기 때문이다. 순서를 보장하는 데이터 구조이지만 객체와 마찬가지로 순서를 보장하지 않는다.
2. 배열 요소들만을 순회하지 않는다. (아래 코드)

```
var array = ['apple', 'banana'];

for (var index in array){
  console.log(index + ' : ', array[index]);
}
// 0 : apple
// 1 : banana
// fruit : straw
```

#### for-of 문

위와 같은 for-in의 단점을 극복하기 위해 ES6에 추가되었다.

```
var array = [1, 2, 3];
array.plus = 'test';

for (var value of array){
  console.log(value);
}
// 1 2 3
for (const [index, value] of array.entries())console.log(index, value);
// 0 1
// 1 2
// 2 3
```

위와 같은 특징 때문에 for-in문은 객체의 프로퍼티를 순회하기 위해 사용하고
for-of문은 배열의 요소를 순회하기 위해 사용한다.

? 살짝 map이랑 비슷한가 ?

var : 변수 재 선언, 재 할당 가능
let : 변수 재선언 불가능, 재 할당 가능
const : 변수 재 선언, 재 할당 불가능

### Pass-by-reference

객체 타입은 동적으로 변화할 수 있으므로 어느 정도의 메모리 공간을 확보해야 하는지 예측할 수 없기 때문에 런타임에 메모리 공간을 확보하고 메모리의 *힙 영역(Heap Segement)*에 저장 된다.

```
var foo = {
  val: 10
}

var bar = foo;
console.log(foo.val, bar.val); // 10 10
console.log(foo === bar);      // true

bar.val = 20;
console.log(foo.val, bar.val); // 20 20
console.log(foo === bar);      // true
```

But,

```
var foo = { val: 10 };
var bar = { val: 10 };

console.log(foo.val, bar.val); // 10 10
console.log(foo === bar);      // false

var baz = bar;

console.log(baz.val, bar.val); // 10 10
console.log(baz === bar);      // true
```

```
var a = {}, b = {}, c = {}; // a, b, c는 각각 다른 빈 객체를 참조
console.log(a === b, a === c, b === c); // false false false

a = b = c = {}; // a, b, c는 모두 같은 빈 객체를 참조
console.log(a === b, a === c, b === c); // true true true
```

### Pass-by-value

원시 타입은 값으로 전달된다. 즉, 값이 복사되어 전달된다. 이를 pass-by-value라 한다.

**원시타입은 값이 한번 정해지면 변경할 수 없다.(immutable)**

또한, 이 값은 런타임(변수 할당 시점)에 메모리 스택 영역(Stack Segment)에 고정된 메모리 영역을 점유하고 저장한다.

```
// Pass-by-value
var a = 1;
var b = a;

console.log(a, b);    // 1  1
console.log(a === b); // true

a = 10;
console.log(a, b);    // 1  10
console.log(a === b); // false
```

### 객체의 분류

> Object
>
> > Host Object
> > Built-in Object
> >
> > > Standard Built-in Object
> > > Native Object
> > >
> > > > BOM(Browser Object Model)
> > > > DOM(Document Object Model)

==============================================================================================================
