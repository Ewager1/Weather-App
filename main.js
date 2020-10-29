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
let latitude = "";
let longitude = "";

// Section: Sets up Time at top of screen
// top of page:  displaying day of week, month, date, ordinal, and year
// assigments
const $currentDateandDay = $(".currentDateandDay"); //grabs p tag
const currentDate = new Date(); //grabs todays date from built in function
const currentMonth = currentDate.getMonth(); // returns current month of year

const monthsInYear = [
  //months in the year array
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const currentDayInMonth = currentDate.getDate(); //returns a number from 0-11 based on month
const currentYear = currentDate.getFullYear(); // returns current Year

// top of page:  displaying day of week, month, date, ordinal, and year
const pTag = $("<p>");
const navTime = $(".time");
//styling to fix parent h1 inheritence
pTag.css("font-size", "large");
pTag.css("text-align", "center");

pTag.text(
  `${
    monthsInYear[currentMonth - 1]
  } ${currentDayInMonth}${dateOrdinal()} ${currentYear}`
);
navTime.append(pTag);

//displays day of week.

//sets the appropriate ordinal to current date
function dateOrdinal() {
  if (
    currentDayInMonth === 1 ||
    currentDayInMonth === 21 ||
    currentDayInMonth === 31
  ) {
    return "st,";
  } else if (currentDayInMonth === 2 || currentDayInMonth === 22) {
    return "nd,";
  } else if (currentDayInMonth === 3) {
    return "rd,";
  } else {
    return "th,";
  }
}

//Section: Default City Weather

// Creates a default setting to the city of Boston
$.ajax({
  url: queryUrl,
  method: "GET",
}).then(function (response) {
  //makes weather data more easily grabbalble
  temp = response.main.temp;
  windSpeed = response.wind.speed;
  humidity = response.main.humidity;
  let longitude = response.coord.lon;
  let latitude = response.coord.lat;
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
  $.ajax({
    url:
      "http://api.openweathermap.org/data/2.5/uvi?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      apiKey,
    method: "GET",
  }).then(function (secondResponse) {
    //adds UV data onto webpage.
    let pTag = $("<p>");
    let sTag = $("<span>");
    pTag.text(`UV Index: `);
    pTag.append(sTag);
    sTag.text(secondResponse.value);
    snapShot.append(pTag);
    //logic changes UV background color based on UV severity index
    if (secondResponse.value <= 2) {
      sTag.attr("class", "green");
    } else if (secondResponse.value <= 5) {
      sTag.attr("class", "yellow");
    } else if (secondResponse.value <= 7) {
      sTag.attr("class", "orange");
    } else {
      sTag.attr("class", "red");
    }
  });
});
//Section End: Default City Weather

//Section: Input City Weather

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
    //lat and long below will be passed to nested UV Ajax
    let longitude = response.coord.lon;
    let latitude = response.coord.lat;

    //empty previous header and weather data
    snapShot.empty();

    //changes city name to user's chosen city
    cityHeader = $("<h3>").text(userCityInput);
    snapShot.append(cityHeader);

    //updates weather data to user's chosen city
    weatherArray = [
      `fahrenheit: ${temp}  \u00B0F`,
      ` Wind Speed: ${windSpeed}`,
      `Humidity: ${humidity}`,
    ];
    for (i = 0; i < weatherArray.length; i++) {
      let pTag = $("<p>");
      pTag.text(weatherArray[i]);
      snapShot.append(pTag);
    }
    $.ajax({
      url:
        "http://api.openweathermap.org/data/2.5/uvi?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=" +
        apiKey,
      method: "GET",
    }).then(function (secondResponse) {
      //adds UV data onto webpage.
      let pTag = $("<p>");
      let sTag = $("<span>");
      pTag.text(`UV Index: `);
      pTag.append(sTag);
      sTag.text(secondResponse.value);
      snapShot.append(pTag);
      //logic changes UV background color based on UV severity index
      if (secondResponse.value <= 2) {
        sTag.attr("class", "green");
      } else if (secondResponse.value <= 5) {
        sTag.attr("class", "yellow");
      } else if (secondResponse.value <= 7) {
        sTag.attr("class", "orange");
      } else {
        sTag.attr("class", "red");
      }
    });
  });
});

//Section End: Default City Weather
