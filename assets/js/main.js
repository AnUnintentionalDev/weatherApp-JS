let now = new Date();
let date = document.querySelector('.date-wrapper span');

date.innerText = dateBuilder(now);

const api = {
  key: "12911118d386e703ccf6af942a24d443",
  baseurl: "http://api.openweathermap.org/data/2.5/"
};

const searchBox = document.querySelector('.search-city-box');
searchBox.addEventListener('keypress', setQuery);


function setQuery(evt){
  if(evt.keyCode == 13){
    getResult(searchBox.value);
    console.log(searchBox.value);
  }
}


function getResult(query){
  fetch(`${api.baseurl}weather?q=${query}&units=metric&appid=${api.key}`)
  .then(weather => {
    return weather.json()
    .then(displayResults);
  });
}

function displayResults(weather){
  console.log(weather);
  console.log(weather.weather);

  let city = document.querySelector('.city-wrapper span');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let temp = document.querySelector('.temp-wrapper .temp');
  temp.innerText = `${Math.round(weather.main.temp)}`;

  let weatherApp = document.querySelector('.temp-wrapper .weather');
  weatherApp.innerText = `${weather.weather[0].main}`;

  let hiLowWeather = document.querySelector('.temp-wrapper .hi-low');
  hiLowWeather.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}

function dateBuilder(d){
  let months = ["January", "February", "March", "April", "June", "July", "August", "September", "October", "November", "December"];

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;

}