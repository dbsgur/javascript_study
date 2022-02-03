// N개의 최소 공배수
function solution(num) {
  return num.reduce((a, b) => (a * b) / gcd(a, b));
}

function gcd(a, b) {
  return a % b ? gcd(b, a % b) : b;
}

//

// JadenCase 정렬

function solution(s) {
  let words = s.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].slice(1).toLowerCase();
  }
  return words.join(" ");
}
// Run Time Error

function solution(s) {
  var answer = "";
  for (let i = 0; i < s.length; i++) {
    if (i === 0 || s[i - 1] === " ") {
      answer += s[i].toUpperCase();
    } else {
      answer += s[i].toLowerCase();
    }
  }
  return answer;
}

//

// 행렬의 곱셈
function solution(arr1, arr2) {
  const answer = [];
  const N1 = arr1.length;
  const N2 = arr2.length;

  for (let i = 0; i < N1; i++) {
    const twoDArray = [];
    for (let j = 0; j < arr2[0].length; j++) {
      let thirdArray = 0;
      for (let k = 0; k < N2; k++) {
        thirdArray += arr1[i][k] * arr2[k][j];
      }
      twoDArray.push(thirdArray);
    }
    answer.push(twoDArray);
  }

  return answer;
}
