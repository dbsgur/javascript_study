let fs = require("fs");

let input = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n");

let a = +input[0];
let b = +input[1];

console.log(a + b);

console.log(a - b);

console.log(a * b);

//

let fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let a = BigInt(input[0]);
let b = BigInt(input[1]);

console.log(a + b + "");

console.log(a - b + "");

console.log(a * b + "");
