const fs = require("fs");

let input = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n")[1]
  .split(" ")
  .map((x) => +x);
input;
let result = new Array(input.length).fill(-1);
result;
let count = {};
input.forEach((x) => {
  count[x] = (count[x] || 0) + 1;
});
count;
let stack = [];
for (let i = 0; i < input.length; i++) {
  while (
    stack.length &&
    count[input[stack[stack.length - 1]]] < count[input[i]]
  ) {
    result[stack.pop()] = input[i];
  }
  stack.push(i);
}

console.log(result.join(" "));
