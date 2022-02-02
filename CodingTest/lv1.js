//==============================================
//             CODING_TEST
//==============================================

//별찍기
process.stdin.setEncoding("utf8");
process.stdin.on("data", (data) => {
  const n = data.split(" ");
  const a = Number(n[0]),
    b = Number(n[1]);
  for (let i = 0; i < b; i++) {
    //i을 선언해주고 몇줄(b)만큼 반복
    let str = ""; //출력할 변수 선언
    for (let j = 0; j < a; j++) {
      // j선언후 별을 한줄에 몇개 찍을지 반복
      str = str + "*"; //출력할 변수에 별을 담는다
    }
    console.log(str); // 출력
  }
});

//

//x만큼 간격이 있는 n개의 숫자
function solution(x, n) {
  var answer = [];
  for (let i = 1; i <= n; i++) {
    answer.push(x * i);
  }
  return answer;
}

//

//행렬의 덧셈
function solution2(arr1, arr2) {
  return arr1.map((e, i) => arr2[i].map((v, j) => arr1[i][j] + arr2[i][j]));
}

//

//핸드폰 번호가리기
function solution(phone_number) {
  var answer = "";
  for (let i = 0; i < phone_number.length - 4; i++) {
    answer += "*";
  }
  //생략이 가능하다!
  answer += phone_number.slice(-4, phone_number.length);
  return answer;
}

function hide_numbers(s) {
  var result = "*".repeat(s.length - 4) + s.slice(-4);
  //함수를 완성해주세요

  return result;
}

function hide_numbers(s) {
  return s.replace(/\d(?=\d{4})/g, "*");
}

//

//하샤드 수
function solution(x) {
  let sum = 0;
  for (let i = 0; i < String(x).length; i++) {
    sum += Number(String(x)[i]);
  }
  return x % sum === 0;
}
// 자주쓰는 것 변수 할당하는 습관 > 가독성 상승
function Harshad(n) {
  var sum = 0;
  var arr = String(n).split("");
  for (var i = 0; i < arr.length; i++) {
    sum += Number(arr[i]);
  }
  return n % sum == 0 ? true : false;
}
//Speed
function solution(x) {
  let num = x;
  let sum = 0;
  do {
    sum += x % 10;
    x = Math.floor(x / 10);
  } while (x > 0);

  return !(num % sum);
}

//

//평균 구하기
function solution(arr) {
  var answer = 0;
  arr.forEach(function (v) {
    answer += v;
  });
  return answer / arr.length;
}

function average(array) {
  return array.reduce((a, b) => a + b) / array.length;
}

//

//콜라츠 추측
function solution(num) {
  var answer = 0;
  while (num !== 1) {
    num % 2 === 0 ? (num /= 2) : (num = 3 * num + 1);
    answer += 1;
    if (answer === 500) {
      return -1;
    }
  }
  return answer;
}
function collatz(num) {
  var answer = 0;
  while (num != 1 && answer != 500) {
    num % 2 == 0 ? (num = num / 2) : (num = num * 3 + 1);
    answer++;
  }
  return num == 1 ? answer : -1;
}

//

//최대공약수, 최소공배수
const calcGcd = (a, b) => {
  if (b === 0) return a;
  return a > b ? calcGcd(b, a % b) : calcGcd(a, b % a);
};

const solution = (n, m) => {
  var answer = [];
  var gcd = calcGcd(n, m);
  var lcm = (n * m) / gcd;
  return [gcd, lcm];
};

//

//짝수와 홀수
function solution(num) {
  return num % 2 ? "Odd" : "Even";
}

//

//작은 수 제거하기
function solution(arr) {
  if (arr.length <= 1) return [-1];
  arr.sort();
  arr.splice(0, 1);
  return arr.reverse();
}
function solution(arr) {
  if (arr.length === 1) {
    return [-1];
  }
  const minValue = Math.min.apply(null, arr);
  const index = arr.findIndex((value) => value === minValue);
  arr.splice(index, 1);
  return arr;
}

//
//제곱근
function solution(n) {
  const num = Math.sqrt(n);
  return Number.isInteger(num) ? Math.pow(num + 1, 2) : -1;
}

//
//숫자 뒤집기
function solution(n) {
  return Number(String(n).split("").sort().reverse().join(""));
}

function solution(n) {
  //숫자가 분명히 더 빠름
  var nums = [];
  do {
    nums.push(n % 10);
    n = Math.floor(n / 10);
  } while (n > 0);

  return nums.sort((a, b) => b - a).join("") * 1;
  //문자는 느림
  return (
    (n + "")
      .split("")
      .sort((a, b) => b - a)
      .join("") * 1
  );
}

//

//
function solution(n) {
  var nums = [];
  do {
    nums.push(n % 10);
    n = Math.floor(n / 10);
  } while (n > 0);

  return nums;
}

//
//자릿수 더하기
function solution(n) {
  let arr = [];
  do {
    arr.push(n % 10);
    n = Math.floor(n / 10);
  } while (n > 0);
  return arr.reduce((a, b) => a + b);
}
function solution(n) {
  // 문자 풀이
  // return (n+"").split("").reduce((acc, curr) => acc + parseInt(curr), 0)

  // 숫자풀이
  var sum = 0;

  do {
    sum += n % 10;
    n = Math.floor(n / 10);
  } while (n > 0);

  return sum;
}

//
//이상한문자열
function solution(s) {
  let arr = [];
  arr = s.split(" ");
  let answer = "";
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (j % 2) {
        answer += arr[i][j].toLowerCase();
      } else {
        answer += arr[i][j].toUpperCase();
      }
    }
    if (i === arr.length - 1) {
      break;
    }
    answer += " ";
  }
  return answer;
}
function toWeirdCase(s) {
  //함수를 완성해주세요
  return s.toUpperCase().replace(/(\w)(\w)/g, function (a) {
    return a[0].toUpperCase() + a[1].toLowerCase();
  });
}
function toWeirdCase(s) {
  return s
    .split(" ")
    .map((i) =>
      i
        .split("")
        .map((j, key) => (key % 2 === 0 ? j.toUpperCase() : j))
        .join("")
    )
    .join(" ");
}

//

//약수의 합
function solution(n) {
  var answer = 0;
  for (let i = 1; i < n + 1; i++) {
    if (n % i === 0) {
      answer += i;
    }
  }
  return answer;
}

//

//시져 암호
function solution(s, n) {
  return s
    .split("")
    .map((value) => {
      if (value === " ") return value;
      return value.toUpperCase().charCodeAt() + n > 90
        ? String.fromCharCode(value.charCodeAt() + n - 26)
        : String.fromCharCode(value.charCodeAt() + n);
    })
    .join("");
}

function solution(s, n) {
  var upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lower = "abcdefghijklmnopqrstuvwxyz";
  var answer = "";

  for (var i = 0; i < s.length; i++) {
    var text = s[i];
    if (text == " ") {
      answer += " ";
      continue;
    }
    var textArr = upper.includes(text) ? upper : lower;
    var index = textArr.indexOf(text) + n;
    if (index >= textArr.length) index -= textArr.length;
    answer += textArr[index];
  }
  return answer;
}

//

//문자열을 정수로 변환
function solution(s) {
  let list = s.split("");
  return Number(list.join(""));
}

function strToInt(str) {
  return str / 1;
}
function strToInt(str) {
  return +str;
}
//

//수박수박수?
function solution(n) {
  var answer = "";
  for (let i = 0; i < n; i++) {
    if (i % 2 === 0) {
      answer += "수";
    } else {
      answer += "박";
    }
  }
  return answer;
}

const waterMelon = (n) => {
  return "수박".repeat(n / 2) + (n % 2 === 1 ? "수" : "");
};

const waterMelon = (n) => "수박".repeat(n).slice(0, n);

//

//소수 갯수 찾기
function solution(n) {
  let arr = [];
  for (let i = 1; i <= n; i++) arr.push(i);

  for (let i = 1; i * i < n; i++) {
    if (arr[i]) {
      let num = arr[i];
      for (let j = num * num; j <= n; j += num) {
        arr[j - 1] = 0;
      }
    }
  }
  let answer = arr.filter((number) => number);
  answer.shift();
  return answer.length;
}

//

//서울에서 김서방 찾기
function solution(seoul) {
  return `김서방은 ${seoul.indexOf("Kim")}에 있다`;
}

//

//문자열 다루기 기본
function solution(s) {
  var answer = false;
  if (s.length === 4 || s.length === 6) {
    if (s.includes("e")) {
      return false;
    }
    if (!isNaN(+s)) {
      answer = true;
    }
  }
  return answer;
}

function alpha_string46(s) {
  var regex = /^\d{6}$|^\d{4}$/;
  return regex.test(s);
}

//

//문자열 내림차순으로 배치하기
function solution(s) {
  return s.split("").sort().reverse().join("");
}

function solution(s) {
  return s
    .split("")
    .sort((a, b) => (a < b ? 1 : -1))
    .join("");
}

//

//문자열 내 p와 y의 갯수
function solution(s) {
  let pNum = s
    .toUpperCase()
    .split("")
    .filter((x) => x === "P").length;
  let yNum = s
    .toUpperCase()
    .split("")
    .filter((x) => x === "Y").length;
  return pNum === yNum ? true : false;
}

function numPY(s) {
  //함수를 완성하세요
  return (
    s.toUpperCase().split("P").length === s.toUpperCase().split("Y").length
  );
}

//

//문자열 내 마음대로 정렬하기
function solution(strings, n) {
  let answer = strings.sort((a, b) => {
    if (a[n] > b[n]) return 1;
    if (a[n] < b[n]) return -1;
    if (a[n] === b[n]) {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    }
  });

  return answer;
}

function solution(strings, n) {
  // strings 배열
  // n 번째 문자열 비교
  return strings.sort((s1, s2) =>
    s1[n] === s2[n] ? s1.localeCompare(s2) : s1[n].localeCompare(s2[n])
  );
}

//

//두정수 사이의 합
function solution(a, b) {
  var answer = 0;
  if (a > b) {
    let tmp = a;
    a = b;
    b = tmp;
  }
  for (let i = a; i <= b; i++) {
    answer += i;
  }
  return answer;
}
function adder(a, b, s = 0) {
  for (var i = Math.min(a, b); i <= Math.max(a, b); i++) s += i;
  return s;
}
function adder(a, b) {
  var result = 0;
  //함수를 완성하세요

  return ((a + b) * (Math.abs(b - a) + 1)) / 2;
}

//

//나누어 떨어지는 숫자 배열
function solution(arr, divisor) {
  var answer = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % divisor === 0) {
      answer.push(arr[i]);
    }
  }
  return answer[0]
    ? answer.sort(function (a, b) {
        return a - b;
      })
    : [-1];
}

function solution(arr, divisor) {
  var answer = arr.filter((v) => v % divisor == 0);
  return answer.length == 0 ? [-1] : answer.sort((a, b) => a - b);
}

//

//같은 숫자는 싫어!
function solution(arr) {
  var answer = [];
  for (let i = 0; i < arr.length; i++) {
    answer.push(arr[i]);
    if (arr[i] === arr[i - 1]) {
      answer.pop();
    }
  }

  return answer;
}

function solution(arr) {
  return arr.filter((val, index) => val != arr[index + 1]);
}

//

let arr = "123";
console.log(arr.slice(1, 3)); //output : 23
//

//가운데 글자 가져오기
function solution(s) {
  let a = 0;
  if (s.length % 2 === 0) {
    a = s.length / 2;
    return s.slice(a - 1, a + 1);
  } else {
    a = Math.ceil(s.length / 2);
    return s.slice(a - 1, a);
  }

  // return s.length%2 === 0 ? s.slice(s.length/2-1, s.length/2 +1) : s.slice(Math.ceil(s.length/2)-1, Math.ceil(s.length/2));
}

function solution(s) {
  const mid = Math.floor(s.length / 2);
  return s.length % 2 === 1 ? s[mid] : s[mid - 1] + s[mid];
}

//

//2016년
function solution(a, b) {
  const months = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const day = ["FRI", "SAT", "SUN", "MON", "TUE", "WED", "THU"];
  let days = b - 1;
  for (let i = 0; i < a - 1; i++) {
    days += months[i];
  }
  return day[days % 7];
}
function getDayName(a, b) {
  var date = new Date(2016, a - 1, b);
  return date.toString().slice(0, 3).toUpperCase();
}

//

//나머지가 1이 되는 수 찾기
function solution(n) {
  for (let i = 0; i < n; i++) {
    if (n % i === 1) {
      return i;
    }
  }
}

const solution = (n) => {
  for (let i = 2; i < n; i++) {
    if (n % i === 1) {
      return i;
    }
  }
};

//

// 부족한 금액 계싼하기
function solution(price, money, count) {
  let sum = 0;
  for (let i = 1; i <= count; i++) {
    sum += price * i;
  }
  return sum < money ? 0 : sum - money;
}
//가우스
function solution(price, money, count) {
  const tmp = (price * count * (count + 1)) / 2 - money;
  return tmp > 0 ? tmp : 0;
}

//

//최소 직사각형
function solution(sizes) {
  let width = sizes.map((x) => x[0]);
  let heigh = sizes.map((y) => y[1]);

  for (let i = 0; i < sizes.length; i++) {
    if (width[i] < heigh[i]) {
      let tmp = width[i];
      width[i] = heigh[i];
      heigh[i] = tmp;
    }
  }

  return Math.max(...width) * Math.max(...heigh);
}

function solution(sizes) {
  const rotated = sizes.map(([w, h]) => (w < h ? [h, w] : [w, h]));

  let maxSize = [0, 0];
  rotated.forEach(([w, h]) => {
    if (w > maxSize[0]) maxSize[0] = w;
    if (h > maxSize[1]) maxSize[1] = h;
  });
  return maxSize[0] * maxSize[1];
}

function solution(sizes) {
  let w = 0;
  let h = 0;
  sizes.forEach((s) => {
    const [a, b] = s.sort((a, b) => a - b);
    if (a > h) h = a;
    if (b > w) w = b;
  });

  return w * h;
}

//

// 비밀지도
function solution(n, arr1, arr2) {
  var answer = [];
  for (let i = 0; i < n; i++) {
    let map1 = arr1[i].toString(2).padStart(n, "0");
    let map2 = arr2[i].toString(2).padStart(n, "0");
    let arr = "";
    for (let j = 0; j < n; j++) {
      if (map1[j] === "0" && map2[j] === "0") {
        arr += " ";
      } else {
        arr += "#";
      }
    }
    answer.push(arr);
  }
  return answer;
}

var solution = (n, a, b) =>
  a.map((a, i) =>
    (a | b[i]).toString(2).padStart(n, 0).replace(/0/g, " ").replace(/1/g, "#")
  );

//

//두개 뽑아서 더하기
function solution(numbers) {
  var answer = [];

  // for (let i =0; i<numbers.length; i++)
  while (numbers.length !== 0) {
    let x = numbers.pop();
    for (let j = 0; j < numbers.length; j++) {
      answer.push(x + numbers[j]);
    }
  }
  answer.sort((a, b) => a - b);

  return answer.filter((el, i) => answer.indexOf(el) === i);
  // return numbers.sort((a,b)=>a-b);
}

function solution(numbers) {
  const temp = [];

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      temp.push(numbers[i] + numbers[j]);
    }
  }

  const answer = [...new Set(temp)];

  return answer.sort((a, b) => a - b);
}

function solution(numbers) {
  var answer = [];
  numbers = numbers.sort();
  console.log(numbers);
  for (var i = 0; i < numbers.length; i++) {
    for (var k = i + 1; k < numbers.length; k++) {
      if (!answer.includes(numbers[i] + numbers[k])) {
        answer.push(numbers[i] + numbers[k]);
      }
    }
  }
  answer = answer.sort(function (a, b) {
    return a - b;
  });
  return answer;
}

//

// 완주하지 못한 선수
function solution(participant, completion) {
  participant.sort();
  completion.sort();
  for (let i in participant) {
    if (participant[i] !== completion[i]) {
      return participant[i];
    }
  }
}

//

//k번째 수
function solution(array, commands) {
  var answer = [];
  for (let i = 0; i < commands.length; i++) {
    let tmp = array
      .slice(commands[i][0] - 1, commands[i][1])
      .sort((a, b) => a - b);
    answer.push(tmp[commands[i][2] - 1]);
  }
  return answer;
}

function solution(array, commands) {
  return commands.map((command) => {
    const [sPosition, ePosition, position] = command;
    const newArray = array
      .filter(
        (value, fIndex) => fIndex >= sPosition - 1 && fIndex <= ePosition - 1
      )
      .sort((a, b) => a - b);

    return newArray[position - 1];
  });
}
function solution(array, commands) {
  var answer = [];

  answer = commands.map((a) => {
    return array.slice(a[0] - 1, a[1]).sort((b, c) => b - c)[a[2] - 1];
  });
  return answer;
}

//

//없는 숫자 더하기
function solution(numbers) {
  let sum = numbers.reduce((pre, next) => pre + next);
  return 45 - sum;
}
function solution(numbers) {
  var allNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return allNum
    .filter((x) => !numbers.includes(x))
    .reduce((acc, sum) => (acc += sum));
}

function solution(numbers) {
  let answer = 0;

  for (let i = 0; i <= 9; i++) {
    if (!numbers.includes(i)) answer += i;
  }

  return answer;
}

// includes < filter < for

//

//예산
function solution(d, budget) {
  d.sort((a, b) => a - b);

  let result = 0;

  for (let i = 0; result <= budget; i++) {
    if (result + d[i] <= budget) {
      result += d[i];
      continue;
    }

    return i;
  }
}
function solution(d, budget) {
  let answer = 0;
  let money = 0;
  d.sort((a, b) => a - b).forEach(function (val) {
    money += val;
    if (money <= budget) {
      answer++;
    }
  });
  return answer;
}

//

//체육복
function solution(n, lost, reserve) {
  lost.sort((a, b) => a - b);
  reserve.sort((a, b) => a - b);
  let answer = n - lost.length;
  for (let i = 0; i < lost.length; i++) {
    let find = reserve.find((x) => x === lost[i]);
    if (find) {
      reserve = reserve.filter((x) => x !== find);
      lost = lost.filter((x) => x !== find);
      answer += 1;
      i--;
    }
  }
  for (let i = 0; i < lost.length; i++) {
    let find = reserve.find((x) => x === lost[i] - 1 || x === lost[i] + 1);
    if (find) {
      reserve = reserve.filter((x) => x !== find);
      lost = lost.filter((x) => x !== find);
      answer += 1;
    }
  }
  return answer;
}

function solution(n, lost, reserve) {
  const students = {};
  let answer = 0;
  for (let i = 1; i <= n; i++) {
    students[i] = 1;
  }
  lost.forEach((number) => (students[number] -= 1));
  reserve.forEach((number) => (students[number] += 1));

  for (let i = 1; i <= n; i++) {
    if (students[i] === 2 && students[i - 1] === 0) {
      students[i - 1]++;
      students[i]--;
    } else if (students[i] === 2 && students[i + 1] === 0) {
      students[i + 1]++;
      students[i]--;
    }
  }
  for (let key in students) {
    if (students[key] >= 1) {
      answer++;
    }
  }
  return answer;
}

//

// 실패율
function solution(N, stages) {
  var answer = [];
  let fails = [];
  // 해당 스테이지랑 번호가 같은 사람 = 못깬사람
  // let loser = stages.filter(x=> x === stage)
  // 해당 스테이지랑 번호가 같거나 큰사람 = 도달한 유저
  // let user = stages.filter(x=> x >= stage)
  // 실패율 = 못깬 사람 / 도달한 유저
  // let fail = loser / user
  for (let stage = 1; stage <= N; stage++) {
    let loser = stages.filter((x) => x === stage).length;
    let user = stages.filter((x) => x >= stage).length;
    // console.log(loser/user)
    fails.push([stage, loser / user]);
  }
  // 실패율 큰 순으로 정렬
  fails.sort((a, b) => b[1] - a[1]);
  // 같다면 오름차순으로 정렬 -> 이미 오름차순이므로 생략
  return fails.map((x) => x[0]);
}
unction solution(N, stages) {
  const obj = {}
  for(let i=1; i<=N; i++) {
      obj[i] = 0;
  }

  // 스테이지에 머물고있는 인원 파악
  stages.forEach((v) => {
      if(v !== N+1) {
      obj[v] += 1;
      }
  })

  // 계산
  let stay = 0;
  let stayed = stages.length;
  const failPercentageArr = [];
  for(let key in obj) {
      stay = obj[key];
      console.log(stay, '/', stayed);
      if(stayed == 0 || stay == 0) {
          failPercentageArr.push({stage: key, fail: 0});            
      } else {
          failPercentageArr.push({stage: key, fail: stay/stayed});
      }
      stayed = stayed - stay;
  }

  // 정렬
  failPercentageArr.sort((a,b) => {
      if (b.fail > a.fail) {
          return 1;
      } else if (b.fail < a.fail) {
          return -1;
      } else if (b.fail == a.fail) {
          return a.stage - b.stage
      }
  })

  return failPercentageArr.map((v) => {
      return Number(v.stage);
  })
}

//

// 크레인 인형뽑기
function solution(board, moves) {
  var answer = 0;
  let arr = []
  for(let i = 0; i < moves.length; i++){
      for(let j = 0; j < board.length;j++){
          if(board[j][moves[i]-1] !== 0){
              arr.push(board[j][moves[i]-1])
              board[j][moves[i]-1] = 0
              break;
          }
      }
      if (arr.length >=2){
          if (arr[arr.length-1] === arr[arr.length-2]){
              answer +=2
              arr.splice(arr.length-2,2)

          }
      } 
  }
  return answer;
}
function solution(board, moves) {
  var answer = 0;
  var arr = new Array();

  for(var m = 0; m<moves.length; m++){
      for(var i = 0; i<board.length; i++){
          if(board[i][moves[m]-1]){
              if(arr[arr.length-1] == board[i][moves[m]-1])
                  answer+=2, arr.pop();
              else
                  arr.push(board[i][moves[m]-1]);
              board[i][moves[m]-1] = 0;
              break;
          }
      }
  }
  return answer;
}

//

//숫자 문자열과 영단어
function solution(s) {
  var answer = 0;
  s=s.replace(/zero/gi,0)
  s=s.replace(/one/g,1)
  s=s.replace(/two/g, 2)
  s=s.replace(/three/g,3)
  s=s.replace(/four/g,4)
  s=s.replace(/five/g,5)
  s=s.replace(/six/g,6)
  s=s.replace(/seven/g,7)
  s=s.replace(/eight/g,8)
  s=s.replace(/nine/g,9)
  
  return +s;
}

function solution(s) {
  let numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  var answer = s;

  for(let i=0; i< numbers.length; i++) {
      let arr = answer.split(numbers[i]);
      answer = arr.join(i);
  }

  return Number(answer);
}

//

// 신규 아이디 추천
function solution(new_id) {
  let answer = new_id.toLowerCase();
  answer = answer.replace(/[^\w-_.]/g,'')
  .replace(/\.+/g,'.')
  .replace(/^\.|\.$/g,'')
  if(answer.length === 0) {answer = "a"}
  if(answer.length >15) {answer = answer.slice(0,15)}
  answer = answer.replace(/\.$/g, '')
  if(answer.length ===1) {answer= answer.repeat(3)}
  if(answer.length ===2) {answer= answer+answer[1]}
  return answer;
}

const solution = (new_id) => {
  const id = new_id
      .toLowerCase()
      .replace(/[^\w\d-_.]/g, '')
      .replace(/\.{2,}/g, '.')
      .replace(/^\.|\.$/g, '')
      .padEnd(1, 'a')
      .slice(0, 15)
      .replace(/^\.|\.$/g, '')        
  return id.padEnd(3, id[id.length-1])
}

//

// 로또의 최고 순위와 최저 순위

function solution(lottos, win_nums) {
  let answer = 7;
  let zero =0;
  for (let i=0; i<lottos.length; i++){
      if(lottos[i] === 0){
          zero++
      }
      if(zero===6){
          return [1,6]
      }
  }
  for (let i=0; i<win_nums.length; i++){
      if (lottos.find(lotto => lotto === win_nums[i])){
          answer--;
      }
  }
  if (answer === 7){
      answer = 6
  }
  return [answer-zero, answer];
}

function solution(lottos, win_nums) {
  const rank = [6, 6, 5, 4, 3, 2, 1];

  let minCount = lottos.filter(v => win_nums.includes(v)).length;
  let zeroCount = lottos.filter(v => !v).length;

  const maxCount = minCount + zeroCount;

  return [rank[maxCount], rank[minCount]];
}

//

function solution(id_list, report, k) {
  let bads = [];
  let reports = {};
  let unique = new Set(report)
  let uniqueArr = [...unique]
  for (let i=0; i<id_list.length; i++){
      reports[id_list[i]] = 0
  }
  for (let i=0; i<uniqueArr.length; i++){
      // [1] 
      let bad = uniqueArr[i].split(' ')[1]
      bads.push(bad)
      reports[bad] += 1
  }
  return reports;
}

//

// 신고 결과 받기
function solution(id_list, report, k) {
  const answer = new Array(id_list.length);
  answer.fill(0) 
  // report 중복 제거 set+ spread 조합이 가장 빠르다
  report = [...new Set(report)]
  const report_list = {} 
  id_list.map((user)=>{
      report_list[user] = [] //key로 userid를 value로 빈 배열을 가지는 객체
  })
  
  // 누가 누구한테 신고당했는지
  report.map((user)=>{
      const [user_id, report_id] = user.split(' ')
          report_list[report_id].push(user_id)
  })
  
  for(const key in report_list){
      // length = 신고당한 횟수
      if(report_list[key].length >= k){ //이용정지 유저
          report_list[key].map((user)=>{
              answer[id_list.indexOf(user)] += 1
          })
      }
  }
  return answer;
}

function solution(id_list, report, k) {
  let reports = [...new Set(report)].map(a=>{return a.split(' ')});
  let counts = new Map();
  for (const bad of reports){
      counts.set(bad[1],counts.get(bad[1])+1||1)
  }
  let good = new Map();
  for(const report of reports){
      if(counts.get(report[1])>=k){
          good.set(report[0],good.get(report[0])+1||1)
      }
  }
  let answer = id_list.map(a=>good.get(a)||0)
  return answer;
}

