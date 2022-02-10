const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n");

let lStack = input[0].split("");
let rStack = [];
let len = parseInt(input[1]);

for (let i = 2; i < 2 + len; i++) {
  let [cmd, value] = input[i].split(" ");
  if (cmd === "L" && lStack.length) rStack.push(lStack.pop());
  else if (cmd === "D" && rStack.length) lStack.push(rStack.pop());
  else if (cmd === "B") lStack.pop();
  else if (cmd === "P") lStack.push(value);
}

let answer = lStack.join("");
answer += rStack.reverse().join("");
console.log(answer);
