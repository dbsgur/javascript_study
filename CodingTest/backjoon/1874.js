let fs = require("fs");

let input = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n");

var cases = input[0];
var arr = [];
var stack = [];
var answer = "";
for (var i = 0; i < cases; i++) {
  arr[i] = i + 1;
}
for (var j = 1; j <= cases; j++) {
  //4
  var count = 1;
  while (count <= cases && stack[stack.length - 1] != input[j]) {
    stack.push(arr.shift());
    answer += "+\n";
    count++;
  }
  if (stack[stack.length - 1] == input[j]) {
    stack.pop();
    answer += "-\n";
  } else {
    answer = "NO";
    break;
  }
}
console.log(answer);
