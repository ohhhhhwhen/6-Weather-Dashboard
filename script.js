var theDate = moment().format("(M/D/YYYY)");
console.log(theDate);
var blueDate = moment().format("M/D/YYYY");
var APIKey = "a43d31585ad2e0c3fcd47ec0de96f2a6";
var cityNames = [];
var lat;
var lon;
var days = $(".fiveDays");

function displayCityInfo() {
  var cityClicked = $(this).attr("data-name");
  var tempURL =
    "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" +
    cityClicked +
    "&units=imperial&appid=" +
    APIKey;

  $.ajax({
    url: tempURL,
    method: "GET"
  }).then(function(response) {
    $(".cityName").text(response.name);
    $(".temp").text("Temperature: " + response.main.temp + " °F");
    $(".hum").text("Humidity: " + response.main.humidity + "%");
    $(".wind").text("Wind Speed: " + response.wind.speed);
    lat = response.coord.lat;
    lon = response.coord.lon;
    uv();
  });
}

function city() {
  var searchedCity = $("#citySearch")
    .val()
    .trim();
  console.log(searchedCity);
  cityNames.push(searchedCity);
  console.log(cityNames);

  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" +
    searchedCity +
    "&units=imperial&appid=" +
    APIKey;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(queryURL);

    console.log(response);

    $(".cityName").text(response.name);
    $(".temp").text("Temperature: " + response.main.temp + " F");
    $(".hum").text("Humidity: " + response.main.humidity);
    $(".wind").text("Wind Speed: " + response.wind.speed);

    lat = response.coord.lat;
    lon = response.coord.lon;
    console.log(lat);
    console.log(lon);

    uv();
    days.remove("class", "hidden");
    $(".day2").text(blueDate);
  });
}

function uv() {
  var queryUVURL =
    "http://api.openweathermap.org/data/2.5/uvi?appid=" +
    APIKey +
    "&lat=" +
    lat +
    "&lon=" +
    lon;

  $.ajax({
    url: queryUVURL,
    method: "GET"
  }).then(function(response) {
    console.log(queryUVURL);

    console.log(response);

    $(".uv").text("UV Index: " + response.value);

    $(".cityBtns").empty();

    for (var i = 0; i < cityNames.length; ++i) {
      var cities = $("<button>");
      cities.addClass("cities");
      cities.attr("data-name", cityNames[i]);
      cities.text(cityNames[i]);
      $(".cityBtns").append(cities);
    }
  });
}

$(".searchBtn").on("click", function() {
  city();
});

$(document).on("click", ".cities", displayCityInfo);