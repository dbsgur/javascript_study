const clock = document.querySelector("#clock");
const todayInfo = document.querySelector("#today-info");

clock.innerText = new Date();

const getDay = function () {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const days = date.getDay();

  const weaks = ["일", "월", "화", "수", "목", "금", "토"];

  todayInfo.innerText = `${year}년 ${month}월 ${day}일 ${weaks[days]}요일`;
};

const getClock = function () {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  clock.innerText = `${hours}:${minutes}:${seconds}`;
};

getClock();
getDay();
setInterval(getClock, 1000);

//interval ?초마다 무슨일 있다 > 1분마다 1분이 지난다.

//setTimeout ?초후에 무슨 일 있다.
