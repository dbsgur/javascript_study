let fs = require("fs");

let input = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split(" ");

input;

// for (let i = 0; i < input.length; i++) {
//   input[i] = Number(input[i]);
// }

let a = input[0];
let b = input[1];
let v = input[2];

let x = (v - a) / (a - b);
x = x < 1 ? 1 : x;

console.log(x + 1);

// let toHeight = input[2];
// // let height = 0;
// let days = 1;
// // let h = 0;

// for (let h=0; h < toHeight; days++) {
//   days;
//   h += input[0];
//   if (h >= toHeight) break;
//   h -= input[1];
// }
// console.log(days);

// 시간초과
// do {
//   days += 1;
//   height += input[0];
//   if (height >= toHeight) {
//     break;
//   }
//   height -= input[1];
// } while (height < toHeight);

console.log(days);
