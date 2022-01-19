const quotes = [
  {
    quote: "JUST DO IT !",
    author: "NIKE",
  },
  {
    quote: "JUST DO IT !",
    author: "NIKE",
  },
  {
    quote: "JUST DO IT !",
    author: "NIKE",
  },
  {
    quote: "JUST DO IT !",
    author: "NIKE",
  },
  {
    quote: "JUST DO IT !",
    author: "NIKE",
  },
  {
    quote: "JUST DO IT !",
    author: "NIKE",
  },
  {
    quote: "JUST DO IT !!",
    author: "NIKE",
  },
  {
    quote: "JUST DO IT !!",
    author: "NIKE",
  },
  {
    quote: "JUST DO IT !!",
    author: "NIKE",
  },
  {
    quote: "JUST DO IT !!",
    author: "NIKE",
  },
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

//randomness
const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

//round : 반올림
//ceil : 올림
//floor : 내링
//parseInt : 문자열 > 특정 진수의 정수로 바꾼다.
//Number.toString() : Number객체를 나타내는 문자열을 반환 > n진수 변환

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;
