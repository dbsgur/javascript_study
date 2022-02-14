// 에라토스테네의 체

// 1. 2부터 N까지의 모든 자연수를 나열한다.
// 2. 남은 수 중에서 아직 처리하지 않은 가장 작은 수 i를 찾는다.
// 3. 남은 수 중에서 i의 배수를 모두 제거한다.(i는 제거하지 않는다.)
// 4. 더 이상 반복할 수 없을 때까지 2번과 3번의 과정을 반복한다.
const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .trim()
  .split(" ")
  .map((x) => +x);

//ver 2 정답
// const [M, N] = input;
// const isPrimeNumber = Array(N + 1).fill(true);
// isPrimeNumber[1] = false;
// isPrimeNumber;
// for (let n = 2; n <= Math.ceil(Math.sqrt(N)); n++) {
//   if (isPrimeNumber[n]) {
//     let m = 2;
//     while (n * m <= N) {
//       isPrimeNumber[n * m] = false;
//       m++;
//     }
//   }
// }

// const results = [];
// for (let n = M; n <= N; n++) {
//   if (isPrimeNumber[n]) {
//     results.push(n);
//   }
// }
// console.log(results.join("\n"));
// ver 1 런타임 에러
let N = input[0];
let M = input[1];
let isPrimeNumber = Array(M + 1).fill(true); // 0부터 M까지 true로 채운배열
isPrimeNumber[0] = isPrimeNumber[1] = false; // 0 과 1은 소수가 아니므로 false로 바꿔준다.

function result() {
  // 2부터 시작. 주어진값 N의 제곱근까지 i의 배수들을 모두 false로 만들어준다(i는 여전히 true)
  for (let i = 2; i <= Math.ceil(Math.sqrt(M)); i++) {
    if (isPrimeNumber[i]) {
      let m = 2; // 배수들을 구하기위해 곱해줄 수.
      while (i * m <= M) {
        isPrimeNumber[i * m] = false; // i의 배수들을 false로 바꾼다.
        m++; // i * m은 초기에 2 * 2 이고 m++ 해줌으로써 i + m은 2 * 3으로 바뀐다.
      }
    }
  }

  let results = []; // 결과값을 담을 배열.
  for (let i = N; i <= M; i++) {
    // N부터 M까지의 숫자 i가 소수인지 아닌지 확인하는 for문
    if (isPrimeNumber[i]) {
      results.push(i); // i가 소수라면 results배열에 추가시켜준다.
    }
  }
  results = results.join("\n");
  results;
  console.log(results);
}

result();
