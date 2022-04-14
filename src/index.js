function formatDate(date) {
  let dates = date.getDate();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let year = date.getFullYear();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];

  return `${day}, ${month} ${dates}, ${year}-${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function searchCity(event) {
  event.preventDefault();
  // let cityInput = document.querySelector("#city-name");
  // let city = document.querySelector("#search-text-input");
  // cityInput.innerHTML = `${city.value}`;
  let cityInput = document.querySelector("#city-name");
  let city = document.querySelector("#search-text-input");
  cityInput.innerHTML = `${city.value}`;
  let searchInput = document.querySelector("#search-text-input");
  let units = "metric";
  let apiKey = "b7e0ef1260e02738f447532858962b61";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", searchCity);

function searchLocation(position) {
  let apiKey = "b7e0ef1260e02738f447532858962b61";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(getCurrentLocation);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

function showTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temps");
  tempElement.innerHTML = `${temp}℃`;

  let weather = response.data.weather[0].main;
  let weatherElement = document.querySelector("#description");
  weatherElement.innerHTML = `${weather}`;

  let precipitation = Math.round(response.data.precipitation);
  let precElement = document.querySelector(".prec");
  precElement.innerHTML = `${precipitation}%`;

  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector(".hum");
  humidityElement.innerHTML = `${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector(".wind");
  windElement.innerHTML = `${wind}mph`;
}
