const fs = require("fs");

let input = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split(" ");

input;

// 첫째 줄에 (A+B)%C, 둘째 줄에 ((A%C) + (B%C))%C, 셋째 줄에 (A×B)%C, 넷째 줄에 ((A%C) × (B%C))%C를 출력한다.

const a = +input[0];
const b = +input[1];
const c = +input[2];
a;
b;
c;
console.log((a + b) % c);
console.log(((a % c) + (b % c)) % c);
console.log((a * b) % c);
console.log(((a % c) * (b % c)) % c);
