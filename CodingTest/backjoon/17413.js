//시간 초과

let fs = require("fs");

let input = fs.readFileSync(__dirname + "/input.txt").toString();

const re = /(<.+?>|\s)/g; // <>에 문자 하나 이상 포함하는 문자열 혹은 공백 문자, split할 때 기억했다 정규식 포함하는 애들까지 나누기 위해 ()
const tmp = input.split(re); // 정규식 기준으로 split
let result = [];
tmp.map((x) => {
  if (re.test(x)) {
    // 정규식.text(문자열) ==> 해당 정규식을 따르는 문자열은 true 반환
    result += x; // 이에 포함되면 그냥 문자열 넣기
  } else {
    // 정규식에 포함되지 않은 문자열 (<>과 공백 아닌 문자열)
    let a = x.split("").reverse().join(""); //뒤집어서
    result += a; //
  }
});
console.log(result);
