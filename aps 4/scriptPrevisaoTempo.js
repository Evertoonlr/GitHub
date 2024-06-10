document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'bc7062fe448103e662d524f3b6ca68a7';

    const cityInput = document.getElementById('city-input');
    const searchButton = document.getElementById('search-button');
    const currentLocationButton = document.getElementById('current-location-button');

    searchButton.addEventListener('click', function() {
        const city = cityInput.value.trim();
        if (city !== '') {
            getWeatherByCity(city);
        } else {
            displayErrorMessage('Por favor, insira o nome da cidade.');
        }
    });

    currentLocationButton.addEventListener('click', function() {
        getCurrentLocationWeather();
    });

    function getCurrentLocationWeather() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                getWeatherByCoordinates(latitude, longitude);
            }, error => {
                console.error('Erro ao obter a localização:', error);
                displayErrorMessage('Não foi possível obter sua localização.');
            });
        } else {
            console.error('Geolocalização não suportada.');
            displayErrorMessage('Geolocalização não suportada.');
        }
    }

    function getWeatherByCoordinates(latitude, longitude) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    displayErrorMessage('Dados meteorológicos não encontrados.');
                    throw new Error('Dados meteorológicos não encontrados.');
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
        translateWeatherDescription(data.weather[0].description)
            .then(translatedDescription => {
                weatherDescription.textContent = translatedDescription;
            })
            .catch(error => {
                console.error('Erro ao traduzir descrição do clima:', error);
            });

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
        // Chama a função mostraDialogo para exibir a mensagem de erro
        mostraDialogo(message, "error", 2500); // Define o tipo como "error" e o tempo como 2500 milissegundos (2.5 segundos)
    }
    

    function translateWeatherDescription(description) {
        const apiKey = 'YOUR_GOOGLE_TRANSLATE_API_KEY';
        const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}&q=${description}&source=en&target=pt`;

        return fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                return data.data.translations[0].translatedText;
            })
            .catch(error => {
                console.error('Erro na tradução:', error);
                return description;
            });
    }

    function mostraDialogo(mensagem, tipo, tempo) {
        if($("#message").is(":visible")){
            return false;
        }

        if(!tempo){
            var tempo = 3000;
        }

        if(!tipo){
            var tipo = "info";
        }

        var cssMessage = "display: block; position: fixed; top: 0; left: 20%; right: 20%; width: 60%; padding-top: 10px; z-index: 9999";
        var cssInner = "margin: 0 auto; box-shadow: 1px 1px 5px black;";

        var dialogo = "";
        dialogo += '<div id="message" class="cssMessage">';
        dialogo += '    <div class="alert alert-'+tipo+' alert-dismissable" id="cssInner">';
        dialogo +=          mensagem;
        dialogo += '<br>    </div>';
        dialogo += '</div>';

        $("body").append(dialogo);
        $("#message").hide();
        $("#message").fadeIn(200);

        setTimeout(function() {
            $('#message').fadeOut(300, function(){
                $(this).remove();
            });
        }, tempo);
    }
});

