var theDate = moment().format("(M/D/YYYY)");
console.log(theDate);
var blueDate = moment().format("M/D/YYYY");
var APIKey = "a43d31585ad2e0c3fcd47ec0de96f2a6";
var cityNames = [];
var lat;
var lon;
var cityID;
var iconNum;
var queryURL; 
var days = $(".fiveDays");

function displayCityInfo() {
  var cityClicked = $(this).attr("data-name");
   queryURL =
    "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" +
    cityClicked +
    "&units=imperial&appid=" +
    APIKey;

  ajaxCity();
}

function city() {
  var searchedCity = $("#citySearch")
    .val()
    .trim();
  cityNames.push(searchedCity);

   queryURL =
    "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" +
    searchedCity +
    "&units=imperial&appid=" +
    APIKey;

  ajaxCity();
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

function ajaxCity() {
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    iconNum = response.weather[0].icon;

    $(".cityName").text(response.name + " " + theDate + " ");
    $(".temp").text("Temperature: " + response.main.temp + " °F");
    $(".hum").text("Humidity: " + response.main.humidity + "%");
    $(".wind").text("Wind Speed: " + response.wind.speed);

    icon();

    lat = response.coord.lat;
    lon = response.coord.lon;
    cityID = response.id;
    uv();
    // days.remove("class", "hidden");
  });
}

function icon() {
  var iconURL = "http://openweathermap.org/img/w/" + iconNum + ".png";
  var cityImg = $("<img>");
  cityImg.attr("src", iconURL);
  $(".cityName").append(cityImg);
}

// function fiveDayW() {
//   // days.remove("class", "hidden");
//   // $(".day2").text(blueDate);

//   var fiveURL =
//   "api.openweathermap.org/data/2.5/forecast?lat=" +
//   lat +
//   "&lon=" +
//   lon;

//   $.ajax({
//     url: fiveURL,
//     method: "GET"
//   }).then(function(response) {
//     console.log(fiveURL);

//     console.log(response);

//     // for (var x = 1; x < 6; ++x) {
//     //   var today = new Date();
//     //   var newDates = new Date();
//     //   newDates.setDate(today.getDate() + x);
//     //   moment(newDates).format("M/D/YYYY");
//     //   newDates.moment().format("M/D/YYYY");
//     //   console.log(newDates);
//     // }
//   });
// }

$(".searchBtn").on("click", function() {
  city();
  //  fiveDayW();
});

$(document).on("click", ".cities", displayCityInfo);
