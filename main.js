// Snapshot Section
// 1. Add Units to the ends of snapShot Data
// 2. Find UV
// 	a. Which API?
// 	b. figure out the wait ajax function to make UV run at same time as other snapshot data
// 	c. change UV color based on it's number. Look up favorable, moderate, severe
// 3. Add date to snaptshot from scheduling app

// 5 Day Section
// 1. Set up 5 columns or use float left with margins for 5 days
// 2. Pull Api for Boston and set up default temp and humidity
// 3. create Time feature that makes each date. (For loop for generating these?)
// 4. Basic Style

// Search Results Section:
// 1. Create dynamic div creation with city name that runs api onClick
// 2. Create Clear Button
// 3. Create a clear button

// Styling
// 1. give padding
// 2. make responsive
// 3. add favicon

//assignments
const apiKey = "1222240c823f23e742864fd02f06eb25"; //my Api Key
let cityInput = $(".cityInput"); // grabs the search input box
const inputBtn = $(".inputBtn"); //grabs the search button
let temp = ""; //placeholder for temp
let windSpeed = ""; //placeholder for wind speed
let humidity = ""; // placeholder for humidity
let snapShot = $(".snapShot"); // grabs today's weather div
let queryUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=Boston&units=imperial&appid=" +
  apiKey;

// Creates a default setting to the city of Boston
$.ajax({
  url: queryUrl,
  method: "GET",
}).then(function (response) {
  //makes weather data more easily grabbalble
  temp = response.main.temp;
  windSpeed = response.wind.speed;
  humidity = response.main.humidity;

  //creates h3 element, adds City Name, then appends to html
  let cityHeader = $("<h3>").text("Boston");
  snapShot.append(cityHeader);

  //creates p elements, adds weather data, then appends to html
  let weatherArray = [
    `fahrenheit: ${temp} \u00B0F`,
    ` Wind Speed: ${windSpeed} MPH`,
    `Humidity: ${humidity}%`,
  ];
  for (i = 0; i < weatherArray.length; i++) {
    let pTag = $("<p>");
    pTag.text(weatherArray[i]);
    snapShot.append(pTag);
  }
});

//queries weather for the users input
inputBtn.on("click", function () {
  let userCityInput = cityInput.val();
  queryUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    userCityInput +
    "&units=imperial" +
    "&appid=" +
    apiKey;
  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    //changes variables from default to user's chosen city
    temp = response.main.temp;
    windSpeed = response.wind.speed;
    humidity = response.main.humidity;

    //empty previous header and weather data
    snapShot.empty();

    //changes city name to user's chosen city
    cityHeader = $("<h3>").text(userCityInput);
    snapShot.append(cityHeader);

    //updates weather data to user's chosen cit
    weatherArray = [
      `fahrenheit: ${temp}  &#8457`,
      ` Wind Speed: ${windSpeed}`,
      `Humidity: ${humidity}`,
    ];
    for (i = 0; i < weatherArray.length; i++) {
      let pTag = $("<p>");
      pTag.text(weatherArray[i]);
      snapShot.append(pTag);
    }
  });
});
