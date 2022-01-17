//================================
//            01. 16
//================================

var name = "yun";
name = "hyeok";

//

var statement = "영원한건 없어."; // string은 immutable value

var otherStr = statement.slice(5, 8);

console.log(otherStr); // '없어.'
console.log(statement); // '영원한건 없어.'

//

var info = {
  name: "Yun",
  address: {
    city: "Busan",
  },
};

var myName = info.name; //변수 myName은 string 타입이다

info.name = "Hyeok";
console.log(myName); //Output : Yun

myName = info.name;
console.log(myName); // Output : Hyeok

//

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

//

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
console.log(o1); // { a: 1, b: 2, c: 3 }, 타겟 객체가 변경된다!
console.log(o1 === merge1); // false

// Merge
const o4 = { a: 1 };
const o5 = { b: 2 };
const o6 = { c: 3 };

const merge2 = Object.assign({}, o4, o5, o6);

console.log(merge2); // { a: 1, b: 2, c: 3 }
console.log(o4); // { a: 1 }

//

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

//

const user1 = {
  name: "Lee",
  address: {
    city: "Seoul",
  },
};

// 새로운 빈 객체에 user1을 copy한다.
const user2 = Object.assign({}, user1);
// user1과 user2는 참조값이 다르다.
console.log(user1 === user2); // false

user2.name = "Kim";
console.log(user1.name); // Lee
console.log(user2.name); // Kim

// 객체 내부의 객체(Nested Object)는 Shallow copy된다.
console.log(user1.address === user2.address); // true

user1.address.city = "Busan";
console.log(user1.address.city); // Busan
console.log(user2.address.city); // Busan

//

const user1 = {
  name: "Lee",
  address: {
    city: "Seoul",
  },
};

// Object.assign은 완전한 deep copy를 지원하지 않는다.
const user2 = Object.assign({}, user1, { name: "Kim" });

console.log(user1.name); // Lee
console.log(user2.name); // Kim

Object.freeze(user1);

user1.name = "Kim"; // 무시된다!

console.log(user1); // { name: 'Lee', address: { city: 'Seoul' } }

console.log(Object.isFrozen(user1)); // true

//

const user = {
  name: "Lee",
  address: {
    city: "Seoul",
  },
};

Object.freeze(user);

user.address.city = "Busan"; // 변경된다!
console.log(user); // { name: 'Lee', address: { city: 'Busan' } }

//

function deepFreeze(obj) {
  const props = Object.getOwnPropertyNames(obj);

  props.forEach((name) => {
    const prop = obj[name];
    if (typeof prop === "object" && prop !== null) {
      deepFreeze(prop);
    }
  });
  return Object.freeze(obj);
}

const user = {
  name: "Lee",
  address: {
    city: "Seoul",
  },
};

deepFreeze(user);

user.name = "Kim"; // 무시된다
user.address.city = "Busan"; // 무시된다

console.log(user); // { name: 'Lee', address: { city: 'Seoul' } }

//

function example(number) {
  return number * number;
}

//

var example = function (number) {
  return number * number;
};

//

// 기명 함수 표현식(named function expression)
var foo = function multiply(a, b) {
  return a * b;
};

// 익명 함수 표현식(anonymous function expression)
var bar = function (a, b) {
  return a * b;
};

console.log(foo(10, 5)); // 50
console.log(multiply(10, 5)); // Uncaught ReferenceError: multiply is not defined

//

var foo = function (a, b) {
  return a * b;
};

var bar = foo;

console.log(foo(10, 10)); // 100
console.log(bar(10, 10)); // 100

//

var example = new Function("number", "return number * number");
console.log(example(10)); // 100

//

var res = example(5);

function example(number) {
  return number * number;
}

//

var example = function (p1, p2) {
  console.log(p1, p2);
};

example(1); //Output : 1 undefined

//

function foo(primitive) {
  primitive += 1;
  return primitive;
}

var x = 0;

console.log(foo(x)); // 1
console.log(x); // 0

//

function changeVal(primitive, obj) {
  primitive += 100;
  obj.name = "Kim";
  obj.gender = "female";
}

var num = 100;
var obj = {
  name: "Lee",
  gender: "male",
};

console.log(num); // 100
console.log(obj); // Object {name: 'Lee', gender: 'male'}

changeVal(num, obj);

console.log(num); // 100
console.log(obj); // Object {name: 'Kim', gender: 'female'}

//

const test = function (num) {
  num *= num;
};

//

function square(number) {
  return number * number;
}

square.x = 10;
square.y = 20;

console.log(square.x, square.y);
