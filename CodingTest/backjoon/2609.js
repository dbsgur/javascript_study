const fs = require("fs");
const { connected } = require("process");
let input = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split(" ")
  .map((x) => +x);

input;

console.log(typeof input[1]);

console.log(Math.max(...input));
console.log(Math.min(...input));

let a = Math.max(...input);
let b = Math.min(...input);

function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}
const answer = gcd(a, b);
console.log(answer);
console.log((a * b) / answer);
