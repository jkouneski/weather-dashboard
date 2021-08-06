var apiKey = "5f425bc0fc8ea402c4f98764fb23116c";
var searchBtn = document.querySelector("#search-button");

// Pulling city name from search bar
function searchValue () {
  var searchValue = document.querySelector("#searchInput").value;
  console.log(searchValue);
  fetchCurrentWeather(searchValue);
}
//Fetching current weather data and returning JSON response
function fetchCurrentWeather (searchValue) {
  var currentWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + 
  searchValue + 
  "&appid=" + 
  apiKey + 
  "&units=imperial";
  
  fetch(currentWeatherAPI)
    .then(function(res){
      return res.json()
    })
    .then(function(data){
      console.log(data);
      appendCurrentWeather(data);
      fetchWeatherInfo(data);
    })
}

function fetchWeatherInfo (data) {
var weatherInfoAPI = "https://api.openweathermap.org/data/2.5/onecall?lat=" + 
  data.coord.lat + 
  "&lon=" + 
  data.coord.lon + 
  "&appid=" + 
  apiKey + 
  "&units=imperial";

  fetch(weatherInfoAPI)
    .then(function(res){
      return res.json()
      appendForcast(res);
    })
    .then(function(data){
      console.log(data);
      appendUvIndex(data);
      appendForcast(data);
    })
    
}



//Appending current weather data to page
function appendCurrentWeather(data){
  //Creating container for Current Weather
  var currentWeatherContainer = document.querySelector("#currentWeather");
  var currentWeatherDiv = document.createElement('div');
  currentWeatherDiv.classList.add('card');
  currentWeatherContainer.append(currentWeatherDiv);

  var currentCity = document.createElement('h2');
  currentCity.textContent = data.name;

  var currentTemp = document.createElement('p');
  currentTemp.textContent = "Temperature:  " + data.main.temp + " °F";

  var currentHumid = document.createElement('p');
  currentHumid.textContent = "Humidity:  " + data.main.humidity + " %";

  var currentWind = document.createElement('p');
  currentWind.textContent = 'Wind Speed: ' +  data.wind.speed + ' mph';


  var currentIcon = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
  currentCity.innerHTML += '<img src = ' + currentIcon + '>';


currentWeatherDiv.append(currentCity, currentTemp, currentHumid, currentWind);
currentWeatherContainer.append(currentWeatherDiv);
  
}

function appendUvIndex (data) {
  var currentUvContainer = document.querySelector(".card");
  var currentUV = document.createElement('p');
  currentUV.textContent = "UV Index : " + data.current.uvi;
  currentUvContainer.append(currentUV); 
}

function appendForcast(data) {
  var forcastContainer = document.querySelector(".forcast");
  var forcastArr = data.children;
      var forcastCard, markup = ``;

      //Single Subreddit Post markdown title
      markup = "<h2>5 Day Forcast: </h2>";
      
      //Loops through postArr to markdown a HTML element for each reddit post obje                       
      for (var i = 0; i <= 5; i++) {
          forcastCard = forcastArr[i].data;
          markup += `
            <div class = "container">
              <div class = "card">
                <div class="card-title card-divider"></div>
                <a href = ">See Post</a>
                <div class="card-author"> Posted by</div>
              </div>
            </div>
            `;
      }
      // Insert the markup HTML to our container
      forcastContainer.insertAdjacentHTML('afterbegin', markup);
}




searchBtn.addEventListener("click", searchValue);
