var theDate = moment().format("M/D/YYYY");
console.log(theDate);
$(".day2").text(theDate);
var APIKey = "166a433c57516f51dfab1f7edaed8413";
var cityName = "Bujumbura,Burundi";
var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?" +
  "q=" +
  cityName +
  "&units=imperial&appid=" +
  APIKey;

$.ajax({
  url: queryURL,
  method: "GET"
})
  .then(function(response) {
    console.log(queryURL);

    console.log(response);
    
    $(".temp").text("Temperature: " + response.main.temp + " F");
    $(".hum").text("Humidity: " + response.main.humidity);
    $(".wind").text("Wind Speed: " + response.wind.speed);
    // $(".uv").text("UV Index: " + response.name);

  });

  $(".searchBtn").on("click", function(){

  });