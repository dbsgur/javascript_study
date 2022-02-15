const fs = require("fs");

let input = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n")
  .map((x) => +x);

input;

let maxN = Math.max(...input);

let dp = new Array(maxN + 1).fill(0);

dp[1] = 1;
dp[2] = 2;
dp[3] = 4;

for (let i = 4; i <= maxN; i++) {
  dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
}

let answer = "";

for (let i = 1; i < input.length; i++) {
  console.log(dp[input[i]]);
}
