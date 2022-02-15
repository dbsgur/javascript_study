var fs = require("fs");
var inputs = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("");

var answer = "";
for (var i = 0; i < inputs.length; i++) {
  var char = inputs[i].charCodeAt(0);
  if (char >= 65 && char <= 90) {
    var upper = char + 13;
    if (upper > 90) {
      answer += String.fromCharCode(upper - 26);
    } else {
      answer += String.fromCharCode(upper);
    }
  } else if (char >= 97 && char <= 122) {
    var lower = char + 13;
    if (lower > 122) {
      answer += String.fromCharCode(lower - 26);
    } else {
      answer += String.fromCharCode(lower);
    }
  } else if (char === 32) {
    answer += " ";
  } else {
    answer += inputs[i];
  }
}
console.log(answer);
