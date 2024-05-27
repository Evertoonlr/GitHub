document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'bc7062fe448103e662d524f3b6ca68a7'; // Insira sua chave de API do OpenWeatherMap aqui

    const cityInput = document.getElementById('city-input');
    const searchButton = document.getElementById('search-button');

    searchButton.addEventListener('click', function() {
        const city = cityInput.value.trim();
        if (city !== '') {
            getWeatherByCity(city);
        } else {
            displayErrorMessage('Por favor, insira o nome da cidade.');
        }
    });

    function getWeatherByCity(city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    displayErrorMessage('Cidade não encontrada');
                    throw new Error('Cidade não encontrada');
                }
                return response.json();
            })
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }

    function displayWeather(data) {
        const weatherIcon = document.getElementById('weather-icon');
        weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png">`;

        const weatherDescription = document.getElementById('weather-description');
        weatherDescription.textContent = data.weather[0].description;

        const temperature = document.getElementById('temperature');
        temperature.textContent = `Temperatura: ${data.main.temp}°C`;

        const feelsLike = document.getElementById('feels-like');
        feelsLike.textContent = `Sensação Térmica: ${data.main.feels_like}°C`;

        const minMaxTemp = document.getElementById('min-max-temp');
        minMaxTemp.textContent = `Mínima: ${data.main.temp_min}°C / Máxima: ${data.main.temp_max}°C`;

        const humidity = document.getElementById('humidity');
        humidity.textContent = `Umidade: ${data.main.humidity}%`;
    }

    function displayErrorMessage(message) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
    }
});
