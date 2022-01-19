var x = "xxx";

function foo() {
  var y = "yyy";

  function bar() {
    var z = "zzz";
    console.log(x + y + z);
  }
  bar();
}
foo();

//

function outerFunc() {
  var x = 10;
  var innerFunc = function () {
    console.log(x);
  };
  innerFunc();
}

outerFunc(); // 10

//

function outerFunc() {
  var x = 10;
  var innerFunc = function () {
    console.log(x);
  };
  return innerFunc;
}

/**
 *  함수 outerFunc를 호출하면 내부 함수 innerFunc가 반환된다.
 *  그리고 함수 outerFunc의 실행 컨텍스트는 소멸한다.
 */
var inner = outerFunc();
inner(); // 10

//

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

//

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

//

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

//

const arr = [];

for (let i = 0; i < 5; i++) {
  arr[i] = function () {
    return i;
  };
}

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]()); // 0 1 2 3 4 5
}

//

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
var me = new Person("Lee");
console.log(me.getName()); // Lee

// 메소드 호출
me.setName("Kim");
console.log(me.getName()); // Kim

var me = new Person("Lee");
var you = new Person("Kim");
var him = new Person("Choi");

console.log(me); // Person { name: 'Lee', setName: [Function], getName: [Function] }
console.log(you); // Person { name: 'Kim', setName: [Function], getName: [Function] }
console.log(him); // Person { name: 'Choi', setName: [Function], getName: [Function] }

//

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

var me = new Person("Lee");
var you = new Person("Kim");
var him = new Person("choi");

console.log(Person.prototype);
// Person { setName: [Function], getName: [Function] }

console.log(me); // Person { name: 'Lee' }
console.log(you); // Person { name: 'Kim' }
console.log(him); // Person { name: 'choi' }

//

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
Person.method("setName", function (name) {
  this.name = name;
});

/**
 * 생성자함수 Person의 프로토타입에 메소드 getName을 추가
 */
Person.method("getName", function () {
  return this.name;
});

var me = new Person("Lee");
var you = new Person("Kim");
var him = new Person("choi");

console.log(Person.prototype);
// Person { setName: [Function], getName: [Function] }

console.log(me); // Person { name: 'Lee' }
console.log(you); // Person { name: 'Kim' }
console.log(him); // Person { name: 'choi' }

//

// 부모 생성자 함수
var Parent = (function () {
  // Constructor
  function Parent(name) {
    this.name = name;
  }

  // method
  Parent.prototype.sayHi = function () {
    console.log("Hi! " + this.name);
  };

  // return constructor
  return Parent;
})();

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
    console.log("안녕하세요! " + this.name);
  };

  // sayBye 메소드는 Parent 생성자함수의 인스턴스에 위치된다
  Child.prototype.sayBye = function () {
    console.log("안녕히가세요! " + this.name);
  };

  // return constructor
  return Child;
})();

var child = new Child("child"); // ①
console.log(child); // Parent { name: 'child' }

console.log(Child.prototype); // Parent { name: undefined, sayHi: [Function], sayBye: [Function] }

child.sayHi(); // 안녕하세요! child
child.sayBye(); // 안녕히가세요! child

console.log(child instanceof Parent); // true
console.log(child instanceof Child); // true

//

var Person = function (arg) {
  var name = arg ? arg : ""; // ①

  this.getName = function () {
    return name;
  };

  this.setName = function (arg) {
    name = arg;
  };
};

var me = new Person("Lee");

var name = me.getName();

console.log(name); // ㅣLee

me.setName("Kim");
name = me.getName();

console.log(name); // Kim

//

var person = function (arg) {
  var name = arg ? arg : "";

  return {
    getName: function () {
      return name;
    },
    setName: function (arg) {
      name = arg;
    },
  };
};

var me = person("Lee"); /* or var me = new person('Lee'); */

var name = me.getName();

console.log(name); // Lee

me.setName("Kim");
name = me.getName();

console.log(name); // Kim

//==============================================
//             CODING_TEST
//==============================================

//별찍기
process.stdin.setEncoding("utf8");
process.stdin.on("data", (data) => {
  const n = data.split(" ");
  const a = Number(n[0]),
    b = Number(n[1]);
  for (let i = 0; i < b; i++) {
    //i을 선언해주고 몇줄(b)만큼 반복
    let str = ""; //출력할 변수 선언
    for (let j = 0; j < a; j++) {
      // j선언후 별을 한줄에 몇개 찍을지 반복
      str = str + "*"; //출력할 변수에 별을 담는다
    }
    console.log(str); // 출력
  }
});

//

//x만큼 간격이 있는 n개의 숫자
function solution(x, n) {
  var answer = [];
  for (let i = 1; i <= n; i++) {
    answer.push(x * i);
  }
  return answer;
}

//

//행렬의 덧셈
function solution2(arr1, arr2) {
  return arr1.map((e, i) => arr2[i].map((v, j) => arr1[i][j] + arr2[i][j]));
}

//

//핸드폰 번호가리기
function solution(phone_number) {
  var answer = "";
  for (let i = 0; i < phone_number.length - 4; i++) {
    answer += "*";
  }
  //생략이 가능하다!
  answer += phone_number.slice(-4, phone_number.length);
  return answer;
}

function hide_numbers(s) {
  var result = "*".repeat(s.length - 4) + s.slice(-4);
  //함수를 완성해주세요

  return result;
}

function hide_numbers(s) {
  return s.replace(/\d(?=\d{4})/g, "*");
}

//

//하샤드 수
function solution(x) {
  let sum = 0;
  for (let i = 0; i < String(x).length; i++) {
    sum += Number(String(x)[i]);
  }
  return x % sum === 0;
}
// 자주쓰는 것 변수 할당하는 습관 > 가독성 상승
function Harshad(n) {
  var sum = 0;
  var arr = String(n).split("");
  for (var i = 0; i < arr.length; i++) {
    sum += Number(arr[i]);
  }
  return n % sum == 0 ? true : false;
}
//Speed
function solution(x) {
  let num = x;
  let sum = 0;
  do {
    sum += x % 10;
    x = Math.floor(x / 10);
  } while (x > 0);

  return !(num % sum);
}

//

//평균 구하기
function solution(arr) {
  var answer = 0;
  arr.forEach(function (v) {
    answer += v;
  });
  return answer / arr.length;
}

function average(array) {
  return array.reduce((a, b) => a + b) / array.length;
}

//

//콜라츠 추측
function solution(num) {
  var answer = 0;
  while (num !== 1) {
    num % 2 === 0 ? (num /= 2) : (num = 3 * num + 1);
    answer += 1;
    if (answer === 500) {
      return -1;
    }
  }
  return answer;
}
function collatz(num) {
  var answer = 0;
  while (num != 1 && answer != 500) {
    num % 2 == 0 ? (num = num / 2) : (num = num * 3 + 1);
    answer++;
  }
  return num == 1 ? answer : -1;
}

//

//최대공약수, 최소공배수
const calcGcd = (a, b) => {
  if (b === 0) return a;
  return a > b ? calcGcd(b, a % b) : calcGcd(a, b % a);
};

const solution = (n, m) => {
  var answer = [];
  var gcd = calcGcd(n, m);
  var lcm = (n * m) / gcd;
  return [gcd, lcm];
};

//

//짝수와 홀수
function solution(num) {
  return num % 2 ? "Odd" : "Even";
}

//

//작은 수 제거하기
function solution(arr) {
  if (arr.length <= 1) return [-1];
  arr.sort();
  arr.splice(0, 1);
  return arr.reverse();
}
function solution(arr) {
  if (arr.length === 1) {
    return [-1];
  }
  const minValue = Math.min.apply(null, arr);
  const index = arr.findIndex((value) => value === minValue);
  arr.splice(index, 1);
  return arr;
}

//
//제곱근
function solution(n) {
  const num = Math.sqrt(n);
  return Number.isInteger(num) ? Math.pow(num + 1, 2) : -1;
}

//
//숫자 뒤집기
function solution(n) {
  return Number(String(n).split("").sort().reverse().join(""));
}

function solution(n) {
  //숫자가 분명히 더 빠름
  var nums = [];
  do {
    nums.push(n % 10);
    n = Math.floor(n / 10);
  } while (n > 0);

  return nums.sort((a, b) => b - a).join("") * 1;
  //문자는 느림
  return (
    (n + "")
      .split("")
      .sort((a, b) => b - a)
      .join("") * 1
  );
}

//

//
function solution(n) {
  var nums = [];
  do {
    nums.push(n % 10);
    n = Math.floor(n / 10);
  } while (n > 0);

  return nums;
}

//
//자릿수 더하기
function solution(n) {
  let arr = [];
  do {
    arr.push(n % 10);
    n = Math.floor(n / 10);
  } while (n > 0);
  return arr.reduce((a, b) => a + b);
}
function solution(n) {
  // 문자 풀이
  // return (n+"").split("").reduce((acc, curr) => acc + parseInt(curr), 0)

  // 숫자풀이
  var sum = 0;

  do {
    sum += n % 10;
    n = Math.floor(n / 10);
  } while (n > 0);

  return sum;
}

//
//이상한문자열
function solution(s) {
  let arr = [];
  arr = s.split(" ");
  let answer = "";
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (j % 2) {
        answer += arr[i][j].toLowerCase();
      } else {
        answer += arr[i][j].toUpperCase();
      }
    }
    if (i === arr.length - 1) {
      break;
    }
    answer += " ";
  }
  return answer;
}
function toWeirdCase(s) {
  //함수를 완성해주세요
  return s.toUpperCase().replace(/(\w)(\w)/g, function (a) {
    return a[0].toUpperCase() + a[1].toLowerCase();
  });
}
function toWeirdCase(s) {
  return s
    .split(" ")
    .map((i) =>
      i
        .split("")
        .map((j, key) => (key % 2 === 0 ? j.toUpperCase() : j))
        .join("")
    )
    .join(" ");
}
