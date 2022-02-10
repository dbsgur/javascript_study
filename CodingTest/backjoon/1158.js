const fs = require("fs");

let input = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split(" ");

input;
let len = input[0];
let k = input[1];
let arr = [];
for (let i = 0; i < len; i++) {
  // i;
  arr[i] = i + 1;
}
arr;

let answer = "<";

console.log(arr.length);

while (arr.length > 0) {
  console.log("while");
  // console.log(answer);
  for (let i = 0; i < k; i++) {
    console.log(i);
    arr.push(arr.shift());
  }

  if (arr.length === 1) {
    answer += `${arr.pop()}>`;
  } else {
    answer += `${arr.pop()}, `;
  }
}

console.log(answer);
