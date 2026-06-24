const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherCard = document.getElementById("weatherCard");

const API_KEY = "YOUR_API_KEY";

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if(city === ""){
        weatherCard.innerHTML =
            `<p class="error">Please enter a city name.</p>`;
        return;
    }

    getWeather(city);
});

async function getWeather(city){

    weatherCard.innerHTML = "<p>Loading...</p>";

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();

        displayWeather(data);

    } catch(error){

        weatherCard.innerHTML = `
            <p class="error">${error.message}</p>
        `;
    }
}

function displayWeather(data){

    const cityName = data.name;
    const country = data.sys.country;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;
    const weather = data.weather[0].description;
    const icon = data.weather[0].icon;

    weatherCard.innerHTML = `
        <h2>${cityName}, ${country}</h2>

        <img src="https://openweathermap.org/img/wn/${icon}@2x.png">

        <div class="weather-details">
            <p><strong>${temp} °C</strong></p>
            <p>Condition: ${weather}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${wind} m/s</p>
        </div>
    `;
}