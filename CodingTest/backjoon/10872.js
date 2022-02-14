const fs = require("fs");

let input = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split(" ");

// const t0 = performance.now();
let answer = 1;
for (let i = 2; i <= +input; i++) {
  answer *= i;
}
// const t1 = performance.now();
// for(let i=0; )
// console.log(t1 - t0, "milliseconds");
console.log(answer);
