// ㄷㅏ시
const fs = require("fs");
let input = fs.readFileSync(__dirname + "/input.txt").toString();

input;
// 1
// let arr = [];
// console.log(typeof arr);
// for (let i = 2; i <= input; i += 2) {
//   i;
//   arr.push(i);
// }
let arr = Array.from({ length: input }, (_, i) => i + 1);
arr;
// console.log(arr.indexOf(3));
arr = arr.filter((x) => {
  if (arr.indexOf(x) % 2 === 1) return x;
});
arr;
while (arr.length > 1) {
  arr = arr.filter((x) => {
    if (arr.indexOf(x) % 2 === 1) return x;
  });
}
console.log(arr);
// console.log(arr.slice(2));
// console.log(typeof arr);
// console.log(arr.indexeOf(2));
// arr.filter((x) => {
//   if (arr.indexeOf(x) % 2 === 1) x;
// });
// 2
// while (arr.length > 1) {
//   // arr.pop();
//   let tmp = arr[1];
//   // arr = [tmp, arr.slice(2)];
//   arr = arr.slice(2).concat(tmp);
// }

// console.log(arr[0]);
