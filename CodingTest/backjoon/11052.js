const fs = require("fs");

let input = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n");

// input;

let len = +input[0];

// console.log(typeof input[1]);

let cards = input[1].split(" ").map((x) => +x);

cards;

let dp = new Array(len + 1).fill(0);

console.log(dp);

dp[1] = cards[0];

console.log(dp);

for (let i = 2; i <= len; i++) {
  let maxN = 0;
  for (let j = 1; j <= Math.ceil(i / 2); j++) {
    if (dp[j] + dp[i - j] > maxN) {
      maxN = dp[j] + dp[i - j];
    }
  }
  dp[i] = Math.max(cards[i - 1], maxN);
}

console.log(dp[len]);
