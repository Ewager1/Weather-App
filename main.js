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

//weather assignments
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
let count = 0;

//Section: Date in Navbar
function setDates() {
  const pTag = $("<p>");
  const navTime = $(".time");
  //adds current date to tag
  pTag.text(dayjs().format("MMMM D, YYYY"));
  //fix font issues caused by navbar defaults
  pTag.attr("class", "fontFix");
  //appends Tag
  navTime.append(pTag);
  //creates and appends dates for 5 days of week
  for (i = 0; i < 5; i++) {
    nextFiveDays = $(".forecast");
    dayofYear = dayjs().add([i + 1], "day");
    nextFiveDays[i].append(dayofYear.format("MMMM D, YYYY"));
  }
}
setDates();

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
  //lat and long will be passed to UV index function
  let longitude = response.coord.lon;
  let latitude = response.coord.lat;
  let imgTag = $("<img>");
  imgTag.attr("class", "iconSize");
  //adds image icon from weather app based on api weather type

  if (response.weather[0].main === "Clear") {
    imgTag.attr("src", "http://openweathermap.org/img/wn/01d@2x.png");
  } else if (response.weather[0].main === "Clouds") {
    imgTag.attr("src", "http://openweathermap.org/img/wn/02d@2x.png");
  } else if (
    response.weather[0].main === "Rain" ||
    response.weather[0].main === "Drizzle"
  ) {
    imgTag.attr("src", "http://openweathermap.org/img/wn/09d@2x.png");
  } else if (response.weather[0].main === "Thunderstorm") {
    imgTag.attr("src", "http://openweathermap.org/img/wn/11d@2x.png");
  } else if (response.weather[0].main === "Snow") {
    imgTag.attr("src", "http://openweathermap.org/img/wn/13d@2x.png");
  } else {
    imgTag.attr("src", "http://openweathermap.org/img/wn/50d@2x.png");
  }
  //creates h3 element, adds City Name, then appends to html
  let cityHeader = $("<h3>").text(`Boston`);

  //appends city name and image
  snapShot.append(cityHeader);
  cityHeader.append(imgTag);

  //creates p elements, adds weather data, then appends to html
  let weatherArray = [
    `Fahrenheit: ${temp} \u00B0F`,
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
  //5 Days Forecast Section for Default
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      response.name +
      "&units=imperial" +
      "&appid=" +
      apiKey,
    method: "GET",
  }).then(function (secondResponse) {
    // the weather list has 40 sets, one for every 3 hours. count+8  means every 24 hours, or once per day
    let count = 0;
    $(".forecast").each(function (i) {
      let imgTag = $("<img>");
      weatherArray = secondResponse.list[count].weather[0].main;
      if (weatherArray === "Clear") {
        imgTag.attr("src", "http://openweathermap.org/img/wn/01d@2x.png");
        $(this).append($("<br>"), imgTag);
      } else if (weatherArray === "Clouds") {
        imgTag.attr("src", "http://openweathermap.org/img/wn/02d@2x.png");
        $(this).append($("<br>"), imgTag);
      } else if (weatherArray === "Rain" || weatherArray === "Drizzle") {
        imgTag.attr("src", "http://openweathermap.org/img/wn/09d@2x.png");
        $(this).append($("<br>"), imgTag);
      } else if (weatherArray === "Thunderstorm") {
        imgTag.attr("src", "http://openweathermap.org/img/wn/11d@2x.png");
        $(this).append($("<br>"), imgTag);
      } else if (weatherArray === "Snow") {
        imgTag.attr("src", "http://openweathermap.org/img/wn/13d@2x.png");
        $(this).append($("<br>"), imgTag);
      } else {
        imgTag.attr("src", "http://openweathermap.org/img/wn/50d@2x.png");
        $(this).append($("<br>"), imgTag);
      }
      $(this).append(
        $("<br>"),
        "Temp " + secondResponse.list[count].main.temp + " \u00B0F"
      );
      $(this).append(
        $("<br>"),
        "Humidity: " + secondResponse.list[count].main.humidity + " %"
      );
      count = count + 8;
    });
  });
});

//Section: User Input City Weather

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
    let imgTag = $("<img>");
    //adds image icon from weather app based on api weather type
    if (response.weather[0].main === "Clear") {
      imgTag.attr("src", "http://openweathermap.org/img/wn/01d@2x.png");
    } else if (response.weather[0].main === "Clouds") {
      imgTag.attr("src", "http://openweathermap.org/img/wn/02d@2x.png");
    } else if (
      response.weather[0].main === "Rain" ||
      response.weather[0].main === "Drizzle"
    ) {
      imgTag.attr("src", "http://openweathermap.org/img/wn/09d@2x.png");
    } else if (response.weather[0].main === "Thunderstorm") {
      imgTag.attr("src", "http://openweathermap.org/img/wn/11d@2x.png");
    } else if (response.weather[0].main === "Snow") {
      imgTag.attr("src", "http://openweathermap.org/img/wn/13d@2x.png");
    } else {
      imgTag.attr("src", "http://openweathermap.org/img/wn/50d@2x.png");
    }

    //empty previous header and weather data
    snapShot.empty();

    //changes city name to user's chosen city
    cityHeader = $("<h3>").text(userCityInput);
    cityHeader.append(imgTag);
    imgTag.attr("class", "iconSize");
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
    //5 Days Forecast Section for Default

    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        response.name +
        "&units=imperial" +
        "&appid=" +
        apiKey,
      method: "GET",
    }).then(function (secondResponse) {
      console.log(secondResponse);
      // the weather list has 40 sets, one for every 3 hours. count+8  means every 24 hours, or once per day
      forecast = $(".forecast");
      forecast.empty();
      forecast.each(function (key, value) {
        let imgTag = $("<img>");
        weatherArray = secondResponse.list[count].weather[0].main;
        if (weatherArray === "Clear") {
          imgTag.attr("src", "http://openweathermap.org/img/wn/01d@2x.png");
          $(this).append($("<br>"), imgTag);
        } else if (weatherArray === "Clouds") {
          imgTag.attr("src", "http://openweathermap.org/img/wn/02d@2x.png");
          $(this).append($("<br>"), imgTag);
        } else if (weatherArray === "Rain" || weatherArray === "Drizzle") {
          imgTag.attr("src", "http://openweathermap.org/img/wn/09d@2x.png");
          $(this).append($("<br>"), imgTag);
        } else if (weatherArray === "Thunderstorm") {
          imgTag.attr("src", "http://openweathermap.org/img/wn/11d@2x.png");
          $(this).append($("<br>"), imgTag);
        } else if (weatherArray === "Snow") {
          imgTag.attr("src", "http://openweathermap.org/img/wn/13d@2x.png");
          $(this).append($("<br>"), imgTag);
        } else {
          imgTag.attr("src", "http://openweathermap.org/img/wn/50d@2x.png");
          $(this).append($("<br>"), imgTag);
        }
        $(this).append(
          $("<br>"),
          "Temp " + secondResponse.list[count].main.temp + " \u00B0F"
        );
        $(this).append(
          $("<br>"),
          "Humidity: " + secondResponse.list[count].main.humidity + " %"
        );
        count = count + 8;
      });
      //resets count to avoid continuing past 40 and causing error beyong array length
      count = 0;
    });
  });
});
