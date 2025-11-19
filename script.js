const weatherApiKey = 'bd5e378503939ddaee76f12ad7a97608';
const unsplashApiKey = 'ngX_jSCant45LQxTVRI6IQ0Y0G9OUwOHJ887EuTBubE';

function getWeather() {
  const location = document.getElementById('location').value;
  
  if (!location) {
    alert('Please enter a location!');
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${weatherApiKey}`)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
      fetchBackgroundImage(data);
    })
    .catch(error => alert('Error fetching weather data. Please try again.'));
}

function displayWeather(data) {
  if (data.cod === '404') {
    alert('Location not found. Please enter a valid location.');
    return;
  }

  const weatherInfoDiv = document.getElementById('weatherInfo');
  const { name } = data;
  const { temp } = data.main;
  const { description } = data.weather[0];
  const { humidity } = data.main;
  const { speed } = data.wind;

  weatherInfoDiv.innerHTML = `
    <p><strong>Location:</strong> ${name}</p>
    <p><strong>Temperature:</strong> ${temp}°C</p>
    <p><strong>Condition:</strong> ${description}</p>
    <p><strong>Humidity:</strong> ${humidity}%</p>
    <p><strong>Wind Speed:</strong> ${speed} m/s</p>
  `;
}

// Determine the background image based on temperature or weather condition
function fetchBackgroundImage(data) {
  const { temp } = data.main;
  const { main: condition } = data.weather[0];
  
  let imageQuery = '';

  // Set image query based on temperature and condition
  if (temp <= 0) {
    imageQuery = 'snowy landscape';
  } else if (temp <= 15) {
    imageQuery = 'cold weather';
  } else if (temp > 15 && temp <= 25) {
    imageQuery = 'sunny day';
  } else {
    imageQuery = 'hot weather';
  }

  if (condition.includes("Rain")) {
    imageQuery = 'rainy weather';
  } else if (condition.includes("Cloud")) {
    imageQuery = 'cloudy sky';
  } else if (condition.includes("Clear")) {
    imageQuery = 'clear sky';
  }

  fetch(`https://api.unsplash.com/photos/random?query=${imageQuery}&client_id=${unsplashApiKey}`)
    .then(response => response.json())
    .then(data => {
      document.body.style.backgroundImage = `url(${data.urls.full})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
    })
    .catch(error => console.log('Error fetching background image:', error));
}

