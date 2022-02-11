var fs = require("fs");
// var input = fs.readFileSync('/dev/stdin').toString().trim().split('');
let input = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .trim()
  .split("");
var stack = [];
var answer = 0;
for (var i in input) {
  if (input[i] === "(") {
    stack.push(input[i]);
  } else {
    if (input[i - 1] === "(") {
      stack.pop();
      answer += stack.length;
    } else {
      stack.pop();
      answer++;
    }
  }
}
console.log(answer);
