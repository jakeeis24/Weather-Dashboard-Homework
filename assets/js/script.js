var searchBtn = document.getElementById("search-btn");
var currentCity = document.getElementById("displayed-city");
var currentIcon = document.getElementById("current-icon");
var currentTemp = document.getElementById("current-temp");
var currentWindpeed = document.getElementById("windspeed");
var currentHumidity = document.getElementById("humidity");
var currentUvIndex = document.getElementById("uv-index");
var currentDate = moment().format("(L)");

function getApi() {
  var userCity = $("#userCity").val();
  requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    userCity +
    "&units=imperial" +
    "&appid=863b999d24ecbe4ecc592ba3795125dd";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      console.log(data);
      currentCity.textContent = data.name + " " + currentDate;
      currentTemp.textContent = "Temp: " + data.main.temp + "°F";
      currentWindpeed.textContent = "Wind: " + data.wind.speed + " MPH";
      currentHumidity.textContent = "Humidity: " + data.main.humidity + " %";

      //Additional fetch to add the UV Index
      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          data.coord.lat +
          "&lon=" +
          data.coord.lon +
          "&exclude=hourly,daily&appid=863b999d24ecbe4ecc592ba3795125dd"
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          currentUvIndex.textContent = "UV Index: " + data.current.uvi;
        });
    });
}
searchBtn.addEventListener("click", getApi);
