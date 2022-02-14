const fs = require("fs");

let input = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split(" ")
  .map((x) => +x);

input;

console.log(typeof input[0]);

let n = input[0];
let m = input[1];

const nm = n - m;

function calc(v) {
  let cnt_two = 0,
    cnt_five = 0;
  for (let i = 2; i <= v; i *= 2) {
    cnt_two += parseInt(v / i);
  }
  for (let i = 5; i <= v; i *= 5) {
    cnt_five += parseInt(v / i);
  }
  return [cnt_two, cnt_five];
}

const two = calc(n)[0] - (calc(m)[0] + calc(nm)[0]);
const five = calc(n)[1] - (calc(m)[1] + calc(nm)[1]);

const answer = Math.min(two, five);

console.log(answer);
