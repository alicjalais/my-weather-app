let searchInput = document.querySelector("#search-input");
let cityForm = document.querySelector("#search-form");
let cityContainer = document.querySelector("#city");
let speedElement = document.querySelector("#speed");
let humidityElement = document.querySelector("#humidity");
let temperatureElement = document.querySelector("#actual-temp");
let weatherDesc = document.querySelector(".weather");

let dateContainer = document.querySelector("#current-day");

function showDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[new Date().getDay()];
  let hour = new Date().getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = new Date().getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let newDate = `${day}, ${hour}:${minutes}`;

  dateContainer.innerHTML = newDate;
}
showDate();
//document.addEventListener("load", showDate);
let link = document.querySelector("#celsius-link");
let link2 = document.querySelector("#fahrenheit-link");
let actualTemp = document.querySelector("#actual-temp");
function convertTemp(event) {
  event.preventDefault();
  actualTemp.classList.remove("fahrenheit-temp");
  if (!actualTemp.classList.contains("celsius-temp")) {
    actualTemp.classList.add("celsius-temp");
  }

  if (actualTemp.classList.contains("celsius-temp")) {
    actualTemp.innerHTML = "12 ";
  }
}
link.addEventListener("click", convertTemp);

function convertTemp2(event) {
  event.preventDefault();
  actualTemp.classList.remove("celsius-temp");
  if (!actualTemp.classList.contains("fahrenheit-temp")) {
    actualTemp.classList.add("fahrenheit-temp");
  }

  if (actualTemp.classList.contains("fahrenheit-temp")) {
    actualTemp.innerHTML = "66 ";
  }
}
link2.addEventListener("click", convertTemp2);

let apiKey = "855c2de2be25508191312e2bfc361fa5";
let city = "Budapest";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=855c2de2be25508191312e2bfc361fa5`;

async function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&q=${city}&units=metric&appid=855c2de2be25508191312e2bfc361fa5`;
  let response = await axios.get(apiUrl);

  let windSpeed = response.data.wind.speed;
  speedElement.innerHTML = windSpeed;
  let humidity = response.data.main.humidity;
  humidityElement.innerHTML = humidity;

  let temperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = temperature;
  cityContainer.innerHTML = city;
  let description = response.data.weather[0].description;

  weatherDesc.innerHTML = description;
}
searchCity(city);

function showCity(event) {
  event.preventDefault();

  searchCity(searchInput.value);
}
cityForm.addEventListener("submit", showCity);
