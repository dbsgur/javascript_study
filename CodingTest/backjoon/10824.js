const fs = require("fs");

let input = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split(" ");

input;

let a = input[0] + input[1];
let b = input[2] + input[3];
a;
b;

console.log(+a + +b);
