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
var userCity;
var dayCount = 0;
var days = $(".fiveDays");

function displayCityInfo() {
  userCity = $(this).attr("data-name");
  queryURL =
    "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" +
    userCity +
    "&units=imperial&appid=" +
    APIKey;

  ajaxCity();
}

function city() {
  userCity = $("#citySearch")
    .val()
    .trim();
  cityNames.push(userCity);

  queryURL =
    "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" +
    userCity +
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
    // $(".uv").text("UV Index: ");
    // var uvNum = $("<h6>").text(response.value);
    // $(".uv").append(uvNum);
    // if(response.value < 5){
    //   $(".uv").remove("class", "red");
    //   $(".uv").attr("class", "blue");
    // }
    // else{
    //   $(".uv").remove("class", "blue");
    //   $(".uv").attr("class", "red");
    // }
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
    console.log(response);
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
  });
}

function icon() {
  var iconURL = "http://openweathermap.org/img/w/" + iconNum + ".png";
  var cityImg = $("<img>");
  cityImg.attr("src", iconURL);
  $(".cityName").append(cityImg);
}

function fiveDayW() {
  var daysSection = document.getElementById("title5D");
  daysSection.removeAttribute("class", "hidden");

  var fiveURL =
    "http://api.openweathermap.org/data/2.5/forecast?appid=" +
    APIKey +
    "&q=" +
    userCity +
    "&units=imperial";

  $.ajax({
    url: fiveURL,
    method: "GET"
  }).then(function(response) {
    console.log(fiveURL);

    console.log(response);

    console.log(response.list.length);


    for (var x = 0; x < response.list.length; ++x) {
      if(JSON.stringify(response.list[x].dt_txt).includes("00:00:00")){
        iconNum = response.list[x].weather[x].icon;
        var dayBoxes = $(".fiveBoxes");
        var extraDays = $("<div>");
        var dayImg = $("<img>");
        var extraTemp = $("<h6>");
        var extraHum = $("<h6>");
        var iconURL = "http://openweathermap.org/img/w/" + iconNum + ".png";
  
        dayImg.attr("src", iconURL);
        extraTemp.text("Temperature: " + response.list[x].main.temp);
        extraHum.text("Humidity: " + response.list[x].main.humidity);
  
        extraDays.append(dayImg, extraTemp, extraHum);
        extraDays.attr("class", "days");
        dayBoxes.append(extraDays);
        console.log(x);
      }
    }
  });
}

$(".searchBtn").on("click", function() {
  city();
  fiveDayW();
});

$(document).on("click", ".cities", displayCityInfo);
