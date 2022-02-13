// 내일 다시 풀기

const fs = require("fs");
let stdin = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n");

stdin;

console.log(stdin[6]);

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(input().split);

let N = +input();
N;
let postfix = input().split("");
postfix;
let values = [];
let stack = [];

for (let i = 0; i < N; i++) values.push(+input());
for (let i = 0; i < postfix.length; i++) {
  let ch = postfix[i];

  if (ch >= "A" && ch <= "Z") {
    stack.push(values[ch.charCodeAt(0) - "A".charCodeAt(0)]);
  } else {
    let b = parseFloat(stack.pop());
    let a = parseFloat(stack.pop());

    stack.push(getResult(a, b, ch));
  }
}

console.log(stack.pop());

function getResult(a, b, ch) {
  let res;

  switch (ch) {
    case "+":
      res = (a + b).toFixed(2);
      break;
    case "-":
      res = (a - b).toFixed(2);
      break;
    case "*":
      res = (a * b).toFixed(2);
      break;
    case "/":
      res = (a / b).toFixed(2);
      break;
  }

  return res;
}
