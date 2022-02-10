const fs = require("fs");

let input = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n");

let len = input[0];

let arr = [];
let answer = "";
for (let i = 1; i <= len; i++) {
  switch (input[i]) {
    case "pop":
      arr.length === 0 ? (answer += "-1\n") : (answer += `${arr.pop()}\n`);
      break;
    case "size":
      answer += `${arr.length}\n`;
      break;
    case "empty":
      arr.length === 0 ? (answer += "1\n") : (answer += "0\n");
      break;
    case "front":
      arr.length === 0
        ? (answer += "-1\n")
        : (answer += `${arr[arr.length - 1]}\n`);
      break;
    case "back":
      arr.length === 0 ? (answer += "-1\n") : (answer += `${arr[0]}\n`);
      break;
    default:
      arr = [input[i].split(" ")[1], ...arr];
      break;
  }
}

console.log(answer);
