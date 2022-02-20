const fs = require("fs");

let input = fs.readFileSync(__dirname + "/input.txt").toString();

input = +input;

let dp = new Array(input + 1);
const mod = BigInt(1000000000);

// console.log(dp);

for (let i = 0; i <= input + 1; i++) {
  dp[i] = [];
}

// console.log(dp);

for (let i = 0; i < 10; i++) {
  if (i === 0) dp[1][0] = BigInt(0);
  else dp[1][i] = BigInt(1);
}

// console.log(dp);

for (let i = 2; i <= input; i++) {
  for (let j = 0; j < 10; j++) {
    dp[i][j] = BigInt(0);
    if (j - 1 >= 0) dp[i][j] += dp[i - 1][j - 1];
    if (j + 1 <= 9) dp[i][j] += dp[i - 1][j + 1];
    dp[i][j] = BigInt(dp[i][j]) % mod;
  }
}

const sum = dp[input].reduce((acc, cur) => acc + cur);
console.log(String(sum % mod));
