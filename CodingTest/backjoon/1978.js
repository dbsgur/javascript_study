const fs = require("fs");

let input = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n")[1]
  .split(" ")
  .map((x) => +x);
let answer = input.length;

for (let i = 0; i < input.length; i++) {
  // i;
  // console.log(input[i]);
  if (input[i] === 1) {
    answer -= 1;
    continue;
  } else if (input[i] === 2 || input[i] === 3) {
    continue;
  } else {
    // 소수인지 판단.
    let sqrt = Math.sqrt(input[i]);
    console.log(sqrt);
    console.log(input[i]);
    for (let j = 2; j <= sqrt; j++) {
      // 나누어지는경우 -1
      console.log(input[i]);
      if (input[i] % j === 0) {
        console.log(input[i]);
        answer -= 1;
        break;
        // continue;
      } else {
        console.log(input[i]);
      }
    }
  }
}

console.log(answer);

for (let i = 0; i < 10; i++) {
  console.log(i);
  for (let j = 0; j < 10; j++) {
    console.log(j);
    if (i !== 5) {
      console.log(j);
      break;
    }
    console.log(j);
  }
}
