const fs = require("fs");

let input = fs.readFileSync(__dirname + "/input.txt").toString();

console.log(input);
// VER 2
let x = +input;
x;
let result = 0;
for (let i = 5; i <= x; i *= 5) {
  i;
  result += parseInt(x / i);
}
console.log(result);

let five =
  "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";

let arr = [...five];

console.log(arr.length);
// 왜 틀린거지 ????
// let answer = 1;
// for (let i = 2; i <= +input; i++) {
//   answer *= i;
// }
// console.log(answer);

// answer = answer.toString();

// let arr = [...answer];

// arr = arr.map((x) => +x).reverse();

// arr;
// let idx = arr.indexOf(arr.find((x) => x !== 0));
// idx;

// idx;
