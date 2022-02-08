let fs = require("fs");

let input = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");
// console.log(input);

const len = input[0];

const stack = [];
const result = [];

for (let i = 1; i <= len; i++) {
  switch (input[i]) {
    case "pop":
      result.push(stack.pop() || -1);
      break;
    case "size":
      result.push(stack.length);
      break;
    case "empty":
      result.push(stack[0] ? 0 : 1);
      break;
    case "top":
      result.push(stack[stack.length - 1] || -1);
      break;

    default:
      stack.push(input[i].split(" ")[1]);
      break;
  }
}

console.log(result.join("\n"));

//

// const array = require("fs").readFileSync("/dev/stdin").toString().split("\n");
// array.shift();

// const stack = [];

// const fun = {
//   pop: () => stack.pop() || -1,
//   size: () => stack.length,
//   empty: () => (stack[0] ? 0 : 1),
//   top: () => stack[stack.length - 1] || -1,
//   push: (item) => {
//     stack.push(item.split(" ")[1]);
//     return "";
//   },
// };

// const result = array.reduce(
//   (acc, v) => acc + (fun[v] ? `${fun[v]()}\n` : fun.push(v)),
//   ""
// );

// console.log(result);
