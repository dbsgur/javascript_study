let fs = require("fs");

let input = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n");

input;

for (let i = 1; i < input.length; i++) {
  console.log(input[i]);
  let words = input[i].split(" ");
  let answer = words.map((word) => word.split("").reverse().join("")).join(" ");
  answer;
}

//

let fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().split("\n");

for (let i = 1; i < input.length; i++) {
  let words = input[i].split(" ");
  let answer = words.map((word) => word.split("").reverse().join("")).join(" ");
  console.log(answer);
}
