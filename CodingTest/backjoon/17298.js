// 다시 풀어보기

const fs = require("fs");
let input = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n");
var cases = input[0];
var splited = input[1].split(" ");
var stack = [];
for (var i = 0; i < Number(cases); i++) {
  while (
    stack.length !== 0 &&
    Number(splited[i]) > Number(splited[stack[stack.length - 1]])
  ) {
    splited[stack.pop()] = splited[i];
  }
  stack.push(i);
}

while (stack.length !== 0) {
  splited[stack.pop()] = -1;
}
console.log(splited.join(" ").trim());
