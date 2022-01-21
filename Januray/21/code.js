const date = new Date();
console.log(date); // 2022-01-21T12:39:47.398Z

//

// 86400000ms는 1day를 의미한다.
// 1s = 1,000ms
// 1m = 60s * 1,000ms = 60,000ms
// 1h = 60m * 60,000ms = 3,600,000ms
// 1d = 24h * 3,600,000ms = 86,400,000ms
date = new Date(86400000);
console.log(date); //1970-01-02T00:00:00.000Z

//

let date = new Date("January 21, 2022 21:44:55");
console.log(date); // 2022-01-21T12:44:55.000Z

date = new Date("2022/01/21/21:44:55");
console.log(date); // 2022-01-21T12:44:55.000Z

//

// 월을 나타내는 0는 1월을 의미한다.
// 2022/1/21/00:00:00:00
let date = new Date(2022, 0);
console.log(date); // 2021-12-31T15:00:00.000Z

// 월을 나타내는 0는 1월을 의미한다.
// 2022/1/21/21:44:55:00
date = new Date(2022, 0, 21, 21, 44, 55, 0);
console.log(date); // 2022-01-21T12:44:55.000Z

// 가독성이 훨씬 좋다.
date = new Date("2022/1/21/21:44:55:00");
console.log(date); // 2022-01-21T12:44:55.000Z

//

let date = Date();
console.log(typeof date, date); //string Fri Jan 21 2022 21:59:28 GMT+0900 (대한민국 표준시)

//

const now = Date.now();
console.log(now); // 1642770048696

//

let d = Date.parse("Jan 2, 1970 00:00:00 UTC"); // UTC
console.log(d); // 86400000

d = Date.parse("Jan 2, 1970 09:00:00"); // KST
console.log(d); // 86400000

d = Date.parse("1970/01/02/09:00:00"); // KST
console.log(d); // 86400000

//

const today = new Date();
const year = today.getFullYear();

console.log(today); // 2022-01-21T13:19:35.518Z
console.log(year); // 2022

//

const today = new Date();

// 년도 지정
today.setFullYear(2050);

let year = today.getFullYear();
console.log(today); // 2050-01-21T13:21:45.312Z
console.log(year); // 2050

// 년도 지정
today.setFullYear(1900, 0, 1);

year = today.getFullYear();
console.log(today); // 1900-01-01T13:53:53.312Z
console.log(year); // 1900

//

const today = new Date();
const month = today.getMonth();

console.log(today); // 2022-01-21T13:24:49.252Z
console.log(month); // 0

//

const today = new Date();

// 월을 지정
today.setMonth(0); // 1월

let month = today.getMonth();
console.log(today); // 2022-01-21T13:28:17.500Z
console.log(month); // 0

// 월/일을 지정
today.setMonth(11, 1); // 12월 1일

month = today.getMonth();
console.log(today); // 2022-12-01T13:28:17.500Z
console.log(month); // 11

//

const today = new Date();
const date = today.getDate();

console.log(today); // 2022-01-21T13:29:25.136Z
console.log(date); // 21

//

const today = new Date();
const day = today.getDay();

console.log(today); // 2022-01-21T13:31:34.580Z
console.log(day); // 5

//

const today = new Date();
const hours = today.getHours();

console.log(today); // 2022-01-21T13:34:17.591Z
console.log(hours); // 22

//

const today = new Date();

// 시간 지정
today.setHours(7);

let hours = today.getHours();
console.log(today); // 2022-01-20T22:35:14.333Z
console.log(hours); // 7

// 시간/분/초/밀리초 지정
today.setHours(0, 0, 0, 0); // 00:00:00:00

hours = today.getHours();
console.log(today); // 2022-01-20T15:00:00.000Z
console.log(hours); // 0

//

const today = new Date();
const minutes = today.getMinutes();

console.log(today); // 2022-01-21T13:37:03.522Z
console.log(minutes); // 37

//

const today = new Date();

// 분 지정
today.setMinutes(50);

let minutes = today.getMinutes();
console.log(today); // 2022-01-21T13:50:27.364Z
console.log(minutes); // 50

// 분/초/밀리초 지정
today.setMinutes(5, 10, 999); // HH:05:10:999

minutes = today.getMinutes();
console.log(today); // 2022-01-21T13:05:10.999Z
console.log(minutes); // 5

//

console.log(new Date().getSeconds()); //29

//

const today = new Date();

// 초 지정
today.setSeconds(30);

let seconds = today.getSeconds();
console.log(today); // 2022-01-21T13:42:30.320Z
console.log(seconds); // 30

// 초/밀리초 지정
today.setSeconds(10, 0); // HH:MM:10:000

seconds = today.getSeconds();
console.log(today); // 2022-01-21T13:42:10.000Z
console.log(seconds); // 10

//

const today = new Date();
const ms = today.getMilliseconds();

console.log(today); // 2022-01-21T13:44:00.466Z
console.log(ms); // 466

//

const today = new Date();

// 밀리초 지정
today.setMilliseconds(123);

const ms = today.getMilliseconds();
console.log(today); // 2022-01-21T13:44:58.123Z
console.log(ms); // 123

//

const today = new Date();
const time = today.getTime();

console.log(today); // 2022-01-21T13:48:02.666Z
console.log(time); // 1642772882666

//

const today = new Date();

// 1970년 1월 1일 00:00:00(UTC)를 기점으로 현재 시간까지 경과된 밀리초 지정
today.setTime(86400000); // 86400000 === 1day

const time = today.getTime();
console.log(today); // 1970-01-02T00:00:00.000Z
console.log(time); // 86400000

//

const today = new Date();
const x = today.getTimezoneOffset() / 60; // -9

console.log(today); // 2022-01-21T13:50:34.236Z
console.log(x); // -9

//

const d = new Date("2022/1/21/22:52");

console.log(d.toString()); // Fri Jan 21 2022 22:52:00 GMT+0900 (대한민국 표준시)
console.log(d.toDateString()); // Fri Jan 21 2022
console.log(d.toTimeString()); // 22:52:00 GMT+0900 (대한민국 표준시)
