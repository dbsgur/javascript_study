const fs = require("fs");

let input = fs.readFileSync(__dirname + "/input.txt").toString();

input = +input;

input;

let dp = new Array(input + 1).fill(0);

// console.log(dp);

dp[1] = 1;
dp[2] = 3;

for (let i = 3; i <= input; i++) {
  dp[i] = (dp[i - 1] + 2 * dp[i - 2]) % 10007;
}

console.log(dp[input]);
