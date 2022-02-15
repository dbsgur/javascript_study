const fs = require("fs");

let input = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("");

const alphabet = "abcdefghijklmnopqrstuvwxyz";

let answer = Array(26).fill(-1);

input.forEach((i) => (answer[alphabet.indexOf(i)] = input.indexOf(i)));

console.log(answer.join(" "));
