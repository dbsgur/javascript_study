const fs = require("fs");

let input = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n")[0];

input;

let len = input.length;
answer = "";
console.log(len);
let stack = [];
for (let i = 0; i < len; i++) {
  console.log(input[i]);
  let word = input[i];
  if (word >= "A" && word <= "Z") answer += word;
  else if (word === "(") {
    stack.push(word);
  } else if (word === ")") {
    while (stack.length && stack[stack.length - 1] !== "(") {
      answer += stack.pop();
    }
    stack.pop();
  } else if (word === "+" || word === "-") {
    while (stack.length && stack[stack.length - 1] !== "(") {
      answer += stack.pop();
    }
    stack.push(word);
  } else if (word === "*" || word === "/") {
    while (
      (stack.length && stack[stack.length - 1] === "*") ||
      stack[stack.length - 1] === "/"
    ) {
      answer += stack.pop();
    }
    stack.push(word);
  }
}

while (stack.length) {
  answer += stack.pop();
}

console.log(answer);
