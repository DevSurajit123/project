const weatherBox = document.getElementById('weather-box');
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';
const city = 'Chennai';
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API Response:', data); // Log entire response

        if (data.cod === 200) {
            updateWeatherBox(data);
        } else {
            weatherBox.innerHTML = `Weather data not available: ${data.message}`;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherBox.innerHTML = `Error fetching weather data: ${error.message}`;
    }
}

function updateWeatherBox(data) {
    const weatherCondition = data.weather[0].main.toLowerCase();
    const weatherDescriptions = {
        clear: 'sunny',
        rain: 'rainy',
        snow: 'snowy',
        clouds: 'cloudy'
    };

    // Reset background class
    weatherBox.className = 'box weather';
    
    // Add appropriate class for weather condition
    const conditionClass = weatherDescriptions[weatherCondition] || 'cloudy';
    weatherBox.classList.add(conditionClass);
    
    console.log('Applied classes:', weatherBox.className); // Debugging

    const weatherInfo = `
        <div class="weather-info">
            <h3>${data.name}</h3>
            <p>${data.weather[0].description}</p>
            <p>${data.main.temp}°C</p>
        </div>
    `;
    weatherBox.innerHTML = weatherInfo;
}

fetchWeather();
