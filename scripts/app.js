"use strict";

var cityForm = document.querySelector('form');
var card = document.querySelector('.card');
var details = document.querySelector('.details');
var time = document.querySelector('img.time');
var icon = document.querySelector('.icon img');

var updateUI = function updateUI(data) {
  // destructure properties
  var cityDets = data.cityDets,
      weather = data.weather; // update details template

  details.innerHTML = "\n    <h5 class=\"my-3\">".concat(cityDets.EnglishName, "</h5>\n    <div class=\"my-3\">").concat(weather.WeatherText, "</div>\n    <div class=\"display-4 my-4\">\n      <span>").concat(weather.Temperature.Metric.Value, "</span>\n      <span>&deg;C</span>\n    </div>\n  "); // update the night/day & icon images

  var iconSrc = "img/icons/".concat(weather.WeatherIcon, ".svg");
  icon.setAttribute('src', iconSrc);
  var timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
  time.setAttribute('src', timeSrc); // remove the d-none class if present

  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }
};

var updateCity = async function updateCity(city) {
  var cityDets = await getCity(city);
  var weather = await getWeather(cityDets.Key);
  return {
    cityDets: cityDets,
    weather: weather
  };
};

cityForm.addEventListener('submit', function (e) {
  // prevent default action
  e.preventDefault(); // get city value

  var city = cityForm.city.value.trim();
  cityForm.reset(); // update the ui with new city

  updateCity(city).then(function (data) {
    return updateUI(data);
  }).catch(function (err) {
    return console.log(err);
  });
});
