if (elem.addEventListener) {
  // IE 9 ~
  elem.addEventListener("click", func);
} else if (elem.attachEvent) {
  // ~ IE 8
  elem.attachEvent("onclick", func);
}

//

const handler = function (e) {
  const phases = ["capturing", "target", "bubbling"];
  const node = this.nodeName + (this.className ? "." + this.className : "");
  // eventPhase: 이벤트 흐름 상에서 어느 phase에 있는지를 반환한다.
  // 0 : 이벤트 없음 / 1 : 캡처링 단계 / 2 : 타깃 / 3 : 버블링 단계
  console.log(node, phases[e.eventPhase - 1]);
  alert(node + " : " + phases[e.eventPhase - 1]);
};

//

var pow = function (x) {
  return x * x;
};
console.log(pow(10)); // 100
//OR
const pow = (x) => x * x;
console.log(pow(10)); // 100

//

function showCoords(e) {
  // e: event object
  const msg = document.querySelector(".message");
  msg.innerHTML =
    "clientX value: " + e.clientX + "<br>" + "clientY value: " + e.clientY;
}

//

var arr = [1, 2, 3];
var pow = arr.map(function (x) {
  // x는 요소값
  return x * x;
});

console.log(pow); // [ 1, 4, 9 ]
//OR
const arr = [1, 2, 3];
const pow = arr.map((x) => x * x);

console.log(pow); // [ 1, 4, 9 ]

//

function Prefixer(prefix) {
  this.prefix = prefix;
}

Prefixer.prototype.prefixArray = function (arr) {
  // (A)
  return arr.map(function (x) {
    return this.prefix + " " + x; // (B)
  });
};

var pre = new Prefixer("Hi");
console.log(pre.prefixArray(["Lee", "Kim"]));

//

// Bad
const person = {
  name: "Lee",
  sayHi: () => console.log(`Hi ${this.name}`),
};

person.sayHi(); // Hi undefined

//

// Good
const person = {
  name: "Lee",
  sayHi() {
    // === sayHi: function() {
    console.log(`Hi ${this.name}`);
  },
};

person.sayHi(); // Hi Lee

//

// Good
const person = {
  name: "Lee",
};

Object.prototype.sayHi = function () {
  console.log(`Hi ${this.name}`);
};

person.sayHi(); // Hi Lee

//

// Bad
var button = document.getElementById("myButton");

button.addEventListener("click", () => {
  console.log(this === window); // => true
  this.innerHTML = "Clicked button";
});

// Good
var button = document.getElementById("myButton");

button.addEventListener("click", function () {
  console.log(this === button); // => true
  this.innerHTML = "Clicked button";
});

//
