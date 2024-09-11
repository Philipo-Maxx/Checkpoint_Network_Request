import { ENV } from "./config.js";
const fetchbtn = document.getElementById("fetch-btn");
const temperature = document.getElementById("temperature");
const location_output = document.getElementById("location-name");
const weatherDescription = document.getElementById("weather-description");

const weatherDiv = document.getElementById("weatherDiv");

const fetchWeatherHandler = async (event) => {
  event.preventDefault();
  if (!navigator.geolocation) {
    return (weatherDiv.innerHTML =
      "<h3>Geolocation not supported by browser</h3>");
  }
  try {
    const apiURL = `https://api.weatherapi.com/v1/current.json?key=${
      ENV.API_KEY
    }&q=${document.getElementById("location").value}`;
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error("Unable to fetch weather data");
    }
    const data = await response.json();
    console.log(data);
    const description = data.current.condition.text;
    const temp = data.current.temp_c;
    const location = data.location.name;
    const country = data.location.country;
    const region = data.location.region;
    setTimeout(() => {
      weatherDescription.innerHTML = `<h3>Current Weather Description: ${description}</h3>`;
    }, 1000);

    setTimeout(() => {
      temperature.innerHTML = `<h3>Current Temperature: ${temp}°C</h3>`;
    }, 2000);

    setTimeout(() => {
      location_output.innerHTML = `<h3>Location: ${location}, Country: ${country}, Region: ${region}</h3>`;
    }, 3000);
  } catch (error) {
    console.log(error);
  }
};
fetchbtn.addEventListener("submit", fetchWeatherHandler);
