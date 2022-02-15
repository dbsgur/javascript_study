const fs = require("fs");

let input = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("");

const alphabet = "abcdefghijklmnopqrstuvwxyz";

let counts = Array(26).fill(0);

input.forEach((i) => counts[alphabet.indexOf(i)]++);

console.log(counts.join(" "));
