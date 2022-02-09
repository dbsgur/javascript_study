let fs = require("fs");

let input = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n");

input;

let output = "";

for (let i = 1; i <= input[0]; i++) {
  // console.log(input[i]);
  let arr = input[i];
  arr;
  answer = 0;
  for (let j = 0; j < arr.length; j++) {
    if (arr[j] === "(") answer += 1;
    else if (arr[j] === ")") answer -= 1;
    if (answer < 0) {
      output += "NO\n";
      break;
    }
  }
  if (answer > 0) output += "NO\n";
  else if (answer === 0) output += "YES\n";
}

console.log(output);
// console.log(output.slice(3));
