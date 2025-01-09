//For Countries
const API_URL = "https://restcountries.com/v2/all";
const container = document.getElementById("country-list");

fetch(API_URL)
    .then((res) => res.json())
    .then((data) => dislayCountries(data))
    .catch((error) => console.error("Error fetching data:", error));

function dislayCountries(countries) {
    const countryCards = countries.map((country) => {
        return `
            <div class="country-card">
                <h3>${country.name}</h3>
                <img src="${country.flags.svg}" alt="${country.name} flag">
                <p><strong>Capital:</strong> ${country.capital}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Country Code:</strong> ${country.alpha3Code}</p>
                <button onclick="showWeather('${country.capital}')">Click for Weather</button>
            </div>
          `
    });
    container.innerHTML = countryCards.join("");
}


//For Weather
const API_KEY = '0d842549618cad31de497769c45d5eb9';

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
}


function showWeather(city) {
    fetchWeather(city).then((data) => {
        if (data) {
            const temperature = data.main.temp;
            const weather = data.weather[0].description;
            const alertMessage = ` Weather in ${city}:
          - Temperature: ${temperature}°C
          - Condition: ${weather}`;
            alert(alertMessage);
        } else {
            alert("Could not fetch weather data. Please try again later.");
        }
    });
}
