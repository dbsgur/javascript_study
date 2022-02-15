const fs = require("fs");

let input = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n")
  .map((x) => +x);
input;

input = input.slice(0, -1);

input;

let maxNum = Math.max(...input);

maxNum;

let isPrimeNumber = Array(maxNum + 1).fill(true);
isPrimeNumber[0] = isPrimeNumber[1] = false;
// ceil 할 필요 없지 않나?
for (let i = 2; i <= Math.sqrt(maxNum); i++) {
  if (isPrimeNumber[i]) {
    let m = 2;
    while (i * m <= maxNum) {
      isPrimeNumber[i * m] = false;
      m++;
    }
  }
}
// console.log(isPrimeNumber);
let answer = [];
for (let i = 0; i < input.length; i++) {
  console.log(input[i]);
  for (let j = 3; j <= input[i]; j++) {
    if (isPrimeNumber[j] && isPrimeNumber[input[i] - j]) {
      // answer += `${input[i]} = ${isPrimeNumber[j]} + ${
      //   isPrimeNumber[input[i] - j]
      // }\n`;
      answer += `${input[i]} = ${j} + ${input[i] - j}\n`;
      break;
    }
  }
}
// 인풋 - 가장 작은 소수 = 소수냐 ?
console.log(answer);
