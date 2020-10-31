"use strict";

var key = '0maXh2wUkHGY5GllqfBKSKrVKp0IkckH'; // get weather information

var getWeather = async function getWeather(id) {
  var base = 'http://dataservice.accuweather.com/currentconditions/v1/';
  var query = "".concat(id, "?apikey=").concat(key);
  var response = await fetch(base + query);
  var data = await response.json();
  return data[0];
}; // get city information


var getCity = async function getCity(city) {
  var base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  var query = "?apikey=".concat(key, "&q=").concat(city);
  var response = await fetch(base + query);
  var data = await response.json();
  return data[0];
};
