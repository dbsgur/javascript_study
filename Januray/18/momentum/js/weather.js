const API_KEY = "891829d660455553d09b783c0231ca56";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  console.log("you live in", lat, lng);
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
  // console.log(url);
  fetch(url).then((resposne) =>
    resposne.json().then((data) => {
      const weather = document.querySelector("#weather span:first-child");
      const city = document.querySelector("#weather span:last-child");
      city.innerText = data.name;
      weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
    })
  );
}

function onGeoError() {
  alert("I can't find u. No weather for you");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
