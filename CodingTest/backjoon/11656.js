const fs = require("fs");

let input = fs.readFileSync(__dirname + "/input.txt").toString();

let len = input.length;

let arr = [];

for (let i = 0; i < len; i++) {
  arr.push(input.slice(i));
}

// arr.sort();

console.log(arr.sort());

console.log(arr.join(""));
