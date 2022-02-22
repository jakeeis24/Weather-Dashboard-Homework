var searchBtn = document.getElementById("search-btn");
var currentCity = document.getElementById("displayed-city");
var currentIcon = document.getElementById("current-icon");
var currentTemp = document.getElementById("current-temp");
var currentWindpeed = document.getElementById("windspeed");
var currentHumidity = document.getElementById("humidity");
var currentUvIndex = document.getElementById("uv-index");
var currentDate = moment().format("(L)");

//forecast dates
// moment().add(24, "hours").format("(L)");
var forecast0 = document.getElementById("forecast0");

var forecast1 = document.getElementById("forecast1");
var forecast2 = document.getElementById("forecast2");
var forecast3 = document.getElementById("forecast3");
var forecast4 = document.getElementById("forecast4");

forecast0.textContent = moment().add(24, "hours").format("L");
forecast1.textContent = moment().add(48, "hours").format("L");
forecast2.textContent = moment().add(72, "hours").format("L");
forecast3.textContent = moment().add(96, "hours").format("L");
forecast4.textContent = moment().add(120, "hours").format("L");

//forecast icons
var icon0 = document.getElementById("icon0");
var icon1 = document.getElementById("icon1");
var icon2 = document.getElementById("icon2");
var icon3 = document.getElementById("icon3");
var icon4 = document.getElementById("icon4");

//forecast temps

var temp0 = document.getElementById("temp0");
var temp1 = document.getElementById("temp1");
var temp2 = document.getElementById("temp2");
var temp3 = document.getElementById("temp3");
var temp4 = document.getElementById("temp4");

//forecast wind
var wind0 = document.getElementById("wind0");
var wind1 = document.getElementById("wind1");
var wind2 = document.getElementById("wind2");
var wind3 = document.getElementById("wind3");
var wind4 = document.getElementById("wind4");

//forecast humidity
var humid0 = document.getElementById("humid0");
var humid1 = document.getElementById("humid1");
var humid2 = document.getElementById("humid2");
var humid3 = document.getElementById("humid3");
var humid4 = document.getElementById("humid4");

//function for data pull
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
      currentCity.textContent = data.name + " " + currentDate; //STILL NEED TO ADD ICON
      currentTemp.textContent = "Temp: " + data.main.temp + "°F";
      currentWindpeed.textContent = "Wind: " + data.wind.speed + " MPH";
      currentHumidity.textContent = "Humidity: " + data.main.humidity + " %";

      //Additional fetch to add the UV Index and 5-day forecast
      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          data.coord.lat +
          "&lon=" +
          data.coord.lon +
          "&exclude=hourly,minutely,alerts&units=imperial&appid=863b999d24ecbe4ecc592ba3795125dd"
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          currentUvIndex.textContent = "UV Index: " + data.current.uvi;
          //filling the forecasts
          //temps
          temp0.textContent = "Temp: " + data.daily[1].temp.day + "°F";
          temp1.textContent = "Temp: " + data.daily[2].temp.day + "°F";
          temp2.textContent = "Temp: " + data.daily[3].temp.day + "°F";
          temp3.textContent = "Temp: " + data.daily[4].temp.day + "°F";
          temp4.textContent = "Temp: " + data.daily[5].temp.day + "°F";
          //wind
          wind0.textContent = "Wind: " + data.daily[1].wind_speed + " MPH";
          wind1.textContent = "Wind: " + data.daily[2].wind_speed + " MPH";
          wind2.textContent = "Wind: " + data.daily[3].wind_speed + " MPH";
          wind3.textContent = "Wind: " + data.daily[4].wind_speed + " MPH";
          wind4.textContent = "Wind: " + data.daily[5].wind_speed + " MPH";
          //humidity
          humid0.textContent = "Humidity: " + data.daily[1].humidity + "%";
          humid1.textContent = "Humidity: " + data.daily[2].humidity + "%";
          humid2.textContent = "Humidity: " + data.daily[3].humidity + "%";
          humid3.textContent = "Humidity: " + data.daily[4].humidity + "%";
          humid4.textContent = "Humidity: " + data.daily[5].humidity + "%";
        });
    });
}
searchBtn.addEventListener("click", getApi);
searchBtn.addEventListener("click", function () {
  var cityList = document.getElementById("recent-searches");
  var recentSearch = document.getElementById("history-search"); //IN PROGRESS
  var addCity = document.createElement("button");
  addCity.setAttribute("type", "button");
  addCity.setAttribute("class", "city-list");
  addCity.setAttribute("id", "history-search");

  addCity.textContent = $("#userCity").val();
  cityList.appendChild(addCity);
  recentSearch.addEventListener("click", getApi); //IN PROGRESS
});
