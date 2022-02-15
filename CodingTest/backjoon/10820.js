const fs = require("fs");

let input = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n");

input;

let answer = "";

let len = input.length;
for (let i = 0; i < len; i++) {
  if (input[i] === "") continue;
  console.log(input[i]);
  // console.log(input[i][0])
  let sentance = input[i];
  // 소문자 대문자 숫자 공백
  let senLen = sentance.length;
  let setArr = [0, 0, 0, 0];
  console.log(setArr);
  for (let j = 0; j < senLen; j++) {
    if (sentance[j] >= "a" && sentance[j] <= "z") setArr[0] += 1;
    else if (sentance[j] >= "A" && sentance[j] <= "Z") setArr[1] += 1;
    else if (sentance[j] >= "0" && sentance[j] <= "9") setArr[2] += 1;
    else setArr[3] += 1;
  }
  // console.log(setArr);
  // console.log(setArr.join(" "));
  answer += setArr.join(" ") + "\n";
  // answer += setArr.join(' ');
}

console.log(answer);
// answer;
