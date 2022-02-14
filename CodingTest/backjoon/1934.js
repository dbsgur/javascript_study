const fs = require("fs");

let input = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n");

input;

const gcd = function (a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
};

console.log(gcd(1, 45000));
console.log(input.length);
for (i = 1; i < input.length; i++) {
  console.log(input[i]);
  let arr = input[i].split(" ");
  arr;
  let a = Math.max(...arr);
  let b = Math.min(...arr);
  console.log((a * b) / gcd(a, b));
}
