const clock = document.querySelector("h2#clock");

clock.innerText = new Date();

const getClock = function () {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  clock.innerText = `${hours}:${minutes}:${seconds}`;
};

getClock();
setInterval(getClock, 1000);

//interval ?초마다 무슨일 있다 > 1분마다 1분이 지난다.

//setTimeout ?초후에 무슨 일 있다.
